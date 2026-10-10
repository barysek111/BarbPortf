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
        "fixed inset-x-0 top-0 z-nav mx-auto w-full max-w-(--container-section)",
        open
          ? "min-h-svh bg-paper text-ink"
          : "text-ink tablet:text-paper tablet:mix-blend-difference",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "relative z-nav overflow-clip p-12",
          open ? "mix-blend-normal" : "mix-blend-normal tablet:mix-blend-exclusion",
        )}
      >
        <div
          className={cn(
            "flex flex-col items-stretch",
            open ? "gap-0" : "gap-24",
            "tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-12",
          )}
        >
          <div className="flex w-full items-center justify-between pb-12 tablet:w-auto tablet:min-w-0 tablet:flex-1 tablet:pb-0">
            <Link href="/" aria-label={`${site.name} home`} onClick={close} className="type-stat whitespace-nowrap">
              {site.name}
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
              "tablet:grid tablet:min-w-0 tablet:flex-1 tablet:grid-cols-3 tablet:items-center tablet:justify-items-start tablet:gap-12 tablet:py-0",
            )}
          >
            <div className={cn("flex flex-col items-start justify-center gap-2", open && "w-full")}>
              <NavLink
                href="/works"
                label="Works"
                count={projects.length}
                active={
                  pathname === "/works" || projects.some((project) => pathname === `/${project.slug}`)
                }
                open={open}
                onClick={close}
              />
              <NavLink href="/about" label="About" active={pathname === "/about"} open={open} onClick={close} />
            </div>
            <NavLink
              href="/playground"
              label="Playground"
              active={pathname === "/playground"}
              open={open}
              onClick={close}
            />
            <NavClock className="hidden tablet:block" />
          </div>
        </div>
      </nav>
    </header>
  );
}
