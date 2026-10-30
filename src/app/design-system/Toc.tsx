"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

export function Toc({
  groups,
  rowClassName,
}: {
  groups: { label: string; links: { id: string; label: string }[] }[];
  rowClassName: string;
}) {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!anchor.closest("nav[aria-label='Contents']")) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      event.stopPropagation();
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else target.scrollIntoView();
      const hash = `#${id}`;
      if (location.hash !== hash) history.pushState(history.state, "", hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return (
    <nav aria-label="Contents" className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.label} className={rowClassName}>
          <span className="text-muted">{group.label}</span>
          {group.links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="underline">
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}
