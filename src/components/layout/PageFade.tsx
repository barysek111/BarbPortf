"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const FADE_MS = 400;
const FADE_EASE = "cubic-bezier(0.45, 0, 0.55, 1)";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Freeze the current page over the viewport so the next page can replace it underneath. */
function takeSnapshot() {
  if (prefersReducedMotion()) return;
  if (document.getElementById("page-fade-out")) return;
  const source = document.querySelector("[data-page-fade]");
  if (!(source instanceof HTMLElement)) return;

  const rect = source.getBoundingClientRect();
  const ink = document.documentElement.classList.contains("theme-ink");
  const overlay = document.createElement("div");
  overlay.id = "page-fade-out";
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.zIndex = "7";
  overlay.style.overflow = "hidden";
  overlay.style.pointerEvents = "auto";
  overlay.style.background = ink ? "var(--color-ink)" : "var(--color-paper)";
  overlay.style.color = getComputedStyle(document.body).color;
  overlay.style.opacity = "1";

  const clone = source.cloneNode(true);
  if (!(clone instanceof HTMLElement)) return;
  clone.style.position = "absolute";
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.margin = "0";
  overlay.appendChild(clone);
  document.body.appendChild(overlay);
}

function fadeSnapshot(onDone: () => void) {
  const overlay = document.getElementById("page-fade-out");
  const live = document.querySelector("[data-page-fade]");
  if (!overlay) {
    if (live instanceof HTMLElement) {
      live.style.opacity = "";
      live.style.transition = "";
    }
    onDone();
    return;
  }
  if (live instanceof HTMLElement) {
    live.style.transition = "none";
    live.style.opacity = "0";
  }
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    overlay.remove();
    onDone();
    if (!(live instanceof HTMLElement)) return;
    requestAnimationFrame(() => {
      live.style.transition = `opacity ${FADE_MS}ms ${FADE_EASE}`;
      live.style.opacity = "1";
      live.addEventListener(
        "transitionend",
        (event) => {
          if (event.target !== live || event.propertyName !== "opacity") return;
          live.style.transition = "";
          live.style.opacity = "";
        },
        { once: true },
      );
    });
  };
  const timeout = window.setTimeout(finish, FADE_MS + 80);
  overlay.addEventListener("transitionend", (event) => {
    if (event.target !== overlay || event.propertyName !== "opacity") return;
    window.clearTimeout(timeout);
    finish();
  });
  requestAnimationFrame(() => {
    overlay.style.transition = `opacity ${FADE_MS}ms ${FADE_EASE}`;
    overlay.style.opacity = "0";
  });
}

/**
 * Fades the outgoing page out over the incoming one.
 * Next swaps the page immediately, so the outgoing view is a DOM snapshot taken on the click.
 */
export function PageFade({
  children,
  onShow,
}: {
  children: ReactNode;
  onShow: (path: string) => void;
}) {
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const onShowRef = useRef(onShow);
  lenisRef.current = lenis;
  onShowRef.current = onShow;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;
      takeSnapshot();
    };

    const onPop = () => takeSnapshot();

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useLayoutEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    fadeSnapshot(() => onShowRef.current(pathname));
  }, [pathname]);

  return (
    <div data-page-fade="" className="w-full">
      {children}
    </div>
  );
}
