import rokokoWebChapters from "./generated/rokokoweb.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/rokokoweb";

function mediaSrc(file: string) {
  return `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
}

function solid(file: string, alt: string, description?: string) {
  return { variant: "solid" as const, src: mediaSrc(file), alt, description };
}

function background(file: string, backgroundFile: string, alt: string, description?: string) {
  return {
    variant: "background" as const,
    src: mediaSrc(file),
    backgroundSrc: mediaSrc(backgroundFile),
    alt,
    description,
  };
}

function row(
  columns: 1 | 2 | 3,
  frames: readonly (ReturnType<typeof solid> | ReturnType<typeof background>)[],
) {
  return { columns, frames };
}

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Research") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("competitors.svg", "Competitor benchmarking chart")]),
      ],
    };
  }

  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        row(1, [
          solid(
            "rokokositemap.svg",
            "Rokoko sitemap",
            "Sitemap for marketing website",
          ),
        ]),
        row(1, [
          solid(
            "comp.svg",
            "Rokoko website components",
            "Overview of components needed for modular website section system",
          ),
        ]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(2, [solid("screens/1.png", "Rokoko website"), solid("screens/2.png", "Rokoko website")]),
        row(2, [solid("screens/3.png", "Rokoko website"), solid("screens/4.png", "Rokoko website")]),
        row(2, [solid("screens/5.png", "Rokoko website"), solid("screens/6.png", "Rokoko website")]),
        row(1, [background("screens/mobile.png", "fillllbckgr.png", "Rokoko website on mobile")]),
        row(2, [solid("screens/7.png", "Rokoko website"), solid("screens/8.png", "Rokoko website")]),
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
    "Rokoko makes motion-capture software and hardware. The products let people bring animated characters to life with an intuitive, real-time, full-body system.",
  meta: [
    {
      label: "My role",
      value: "UX/UI Design\nWireframing & Prototyping\nBrand Identity\nWeb Design\nDesign Systems",
    },
    { label: "client", value: "Rokoko" },
    { label: "year", value: "2023" },
  ],
  heroImage: {
    src: "/images/works/rokokoweb/webrokokohero.png",
    alt: "Rokoko website overview",
    variant: "background",
    backgroundSrc: "/images/works/rokokoweb/fillllbckgr.png",
  },
  chapters: [
    {
      headline: "SCOPE",
      sections: [
        {
          label: "The challenge",
          paragraphs: [
            "The product line was expanding, and the audience was becoming more global. The redesign still had to cover a complex set of needs and stay true to Rokoko's new brand.",
            "1. Make a site that stays clear, can grow, and tells a consistent story.\n2. Build an adaptable framework for marketing, and clear navigation between support and e-commerce.\n3. Develop a design system that stays coherent as features and content change.",
          ],
        },
      ],
    },
    ...rokokoWebChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
