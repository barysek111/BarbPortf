"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
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
        // The source inverts the bar against whatever is behind it.
        open ? "min-h-svh bg-paper text-ink" : "text-paper mix-blend-difference"
      )}
    >
      <nav
        aria-label="Primary"
        className={cn("overflow-clip p-gutter", open ? "mix-blend-normal" : "mix-blend-exclusion")}
      >
        <div
          className={cn(
            "flex flex-col items-stretch",
            open ? "gap-0" : "gap-24",
            "desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-gutter"
          )}
        >
          <div className="flex w-full items-center justify-between pb-gutter desktop:w-auto desktop:min-w-0 desktop:flex-1 desktop:pb-0">
            <Link href="/" aria-label={`${site.name} home`} onClick={close} className="type-stat whitespace-nowrap">
              {site.name}
            </Link>
            <BracketButton
              type="button"
              className="whitespace-nowrap desktop:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "close" : "menu"}
            </BracketButton>
          </div>

          <div
            className={cn(
              "flex-col items-start justify-start gap-0 py-header",
              open ? "flex" : "hidden",
              "desktop:flex desktop:min-w-0 desktop:flex-1 desktop:flex-row desktop:items-center desktop:justify-between desktop:py-0"
            )}
          >
            <div className={cn("flex flex-col items-start justify-center gap-0", open && "w-full")}>
              <NavItem href="/" label="Home" active={pathname === "/"} open={open} onClick={close} />
              <NavItem
                href="/works"
                label="Works"
                count={projects.length}
                active={
                  pathname === "/works" ||
                  projects.some((project) => pathname === `/${project.slug}`)
                }
                open={open}
                onClick={close}
              />
            </div>
            <div className={cn("flex flex-col items-start justify-center gap-0", open && "w-full")}>
              <NavItem href="/about" label="About" active={pathname === "/about"} open={open} onClick={close} />
            </div>
            <NavClock className="hidden desktop:block" />
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavItem({
  href,
  label,
  count,
  active,
  open,
  onClick,
}: {
  href: string;
  label: string;
  count?: number;
  active?: boolean;
  open?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex w-max items-center leading-[1.3em]",
        count != null && "gap-hairline",
        open ? "type-display h-[58px]" : "type-label"
      )}
    >
      {!open ? (
        <span
          aria-hidden="true"
          className={cn(
            "mark-leader transition-opacity duration-200",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          )}
        />
      ) : null}
      <span>{label}</span>
      {count != null ? <span>[{count}]</span> : null}
    </Link>
  );
}
