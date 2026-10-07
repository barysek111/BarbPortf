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
  /** Responsive width hint for the optimizer. Image rows set this from the column count. */
  sizes?: string;
};

/** Case-study frame height cap (ImageRow row height follows tallest frame, max this). */
export const IMAGE_FRAME_MAX_H_PX = 700;

const FRAME = "relative flex h-full w-full max-h-[700px] overflow-hidden";

/** GIFs stay animated, and SVGs are not an allowed optimizer type. */
function skipOptimizer(src: string) {
  const path = src.split("?")[0].toLowerCase();
  return path.endsWith(".gif") || path.endsWith(".svg");
}

function ContainedImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [orientation, setOrientation] = useState<"portrait" | "landscape" | null>(null);

  return (
    <Image
      src={src}
      alt={alt}
      width={3840}
      height={3840}
      sizes={sizes}
      quality={90}
      unoptimized={skipOptimizer(src)}
      onLoad={(e) => {
        const img = e.currentTarget;
        setOrientation(img.naturalHeight > img.naturalWidth ? "portrait" : "landscape");
      }}
      className={cn(
        "block h-auto max-h-full max-w-full object-contain",
        orientation === "portrait" && "h-auto w-auto",
        orientation === "landscape" && "h-auto w-full",
        orientation === null && "h-auto w-auto",
      )}
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
  sizes = "100vw",
}: ImageFrameProps) {
  const frame =
    variant === "fill" ? (
      <div className={FRAME} data-name="Image Frame — fill">
        <FillImage src={src} alt={alt} />
      </div>
    ) : variant === "background" ? (
      <div className={cn(FRAME, "flex-col px-32 py-64")} data-name="Image Frame — background">
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
        <div className="relative z-lift flex min-h-0 w-full min-w-0 flex-1 items-center justify-center">
          <ContainedImage src={src} alt={alt} sizes={sizes} />
        </div>
      </div>
    ) : (
      <div className={cn(FRAME, "flex-col bg-surface px-32 py-64")} data-name="Image Frame — solid">
        <div className="flex min-h-0 w-full min-w-0 flex-1 items-center justify-center">
          <ContainedImage src={src} alt={alt} sizes={sizes} />
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
