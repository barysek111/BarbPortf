"use client";

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
};

/** Case-study frame height cap (ImageRow row height follows tallest frame, max this). */
export const IMAGE_FRAME_MAX_H_PX = 800;

const FRAME = "relative flex h-full w-full max-h-[800px] overflow-hidden";

function ContainedImage({ src, alt }: { src: string; alt: string }) {
  const [orientation, setOrientation] = useState<"portrait" | "landscape" | null>(null);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onLoad={(e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        setOrientation(naturalHeight > naturalWidth ? "portrait" : "landscape");
      }}
      className={cn(
        "block max-h-full max-w-full object-contain",
        orientation === "portrait" && "h-auto w-auto",
        orientation === "landscape" && "h-auto w-full",
        orientation === null && "h-auto w-auto",
      )}
    />
  );
}

function FillImage({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="block h-auto max-h-[800px] w-full object-cover object-center"
    />
  );
}

export function ImageFrame({
  variant = "solid",
  src,
  alt = "",
  backgroundSrc,
}: ImageFrameProps) {
  if (variant === "fill") {
    return (
      <div className={FRAME} data-name="Image Frame — fill">
        <FillImage src={src} alt={alt} />
      </div>
    );
  }

  if (variant === "background") {
    return (
      <div className={cn(FRAME, "flex-col p-44")} data-name="Image Frame — background">
        {backgroundSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={backgroundSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="relative z-lift flex min-h-0 w-full min-w-0 flex-1 items-center justify-center">
          <ContainedImage src={src} alt={alt} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(FRAME, "flex-col bg-surface p-44")} data-name="Image Frame — solid">
      <div className="flex min-h-0 w-full min-w-0 flex-1 items-center justify-center">
        <ContainedImage src={src} alt={alt} />
      </div>
    </div>
  );
}
