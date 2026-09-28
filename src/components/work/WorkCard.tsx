"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { formatIndex, type Project } from "@/content/projects";

export function WorkCard({ project, index }: { project: Project; index: number }) {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <>
      <Link
        href={`/${project.slug}`}
        className="group relative min-w-0 cursor-none"
        onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
        onMouseLeave={() => setCursor(null)}
      >
        <div className="overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="block h-auto w-full origin-center rounded-none transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
            style={{ aspectRatio: `372 / ${project.imageH}` }}
          />
        </div>
        <div className="type-label flex h-[26px] items-start justify-between gap-gutter overflow-clip pt-gutter">
          <span className="text-muted">{formatIndex(index)}</span>
          <span className="min-w-0 text-right">{project.title}</span>
        </div>
      </Link>
      {cursor
        ? createPortal(
            <span
              aria-hidden="true"
              className="pointer-events-none fixed z-50 type-label -translate-x-1/2 -translate-y-1/2"
              style={{ left: cursor.x, top: cursor.y }}
            >
              [view]
            </span>,
            document.body,
          )
        : null}
    </>
  );
}
