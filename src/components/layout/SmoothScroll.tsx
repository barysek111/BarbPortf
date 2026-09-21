"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

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
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    observe();
    const raf = requestAnimationFrame(observe);
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
