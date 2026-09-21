"use client";

import { useEffect, useRef } from "react";
import { photos } from "@/content/home";

const SPEED = 70;
const COPIES = 5;

export function Photos() {
  const track = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const paused = useRef(false);
  const loop = Array.from({ length: COPIES }, () => photos).flat();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const el = track.current;
      if (el && !paused.current) {
        const setWidth = el.scrollWidth / COPIES;
        offset.current -= (SPEED * dt) / 1000;
        if (setWidth > 0 && -offset.current >= setWidth) offset.current += setWidth;
        el.style.transform = `translate3d(${offset.current}px,0,0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="stack-front w-full max-w-(--container-section) pb-section" data-name="Section - Photos">
      <div
        className="min-h-[600px] w-full overflow-hidden"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
      >
        <div className="flex w-max items-start gap-tight will-change-transform" ref={track}>
          {loop.map((photo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${photo.src}-${i}`}
              src={photo.src}
              alt=""
              width={photo.w}
              height={photo.h}
              className="block flex-none rounded-none object-cover"
              style={{ width: photo.w, height: photo.h }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
