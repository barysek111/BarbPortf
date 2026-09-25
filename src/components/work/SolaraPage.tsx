"use client";

import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { getCaseStudy } from "@/content/case-studies";

export function SolaraPage() {
  const study = getCaseStudy("ageras");
  if (!study) return null;
  return <CaseStudyPage study={study} />;
}
