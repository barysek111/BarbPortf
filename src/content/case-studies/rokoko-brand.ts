import rokokoBrandChapters from "./generated/rokokobrand.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/rokokobrand";

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
        row(2, [
          solid("logo-placement-example1.svg", "Logo placement"),
          solid("logo-placement-example2.svg", "Logo placement"),
        ]),
        row(1, [solid("logo-placement-example2-1.svg", "Logo placement")]),
        row(1, [solid("logos-2.svg", "Logo variations")]),
        row(1, [solid("colors-1.svg", "Colour palette")]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(2, [
          solid("slides1-1-scaled.jpg", "Deck template"),
          solid("slides2-scaled.jpg", "Deck template"),
        ]),
        row(2, [
          solid("some1-scaled.jpg", "Social media branding"),
          solid("some2-scaled.jpg", "Social media branding"),
        ]),
        row(2, [
          solid("joblistingsrokoko.svg", "Job listings"),
          solid("someprofiles-scaled.jpg", "Social profiles"),
        ]),
        row(2, [
          solid("someposts3-1-scaled.jpg", "Social posts"),
          solid("youtubethumbnails-scaled.jpg", "YouTube thumbnails"),
        ]),
        row(1, [solid("emailcommunication-1.jpg", "Email communication")]),
        row(3, [
          solid("Headrig_20-copy.jpg", "Headrig packaging"),
          solid("Headrig_21-copy.jpg", "Headrig packaging"),
          solid("Headrig_23-copy.jpg", "Headrig packaging"),
        ]),
        row(1, [solid("Headrig_19-copy.jpg", "Headrig packaging")]),
        row(3, [
          solid("20231011_123048.jpg", "Merchandise"),
          solid("20231011_123339-1.jpg", "Merchandise"),
          solid("IMG_8484-1.jpg", "Merchandise"),
        ]),
        row(1, [solid("Frame-427322101-1.jpg", "Merchandise")]),
      ],
    };
  }

  return chapter;
}

export const rokokoBrandCaseStudy = {
  slug: "rokokobrand",
  title: "Rokoko Brand Identity",
  aboutLabel: "about the project",
  description:
    "Rokoko empowers creators with innovative motion capture technology, enabling artists to bring animated characters to life with intuitive, real-time tools. This project documents the rollout of a revitalized brand identity.",
  meta: [
    {
      label: "My role",
      value:
        "Brand Identity\nMerchandising\nDesign for print\nDesign systems\nPackaging design",
    },
    { label: "client", value: "Rokoko" },
    { label: "year", value: "2022" },
  ],
  heroImage: {
    src: "/images/works/rokokobrand/rokokobrandthumbnailprojectpage.jpg",
    alt: "Rokoko brand overview",
  },
  chapters: [
    buildScopeChapter(
      "Rokoko is a motion capture company providing hardware and software for animators and creators globally. In 2022, they partnered with E-types for a complete rebrand redefining their visual language across all platforms. My focus was translating the new direction into everyday brand assets, building consistency across packaging, print, digital templates, and merchandising.",
      "The task was to unify all of Rokoko's brand touchpoints under the new identity and bring clarity and cohesion to all brand communication. Deliverables needed to:",
      [
        "Demonstrate visual distinctiveness and reflect Rokoko's position as a creative leader.",
        "Support fast-paced tech environments with adaptable, scalable templates.",
        "Reinforce consistency across packaging, print, digital, and merchandising.",
      ],
    ),
    ...rokokoBrandChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
