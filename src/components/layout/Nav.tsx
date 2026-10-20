"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { NavClock } from "@/components/layout/NavClock";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";

const NAV_TONE_MS = 700;

/** Paper at t=1, ink at t=0. Concrete rgb so the color transition can interpolate. */
function navInkColor(cover: number) {
  const t = Math.min(1, Math.max(0, cover));
  const v = Math.round(0x1c + (0xff - 0x1c) * t);
  return `rgb(${v} ${v} ${v})`;
}

export function Nav({ tone = "paper", path }: { tone?: "paper" | "ink"; path?: string }) {
  const [open, setOpen] = useState(false);
  const livePath = usePathname();
  const pathname = path ?? livePath;
  const inkTone = tone === "ink";
  const heroInk = pathname === "/" && !inkTone;
  const headerRef = useRef<HTMLElement>(null);
  const coverRef = useRef(heroInk ? 1 : 0);
  const blendTimer = useRef(0);
  const [cover, setCover] = useState(heroInk ? 1 : 0);
  const [blendOn, setBlendOn] = useState(!heroInk);

  const syncHero = useCallback(() => {
    if (!heroInk) return;
    const hero = document.querySelector("[data-nav-ink]");
    const header = headerRef.current;
    if (!hero || !header) return;
    const navBottom = header.getBoundingClientRect().bottom;
    const heroBottom = hero.getBoundingClientRect().bottom;
    const next =
      navBottom <= 0 ? 0 : heroBottom >= navBottom ? 1 : Math.min(1, Math.max(0, heroBottom / navBottom));
    if (Math.abs(coverRef.current - next) > 0.01) {
      coverRef.current = next;
      setCover(next);
    }
    window.clearTimeout(blendTimer.current);
    if (next > 0) {
      setBlendOn(false);
      return;
    }
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : NAV_TONE_MS;
    blendTimer.current = window.setTimeout(() => setBlendOn(true), delay);
  }, [heroInk]);

  useLayoutEffect(() => {
    if (!heroInk) {
      coverRef.current = 0;
      setCover(0);
      setBlendOn(true);
      return;
    }
    setBlendOn(false);
    syncHero();
    window.addEventListener("resize", syncHero);
    window.addEventListener("scroll", syncHero, { passive: true });
    return () => {
      window.removeEventListener("resize", syncHero);
      window.removeEventListener("scroll", syncHero);
      window.clearTimeout(blendTimer.current);
    };
  }, [heroInk, syncHero]);

  useLenis(syncHero);

  const overHero = heroInk && !blendOn;

  useEffect(() => {
    setOpen(false);
  }, [livePath]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-nav w-full",
        overHero &&
          "transition-colors duration-700 ease-[cubic-bezier(0.45,0,0.55,1)] motion-reduce:transition-none",
        open
          ? cn(
              "pointer-events-auto min-h-svh",
              inkTone ? "bg-ink text-paper" : "bg-paper text-ink",
            )
          : inkTone
            ? "pointer-events-none text-paper"
            : overHero
              ? "pointer-events-none"
              : "pointer-events-none text-ink tablet:text-paper tablet:mix-blend-difference",
      )}
      style={overHero && !open ? { color: navInkColor(cover) } : undefined}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "page-inset relative z-nav overflow-clip py-12",
          open || inkTone || overHero ? "mix-blend-normal" : "mix-blend-normal tablet:mix-blend-exclusion",
        )}
      >
        <div className="section-wrap w-full">
          <div
            className={cn(
              "flex flex-col items-stretch",
              open ? "gap-0" : "gap-24",
              "tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-12",
            )}
          >
          <div
            className={cn(
              "flex w-full items-center justify-between tablet:w-auto tablet:min-w-0 tablet:flex-1 tablet:self-center",
              open && "pb-12",
            )}
          >
            <Link
              href="/"
              aria-label={`${site.name} home`}
              onClick={close}
              className="pointer-events-auto relative z-10 inline-block h-[28px] max-w-full shrink-0 self-center bg-current [mask-image:url('/images/shared/logo.svg')] [mask-position:left_center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/images/shared/logo.svg')] [-webkit-mask-position:left_center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
              style={{ aspectRatio: "3733 / 300" }}
            />
            <Button
              type="button"
              className="pointer-events-auto relative z-lift touch-manipulation whitespace-nowrap tablet:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "close" : "menu"}
            </Button>
          </div>

          <div
            className={cn(
              "pointer-events-auto flex-col items-start justify-start gap-0 py-56",
              open ? "flex" : "hidden",
              "tablet:grid tablet:min-w-0 tablet:flex-1 tablet:grid-cols-3 tablet:grid-rows-[1.3em_1.3em] tablet:items-center tablet:justify-items-start tablet:gap-x-12 tablet:gap-y-2 tablet:py-0",
            )}
          >
            <NavLink
              href="/"
              label="Works"
              count={projects.length}
              active={
                pathname === "/" || projects.some((project) => pathname === `/${project.slug}`)
              }
              open={open}
              onClick={close}
              className={cn(
                "tablet:col-start-1 tablet:row-start-1 tablet:h-[1.3em]",
                open && "below-tablet:mb-2 w-full",
              )}
            />
            <NavLink
              href="/playground"
              label="Playground"
              active={pathname === "/playground"}
              open={open}
              onClick={close}
              className={cn("tablet:col-start-1 tablet:row-start-2 tablet:h-[1.3em]", open && "w-full")}
            />
            <NavLink
              href="/about"
              label="About"
              active={pathname === "/about"}
              open={open}
              onClick={close}
              className="tablet:col-start-2 tablet:row-start-1 tablet:h-[1.3em]"
            />
            <NavClock className="hidden tablet:contents" />
          </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
