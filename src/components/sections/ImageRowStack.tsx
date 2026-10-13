import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** 24px between row frames. Frame padding stays inside the frame and does not add to this gap. */
export function ImageRowStack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-col gap-24", className)}>
      {children}
    </div>
  );
}
