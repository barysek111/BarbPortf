"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const LERP = 0.11;
const SIZE = 16;

/**
 * 16px dot (paper fill + difference) so it reads dark on paper and light on ink.
 * Lerps behind the system pointer. Portaled to body; pointer-fine only.
 * Hidden over [data-hide-site-cursor] so a local label (WorkCard [view]) is the only cursor.
 */
export function SiteCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const active = useRef(false);
  const suppress = useRef(false);
  const raf = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!active.current) {
        active.current = true;
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
      }
    };

    const onOver = (e: MouseEvent) => {
      const node = e.target;
      suppress.current =
        node instanceof Element && Boolean(node.closest("[data-hide-site-cursor]"));
    };

    const onDocLeave = (e: MouseEvent) => {
      const next = e.relatedTarget;
      if (next === null || !(next instanceof Node) || !document.documentElement.contains(next)) {
        active.current = false;
      }
    };

    const tick = () => {
      const el = dotRef.current;
      if (el) {
        pos.current.x += (target.current.x - pos.current.x) * LERP;
        pos.current.y += (target.current.y - pos.current.y) * LERP;
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        el.style.opacity = active.current && !suppress.current ? "1" : "0";
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseout", onDocLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseout", onDocLeave);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={dotRef}
      className="site-cursor"
      aria-hidden
      style={{ width: SIZE, height: SIZE }}
    />,
    document.body,
  );
}
