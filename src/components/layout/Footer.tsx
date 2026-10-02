"use client";

import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const INK_WHEN_VISIBLE = 0.5;

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [ink, setInk] = useState(false);

  const syncInk = useCallback(() => {
    const el = footerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.height <= 0) return;
    const visible = Math.max(
      0,
      Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0),
    );
    setInk(visible / r.height >= INK_WHEN_VISIBLE);
  }, []);

  useLayoutEffect(() => {
    syncInk();
    window.addEventListener("resize", syncInk);
    return () => window.removeEventListener("resize", syncInk);
  }, [syncInk]);

  useLenis(syncInk);

  return (
    <div className="-mt-96 flex w-full flex-col">
      <div className="h-96 w-full shrink-0 bg-paper" aria-hidden />

      <footer
        ref={footerRef}
        className={cn(
          "footer-bleed relative z-[var(--z-index-stack)] transition-colors duration-1000 ease-[cubic-bezier(0.45,0,0.55,1)] motion-reduce:transition-none",
          ink ? "bg-ink text-paper" : "bg-paper text-ink",
        )}
      >
        <div className="section-wrap flex flex-col gap-44 pt-104 pb-44">
          <div className="grid grid-cols-1 items-start gap-24 tablet:grid-cols-2 tablet:gap-12">
            <div className="order-2 flex min-w-0 flex-col items-start gap-2 text-left tablet:order-2 tablet:items-end tablet:text-right desktop:order-1 desktop:items-start desktop:text-left">
              <p className="type-label">for all enquiries please contact</p>
              <Button href={`mailto:${site.email}`}>{site.email}</Button>
            </div>

            <div className="order-1 flex flex-col items-start gap-2 tablet:order-1 desktop:order-2 desktop:items-end">
              <Button href={site.links.resume} target="_blank" rel="noreferrer">
                view resume
              </Button>
              <Button href={site.links.linkedin} target="_blank" rel="noreferrer">
                linkedin
              </Button>
            </div>
          </div>

          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="block w-full max-w-none"
          >
            <span className="footer-wordmark-mobile tablet:hidden">
              <span className="footer-wordmark-mobile-line">BARB</span>
              <span className="footer-wordmark-mobile-line">G.</span>
            </span>
            <span className="relative hidden aspect-[1445/217] w-full tablet:block">
              <Image
                src="/images/shared/wordmark.svg"
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                className={cn(
                  "object-contain object-left transition-[filter] duration-1000 ease-[cubic-bezier(0.45,0,0.55,1)] motion-reduce:transition-none",
                  ink && "invert",
                )}
              />
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
