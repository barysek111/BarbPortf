"use client";

import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";
import { splineSquare } from "@/copy-database/spline-square";

/** Authored camera frame. The buffer is smaller; this size keeps the shot. */
const FRAME = 2250;
/** Buffer cap. The square on screen is a few hundred pixels. */
const MAX_DRAW = 1280;
const MAX_DPR = 1.5;

type RuntimeApp = Application & {
  _resizeObserver?: { disconnect: () => void };
  _renderer?: { setPixelRatio?: (value: number) => void };
  _frameView?: {
    enableResponsive?: boolean;
    setRenderSize?: (width?: number, height?: number) => void;
    updateRenderer?: () => void;
  };
  _scene?: {
    activeCamera?: {
      zoom: number;
      position: { set: (x: number, y: number, z: number) => void };
      rotation: { set: (x: number, y: number, z: number) => void };
      updateProjectionMatrix?: () => void;
    };
    traverseEntity?: (visit: (entity: { name?: string }) => void) => void;
    switchActiveCamera?: (entity: { name?: string }) => void;
  };
};

function blockResize(app: RuntimeApp) {
  try {
    app._resizeObserver?.disconnect();
  } catch {
    /* already gone */
  }
  app._resizeObserver = { disconnect() {} };
  if (app._frameView) app._frameView.enableResponsive = false;
}

function showFront(app: RuntimeApp) {
  let camera: { name?: string } | undefined;
  app._scene?.traverseEntity?.((entity) => {
    if (entity.name === "Camera 2") camera = entity;
  });
  if (camera) app._scene?.switchActiveCamera?.(camera);
  const active = app._scene?.activeCamera;
  if (!active) return;
  active.position.set(0, 0, 1000);
  active.rotation.set(0, 0, 0);
  active.zoom = 3;
  active.updateProjectionMatrix?.();
  app.requestRender();
}

function drawSize(cssPx: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  return Math.round(Math.min(MAX_DRAW, Math.max(512, cssPx * dpr)));
}

function fit(app: RuntimeApp, stage: HTMLDivElement) {
  const frame = stage.parentElement;
  if (!frame) return;
  const css = frame.clientWidth;
  if (css < 2) return;
  const draw = drawSize(css);
  blockResize(app);
  app._renderer?.setPixelRatio?.(1);
  app.setSize(FRAME, FRAME);
  showFront(app);
  app._frameView?.setRenderSize?.(draw, draw);
  app._frameView?.updateRenderer?.();
  frame.style.setProperty("--spline-square-draw", `${FRAME}px`);
  frame.style.setProperty("--spline-square-scale", String(css / FRAME));
  stage.classList.add("is-fit");
}

function SquareScene({ scene }: { scene: string }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = stage?.parentElement;
    if (!stage || !frame) return;

    const report = console.error;
    console.error = (...args: unknown[]) => {
      const message = args.map(String).join(" ");
      if (message.includes("WebGL") || message.includes("WebGPU") || message.includes("BindToCurrentSequence")) return;
      report(...args);
    };

    const canvas = document.createElement("canvas");
    stage.replaceChildren(canvas);
    let app: RuntimeApp;
    try {
      app = new Application(canvas) as RuntimeApp;
    } catch {
      console.error = report;
      return;
    }
    let cancel = false;
    let ready = false;
    let drawn = 0;
    let resizeTimer = 0;

    const fitFrame = () => {
      if (!ready) return;
      const css = frame.clientWidth;
      if (css < 2) return;
      const draw = drawSize(css);
      frame.style.setProperty("--spline-square-scale", String(css / FRAME));
      if (draw === drawn) return;
      drawn = draw;
      fit(app, stage);
    };

    const syncPlayback = () => {
      if (!ready || cancel) return;
      const box = frame.getBoundingClientRect();
      const visible = box.bottom > -200 && box.top < window.innerHeight + 200;
      if (visible) app.play();
      else app.stop();
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(fitFrame, 150);
    };

    app
      .load(scene)
      .then(() => {
        if (cancel) return;
        ready = true;
        fitFrame();
        syncPlayback();
      })
      .catch(() => {});

    const later = window.setTimeout(() => {
      if (!cancel) blockResize(app);
    }, 400);

    const resize = new ResizeObserver(onResize);
    resize.observe(frame);

    const seen = new IntersectionObserver(() => syncPlayback(), { rootMargin: "200px 0px" });
    seen.observe(frame);

    return () => {
      cancel = true;
      window.clearTimeout(later);
      window.clearTimeout(resizeTimer);
      resize.disconnect();
      seen.disconnect();
      console.error = report;
      try {
        app.dispose();
      } catch {
        /* context already released */
      }
    };
  }, [scene]);

  return <div ref={stageRef} className="spline-square-stage" />;
}

export function SplineSquare() {
  return (
    <div className="spline-square" data-name="Spline Square" aria-label={splineSquare.label}>
      <SquareScene scene={splineSquare.scene} />
    </div>
  );
}
