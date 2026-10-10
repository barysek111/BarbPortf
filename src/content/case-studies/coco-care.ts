import cocoCareChapters from "./generated/cococare.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/cococare";

function solid(file: string, alt: string, description?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, description };
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

  if (chapter.headline === "Implementation") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("hi-fidelity-mobilescreens6-new.svg", "Settings flow", "Settings")]),
        row(3, [
          solid("cococare-screens-mobile-1.svg", "Coco Care mobile screens", "Program activity"),
          solid("cococare-screens-mobile-2.svg", "Coco Care mobile screens", "Program activity"),
          solid("cococare-screens-mobile-3.svg", "Coco Care mobile screens", "Info screens"),
        ]),
        row(2, [
          solid("hi-fidelity-portalscreen2-1.svg", "Patient page", "patient page"),
          solid("hi-fidelity-portalscreen3-2.svg", "Program builder", "program builder"),
        ]),
        row(2, [
          solid("hi-fidelity-portalscreen4-1.svg", "Active program", "active program"),
          solid("hi-fidelity-portalscreen5-1.svg", "Goals", "setting goals"),
        ]),
      ],
    };
  }

  if (chapter.headline === "Testing") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          fill("revision1.svg", "Testing revision one"),
          fill("revision2.svg", "Testing revision two"),
          fill("revision3.svg", "Testing revision three"),
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
    variant: "background",
    backgroundSrc: "/images/works/cococare/cococareheroimgfillbackground.jpg",
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
