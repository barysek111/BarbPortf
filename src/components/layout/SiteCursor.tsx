"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SIZE = 16;

/**
 * 16px dot (paper fill + difference) so it reads dark on paper and light on ink.
 * Sits on the system pointer with no follow delay. Portaled to body; pointer-fine only.
 * Hidden over [data-hide-site-cursor] so a local label (WorkCard and NextProject [view]) is the only cursor.
 */
export function SiteCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const suppress = useRef(false);
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

    const place = (x: number, y: number) => {
      const el = dotRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      el.style.opacity = active.current && !suppress.current ? "1" : "0";
    };

    const onMove = (e: MouseEvent) => {
      active.current = true;
      place(e.clientX, e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const node = e.target;
      suppress.current =
        node instanceof Element && Boolean(node.closest("[data-hide-site-cursor]"));
      place(e.clientX, e.clientY);
    };

    const onDocLeave = (e: MouseEvent) => {
      const next = e.relatedTarget;
      if (next === null || !(next instanceof Node) || !document.documentElement.contains(next)) {
        active.current = false;
        place(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseout", onDocLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
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
