import eatGrimChapters from "./generated/eatgrim.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy } from "./types";

export const eatGrimCaseStudy = {
  slug: "eat-grim-brand-identity",
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
    { label: "year", value: "2019–2021" },
  ],
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
    ...eatGrimChapters,
  ],
} satisfies CaseStudy;
