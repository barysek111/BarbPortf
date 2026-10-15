"use client";

import { useEffect, useRef, useState } from "react";
import { isWorkVideo, WORK_THUMB_HOVER_ZOOM } from "@/components/work/WorkThumbMedia";
import { cn } from "@/lib/cn";

type Rgb = [number, number, number];
type Fit = "fill" | "cover";
type Position = "center" | "top";

const PIXEL_SIZE = 2;
const MAX_DPR = 2;
const CHANNELS = 4;
const MAX_CHANNEL = 255;
const BAYER_SIZE = 8;
const BAYER_DIVISOR = BAYER_SIZE * BAYER_SIZE;
const LUMA_R = 0.2126;
const LUMA_G = 0.7152;
const LUMA_B = 0.0722;

/** Dark to light. Values are the live tokens, with the system hex as a fallback. */
const PALETTE = [
  { token: "--color-ink", fallback: "#1c1c1c" },
  { token: "--color-muted", fallback: "#a7a7a7" },
  { token: "--color-paper", fallback: "#ffffff" },
] as const;

const BAYER_MATRIX = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60,
  28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47,
  7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
];

const readLuminance = (data: Uint8ClampedArray) => {
  const values = new Float32Array(data.length / CHANNELS);
  for (let index = 0; index < values.length; index++) {
    const offset = index * CHANNELS;
    values[index] =
      (data[offset] * LUMA_R + data[offset + 1] * LUMA_G + data[offset + 2] * LUMA_B) / MAX_CHANNEL;
  }
  return values;
};

const luminanceOf = ([r, g, b]: Rgb) => (r * LUMA_R + g * LUMA_G + b * LUMA_B) / MAX_CHANNEL;

const readCssColor = (scratch: CanvasRenderingContext2D, value: string): Rgb => {
  scratch.clearRect(0, 0, 1, 1);
  scratch.fillStyle = value;
  scratch.fillRect(0, 0, 1, 1);
  const { data } = scratch.getImageData(0, 0, 1, 1);
  return [data[0], data[1], data[2]];
};

const readPalette = (scratch: CanvasRenderingContext2D): Rgb[] => {
  const styles = getComputedStyle(document.documentElement);
  return PALETTE.map(({ token, fallback }) => {
    const value = styles.getPropertyValue(token).trim() || fallback;
    return readCssColor(scratch, value);
  }).sort((a, b) => luminanceOf(a) - luminanceOf(b));
};

const quantiseBayer = (values: Float32Array, gridWidth: number, levels: number) => {
  const steps = levels - 1;
  const quantised = new Uint8Array(values.length);
  for (let index = 0; index < values.length; index++) {
    const x = index % gridWidth;
    const y = Math.floor(index / gridWidth);
    const cell = BAYER_MATRIX[(y % BAYER_SIZE) * BAYER_SIZE + (x % BAYER_SIZE)];
    const value = values[index] + ((cell + 0.5) / BAYER_DIVISOR - 0.5) / steps;
    quantised[index] = Math.max(0, Math.min(steps, Math.round(value * steps)));
  }
  return quantised;
};

const applyRamp = (data: Uint8ClampedArray, quantised: Uint8Array, ramp: Rgb[]) => {
  for (let index = 0; index < quantised.length; index++) {
    const offset = index * CHANNELS;
    const tone = ramp[quantised[index]];
    data[offset] = tone[0];
    data[offset + 1] = tone[1];
    data[offset + 2] = tone[2];
  }
};

const sourceCrop = (
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number,
  fit: Fit,
  position: Position,
) => {
  if (fit === "fill") return { sx: 0, sy: 0, sw: srcW, sh: srcH };
  const srcAspect = srcW / srcH;
  const dstAspect = dstW / dstH;
  if (srcAspect > dstAspect) {
    const sw = srcH * dstAspect;
    return { sx: (srcW - sw) / 2, sy: 0, sw, sh: srcH };
  }
  const sh = srcW / dstAspect;
  const sy = position === "top" ? 0 : (srcH - sh) / 2;
  return { sx: 0, sy, sw: srcW, sh };
};

