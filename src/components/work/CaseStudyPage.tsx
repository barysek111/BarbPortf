"use client";

import { useEffect, useRef, useState } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
import { Chapter } from "@/components/sections/Chapter";
import { ImageRow } from "@/components/sections/ImageRow";
import { ProjectHero } from "@/components/work/ProjectHero";
import type { CaseStudy } from "@/content/case-studies/types";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article className="case">
      <ProjectHero
        title={study.title}
        aboutLabel={study.aboutLabel}
        description={study.description}
        meta={study.meta}
      />

      {study.heroImageRow ? (
        <ImageRow columns={2} frames={[...study.heroImageRow]} />
      ) : null}

      {study.chapters.map((chapter) => (
        <div key={chapter.headline}>
          <Chapter headline={chapter.headline} sections={[...chapter.sections]} />
          {chapter.imageRows
            ? chapter.imageRows.map((row, index) => (
                <ImageRow
                  key={`${chapter.headline}-row-${index}`}
                  columns={row.columns}
                  frames={[...row.frames]}
                />
              ))
            : null}
        </div>
      ))}

      {study.next && study.scatter ? (
        <NextProject next={study.next} scatter={study.scatter} />
      ) : null}
    </article>
  );
}

function NextProject({
  next,
  scatter,
}: {
  next: { title: string; href: string };
  scatter: readonly { src: string; x: string; y: string; w: number; h: number }[];
}) {
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
      <div
        className="absolute inset-0 overflow-hidden rounded-pill"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        {scatter.map((img) => (
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
          <span>{next.title}</span>
        </p>
        <BracketButton href={next.href}>next project</BracketButton>
      </div>
      <p className="absolute bottom-10 left-10 z-2 type-label appear" data-appear="20">
        <span>SCROLL/DRAG TO MOVE</span>
      </p>
    </section>
  );
}
