/** Case-study modules live in src/copy-database. Route slugs stay compact (`cococare`). */
import { ageras } from "@/copy-database/project-ageras";
import { cococare } from "@/copy-database/project-cococare";
import { eatgrim } from "@/copy-database/project-eatgrim";
import { libraryDrift } from "@/copy-database/project-library-drift";
import { plinto } from "@/copy-database/project-plinto";
import { powermatch } from "@/copy-database/project-powermatch";
import { rokokoBrand } from "@/copy-database/project-rokokobrand";
import { rokokoWeb } from "@/copy-database/project-rokokoweb";
import { weld } from "@/copy-database/project-weld";
import { projects } from "@/content/projects";
import type { CaseStudy } from "./types";

const caseStudies: Record<string, CaseStudy> = {
  [libraryDrift.slug]: libraryDrift,
  [plinto.slug]: plinto,
  [powermatch.slug]: powermatch,
  [ageras.slug]: ageras,
  [cococare.slug]: cococare,
  [rokokoBrand.slug]: rokokoBrand,
  [rokokoWeb.slug]: rokokoWeb,
  [weld.slug]: weld,
  [eatgrim.slug]: eatgrim,
};

const projectSlugs = projects.map((project) => project.slug);
const studySlugs = Object.keys(caseStudies);
const missingStudy = projectSlugs.filter((slug) => !(slug in caseStudies));
const missingProject = studySlugs.filter((slug) => !projectSlugs.includes(slug));
if (missingStudy.length > 0 || missingProject.length > 0) {
  throw new Error(
    `Works slugs and case study slugs do not match. Missing case study: ${missingStudy.join(", ") || "none"}. Missing works card: ${missingProject.join(", ") || "none"}.`,
  );
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function hasCaseStudy(slug: string): boolean {
  return slug in caseStudies;
}
