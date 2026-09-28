/** Case-study modules use kebab filenames (`coco-care.ts`); route slugs stay compact (`cococare`). */
import { agerasCaseStudy } from "./ageras";
import { cocoCareCaseStudy } from "./coco-care";
import { eatGrimCaseStudy } from "./eat-grim";
import { plintoCaseStudy } from "./plinto";
import { powermatchCaseStudy } from "./powermatch";
import { rokokoBrandCaseStudy } from "./rokoko-brand";
import { rokokoWebCaseStudy } from "./rokoko-web";
import type { CaseStudy } from "./types";
import { weldCaseStudy } from "./weld";

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
