import Link from "next/link";
import { cn } from "@/lib/cn";

export function BracketButton({
  href,
  children,
  className,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
}: {
  href?: string;
  children: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
}) {
  const inner = (
    <>
      <span aria-hidden="true">[</span>
      <span className="flex h-[1.3em] flex-col overflow-hidden">
        <span className="label-roll group-hover:-translate-y-full group-focus-visible:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="label-roll group-hover:-translate-y-full group-focus-visible:-translate-y-full"
        >
          {children}
        </span>
      </span>
      <span aria-hidden="true">]</span>
    </>
  );

  const cls = cn(
    "group type-label inline-flex cursor-pointer items-center gap-hairline overflow-clip border-0 bg-transparent p-0 text-current",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel} aria-expanded={ariaExpanded}>
      {inner}
    </button>
  );
}
