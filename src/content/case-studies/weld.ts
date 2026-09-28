import weldChapters from "./generated/weld.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy } from "./types";

export const weldCaseStudy = {
  slug: "weld",
  title: "Weld Website Revamp",
  aboutLabel: "about the project",
  description:
    "Website information architecture, wireframing, visual identity and illustration for a data SaaS company.",
  meta: [
    {
      label: "My role",
      value: "Brand Identity\nInformation Architecture\nWireframing\nIllustration\nWeb Design",
    },
    { label: "client", value: "Weld" },
    { label: "year", value: "2021" },
  ],
  chapters: [
    buildScopeChapter(
      "I joined Weld to help create a visual identity and design system that would support its growth as a next-generation data platform. My work focused on elevating the brand, shaping a cohesive UI library, and ensuring consistency across both web and product experiences.",
      "Weld needed to stand out in a crowded SaaS landscape and evolve from startup aesthetics to a trusted enterprise brand. My role was to:",
      [
        "Bring clarity and originality to their interfaces and unite the visual language.",
        "Make their digital products as intuitive and professional as their mission.",
        "Build a scalable system that would support the team long after project delivery.",
      ],
    ),
    ...weldChapters,
  ],
} satisfies CaseStudy;
