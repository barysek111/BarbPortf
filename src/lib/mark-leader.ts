import { cn } from "@/lib/cn";

/** 8px mark — visible when active, else on group hover/focus (inline nav). */
export function markLeaderNavClass(active: boolean) {
  return cn(
    "mark-leader-before relative",
    "before:transition-opacity before:duration-200",
    active
      ? "before:opacity-100"
      : "before:opacity-0 group-hover:before:opacity-100 group-focus-visible:before:opacity-100",
  );
}

/** Toggle on — mark always visible. */
export function markLeaderPressedClass(pressed: boolean) {
  return cn(pressed && "mark-leader-before");
}
