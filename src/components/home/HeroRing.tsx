"use client";

import { useEffect, useRef } from "react";
import { heroRing } from "@/content/hero-ring";

/**
 * Hero ring: cards distributed around a tilted circle, seen in perspective.
 *
 * Every card stays flat and forward-facing; only its position and its
 * depth-driven scale and stacking change, so the near slice reads full size
 * while the far side recedes. The ring turns slowly on its own — no hover
 * pause or flip.
 *
 * Fills its parent — `hero-frame` supplies the 60vw width; this stage owns
 * the 5:4 height. Layout projects locally, then scales the oval to the stage.
 */

const CARD_W = 140;
const CARD_H = 200;
const CARD_GAP = 0;

const TILT_DEG = 31;
const OFFSET_DEG = 56;
const SPIN_DEG = -25;
const RADIUS_X = 1.5;
const RADIUS_Y = 0.65;
const CAM_DIST_FACTOR = 1.75;
const POSITION_SCALE = 0.45;
const SIZE_SCALE = 0.42;
const FIT_PADDING = 0.92;

// Original pace: ~90s per full revolution.
const DEG_PER_SECOND = 4;

const rad = (deg: number) => (deg * Math.PI) / 180;

type Box = { x: number; y: number; w: number; h: number; z: number };

function baseRadius(count: number) {
  const span = Math.max(CARD_W, CARD_H) + CARD_GAP;
  return Math.max(((count * span) / (2 * Math.PI)) * 0.62, span * 0.9);
}

/** Projects `count` cards around a tilted ring and scales them to the stage. */
function layout(count: number, width: number, height: number, turnDeg: number): Box[] {
  const r = baseRadius(count) * 1.12;
  const camDist = r * CAM_DIST_FACTOR;
  const tilt = rad(TILT_DEG);
  const spin = rad(SPIN_DEG);
  const cos = Math.cos(spin);
  const sin = Math.sin(spin);

  const local = Array.from({ length: count }, (_, i) => {
    const theta = rad(-90 + OFFSET_DEG + turnDeg + (i / count) * 360);
    const px = r * Math.sin(theta);
    const pz0 = -r * Math.cos(theta);
    const py = -pz0 * Math.sin(tilt);
    const pz = pz0 * Math.cos(tilt);

    const depth = Math.max(camDist / (camDist + pz), 0.05);
    const posScale = 1 + (depth - 1) * POSITION_SCALE;
    const sizeScale = 1 + (depth - 1) * SIZE_SCALE;

    const lx = px * posScale * RADIUS_X;
    const ly = py * posScale * RADIUS_Y;

    return {
      x: lx * cos - ly * sin,
      y: lx * sin + ly * cos,
      w: CARD_W * sizeScale,
      h: CARD_H * sizeScale,
      z: Math.round(depth * 1000) + 1,
    };
  });

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const box of local) {
    minX = Math.min(minX, box.x - box.w / 2);
    maxX = Math.max(maxX, box.x + box.w / 2);
    minY = Math.min(minY, box.y - box.h / 2);
    maxY = Math.max(maxY, box.y + box.h / 2);
  }

  const bw = Math.max(maxX - minX, 1);
  const bh = Math.max(maxY - minY, 1);
  const fit = Math.min(width / bw, height / bh) * FIT_PADDING;
  const cx = width / 2;
  const cy = height / 2;
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  return local.map((box) => ({
    x: cx + (box.x - midX) * fit,
    y: cy + (box.y - midY) * fit,
    w: box.w * fit,
    h: box.h * fit,
    z: box.z,
  }));
}

export function HeroRing() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const turnRef = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const commit = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (!width || !height) return;
      const boxes = layout(heroRing.length, width, height, turnRef.current);
      boxes.forEach((box, i) => {
        const el = cardsRef.current[i];
        if (!el) return;
        el.style.width = `${box.w}px`;
        el.style.height = `${box.h}px`;
        el.style.zIndex = String(box.z);
        el.style.transform = `translate(${box.x}px, ${box.y}px) translate(-50%, -50%)`;
      });
    };

    commit();
    window.addEventListener("resize", commit);

    let frame = 0;
    if (!reduced) {
      let last = performance.now();
      const tick = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        turnRef.current += DEG_PER_SECOND * dt;
        commit();
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", commit);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      // Full width of the parent; height from 5:4. hero-frame supplies 60vw.
      className="relative aspect-[5/4] w-full overflow-hidden bg-paper"
    >
      {heroRing.map((item, i) => (
        <div
          key={item.src}
          ref={(el) => {
            cardsRef.current[i] = el;
          }}
          className="absolute top-0 left-0"
        >
          <div className="relative h-full w-full overflow-hidden bg-paper shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
