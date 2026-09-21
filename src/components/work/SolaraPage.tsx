"use client";

import { useEffect, useRef, useState } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
import { Chapter } from "@/components/sections/Chapter";
import { ProjectHero } from "@/components/work/ProjectHero";
import { solara } from "@/content/solara";

function Gallery({
  left,
  right,
}: {
  left: readonly { src: string; aspect: string }[];
  right: readonly { src: string; aspect: string }[];
}) {
  return (
    <section className="w-full max-w-(--container-section) px-gutter pb-section" data-name="Section - Photos">
      <div className="grid grid-cols-1 gap-tight tablet:grid-cols-2 [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:object-cover">
        <div className="flex flex-col gap-tight">
          {left.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={img.src} src={img.src} alt="" style={{ aspectRatio: img.aspect }} />
          ))}
        </div>
        <div className="flex flex-col gap-tight">
          {right.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={img.src} src={img.src} alt="" style={{ aspectRatio: img.aspect }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolaraPage() {
  const [firstLeft, ...restLeft] = solara.galleryLeft;
  const [firstRight, ...restRight] = solara.galleryRight;

  return (
    <article className="case">
      <ProjectHero
        title={solara.title}
        aboutLabel={solara.aboutLabel}
        description={solara.description}
        meta={solara.meta}
      />

      <Gallery left={[firstLeft]} right={[firstRight]} />
      <Chapter />
      <Gallery left={restLeft} right={restRight} />

      <NextProject />
    </article>
  );
}

function NextProject() {
  const section = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setPos((p) => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      ref={section}
      className="relative h-svh w-full max-w-(--container-section) cursor-grab touch-none overflow-hidden active:cursor-grabbing"
      data-name="Section - Next Project"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        drag.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        setPos({
          x: drag.current.ox + (e.clientX - drag.current.x),
          y: drag.current.oy + (e.clientY - drag.current.y),
        });
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-pill" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
        {solara.scatter.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${img.src}-${img.x}`}
            src={img.src}
            alt=""
            className="absolute -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none select-none"
            draggable={false}
            style={{
              left: `calc(50% + ${img.x})`,
              top: `calc(50% + ${img.y})`,
              width: img.w,
              height: img.h,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-2 flex flex-col items-center justify-center gap-12 text-center pointer-events-none [&_a]:pointer-events-auto">
        <p className="type-h2 appear" data-appear="60">
          <span>{solara.next.title}</span>
        </p>
        <BracketButton href={solara.next.href}>next project</BracketButton>
      </div>
      <p className="absolute bottom-10 left-10 z-2 type-label appear" data-appear="20">
        <span>SCROLL/DRAG TO MOVE</span>
      </p>
    </section>
  );
}
