import weldChapters from "./generated/weld.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/weld";

function solid(file: string, alt: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt };
}

function row(columns: 1 | 2 | 3, frames: ReturnType<typeof solid>[]) {
  return { columns, frames };
}

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("weldsitemap.jpg", "Weld sitemap")]),
        row(2, [
          solid("weld_wireframes1.jpg", "Weld wireframes"),
          solid("weld_wireframes2.jpg", "Weld wireframes"),
        ]),
        row(3, [
          solid("weld_brand1.svg", "Weld brand language"),
          solid("weld_brand2.svg", "Weld brand language"),
          solid("weld_brand3.svg", "Weld brand language"),
        ]),
        row(1, [solid("weldiconpack.svg", "Weld icon pack")]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(2, [solid("nav0-2.jpg", "Website navigation"), solid("nav1.jpg", "Website navigation")]),
        row(2, [
          solid("weld-website-full-pages1.jpg", "Weld website page"),
          solid("weld-website-full-pages2.jpg", "Weld website page"),
        ]),
        row(2, [
          solid("weld-website-components1.svg", "Website components"),
          solid("weld-website-components2.svg", "Website components"),
        ]),
        row(3, [
          solid("Group-13358-1.svg", "Website illustration"),
          solid("Group-13589.svg", "Website illustration"),
          solid("Group-13540.svg", "Website illustration"),
        ]),
        row(3, [
          solid("Group-13359.svg", "Website illustration"),
          solid("Group-13358-2.svg", "Website illustration"),
          solid("Group-13357-2.svg", "Website illustration"),
        ]),
        row(3, [
          solid("Group-13360.svg", "Website illustration"),
          solid("Group-13486.svg", "Website illustration"),
          solid("Group-13982.svg", "Website illustration"),
        ]),
        row(3, [
          solid("Group-13357-1.svg", "Website illustration"),
          solid("Group-13478-1.svg", "Website illustration"),
          solid("Group-13358.svg", "Website illustration"),
        ]),
        row(1, [solid("weldmetaimages.jpg", "Weld meta images")]),
      ],
    };
  }

  return chapter;
}

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
  heroImage: {
    src: "/images/works/weld/weld-hero.png",
    alt: "Weld website overview",
  },
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
    ...weldChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
