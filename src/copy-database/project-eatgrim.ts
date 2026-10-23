/**
 * HOW TO EDIT THIS FILE
 * - Change the words inside the quotes. Leave the quotes in place.
 * - Apostrophes are safe inside these quotes, like I'm and don't.
 * - Keep commas between items, and keep the brackets [ ] and braces { }.
 * - To add a paragraph, copy one quoted line inside "paragraphs" and change the words.
 * - To add or remove a chapter, copy or delete one whole chapter block.
 * - To change a picture, replace the "src" path. The file must already be in the public folder.
 * - Do not change the "slug" line. The web address depends on it.
 * - Do not rename the labels on the left (slug, title, paragraphs, and so on).
 */

import type { CaseStudy } from "@/content/case-studies/types";

// This file is the text for one project page.
//
// Contents:
// - Title, intro, and project facts
// - Hero image
// - Chapter: SCOPE
// - Chapter: Research
// - Chapter: Direction
// - Chapter: Design
// - Chapter: Content
// - Chapter: Outcomes
export const eatgrim = {
  slug: "eatgrim",
  title: "Eat Grim Brand",
  aboutLabel: "about the project",
  description: "Eat Grim changes how people think about food by celebrating diversity in shape, size, and color.",

  // =====================================================
  // PROJECT FACTS (role, client, year)
  // =====================================================
  meta: [
    {
      label: "My role",
      value: "Brand Identity\nDesign systems\nPackaging\nResponsive Web Design\nMerchandising\nPhotography\nIllustration",
    },
    {
      label: "client",
      value: "Eat Grim",
    },
    {
      label: "year",
      value: "2019",
    },
  ],

  // =====================================================
  // HERO IMAGE
  // =====================================================
  heroImage: {
    src: "/images/works/eatgrim/grimhero.png",
    alt: "Eat Grim brand overview",
    variant: "fill",
  },

  // =====================================================
  // CHAPTERS, IN THE ORDER THEY APPEAR ON THE PAGE
  // =====================================================
  chapters: [
    // =====================================================
    // CHAPTER: SCOPE
    // =====================================================
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
    // =====================================================
    // CHAPTER: Research
    // =====================================================
    {
      headline: "Research",
      sections: [
        {
          label: "The market landscape",
          paragraphs: [
            "I studied the Danish food delivery market and looked at competitors like HelloFresh and Too Good To Go. I talked with the founders, marketing, and operations about what set Eat Grim apart.",
          ],
        },
        {
          label: "Understanding the audience",
          paragraphs: [
            "The people who cared wanted convenience, health, and transparency. Messaging couldn't run on guilt. It had to be something they wanted to join.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/eatgrim/grimanalysis.svg",
              alt: "Competitive market analysis",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Direction
    // =====================================================
    {
      headline: "Direction",
      sections: [
        {
          label: "Visual approach",
          paragraphs: [
            "The brand needed to be playful and bold, with colors that made wonky vegetables look exciting. Illustrations stayed hand-drawn and warm, not corporate.",
          ],
        },
        {
          label: "Unboxing experience",
          paragraphs: [
            "Opening a box should feel like more than receiving groceries.",
          ],
        },
        {
          label: "Creating consistency",
          paragraphs: [
            "The toolkit held the logo, typeface, color palette, and a recognizable wonky-fruit symbol. People could spot Eat Grim on Instagram, in the mailbox, or on a sticker.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/eatgrim/asset-10.jpg",
              alt: "Brand asset",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/asset-9.jpg",
              alt: "Brand asset",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/asset-8.jpg",
              alt: "Brand asset",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/eatgrim/asset-14.jpg",
              alt: "Brand asset",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/asset-12.jpg",
              alt: "Brand asset",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/Untitled-3-07.jpg",
              alt: "Packaging design",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/eatgrim/Untitled-3-08.jpg",
              alt: "Packaging design",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/Untitled-3-10.jpg",
              alt: "Packaging design",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/Group-427323113.jpg",
              alt: "Packaging lineup",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Design
    // =====================================================
    {
      headline: "Design",
      sections: [
        {
          label: "Packaging as storytelling",
          paragraphs: [
            "Each box size used bold visuals, short notes, and a friendly tone to say where the food came from and why it mattered.",
          ],
        },
        {
          label: "Digital presence",
          paragraphs: [
            "The website made signing up straightforward while explaining why the produce mattered.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/eatgrim/packing-action123.jpg",
              alt: "Packing photography",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/hero-with-hand-on-beige-2-copy.jpg",
              alt: "Produce in hand",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/packing-action124-1.jpg",
              alt: "Packing photography",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/eatgrim/grimscreens1.png",
              alt: "Eat Grim website screens",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/eatgrim/grimscreenssss.png",
              alt: "Eat Grim website screens",
              color: "var(--color-ink)",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Content
    // =====================================================
    {
      headline: "Content",
      sections: [
        {
          label: "Visual content",
          paragraphs: [
            "Photography and illustration treated imperfect produce as the hero. Social posts, newsletters, and campaigns paired those images with behind-the-scenes stories.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/eatgrim/aubergine-on-yellow.jpg",
              alt: "Aubergine on yellow",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/carrot-pepper-orange-on-blue-vertical-1.jpg",
              alt: "Carrot and pepper on blue",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/halloween-2020-51-1.jpg",
              alt: "Halloween campaign",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/eatgrim/easter-2021-112-1.jpg",
              alt: "Easter campaign",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/halloween-2020-63.jpg",
              alt: "Halloween campaign",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/merch-screenshot3.jpg",
              alt: "Merchandise",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/eatgrim/merch-screenshot4.jpg",
              alt: "Merchandise",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/merch-screenshot5.jpg",
              alt: "Merchandise",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/merch-screenshot7.jpg",
              alt: "Merchandise",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/eatgrim/animation1.gif",
              alt: "Merchandise animation",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/IMG_2884.jpg",
              alt: "Merchandise photograph",
            },
            {
              variant: "fill",
              src: "/images/works/eatgrim/animation2.gif",
              alt: "Merchandise animation",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Outcomes
    // =====================================================
    {
      headline: "Outcomes",
      sections: [
        {
          label: "The growth",
          paragraphs: [
            "Eat Grim reached 2,500 regular subscribers during the two-year collaboration. The work got people talking about food waste.",
          ],
        },
        {
          label: "Changing perception",
          paragraphs: [
            "The playful, punchy design made sustainability feel exciting instead of guilt-inducing. Bold images and color made the weekly box feel like a good choice.",
          ],
        },
        {
          label: "Long-term impact",
          paragraphs: [
            "Curious customers started telling their friends, and they kept choosing Eat Grim.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/eatgrim/grimsome.png",
              alt: "Eat Grim outcomes",
              color: "var(--color-ink)",
            },
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;
