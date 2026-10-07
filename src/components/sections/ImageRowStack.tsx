import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Stacked case-study media rows: gap-24 between rows; last row gets pb-96 when not using site-main gap-96. */
export function ImageRowStack({
  children,
  className,
  /** Set false when parent already separates blocks with gap-96 (e.g. ChapterBlock on case studies). */
  padLast = true,
}: {
  children: ReactNode;
  className?: string;
  padLast?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-24",
        padLast && "[&>[data-name='Section - Image Row']:last-child]:pb-96",
        className,
      )}
    >
      {children}
    </div>
  );
}