/**
 * Bayer dither over an existing image. 2px blocks, ink / muted / paper.
 * Hidden until hover, then fades across the whole image. The wrapper uses the same zoom as the photo.
 */
export function DitherOverlay({
  src,
  fit = "fill",
  position = "center",
}: {
  src: string;
  fit?: Fit;
  position?: Position;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    const grid = document.createElement("canvas");
    const gridContext = grid.getContext("2d", { willReadFrequently: true });
    const scratchCanvas = document.createElement("canvas");
    scratchCanvas.width = 1;
    scratchCanvas.height = 1;
    const scratch = scratchCanvas.getContext("2d", { willReadFrequently: true });
    if (!context || !gridContext || !scratch) return;
    const ramp = readPalette(scratch);

    let cancelled = false;
    readyRef.current = false;
    setReady(false);

    const paint = (source: CanvasImageSource, srcW: number, srcH: number) => {
      if (cancelled) return;
      const width = root.clientWidth;
      const height = root.clientHeight;
      if (width < 1 || height < 1 || srcW < 1 || srcH < 1) return;

      const gridWidth = Math.max(1, Math.round(width / PIXEL_SIZE));
      const gridHeight = Math.max(1, Math.round(height / PIXEL_SIZE));
      grid.width = gridWidth;
      grid.height = gridHeight;
      gridContext.imageSmoothingEnabled = true;
      gridContext.clearRect(0, 0, gridWidth, gridHeight);

      const crop = sourceCrop(srcW, srcH, gridWidth, gridHeight, fit, position);
      gridContext.drawImage(source, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, gridWidth, gridHeight);

      let frame: ImageData;
      try {
        frame = gridContext.getImageData(0, 0, gridWidth, gridHeight);
      } catch {
        return;
      }
      applyRamp(frame.data, quantiseBayer(readLuminance(frame.data), gridWidth, ramp.length), ramp);
      gridContext.putImageData(frame, 0, 0);

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.imageSmoothingEnabled = false;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(grid, 0, 0, canvas.width, canvas.height);

      if (!readyRef.current) {
        readyRef.current = true;
        setReady(true);
      }
    };

    const video = isWorkVideo(src) ? root.parentElement?.querySelector("video") : null;
    const image = isWorkVideo(src) ? null : new Image();

    const paintCurrent = () => {
      if (video && video.readyState >= 2 && video.videoWidth) {
        paint(video, video.videoWidth, video.videoHeight);
        return;
      }
      if (image?.complete && image.naturalWidth) {
        paint(image, image.naturalWidth, image.naturalHeight);
      }
    };

    if (image) {
      image.decoding = "async";
      image.onload = () => paintCurrent();
      image.src = src;
    }

    video?.addEventListener("loadeddata", paintCurrent);
    const link = root.closest("a");
    const onEnter = () => {
      if (video) paintCurrent();
    };
    link?.addEventListener("mouseenter", onEnter);

    const observer = new ResizeObserver(() => paintCurrent());
    observer.observe(root);
    paintCurrent();

    return () => {
      cancelled = true;
      readyRef.current = false;
      observer.disconnect();
      video?.removeEventListener("loadeddata", paintCurrent);
      link?.removeEventListener("mouseenter", onEnter);
      if (image) {
        image.onload = null;
        image.src = "";
      }
      grid.width = 0;
      grid.height = 0;
      scratchCanvas.width = 0;
      scratchCanvas.height = 0;
    };
  }, [fit, position, src]);

  return (
    <div ref={rootRef} aria-hidden="true" className={cn("pointer-events-none absolute inset-0", WORK_THUMB_HOVER_ZOOM)}>
      <canvas
        ref={canvasRef}
        className={cn(
          "h-full w-full opacity-0",
          ready &&
            "transition-opacity duration-[500ms] ease-in group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none",
        )}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
