"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { formatIndex, type Project } from "@/content/projects";
import { WorkThumbMedia } from "@/components/work/WorkThumbMedia";

export function WorkCard({ project, index }: { project: Project; index: number }) {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  return (
    <>
      <Link
        href={`/${project.slug}`}
        className="group relative min-w-0 cursor-none"
        data-hide-site-cursor=""
        onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
        onMouseLeave={() => setCursor(null)}
      >
        <div className="overflow-hidden">
          <WorkThumbMedia
            src={project.image}
            alt={project.title}
            height={project.imageH}
          />
        </div>
        <div className="type-label flex h-[26px] items-start justify-between gap-12 overflow-clip pt-12">
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
