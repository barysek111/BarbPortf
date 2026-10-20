"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  getTiledNextProjectCanvasFrames,
  NEXT_PROJECT_CANVAS_THUMB_MAX_WIDTH,
  type NextProjectCanvasFrame,
} from "@/content/next-project-canvas-layout";
import { getProjectNeighbor, type Project } from "@/content/projects";
import { isWorkVideo, WorkVideo } from "@/components/work/WorkThumbMedia";
import { useNextProjectCanvasPan } from "@/components/work/use-next-project-canvas-pan";
import { cn } from "@/lib/cn";

const SCATTER_IMAGE_COUNT = 8;

function hashSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function imagePoolForProject(project: Project): string[] {
  const pool = [project.image, ...project.listImages.map((thumb) => thumb.src)];
  if (pool.length === 0) return [];

  const seed = hashSlug(project.slug);
  const order = Array.from({ length: SCATTER_IMAGE_COUNT }, (_, i) => i);
  for (let i = SCATTER_IMAGE_COUNT - 1; i > 0; i--) {
    const j = (seed + i * 17) % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map((i) => pool[i % pool.length]);
}

const thumbMediaClass = "pointer-events-none block h-auto max-w-full select-none";

function CanvasFrame({
  frame,
  src,
}: {
  frame: NextProjectCanvasFrame;
  src: string;
}) {
  const video = isWorkVideo(src);

  return (
    <div
      className="absolute"
      style={{
        left: frame.x,
        top: frame.y,
        width: NEXT_PROJECT_CANVAS_THUMB_MAX_WIDTH,
      }}
    >
      {video ? (
        <WorkVideo
          src={src}
          hidden
          className={cn(thumbMediaClass, "w-full")}
        />
      ) : (
        <img
          src={src}
          alt=""
          width={NEXT_PROJECT_CANVAS_THUMB_MAX_WIDTH}
          draggable={false}
          decoding="async"
          className={cn(thumbMediaClass, "w-full")}
        />
      )}
    </div>
  );
}

const CANVAS_LAYER_CLASS =
  "transform-gpu will-change-transform backface-hidden [transform:translateZ(0)]";

export function NextProjectCanvas(props: { slug: string } | { title: string; href: string; label: string; project?: Project }) {
  const sectionRef = useRef<HTMLElement>(null);

  let title: string;
  let href: string;
  let label: string;
  let pool: string[];

  if ("slug" in props) {
    const neighbor = getProjectNeighbor(props.slug);
    if (!neighbor) return null;
    title = neighbor.project.title;
    href = `/${neighbor.project.slug}`;
    label = neighbor.label;
    pool = imagePoolForProject(neighbor.project);
  } else {
    ({ title, href, label } = props);
    pool = props.project ? imagePoolForProject(props.project) : [];
  }

  const tiledFrames = useMemo(() => getTiledNextProjectCanvasFrames(), []);
  const fieldKey = useMemo(() => pool.join("|"), [pool]);
  const { scrollPanX, scrollPanY } = useNextProjectCanvasPan(fieldKey, sectionRef);

  if (pool.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      data-name="Section - Next Project"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "60svh" }}
        data-name="Normal"
      >
        <motion.div
          aria-hidden
          className={cn("absolute left-1/2 top-1/2 h-0 w-0", CANVAS_LAYER_CLASS)}
          style={{ x: scrollPanX, y: scrollPanY }}
          data-name="Canvas"
        >
          <div className="absolute left-1/2 top-1/2 h-0 w-0" data-name="Field">
            {tiledFrames.map((frame) => {
              const src = pool[frame.imageIndex % pool.length];
              return <CanvasFrame key={frame.tileId} frame={frame} src={src} />;
            })}
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-lift grid place-items-center"
          data-name="Content"
        >
          <div className="flex max-w-full flex-col items-center gap-12 text-center">
            <Button href={href} className="pointer-events-auto">
              {label}
            </Button>
            <Link href={href} className="pointer-events-auto" data-name="Project Title">
              <h3 className="type-h3 appear" data-appear="60">
                <span>{title}</span>
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
