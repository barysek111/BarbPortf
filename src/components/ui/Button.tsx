import { global } from "@/copy-database/global";
import Link from "next/link";
import { LabelRoll } from "@/components/ui/LabelRoll";
import { markLeaderPressedClass } from "@/lib/mark-leader";
import { cn } from "@/lib/cn";

const rollHover =
  "hover:[&_.label-roll-track]:-translate-y-1/2 focus-visible:[&_.label-roll-track]:-translate-y-1/2";

/** Simple: `[` + label roll + `]` with gap-4. Toggle: same layout; muted / pressed + leader when on. */
export function Button({
  children,
  className,
  href,
  target,
  rel,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-pressed": ariaPressed,
  muted,
  pressed,
}: {
  children: string;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
  /** Toggle off — muted ink. */
  muted?: boolean;
  /** Toggle on — 8px leader + active ink. */
  pressed?: boolean;
}) {
  const inner = (
    <>
      <span aria-hidden="true">{global.brackets.open}</span>
      <LabelRoll>{children}</LabelRoll>
      <span aria-hidden="true">{global.brackets.close}</span>
    </>
  );

  const cls = cn(
    "type-label inline-flex cursor-pointer items-center gap-4 border-0 bg-transparent p-0 text-current",
    muted && "text-muted",
    markLeaderPressedClass(!!pressed),
    rollHover,
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        onClick={onClick}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
    >
      {inner}
    </button>
  );
}
