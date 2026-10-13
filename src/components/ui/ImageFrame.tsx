"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type ImageFrameVariant = "fill" | "solid" | "background";

export type ImageFrameProps = {
  /** Defaults to solid. */
  variant?: ImageFrameVariant;
  src: string;
  alt?: string;
  /** background variant — full-bleed behind the foreground. */
  backgroundSrc?: string;
  /** Optional caption under the frame. Omitted frames have no caption. */
  description?: string;
  /** Solid frame fill. Defaults to surface (#f0f0f0). Any CSS color; a bare hex like 055E42 is accepted. */
  color?: string;
  /** Image row column count. Solid and background padding follows it. Defaults to 1. */
  columns?: 1 | 2 | 3;
  /** Responsive width hint for the optimizer. Image rows set this from the column count. */
  sizes?: string;
};

/** Equal padding on solid and background frames (all sides). Inside the frame; does not add to row gap. */
const ROW_PAD = {
  1: "p-24 tablet:p-56",
  2: "p-24 tablet:p-44",
  3: "p-24 tablet:p-44",
} as const;

/** Image max height so padding stays inside the 700px frame cap. */
const IMAGE_MAX = {
  1: "max-h-[652px] tablet:max-h-[588px]",
  2: "max-h-[652px] tablet:max-h-[612px]",
  3: "max-h-[652px] tablet:max-h-[612px]",
} as const;

/** Case-study frame height cap (ImageRow row height follows tallest frame, max this). */
export const IMAGE_FRAME_MAX_H_PX = 700;

const FRAME = "relative flex h-full w-full max-h-[700px] flex-col overflow-hidden";

/** GIFs stay animated, and SVGs are not an allowed optimizer type. */
function skipOptimizer(src: string) {
  const path = src.split("?")[0].toLowerCase();
  return path.endsWith(".gif") || path.endsWith(".svg");
}

/** Bare hex (`055E42`) becomes `#055E42`. Named and functional CSS colors pass through. */
function cssColor(value: string) {
  const color = value.trim();
  return /^[0-9a-f]{3,8}$/i.test(color) ? `#${color}` : color;
}

function ContainedImage({
  src,
  alt,
  maxClass,
}: {
  src: string;
  alt: string;
  maxClass: string;
}) {
  const [portrait, setPortrait] = useState(false);

  return (
    // Native img so the frame hugs the real aspect ratio. A square width/height
    // on next/image letterboxed wide pictures and the empty band read as row gap.
    <img
      src={src}
      alt={alt}
      onLoad={(e) => {
        const img = e.currentTarget;
        setPortrait(img.naturalHeight > img.naturalWidth);
      }}
      className={cn("block h-auto max-w-full object-contain object-top", maxClass, portrait ? "w-auto" : "w-full")}
    />
  );
}

function FillImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={2400}
      height={1500}
      sizes="100vw"
      quality={90}
      unoptimized={skipOptimizer(src)}
      className="block h-auto max-h-[700px] w-full object-cover object-center"
    />
  );
}

export function ImageFrame({
  variant = "solid",
  src,
  alt = "",
  backgroundSrc,
  description,
  color,
  columns = 1,
  sizes = "100vw",
}: ImageFrameProps) {
  const pad = ROW_PAD[columns];
  const imageMax = IMAGE_MAX[columns];
  const mediaAlign = columns === 1 ? "items-start" : "items-center";
  const mediaWrap = cn("flex w-full min-w-0 flex-1 justify-center", mediaAlign);
  const frame =
    variant === "fill" ? (
      <div className={FRAME} data-name="Image Frame — fill">
        <FillImage src={src} alt={alt} />
      </div>
    ) : variant === "background" ? (
      <div className={cn(FRAME, pad)} data-name="Image Frame — background">
        {backgroundSrc ? (
          <Image
            src={backgroundSrc}
            alt=""
            fill
            sizes={sizes}
            quality={90}
            unoptimized={skipOptimizer(backgroundSrc)}
            className="object-cover"
          />
        ) : null}
        <div className={cn("relative z-lift", mediaWrap)}>
          <ContainedImage src={src} alt={alt} maxClass={imageMax} />
        </div>
      </div>
    ) : (
      <div
        className={cn(FRAME, pad, !color && "bg-surface")}
        style={color ? { backgroundColor: cssColor(color) } : undefined}
        data-name="Image Frame — solid"
      >
        <div className={mediaWrap}>
          <ContainedImage src={src} alt={alt} maxClass={imageMax} />
        </div>
      </div>
    );

  if (!description) return frame;

  return (
    <div className="flex h-full w-full flex-col gap-8">
      {frame}
      <p className="type-label text-muted">{description}</p>
    </div>
  );
}
