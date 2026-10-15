import cocoCareChapters from "./generated/cococare.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/cococare";

function solid(file: string, alt: string, description?: string, color?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, description, color };
}

function fill(file: string, alt: string) {
  return { ...solid(file, alt), variant: "fill" as const };
}

function row(columns: 1 | 2 | 3, frames: Array<ReturnType<typeof solid> | ReturnType<typeof fill>>) {
  return { columns, frames };
}

const archivedHeadlines = new Set(["focus areas"]);

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Key user needs") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          solid("persona-jonas.svg", "Persona, Jonas"),
          solid("persona-alice.svg", "Persona, Alice"),
          solid("project-goals.svg", "Coco Care project goals"),
        ]),
      ],
    };
  }

  if (chapter.headline === "structure and patterns") {
    return {
      ...chapter,
      imageRows: [
        row(2, [
          solid("cococare-onboardingflow.svg", "Coco Care onboarding flow", "Onboarding flow"),
          solid("cococare-exerciseflow.svg", "Coco Care exercise flow", "Training flow"),
        ]),
        row(2, [
          solid(
            "cococare-sitemap-admin.svg",
            "Coco Care admin sitemap",
            "Information architecture map - Admin view",
          ),
          solid(
            "cococare-sitemap-fysio.svg",
            "Coco Care physiotherapist sitemap",
            "Information architecture map - Physiotherapist view",
          ),
        ]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          solid("design-r-fe.png", "Coco Care design screen", undefined, "EFEAE1"),
          solid("design-r-frame-6187.svg", "Coco Care design screen", undefined, "2A2A2A"),
          solid("design-r-frame-427321985.svg", "Coco Care design screen", undefined, "FFBC9B"),
        ]),
        row(2, [
          solid(
            "implementation-frame-6178.svg",
            "Coco Care portal patient overview",
            "Portal patient overview table",
          ),
          solid(
            "app-home-dashboard.png",
            "Coco Care app home dashboard",
            "App home dashboard",
          ),
        ]),
        row(2, [
          solid("design-portal-1.png", "Coco Care pre-training flow", "PRE-TRAINING FLOW"),
          solid("design-portal-2.png", "Coco Care training flow", "TRAINING FLOW"),
        ]),
        row(2, [
          solid(
            "design-portal-3.png",
            "Coco Care post-training flow",
            "POST-TRAINING FLOW AND profile",
          ),
          solid("design-portal-4.png", "Coco Care utility pages", "SELECTION OF UTILITY PAGES"),
        ]),
        row(2, [
          solid(
            "design-patient.png",
            "Coco Care patient page",
            "Overview of compliance, SMART goal, pain development, activity history",
          ),
          solid(
            "design-portal-program-builder.png",
            "Coco Care program builder",
            "Create a program for patient in drag and drop editor",
          ),
        ]),
        row(2, [
          solid(
            "design-portal-active-program.png",
            "Coco Care active program",
            "Frequency, Note, current exercises",
          ),
          solid(
            "design-portal-smart-score.png",
            "Coco Care goals",
            "patient's progress, history and setting a new goal",
          ),
        ]),
      ],
    };
  }

  if (chapter.headline === "Testing") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          solid("testing-edit-6197.svg", "Coco Care testing revision"),
          solid("testing-edit-6198.svg", "Coco Care testing revision"),
          solid("testing-edit-6199.svg", "Coco Care testing revision"),
        ]),
      ],
    };
  }

  return chapter;
}

/** Chapters kept in content and shown on /archive, omitted from the live case study. */
export const cocoCareArchivedChapters = cocoCareChapters
  .filter((chapter) => archivedHeadlines.has(chapter.headline))
  .map(withImageRows);

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
  heroImage: {
    src: "/images/works/cococare/cococarenewhero.svg",
    alt: "Coco Care product overview",
    variant: "solid",
    color: "FFBC9B",
  },
  chapters: [
    {
      headline: "SCOPE",
      sections: [
        {
          label: "BACKGROUND and challenge:",
          paragraphs: [
            "Coco Care is a digital physiotherapy solution that helps patients access personalized, evidence-based rehabilitation at home through an intuitive app. I designed the patient and physio experience and set the foundation for scheduling, exercise tracking and many more functions to boost engagement, compliance, and recovery outcomes.",
          ],
        },
      ],
    },
    ...cocoCareChapters
      .filter((chapter) => !archivedHeadlines.has(chapter.headline))
      .map(withImageRows),
  ],
} satisfies CaseStudy;
