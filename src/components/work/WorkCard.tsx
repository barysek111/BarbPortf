"use client";

import Link from "next/link";
import { formatIndex, type Project } from "@/content/projects";
import { DitherOverlay } from "@/components/work/DitherOverlay";
import { useViewCursor, ViewCursor } from "@/components/work/ViewCursor";
import { isWorkVideo, WorkThumbMedia } from "@/components/work/WorkThumbMedia";

export function WorkCard({
  project,
  index,
  dither = false,
  caption = "below",
  description,
}: {
  project: Project;
  index: number;
  /** Bayer dither fades over the whole image on hover. Zoom and the [view] pointer stay. */
  dither?: boolean;
  /** `below`: image, then number and title. `above`: number, then title, then image. */
  caption?: "below" | "above";
  /** Body line under the title when `caption` is `above`. Same string as the list view. */
  description?: string;
}) {
  const { cursor, bind } = useViewCursor();
  const media = dither ? (
    <div className="relative">
      <WorkThumbMedia src={project.image} alt={project.title} height={project.imageH} />
      <DitherOverlay
        src={project.image}
        fit={isWorkVideo(project.image) ? "cover" : "fill"}
        position={isWorkVideo(project.image) ? "top" : "center"}
      />
    </div>
  ) : (
    <WorkThumbMedia src={project.image} alt={project.title} height={project.imageH} />
  );
  const meta = (
    <div
      className={
        caption === "above"
          ? "type-label flex flex-col items-start gap-2"
          : "type-label flex h-[26px] items-start justify-between gap-12 overflow-clip pt-12"
      }
    >
      {caption === "above" ? (
        <>
          <span className="text-muted">{formatIndex(index)}</span>
          <span className="min-w-0">{project.title}</span>
        </>
      ) : (
        <>
          <span className="text-muted">{formatIndex(index)}</span>
          <span className="min-w-0 text-right">{project.title}</span>
        </>
      )}
    </div>
  );

  return (
    <>
      <Link
        href={`/${project.slug}`}
        className={
          caption === "above"
            ? "group relative flex min-w-0 cursor-none flex-col gap-12"
            : "group relative flex min-w-0 cursor-none flex-col"
        }
        data-hide-site-cursor=""
        onMouseMove={bind.onMouseMove}
        onMouseLeave={bind.onMouseLeave}
      >
        {caption === "above" ? meta : null}
        {caption === "above" && description ? (
          <p className="type-body pr-32 text-muted">{description}</p>
        ) : null}
        <div className="overflow-hidden">{media}</div>
        {caption === "above" ? null : meta}
      </Link>
      <ViewCursor cursor={cursor} />
    </>
  );
}
