import Link from "next/link";
import { LabelRoll } from "@/components/ui/LabelRoll";
import { cn } from "@/lib/cn";

/** Leader only on the inline bar. The overlay has no mark. */
function desktopLeader(active: boolean) {
  return cn(
    "tablet:mark-leader-before tablet:relative",
    "tablet:before:transition-opacity tablet:before:duration-200",
    active
      ? "tablet:before:opacity-100"
      : "tablet:before:opacity-0 tablet:group-hover:before:opacity-100 tablet:group-focus-visible:before:opacity-100",
  );
}

export function NavLink({
  href,
  label,
  count,
  active,
  open,
  onClick,
  className,
}: {
  href: string;
  label: string;
  count?: number;
  active?: boolean;
  /** Mobile overlay is open. Below tablet the label is plain display type. */
  open?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex w-max items-center leading-[1.3em]",
        "tablet:type-label",
        "tablet:hover:[&_.label-roll-track]:-translate-y-1/2 tablet:focus-visible:[&_.label-roll-track]:-translate-y-1/2",
        desktopLeader(!!active),
        count != null && "gap-2",
        open &&
          "below-tablet:type-display below-tablet:h-[58px] below-tablet:min-h-[44px] below-tablet:w-full below-tablet:items-center",
        className,
      )}
    >
      <span className="tablet:hidden">{label}</span>
      <span className="hidden tablet:contents">
        <LabelRoll>{label}</LabelRoll>
      </span>
      {count != null ? <span>[{count}]</span> : null}
    </Link>
  );
}
