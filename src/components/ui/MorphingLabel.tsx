import { home } from "@/copy-database/home";
import { cn } from "@/lib/cn";
import { TextMorphing } from "@/components/ui/TextMorphing";

/** type-label morph. Phrases come from home.hero.letterLabel. Placement is className. */
export function MorphingLabel({ className }: { className?: string }) {
  return <TextMorphing texts={home.hero.letterLabel} className={cn("type-label", className)} />;
}
