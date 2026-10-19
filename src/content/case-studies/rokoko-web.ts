import rokokoWebChapters from "./generated/rokokoweb.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/rokokoweb";

function solid(file: string, alt: string, description?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, description };
}

function fill(file: string, alt: string, description?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "fill" as const, src, alt, description };
}

function row(
  columns: 1 | 2 | 3,
  frames: Array<ReturnType<typeof solid> | ReturnType<typeof fill>>,
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
        row(3, [
          fill("rokokoweb1-1.jpg", "Marketing website"),
          fill("rokokoweb2-1.jpg", "Marketing website"),
          fill("rokokoweb7.jpg", "Marketing website"),
        ]),
        row(3, [
          fill("rokokoweb3-1.jpg", "Marketing website"),
          fill("rokokoweb4.jpg", "Marketing website"),
          fill("rokokoweb5.jpg", "Marketing website"),
        ]),
        row(3, [
          fill("rokokoweb10.jpg", "Knowledge base"),
          fill("rokokoweb8.jpg", "Knowledge base"),
          fill("rokokoweb9.jpg", "Knowledge base"),
        ]),
        row(3, [
          fill("rokokoweb11.jpg", "Webshop"),
          fill("rokokoweb12.jpg", "Webshop"),
          fill("rokokoweb13-1.jpg", "Webshop"),
        ]),
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
