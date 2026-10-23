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
// - Chapter: Direction
// - Chapter: Principles and assets
// - Chapter: Outcomes
export const rokokoBrand = {
  slug: "rokokobrand",
  title: "Rokoko Brand Identity",
  aboutLabel: "about the project",
  description: "Rokoko builds intuitive, real-time motion-capture tools so artists can bring animated characters to life. This project is the rollout of the new brand identity.",

  // =====================================================
  // PROJECT FACTS (role, client, year)
  // =====================================================
  meta: [
    {
      label: "My role",
      value: "Brand Identity\nMerchandising\nDesign for print\nDesign systems\nPackaging design",
    },
    {
      label: "client",
      value: "Rokoko",
    },
    {
      label: "year",
      value: "2022",
    },
  ],

  // =====================================================
  // HERO IMAGE
  // =====================================================
  heroImage: {
    src: "/images/works/rokokobrand/herororkoko.png",
    alt: "Rokoko brand overview",
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
    // =====================================================
    // CHAPTER: Direction
    // =====================================================
    {
      headline: "Direction",
      sections: [
        {
          label: "Building the rules",
          paragraphs: [
            "With the new brand manual in hand, I established clear visual rules. Logo placement. Color specifications. Typography rules. Graphic elements and spacing systems. Every rule had to be flexible enough to work across print, digital, packaging, and merchandise.",
          ],
        },
        {
          label: "Consistent but flexible",
          paragraphs: [
            "The design system made the new brand consistent but not rigid. The core identity was strong enough that it would feel like Rokoko no matter where you encountered it.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/rokokobrand/logo-placement-example1.svg",
              alt: "Logo placement",
            },
            {
              variant: "fill",
              src: "/images/works/rokokobrand/logo-placement-example2.svg",
              alt: "Logo placement",
            },
            {
              variant: "fill",
              src: "/images/works/rokokobrand/logo-placement-example2-1.svg",
              alt: "Logo placement",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Principles and assets
    // =====================================================
    {
      headline: "Principles and assets",
      sections: [
        {
          label: "Presentation templates",
          paragraphs: [
            "I built Google Slides templates so teams could make decks that felt branded without a designer. That took hours off presentation prep.",
          ],
        },
        {
          label: "Social media system",
          paragraphs: [
            "Social media branding covered Instagram, Facebook, LinkedIn, and YouTube with templates and guidelines. Everything from grid posts to job listings to YouTube thumbnails carried the same visual language.",
          ],
        },
        {
          label: "Email templates",
          paragraphs: [
            "Email templates prioritized clarity and personality. Marketing could update them without rebuilding the layout. The tone was always friendly but professional.",
          ],
        },
        {
          label: "Packaging",
          paragraphs: [
            "Packaging for the first hardware product under the new brand was minimal and bold. Unboxing felt premium and deliberate, in line with Rokoko's position in the market.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokobrand/principles-slides-1.png",
              alt: "Deck template",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokobrand/principles-slides-2.png",
              alt: "Deck template",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "fill",
              src: "/images/works/rokokobrand/principles-some-1.jpg",
              alt: "Social media branding",
            },
            {
              variant: "fill",
              src: "/images/works/rokokobrand/principles-some-2.jpg",
              alt: "Social media branding",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokobrand/principles-jobads.svg",
              alt: "Job listings",
              color: "var(--color-ink)",
            },
            {
              variant: "solid",
              src: "/images/works/rokokobrand/principles-postss.png",
              alt: "Social posts",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokobrand/principles-emails.png",
              alt: "Email communication",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/rokokobrand/Headrig_20-copy.jpg",
              alt: "Headrig packaging",
            },
            {
              variant: "fill",
              src: "/images/works/rokokobrand/Headrig_21-copy.jpg",
              alt: "Headrig packaging",
            },
            {
              variant: "fill",
              src: "/images/works/rokokobrand/Headrig_23-copy.jpg",
              alt: "Headrig packaging",
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
          label: "Consistency by default",
          paragraphs: [
            "After the rebrand, Rokoko had one visual language across every platform. The team could make new assets without checking every decision. Consistency became the default.",
          ],
        },
        {
          label: "Market perception",
          paragraphs: [
            "The unified brand system changed how Rokoko read in the market. They felt more polished and more trustworthy: a company making innovative products, not one still experimenting with the technology.",
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;
