"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { NavClock } from "@/components/layout/NavClock";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-nav w-full",
        open
          ? "min-h-svh bg-paper text-ink"
          : "text-ink tablet:text-paper tablet:mix-blend-difference",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "page-inset relative z-nav overflow-clip py-12",
          open ? "mix-blend-normal" : "mix-blend-normal tablet:mix-blend-exclusion",
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
            <Link href="/" aria-label={`${site.name} home`} onClick={close} className="flex w-max min-w-0 max-w-full items-center self-center">
              <span
                aria-hidden
                className="block max-h-[28px] max-w-full bg-current [mask-image:url('/images/shared/logo.svg')] [mask-position:left_center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:url('/images/shared/logo.svg')] [-webkit-mask-position:left_center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
                style={{ height: "28px", aspectRatio: "3733 / 300" }}
              />
            </Link>
            <Button
              type="button"
              className="relative z-lift touch-manipulation whitespace-nowrap tablet:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "close" : "menu"}
            </Button>
          </div>

          <div
            className={cn(
              "flex-col items-start justify-start gap-0 py-56",
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
