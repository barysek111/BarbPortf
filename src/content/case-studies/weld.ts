import weldChapters from "./generated/weld.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/weld";

function solid(file: string, alt: string, description?: string, color?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, description, color };
}

function fill(file: string, alt: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "fill" as const, src, alt };
}

function row(
  columns: 1 | 2 | 3,
  frames: Array<ReturnType<typeof solid> | ReturnType<typeof fill>>,
) {
  return { columns, frames };
}

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          solid("direction-shape-6206.svg", "Weld brand language", undefined, "var(--color-ink)"),
          solid("direction-shape-6207.svg", "Weld brand language", undefined, "var(--color-ink)"),
          solid("direction-shape-6208.svg", "Weld brand language", undefined, "var(--color-ink)"),
        ]),
        row(1, [
          solid("weld-website-screens.png", "Weld website screens", undefined, "var(--color-ink)"),
        ]),
        row(1, [solid("weldiconpack.svg", "Weld icon pack")]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(2, [
          solid(
            "weld-website-components1.svg",
            "Website components",
            "modular website components with theme switching",
            "E6E6E6",
          ),
          solid(
            "weld-website-components2.svg",
            "Website components",
            "modular website components with theme switching",
            "E6E6E6",
          ),
        ]),
        row(3, [
          fill("Group-13358-1.svg", "Website illustration"),
          fill("Group-13589.svg", "Website illustration"),
          fill("Group-13540.svg", "Website illustration"),
        ]),
        row(3, [
          fill("Group-13359.svg", "Website illustration"),
          fill("Group-13358-2.svg", "Website illustration"),
          fill("Group-13357-2.svg", "Website illustration"),
        ]),
        row(3, [
          fill("Group-13360.svg", "Website illustration"),
          fill("Group-13486.svg", "Website illustration"),
          fill("Group-13982.svg", "Website illustration"),
        ]),
        row(3, [
          fill("Group-13357-1.svg", "Website illustration"),
          fill("Group-13478-1.svg", "Website illustration"),
          fill("Group-13358.svg", "Website illustration"),
        ]),
        row(1, [solid("weld-meta-images.png", "Weld meta images", undefined, "E6E6E6")]),
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
    src: "/images/works/weld/weldhero.png",
    alt: "Weld website overview",
    variant: "fill",
  },
  chapters: [
    {
      headline: "SCOPE",
      sections: [
        {
          label: "The challenge",
          paragraphs: [
            "Weld needed to stand out to new customers and move from startup aesthetics to a brand people could trust. My role was to:",
          ],
        },
        {
          label: "01",
          paragraphs: [
            "Bring clarity and originality to their interfaces and unite the visual language.",
          ],
        },
        {
          label: "02",
          paragraphs: [
            "Make their digital products as intuitive and professional as their mission.",
          ],
        },
        {
          label: "03",
          paragraphs: [
            "Build a scalable system that would support the team long after project delivery.",
          ],
        },
      ],
    },
    ...weldChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
