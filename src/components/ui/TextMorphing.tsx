"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type TextMorphingProps = {
  /** Phrases to cycle. Needs at least two for a morph. */
  texts: readonly string[];
  /** Layout and type classes. Font, size, weight, and color come from here. */
  className?: string;
  /** Length of each morph crossfade, in seconds. */
  morphDuration?: number;
  /** Hold time on the settled phrase before the next morph, in seconds. */
  cooldownDuration?: number;
  /** Pause the loop. */
  paused?: boolean;
};

const DEFAULT_MORPH = 1.5;
const DEFAULT_COOLDOWN = 0.5;

/**
 * Blur crossfade between phrases, with an SVG threshold so the dissolve stays gooey.
 * Blur distances are scaled from the element's font size so a label and a headline
 * share the same dissolve instead of a fixed 100px blur.
 */
export function TextMorphing({
  texts,
  className,
  morphDuration = DEFAULT_MORPH,
  cooldownDuration = DEFAULT_COOLDOWN,
  paused = false,
}: TextMorphingProps) {
  const reactId = useId().replace(/:/g, "");
  const filterId = `text-morph-${reactId}`;

  const rootRef = useRef<HTMLSpanElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(0);
  const inViewRef = useRef(true);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const phrases = useMemo(() => texts.map((text) => text.trim()).filter(Boolean), [texts]);
  const morphTime = Math.max(0.2, morphDuration);
  const cooldownTime = Math.max(0, cooldownDuration);
  const canMorph = phrases.length >= 2;

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    textIndexRef.current = 0;
    morphRef.current = 0;
    cooldownRef.current = 0;
  }, [phrases]);

  useEffect(() => {
    if (reduceMotion || !canMorph) return;

    const showSettled = () => {
      const el1 = text1Ref.current;
      const el2 = text2Ref.current;
      const root = rootRef.current;
      if (!el1 || !el2 || !root) return;
      morphRef.current = 0;
      el1.textContent = phrases[textIndexRef.current % phrases.length] ?? "";
      el1.style.filter = "none";
      el1.style.opacity = "100%";
      el2.style.filter = "none";
      el2.style.opacity = "0%";
      root.style.filter = "none";
    };

    const setStyles = (fraction: number) => {
      const el1 = text1Ref.current;
      const el2 = text2Ref.current;
      const root = rootRef.current;
      if (!el1 || !el2 || !root) return;

      const fontSize = Number.parseFloat(getComputedStyle(el1).fontSize) || 12;
      const scale = fontSize / 64;
      const blurFor = (value: number) => `${Math.min(8 / value - 8, 100) * scale}px`;

      const f = Math.max(fraction, 0.0001);
      const inv = Math.max(1 - fraction, 0.0001);

      el2.style.filter = `blur(${blurFor(f)})`;
      el2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      el1.style.filter = `blur(${blurFor(inv)})`;
      el1.style.opacity = `${Math.pow(1 - fraction, 0.4) * 100}%`;

      el1.textContent = phrases[textIndexRef.current % phrases.length] ?? "";
      el2.textContent = phrases[(textIndexRef.current + 1) % phrases.length] ?? "";
      root.style.filter = `url(#${filterId}) blur(0.6px)`;
    };

    const doMorph = () => {
      morphRef.current -= cooldownRef.current;
      cooldownRef.current = 0;

      let fraction = morphRef.current / morphTime;
      if (fraction > 1) {
        cooldownRef.current = cooldownTime;
        fraction = 1;
      }

      setStyles(fraction);

      if (fraction === 1) textIndexRef.current += 1;
    };

    let raf = 0;
    timeRef.current = performance.now();
    cooldownRef.current = cooldownTime;
    showSettled();

    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);

      if (
        pausedRef.current ||
        !inViewRef.current ||
        document.visibilityState === "hidden"
      ) {
        timeRef.current = now;
        return;
      }

      const dt = Math.min((now - timeRef.current) / 1000, 0.05);
      timeRef.current = now;
      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else showSettled();
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [canMorph, cooldownTime, filterId, morphTime, phrases, reduceMotion]);

  const positioned = /\b(?:absolute|fixed|relative|sticky)\b/.test(className ?? "");

  if (reduceMotion || !canMorph) {
    return <span className={cn("w-fit whitespace-nowrap", className)}>{phrases[0] ?? ""}</span>;
  }

  return (
    <span
      ref={rootRef}
      className={cn("w-fit whitespace-nowrap", !positioned && "relative", className)}
    >
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden className="invisible grid">
        {phrases.map((phrase, index) => (
          <span key={index} className="col-start-1 row-start-1 whitespace-nowrap">
            {phrase}
          </span>
        ))}
      </span>
      <span
        ref={text1Ref}
        aria-hidden
        className="absolute top-0 left-0 whitespace-nowrap"
      >
        {phrases[0]}
      </span>
      <span ref={text2Ref} aria-hidden className="absolute top-0 left-0 whitespace-nowrap opacity-0" />
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id={filterId} x="-50%" y="-400%" width="200%" height="900%">
            {/* Bias is softer than the large-type demo so a label-sized blur still dissolves. */}
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -48"
            />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
