import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** 24px between row frames. Frame padding stays inside the frame and does not add to this gap. */
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
