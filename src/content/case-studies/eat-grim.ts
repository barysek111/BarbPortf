import eatGrimChapters from "./generated/eatgrim.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/eatgrim";

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
      imageRows: [row(1, [solid("Competitive-maket-analysis-2.jpg", "Competitive market analysis")])],
    };
  }

  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("User-Persona1-1.jpg", "Eat Grim user persona one")]),
        row(1, [solid("User-Persona2-1.jpg", "Eat Grim user persona two")]),
        row(1, [solid("User-Persona4.jpg", "Eat Grim user persona three")]),
        row(1, [solid("eatgrim-needsnpainpoints.png", "Needs and pain points")]),
        row(1, [solid("eatgrim-priorities.png", "Priorities")]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("Screenshot-brand-overview.png", "Brand identity overview")]),
        row(3, [
          solid("asset-10.jpg", "Brand asset"),
          solid("asset-9.jpg", "Brand asset"),
          solid("asset-8.jpg", "Brand asset"),
        ]),
        row(2, [solid("asset-14.jpg", "Brand asset"), solid("asset-12.jpg", "Brand asset")]),
        row(3, [
          solid("Untitled-3-07.jpg", "Packaging design"),
          solid("Untitled-3-08.jpg", "Packaging design"),
          solid("Untitled-3-10.jpg", "Packaging design"),
        ]),
        row(1, [solid("Group-427323113.jpg", "Packaging lineup")]),
        row(3, [
          solid("packing-action123.jpg", "Packing photography"),
          solid("hero-with-hand-on-beige-2-copy.jpg", "Produce in hand"),
          solid("packing-action124-1.jpg", "Packing photography"),
        ]),
        row(2, [
          solid("aubergine-on-yellow.jpg", "Aubergine on yellow"),
          solid("carrot-pepper-orange-on-blue-vertical-1.jpg", "Carrot and pepper on blue"),
        ]),
        row(3, [
          solid("halloween-2020-51-1.jpg", "Halloween campaign"),
          solid("easter-2021-112-1.jpg", "Easter campaign"),
          solid("halloween-2020-63.jpg", "Halloween campaign"),
        ]),
        row(2, [
          solid("2021-05-13-salad.jpg", "Salad photography"),
          solid("carrot-pepper-orange-on-red-copy.jpg", "Carrot and pepper on red"),
        ]),
        row(3, [
          solid("merch-screenshot1.jpg", "Merchandise"),
          solid("romaine-lettuce-grid.jpg", "Romaine lettuce grid"),
          solid("merch-screenshot2.jpg", "Merchandise"),
        ]),
        row(1, [solid("fb-ig-shop-family.jpg", "Shop family")]),
        row(3, [
          solid("merch-screenshot3.jpg", "Merchandise"),
          solid("merch-screenshot4.jpg", "Merchandise"),
          solid("merch-screenshot5.jpg", "Merchandise"),
        ]),
        row(3, [
          solid("animation1.gif", "Merchandise animation"),
          solid("IMG_2884.jpg", "Merchandise photograph"),
          solid("animation2.gif", "Merchandise animation"),
        ]),
        row(2, [
          solid("merch-screenshot6.jpg", "Merchandise"),
          solid("merch-screenshot7.jpg", "Merchandise"),
        ]),
        row(3, [
          solid("Frame-427323107.jpg", "Merchandise frame"),
          solid("Frame-427323106.jpg", "Merchandise frame"),
          solid("Frame-427323108.jpg", "Merchandise frame"),
        ]),
        row(3, [
          solid("eatgrimwebsite1.jpg", "Eat Grim website"),
          solid("eatgrimwebsite2.jpg", "Eat Grim website"),
          solid("eatgrimwebsite3-1.jpg", "Eat Grim website"),
        ]),
        row(1, [solid("eatgrimemailcommunication-1.jpg", "Email marketing")]),
      ],
    };
  }

  if (chapter.headline === "Outcomes") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          solid("Frame-427323096.jpg", "Eat Grim outcome"),
          solid("Frame-427323099.jpg", "Eat Grim outcome"),
          solid("Frame-427323090-1.jpg", "Eat Grim outcome"),
        ]),
        row(3, [
          solid("Frame-427323100.jpg", "Eat Grim outcome"),
          solid("Frame-427323085-1.jpg", "Eat Grim outcome"),
          solid("Frame-427323086-1.jpg", "Eat Grim outcome"),
        ]),
        row(3, [
          solid("Frame-427323092.jpg", "Eat Grim outcome"),
          solid("Frame-427323097.jpg", "Eat Grim outcome"),
          solid("Frame-427323089.jpg", "Eat Grim outcome"),
        ]),
        row(3, [
          solid("Frame-427323087.jpg", "Eat Grim outcome"),
          solid("Frame-427323091.jpg", "Eat Grim outcome"),
          solid("Frame-427323093.jpg", "Eat Grim outcome"),
        ]),
      ],
    };
  }

  return chapter;
}

export const eatGrimCaseStudy = {
  slug: "eatgrim",
  title: "Eat Grim Brand Identity",
  aboutLabel: "about the project",
  description:
    "Eat Grim changes the way people think about food by celebrating diversity in shape, size, and colour — creating real impact for farmers, consumers, and the planet.",
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
    src: "/images/works/eatgrim/eatgrimpagethumbnail-1.jpg",
    alt: "Eat Grim brand overview",
  },
  chapters: [
    buildScopeChapter(
      "Eat Grim is a Copenhagen-based startup dedicated to fighting food waste by rescuing 'ugly' and surplus fruits and vegetables — produce that would otherwise be discarded because of appearance or overproduction. Through a box subscription model, Eat Grim delivers fresh, organic produce directly from European farms to people's doors, making it easy to eat more sustainably.",
      "As Brand Designer, illustrator, and photographer, I shaped Eat Grim's visual identity and voice across every touchpoint — from logo and packaging to emails, website, and merchandise. The goal was to:",
      [
        "Create a brand that not only stood out but sparked real conversations about food waste and sustainability.",
        "Build a cohesive visual language across packaging, photography, digital, and physical collateral.",
        "Grow a passionate subscriber community — over the two-year collaboration, Eat Grim reached 2,500+ regular subscribers.",
      ],
    ),
    ...eatGrimChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
