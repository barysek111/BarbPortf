"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getProjectNeighbor } from "@/content/projects";
import { DitherOverlay } from "@/components/work/DitherOverlay";
import { useViewCursor, ViewCursor } from "@/components/work/ViewCursor";
import { isWorkVideo, WORK_THUMB_HOVER_GRAY, WORK_THUMB_HOVER_ZOOM } from "@/components/work/WorkThumbMedia";
import { cn } from "@/lib/cn";

export function NextProject(
  props:
    | { slug: string }
    | {
        title: string;
        href: string;
        imageSrc?: string;
        imageHeight?: number;
        label: string;
      },
) {
  const { cursor, bind } = useViewCursor();

  let title: string;
  let href: string;
  let imageSrc: string | undefined;
  let imageHeight: number | undefined;
  let label: string;

  if ("slug" in props) {
    const neighbor = getProjectNeighbor(props.slug);
    if (!neighbor) return null;
    title = neighbor.project.title;
    href = `/${neighbor.project.slug}`;
    imageSrc = neighbor.project.image;
    imageHeight = neighbor.project.imageH;
    label = neighbor.label;
  } else {
    ({ title, href, imageSrc, imageHeight, label } = props);
  }

  const video = imageSrc ? isWorkVideo(imageSrc) : false;

  return (
    <section data-name="Section - Next Project">
      <div className="grid w-full place-items-center">
        {imageSrc ? (
          <Link
            href={href}
            aria-label={title}
            tabIndex={-1}
            data-hide-site-cursor=""
            onMouseMove={bind.onMouseMove}
            onMouseLeave={bind.onMouseLeave}
            className={cn(
              "group relative col-start-1 row-start-1 cursor-none overflow-hidden tablet:w-[25vw]",
              video ? "aspect-square w-[50vw]" : "w-[50vw]",
            )}
          >
            {video ? (
              <div className={`absolute inset-0 ${WORK_THUMB_HOVER_ZOOM}`}>
                <video
                  src={imageSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden
                  className={`h-full w-full object-cover object-top ${WORK_THUMB_HOVER_GRAY}`}
                />
              </div>
            ) : (
              <div className={WORK_THUMB_HOVER_ZOOM}>
                <Image
                  src={imageSrc}
                  alt=""
                  width={372}
                  height={imageHeight ?? 372}
                  sizes="(max-width: 809px) 50vw, 25vw"
                  className={`block h-auto w-full ${WORK_THUMB_HOVER_GRAY}`}
                />
              </div>
            )}
            <DitherOverlay src={imageSrc} fit={video ? "cover" : "fill"} position={video ? "top" : "center"} />
          </Link>
        ) : null}
        <div className="pointer-events-none z-lift col-start-1 row-start-1 flex w-max max-w-full flex-col items-center justify-center gap-12 text-center">
          <Button href={href} className="pointer-events-auto">
            {label}
          </Button>
          <Link href={href} className="pointer-events-auto">
            <h3 className="type-h3 appear" data-appear="60">
              <span>{title}</span>
            </h3>
          </Link>
        </div>
      </div>
      <ViewCursor cursor={cursor} />
    </section>
  );
}
