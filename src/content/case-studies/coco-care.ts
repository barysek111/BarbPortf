import cocoCareChapters from "./generated/cococare.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy, CaseStudyChapter } from "./types";

const PLACEHOLDER = "/images/works/cococare/placeholder.png";

const solid = (src: string, alt: string) => ({ variant: "solid" as const, src, alt });
const placeholder = (alt = "") => solid(PLACEHOLDER, alt || "Work in progress");

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        {
          columns: 1,
          frames: [
            solid("/images/works/cococare/project-goals.svg", "Coco Care project goals"),
          ],
        },
        {
          columns: 2,
          frames: [placeholder(), placeholder()],
        },
        {
          columns: 2,
          frames: [placeholder(), placeholder()],
        },
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        { columns: 1, frames: [placeholder()] },
        { columns: 1, frames: [placeholder()] },
        { columns: 1, frames: [placeholder()] },
        { columns: 1, frames: [placeholder()] },
        { columns: 2, frames: [placeholder(), placeholder()] },
        { columns: 2, frames: [placeholder(), placeholder()] },
      ],
    };
  }

  if (chapter.headline === "Testing") {
    return {
      ...chapter,
      imageRows: [
        {
          columns: 3,
          frames: [placeholder(), placeholder(), placeholder()],
        },
      ],
    };
  }

  return chapter;
}

export const cocoCareCaseStudy = {
  slug: "cococare",
  title: "Coco Care Interface Design",
  aboutLabel: "about the project",
  description:
    "Designing user interface for Coco Care web app and mobile app, an AI-driven motion capture tool for physio rehabilitation.",
  meta: [
    {
      label: "My role",
      value: "UX & UI\nDesign System\nUser Flows\nPrototyping\nUsability Testing",
    },
    { label: "client", value: "Coco Care" },
    { label: "year", value: "2024" },
  ],
  chapters: [
    buildScopeChapter(
      "Coco Care is a digital physiotherapy solution that helps patients access personalized, evidence-based rehabilitation at home through an intuitive app. I designed the patient and physio experience and set the foundation for scheduling, exercise tracking and many more functions to boost engagement, compliance, and recovery outcomes.",
      "Patients often struggle with motivation and consistency in physiotherapy. Clinics face high dropout rates and limited insight into patients' progress at home. Coco Care aims to:",
      [
        "Make digital rehabilitation accessible, clear and user-friendly.",
        "Enable physios to track patient progress and personalize plans.",
        "Increase patient engagement and compliance.",
      ],
    ),
    ...cocoCareChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
