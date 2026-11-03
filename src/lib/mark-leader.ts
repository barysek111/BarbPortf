import { cn } from "@/lib/cn";

/** Toggle on — mark always visible. */
export function markLeaderPressedClass(pressed: boolean) {
  return cn(pressed && "mark-leader-before");
}
