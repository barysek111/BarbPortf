"use client";

import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { PageFade } from "@/components/layout/PageFade";
import { SiteCursor } from "@/components/layout/SiteCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [navPath, setNavPath] = useState(pathname);
  const onShow = useCallback((path: string) => setNavPath(path), []);
  const ink = pathname === "/playground";

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-ink", ink);
    if (!ink) {
      document.getElementById("page-theme-ink")?.remove();
      document.querySelector('style[data-href="page-theme-ink"]')?.remove();
    }
    return () => root.classList.remove("theme-ink");
  }, [ink]);

  return (
    <>
      {ink ? (
        <style id="page-theme-ink">{`html, body { background: var(--color-ink); color: var(--color-paper); }`}</style>
      ) : null}
      <SiteCursor />
      <SmoothScroll>
        <Nav tone={navPath === "/playground" ? "ink" : "paper"} path={navPath} />
        <div className="page-inset">
          <PageFade onShow={onShow}>
            <main className="page-main">
              {children}
              <Footer tone={ink ? "ink" : "paper"} />
            </main>
          </PageFade>
        </div>
      </SmoothScroll>
    </>
  );
}
