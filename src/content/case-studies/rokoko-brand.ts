import rokokoBrandChapters from "./generated/rokokobrand.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/rokokobrand";

function solid(file: string, alt: string, color?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, color };
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
          fill("logo-placement-example1.svg", "Logo placement"),
          fill("logo-placement-example2.svg", "Logo placement"),
          fill("logo-placement-example2-1.svg", "Logo placement"),
        ]),
      ],
    };
  }

  if (chapter.headline === "Principles and assets") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("principles-slides-1.png", "Deck template", "var(--color-ink)")]),
        row(1, [solid("principles-slides-2.png", "Deck template", "var(--color-ink)")]),
        row(2, [
          fill("principles-some-1.jpg", "Social media branding"),
          fill("principles-some-2.jpg", "Social media branding"),
        ]),
        row(2, [
          solid("principles-jobads.svg", "Job listings", "var(--color-ink)"),
          solid("principles-postss.png", "Social posts", "var(--color-ink)"),
        ]),
        row(1, [solid("principles-emails.png", "Email communication", "var(--color-ink)")]),
        row(3, [
          fill("Headrig_20-copy.jpg", "Headrig packaging"),
          fill("Headrig_21-copy.jpg", "Headrig packaging"),
          fill("Headrig_23-copy.jpg", "Headrig packaging"),
        ]),
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
    "Rokoko builds intuitive, real-time motion-capture tools so artists can bring animated characters to life. This project is the rollout of the new brand identity.",
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
    src: "/images/works/rokokobrand/herororkoko.png",
    alt: "Rokoko brand overview",
    variant: "fill",
  },
  chapters: [
    {
      headline: "SCOPE",
      sections: [
        {
          label: "BACKGROUND AND GOALS",
          paragraphs: [
            "In 2022, Rokoko partnered with E-types on a full rebrand, redefining the visual language across platforms. I turned that direction into everyday brand assets, unified the touchpoints under the new identity, and made brand communication clearer.",
          ],
        },
        {
          label: "01",
          paragraphs: [
            "Demonstrate visual distinctiveness and reflect Rokoko's position as a creative leader.",
          ],
        },
        {
          label: "02",
          paragraphs: [
            "Support fast-paced tech environments with adaptable, scalable templates.",
          ],
        },
        {
          label: "03",
          paragraphs: [
            "Reinforce consistency across packaging, print, digital, and merchandising.",
          ],
        },
      ],
    },
    ...rokokoBrandChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
