"use client";

import { useMotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, type RefObject } from "react";
import {
  NEXT_PROJECT_CANVAS_SCALED_FIELD_TOP,
  NEXT_PROJECT_CANVAS_TILE_PERIOD,
  NEXT_PROJECT_CANVAS_TILES_BELOW,
} from "@/content/next-project-canvas-layout";

/** Scatter field — slower than page scroll, vertical only while scrolling. */
const FIELD_PARALLAX_Y = 0.05;

/** CSS ease-in (cubic): slow start, faster finish over the section scroll range. */
function easeInCubic(t: number) {
  return t * t * t;
}

/** Scroll through repeated tiles (see `getTiledNextProjectCanvasFrames`). */
const SCROLL_VERTICAL_TRAVEL =
  NEXT_PROJECT_CANVAS_TILE_PERIOD * (NEXT_PROJECT_CANVAS_TILES_BELOW + 1) * FIELD_PARALLAX_Y;

const FIELD_START_Y = NEXT_PROJECT_CANVAS_SCALED_FIELD_TOP - 120;
const FIELD_START_X = 0;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Scroll-driven parallax on the scatter field (vertical only). */
export function useNextProjectCanvasPan(
  fieldKey: string,
  sectionRef: RefObject<HTMLElement | null>,
) {
  const scrollPanX = useMotionValue(FIELD_START_X);
  const scrollPanY = useMotionValue(FIELD_START_Y);

  const updateScrollPan = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const vh = window.innerHeight;
    const range = section.offsetHeight + vh;
    if (range <= 0) return;

    const top = section.getBoundingClientRect().top;
    const linear = clamp((vh - top) / range, 0, 1);
    const progress = easeInCubic(linear);

    scrollPanX.set(FIELD_START_X);
    scrollPanY.set(FIELD_START_Y - progress * SCROLL_VERTICAL_TRAVEL);
  }, [scrollPanX, scrollPanY, sectionRef]);

  useLenis(updateScrollPan);

  useEffect(() => {
    updateScrollPan();
    window.addEventListener("resize", updateScrollPan);
    return () => window.removeEventListener("resize", updateScrollPan);
  }, [fieldKey, updateScrollPan]);

  useEffect(() => {
    updateScrollPan();
  }, [fieldKey, updateScrollPan]);

  return {
    scrollPanX,
    scrollPanY,
  };
}
