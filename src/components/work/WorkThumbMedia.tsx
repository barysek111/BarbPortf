"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export const WORK_THUMB_HOVER_ZOOM =
  "origin-center scale-100 transform-gpu transition-transform duration-[500ms] ease-in group-hover:scale-[1.04] group-focus-visible:scale-[1.04]";

/** Same zoom as the stills, without a resting GPU transform. That layer leaves <video> blank. */
export const WORK_VIDEO_HOVER_ZOOM =
  "origin-center transition-transform duration-[500ms] ease-in group-hover:scale-[1.04] group-focus-visible:scale-[1.04]";

export const WORK_THUMB_HOVER_GRAY =
  "grayscale-0 transition-[filter] duration-[200ms] ease-in group-hover:grayscale group-focus-visible:grayscale motion-reduce:transition-none";

export function isWorkVideo(src: string) {
  return src.endsWith(".mp4") || src.endsWith(".webm");
}

export function WorkVideo({
  src,
  alt,
  className,
  hidden,
}: {
  src: string;
  alt?: string;
  className?: string;
  hidden?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const start = () => {
      void video.play().catch(() => {});
    };
    if (video.readyState >= 2) start();
    else video.addEventListener("canplay", start, { once: true });
    return () => video.removeEventListener("canplay", start);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label={hidden ? undefined : alt}
      aria-hidden={hidden || undefined}
      className={className}
    />
  );
}

export function WorkThumbMedia({
  src,
  alt,
  height,
  hoverZoom = true,
}: {
  src: string;
  alt: string;
  height: number;
  hoverZoom?: boolean;
}) {
  const motion = hoverZoom ? WORK_THUMB_HOVER_ZOOM : "";
  const gray = hoverZoom ? WORK_THUMB_HOVER_GRAY : "";

  if (isWorkVideo(src)) {
    return (
      <div className="relative aspect-square w-full overflow-hidden">
        <WorkVideo
          src={src}
          alt={alt}
          className={`block h-full w-full object-cover object-top ${gray} ${hoverZoom ? WORK_VIDEO_HOVER_ZOOM : ""}`}
        />
      </div>
    );
  }

  if (src.split("?")[0].toLowerCase().endsWith(".gif")) {
    return (
      <img
        src={src}
        alt={alt}
        width={372}
        height={height}
        className={`block h-auto w-full rounded-none ${gray} ${hoverZoom ? WORK_VIDEO_HOVER_ZOOM : ""}`}
      />
    );
  }

  return (
    <div className={motion}>
      <Image
        src={src}
        alt={alt}
        width={372}
        height={height}
        sizes="(max-width: 809px) 50vw, 25vw"
        className={`block h-auto w-full rounded-none ${gray}`}
      />
    </div>
  );
}
