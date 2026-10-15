import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** 24px between stacked image rows below tablet; 44px from 810px. Frame padding stays inside the frame and does not add to this gap. */
export function ImageRowStack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full grid-cols-1 gap-24 tablet:gap-44", className)}>
      {children}
    </div>
  );
}
