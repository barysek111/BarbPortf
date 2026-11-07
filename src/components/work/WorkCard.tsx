"use client";

import Link from "next/link";
import { formatYear, type Project } from "@/content/projects";
import { DitherOverlay } from "@/components/work/DitherOverlay";
import { useViewCursor, ViewCursor } from "@/components/work/ViewCursor";
import { isWorkVideo, WorkThumbMedia } from "@/components/work/WorkThumbMedia";

export function WorkCard({
  project,
  dither = false,
  caption = "below",
  description,
}: {
  project: Project;
  /** Bayer dither fades over the whole image on hover. Zoom and the [view] pointer stay. */
  dither?: boolean;
  /** `below`: image, then year and title. `above`: year, then title, then image. */
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
          <span className="text-muted">{formatYear(project.year)}</span>
          <span className="min-w-0">{project.title}</span>
        </>
      ) : (
        <>
          <span className="text-muted">{formatYear(project.year)}</span>
          <span className="min-w-0 text-right">{project.title}</span>
        </>
      )}
    </div>
  );

  return (
    <>
      <Link
        href={`/${project.slug}`}
        className="appear group relative block w-full min-w-0 cursor-none"
        data-appear="20"
        data-hide-site-cursor=""
        onMouseMove={bind.onMouseMove}
        onMouseLeave={bind.onMouseLeave}
      >
        <div
          className={
            caption === "above"
              ? "appear-body flex min-w-0 flex-col gap-12"
              : "appear-body flex min-w-0 flex-col"
          }
        >
          {caption === "above" ? meta : null}
          {caption === "above" && description ? (
            <p className="type-body pr-32 text-muted">{description}</p>
          ) : null}
          <div className="overflow-hidden">{media}</div>
          {caption === "above" ? null : meta}
        </div>
      </Link>
      <ViewCursor cursor={cursor} />
    </>
  );
}
