import { solara } from "@/content/solara";
import { cocoCareCaseStudy } from "./coco-care";
import { eatGrimCaseStudy } from "./eat-grim";
import { plintoCaseStudy } from "./plinto";
import { powermatchCaseStudy } from "./powermatch";
import { rokokoBrandCaseStudy } from "./rokoko-brand";
import { rokokoWebCaseStudy } from "./rokoko-web";
import type { CaseStudy } from "./types";
import { weldCaseStudy } from "./weld";

const agerasCaseStudy = {
  slug: solara.slug,
  title: solara.title,
  aboutLabel: solara.aboutLabel,
  description: solara.description,
  meta: solara.meta,
  heroImageRow: solara.heroImageRow,
  chapters: solara.chapters,
  next: solara.next,
  scatter: solara.scatter,
} satisfies CaseStudy;

const caseStudies: Record<string, CaseStudy> = {
  [agerasCaseStudy.slug]: agerasCaseStudy,
  [plintoCaseStudy.slug]: plintoCaseStudy,
  [powermatchCaseStudy.slug]: powermatchCaseStudy,
  [cocoCareCaseStudy.slug]: cocoCareCaseStudy,
  [rokokoBrandCaseStudy.slug]: rokokoBrandCaseStudy,
  [rokokoWebCaseStudy.slug]: rokokoWebCaseStudy,
  [weldCaseStudy.slug]: weldCaseStudy,
  [eatGrimCaseStudy.slug]: eatGrimCaseStudy,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function hasCaseStudy(slug: string): boolean {
  return slug in caseStudies;
}
