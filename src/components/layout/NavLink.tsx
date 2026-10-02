import Link from "next/link";
import { LabelRoll } from "@/components/ui/LabelRoll";
import { markLeaderNavClass } from "@/lib/mark-leader";
import { cn } from "@/lib/cn";

export function NavLink({
  href,
  label,
  count,
  active,
  open,
  onClick,
}: {
  href: string;
  label: string;
  count?: number;
  active?: boolean;
  open?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex w-max items-center leading-[1.3em]",
        "hover:[&_.label-roll-track]:-translate-y-1/2 focus-visible:[&_.label-roll-track]:-translate-y-1/2",
        count != null && "gap-2",
        open
          ? "type-display flex h-[58px] min-h-[44px] w-full items-center"
          : cn("type-label", markLeaderNavClass(!!active)),
      )}
    >
      <LabelRoll>{label}</LabelRoll>
      {count != null ? <span>[{count}]</span> : null}
    </Link>
  );
}
