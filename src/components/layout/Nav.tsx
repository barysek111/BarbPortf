"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/Button";
import { NavClock } from "@/components/layout/NavClock";
import { global } from "@/copy-database/global";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";

const MENU_MS = 400;
const MENU_EASE = "cubic-bezier(0.45, 0, 0.55, 1)";

export function Nav({ path }: { path?: string }) {
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const desired = useRef(false);
  const closeTimer = useRef(0);
  const openFrame = useRef(0);
  const livePath = usePathname();
  const pathname = path ?? livePath;

  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const openMenu = useCallback(() => {
    desired.current = true;
    window.clearTimeout(closeTimer.current);
    window.cancelAnimationFrame(openFrame.current);
    setPresent(true);
    if (reducedMotion()) {
      setOpen(true);
      return;
    }
    openFrame.current = requestAnimationFrame(() => {
      openFrame.current = requestAnimationFrame(() => {
        if (desired.current) setOpen(true);
      });
    });
  }, []);

  const closeMenu = useCallback(() => {
    desired.current = false;
    window.cancelAnimationFrame(openFrame.current);
    setOpen(false);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPresent(false), reducedMotion() ? 0 : MENU_MS);
  }, []);

  const closeRef = useRef(closeMenu);
  closeRef.current = closeMenu;

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimer.current);
      window.cancelAnimationFrame(openFrame.current);
    };
  }, []);

  const pathRef = useRef(livePath);
  useEffect(() => {
    if (pathRef.current === livePath) return;
    pathRef.current = livePath;
    closeRef.current();
  }, [livePath]);

  useEffect(() => {
    document.body.style.overflow = present ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [present]);

  return (
    <>
    <div
      aria-hidden
      data-nav-overlay=""
      className={cn(
        "pointer-events-none fixed inset-0 z-nav bg-paper tablet:hidden",
        "transition-opacity duration-[400ms] ease-[cubic-bezier(0.45,0,0.55,1)] motion-reduce:transition-none",
        open ? "opacity-100" : "opacity-0",
      )}
    />
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-nav w-full mix-blend-difference text-paper",
        present && "below-tablet:pointer-events-auto below-tablet:min-h-svh",
      )}
    >
      <nav aria-label={global.nav.ariaLabel} className="page-inset relative overflow-clip pt-24 pb-12">
        <div className="section-wrap w-full">
          <div
            className={cn(
              "flex flex-col items-stretch",
              present ? "gap-0" : "gap-24",
              "tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-12",
            )}
          >
          <div
            className={cn(
              "flex w-full items-center justify-between tablet:w-auto tablet:min-w-0 tablet:flex-1 tablet:self-center",
              present && "pb-12",
            )}
          >
            <Link
              href="/"
              aria-label={`${global.site.name} ${global.nav.homeLinkSuffix}`}
              onClick={closeMenu}
              className="type-h3 pointer-events-auto relative z-10 self-center whitespace-nowrap"
            >
              <span className="tablet:hidden">{global.nav.nameShort}</span>
              <span className="hidden tablet:inline">{global.site.name}</span>
            </Link>
            <Button
              type="button"
              className="pointer-events-auto relative z-lift touch-manipulation whitespace-nowrap tablet:hidden"
              aria-label={present ? global.nav.closeMenu : global.nav.openMenu}
              aria-expanded={present}
              onClick={() => (open ? closeMenu() : openMenu())}
            >
              {present ? global.nav.close : global.nav.menu}
            </Button>
          </div>

          <div
            className={cn(
              "pointer-events-auto flex-col items-start justify-start gap-0 py-56",
              "transition-opacity duration-[400ms] ease-[cubic-bezier(0.45,0,0.55,1)] motion-reduce:transition-none",
              present ? "flex" : "hidden",
              open ? "opacity-100" : "opacity-0",
              "tablet:grid tablet:min-w-0 tablet:flex-1 tablet:grid-cols-3 tablet:grid-rows-[1.3em_1.3em] tablet:items-center tablet:justify-items-start tablet:gap-x-12 tablet:gap-y-2 tablet:py-0 tablet:opacity-100 tablet:transition-none",
            )}
          >
            <NavLink
              href="/"
              label={global.nav.works}
              count={projects.length}
              active={
                pathname === "/" || projects.some((project) => pathname === `/${project.slug}`)
              }
              open={present}
              onClick={closeMenu}
              className={cn(
                "tablet:col-start-1 tablet:row-start-1 tablet:h-[1.3em]",
                present && "below-tablet:mb-2 w-full",
              )}
            />
            <NavLink
              href="/playground"
              label={global.nav.playground}
              active={pathname === "/playground"}
              open={present}
              onClick={closeMenu}
              className={cn("tablet:col-start-1 tablet:row-start-2 tablet:h-[1.3em]", present && "w-full")}
            />
            <NavLink
              href="/about"
              label={global.nav.about}
              active={pathname === "/about"}
              open={present}
              onClick={closeMenu}
              className="tablet:col-start-2 tablet:row-start-1 tablet:h-[1.3em]"
            />
            <NavClock className="hidden tablet:contents" />
          </div>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}
