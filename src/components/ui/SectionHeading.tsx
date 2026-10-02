import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Level = "h1" | "h2";
type Appear = "20" | "30" | "60";

/** Section title (`type-h2` + appear). Pair with `gap-56` on the parent stack for headline-to-content rhythm. */
export function SectionHeading({
  as: Tag = "h2",
  appear = "60",
  children,
  className,
}: {
  as?: Level;
  appear?: Appear;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={cn("type-h2 appear", className)} data-appear={appear}>
      <span>{children}</span>
    </Tag>
  );
}
