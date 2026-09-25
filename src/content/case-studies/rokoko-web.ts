import rokokoWebChapters from "./generated/rokokoweb.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy } from "./types";

export const rokokoWebCaseStudy = {
  slug: "rokoko-website-revamp",
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
    ...rokokoWebChapters,
  ],
} satisfies CaseStudy;
