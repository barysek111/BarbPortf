"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

function revealVisibleAppears() {
  document.querySelectorAll("[data-appear]:not(.is-in)").forEach((node) => {
    const r = node.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) {
      node.classList.add("is-in");
    }
  });
}

/** Lenis + iOS Safari often miss IntersectionObserver; flush on scroll. */
function AppearOnScroll() {
  useLenis(revealVisibleAppears);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const revealIfVisible = (node: Element) => {
      const r = node.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        node.classList.add("is-in");
        return true;
      }
      return false;
    };
    const observe = () => {
      const nodes = document.querySelectorAll("[data-appear]:not(.is-in)");
      nodes.forEach((node) => {
        if (!revealIfVisible(node)) io.observe(node);
      });
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    const flush = () => {
      observe();
      revealVisibleAppears();
    };
    // Defer until after hydration — direct classList updates must not run during React hydrate.
    const mo = new MutationObserver(() => {
      observe();
    });
    const t1 = window.setTimeout(flush, 0);
    const t2 = window.setTimeout(flush, 150);
    const t3 = window.setTimeout(flush, 600);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <AppearOnScroll />
      {children}
    </ReactLenis>
  );
}
