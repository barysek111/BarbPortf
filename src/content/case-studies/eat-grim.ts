import eatGrimChapters from "./generated/eatgrim.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/eatgrim";

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
  if (chapter.headline === "Research") {
    return {
      ...chapter,
      imageRows: [row(1, [solid("grimanalysis.svg", "Competitive market analysis")])],
    };
  }

  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          fill("asset-10.jpg", "Brand asset"),
          fill("asset-9.jpg", "Brand asset"),
          fill("asset-8.jpg", "Brand asset"),
        ]),
        row(3, [
          fill("asset-14.jpg", "Brand asset"),
          fill("asset-12.jpg", "Brand asset"),
          fill("Untitled-3-07.jpg", "Packaging design"),
        ]),
        row(3, [
          fill("Untitled-3-08.jpg", "Packaging design"),
          fill("Untitled-3-10.jpg", "Packaging design"),
          fill("Group-427323113.jpg", "Packaging lineup"),
        ]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          fill("packing-action123.jpg", "Packing photography"),
          fill("hero-with-hand-on-beige-2-copy.jpg", "Produce in hand"),
          fill("packing-action124-1.jpg", "Packing photography"),
        ]),
        row(1, [solid("grimscreens1.png", "Eat Grim website screens", "var(--color-ink)")]),
        row(1, [solid("grimscreenssss.png", "Eat Grim website screens", "var(--color-ink)")]),
      ],
    };
  }

  if (chapter.headline === "Content") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          fill("aubergine-on-yellow.jpg", "Aubergine on yellow"),
          fill("carrot-pepper-orange-on-blue-vertical-1.jpg", "Carrot and pepper on blue"),
          fill("halloween-2020-51-1.jpg", "Halloween campaign"),
        ]),
        row(3, [
          fill("easter-2021-112-1.jpg", "Easter campaign"),
          fill("halloween-2020-63.jpg", "Halloween campaign"),
          fill("merch-screenshot3.jpg", "Merchandise"),
        ]),
        row(3, [
          fill("merch-screenshot4.jpg", "Merchandise"),
          fill("merch-screenshot5.jpg", "Merchandise"),
          fill("merch-screenshot7.jpg", "Merchandise"),
        ]),
        row(3, [
          fill("animation1.gif", "Merchandise animation"),
          fill("IMG_2884.jpg", "Merchandise photograph"),
          fill("animation2.gif", "Merchandise animation"),
        ]),
      ],
    };
  }

  if (chapter.headline === "Outcomes") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("grimsome.png", "Eat Grim outcomes", "var(--color-ink)")]),
      ],
    };
  }

  return chapter;
}

export const eatGrimCaseStudy = {
  slug: "eatgrim",
  title: "Eat Grim Brand",
  aboutLabel: "about the project",
  description:
    "Eat Grim changes how people think about food by celebrating diversity in shape, size, and color.",
  meta: [
    {
      label: "My role",
      value:
        "Brand Identity\nDesign systems\nPackaging\nResponsive Web Design\nMerchandising\nPhotography\nIllustration",
    },
    { label: "client", value: "Eat Grim" },
    { label: "year", value: "2019" },
  ],
  heroImage: {
    src: "/images/works/eatgrim/grimhero.png",
    alt: "Eat Grim brand overview",
    variant: "fill",
  },
  chapters: [
    {
      headline: "SCOPE",
      sections: [
        {
          label: "BACKGROUND and goals",
          paragraphs: [
            "Eat Grim is a Copenhagen startup that fights food waste by rescuing 'ugly' and surplus fruit and vegetables, delivered in a subscription box. As brand designer, illustrator, and photographer, I shaped the identity and voice: logo, packaging, emails, the website, and merchandise. The goal was to:",
          ],
        },
        {
          label: "01",
          paragraphs: [
            "Create a brand that stood out and got people talking about food waste.",
          ],
        },
        {
          label: "02",
          paragraphs: [
            "Build one visual language across packaging, photography, digital, and print.",
          ],
        },
        {
          label: "03",
          paragraphs: [
            "Grow the subscriber community. Over two years, Eat Grim reached 2,500 regular subscribers.",
          ],
        },
      ],
    },
    ...eatGrimChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
