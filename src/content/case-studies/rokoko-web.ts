import rokokoWebChapters from "./generated/rokokoweb.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/rokokoweb";

function solid(file: string, alt: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt };
}

function row(columns: 1 | 2 | 3, frames: ReturnType<typeof solid>[]) {
  return { columns, frames };
}

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Research") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("Competitor-Data-Chartrokoko.svg", "Competitor benchmarking chart")]),
        row(2, [
          solid("Screenshot-2025-09-04-at-17.20.34.png", "Competitor benchmark"),
          solid("Screenshot-2025-09-04-at-17.20.43.png", "Competitor benchmark"),
        ]),
        row(3, [
          solid("rokoko-User-Persona1.jpg", "User persona one"),
          solid("rokoko-User-Persona2.jpg", "User persona two"),
          solid("rokoko-User-Persona3.jpg", "User persona three"),
        ]),
        row(2, [
          solid("rokoko_userneeds.png", "User needs"),
          solid("rokoko_prioritized-features.png", "Prioritized features"),
        ]),
      ],
    };
  }

  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("rokokositemap.svg", "Rokoko sitemap")]),
        row(1, [solid("rokokowireframes.svg", "Rokoko wireframes")]),
        row(1, [solid("Screenshot-2025-09-05-at-12.14.10-scaled.png", "Components list")]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          solid("Moodboard.jpg", "Visual exploration moodboard"),
          solid("UI-Toolkit.jpg", "UI toolkit"),
          solid("Brainstorm-other-changes.jpg", "Brainstorm of other changes"),
        ]),
        row(2, [
          solid("rokokodesignsystem1-1-scaled.jpg", "Rokoko design system"),
          solid("rokokodesignsystem2-1-scaled.jpg", "Rokoko design system"),
        ]),
        row(3, [
          solid("rokokoweb1-1.jpg", "Marketing website"),
          solid("rokokoweb2-1.jpg", "Marketing website"),
          solid("rokokoweb7.jpg", "Marketing website"),
        ]),
        row(3, [
          solid("rokokoweb3-1.jpg", "Marketing website"),
          solid("rokokoweb4.jpg", "Marketing website"),
          solid("rokokoweb5.jpg", "Marketing website"),
        ]),
        row(1, [solid("rokokoweb6.jpg", "Marketing website")]),
        row(3, [
          solid("rokokoweb10.jpg", "Knowledge base"),
          solid("rokokoweb8.jpg", "Knowledge base"),
          solid("rokokoweb9.jpg", "Knowledge base"),
        ]),
        row(3, [
          solid("rokokoweb11.jpg", "Webshop"),
          solid("rokokoweb12.jpg", "Webshop"),
          solid("rokokoweb13-1.jpg", "Webshop"),
        ]),
        row(1, [solid("rokokoweb14.jpg", "Webshop")]),
      ],
    };
  }

  return chapter;
}

export const rokokoWebCaseStudy = {
  slug: "rokokoweb",
  title: "Rokoko Website Revamp",
  aboutLabel: "about the project",
  description:
    "Rokoko is a motion capture software and hardware company with products that allow their users to breathe life into animated characters with intuitive real-time full body motion capture system.",
  meta: [
    {
      label: "My role",
      value: "UX/UI Design\nWireframing & Prototyping\nBrand Identity\nWeb Design\nDesign Systems",
    },
    { label: "client", value: "Rokoko" },
    { label: "year", value: "2023" },
  ],
  heroImage: {
    src: "/images/works/rokokoweb/rokokowerthumbnailprojectpage-2.jpg",
    alt: "Rokoko website overview",
  },
  chapters: [
    buildScopeChapter(
      "I entered Rokoko at a very exciting time, just before a complete rebrand which was facilitated by the Copenhagen-based brand agency E-types. They delivered a high level brand manual defining the new look & feel, and my tasks after that revolved around implementing the new art direction into all Rokoko's marketing touchpoints including complete overhaul of the website.",
      "The website redesign had to address a complex set of needs and audiences while staying true to Rokoko's new brand vision. As the product line expanded and the user base became more global, it was essential to:",
      [
        "Create a site that balanced clarity, scalability, and consistent storytelling.",
        "Build an adaptable framework for marketing, seamless navigation to support and e-commerce.",
        "Develop a design system that would keep everything cohesive as features and content evolved.",
      ],
    ),
    ...rokokoWebChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
