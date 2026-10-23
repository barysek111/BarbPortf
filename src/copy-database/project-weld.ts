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
// - Chapter: Outcomes
export const weld = {
  slug: "weld",
  title: "Weld Website Revamp",
  aboutLabel: "about the project",
  description: "Website information architecture, wireframing, visual identity and illustration for a data SaaS company.",

  // =====================================================
  // PROJECT FACTS (role, client, year)
  // =====================================================
  meta: [
    {
      label: "My role",
      value: "Brand Identity\nInformation Architecture\nWireframing\nIllustration\nWeb Design",
    },
    {
      label: "client",
      value: "Weld",
    },
    {
      label: "year",
      value: "2021",
    },
  ],

  // =====================================================
  // HERO IMAGE
  // =====================================================
  heroImage: {
    src: "/images/works/weld/weldhero.png",
    alt: "Weld website overview",
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
    // =====================================================
    // CHAPTER: Research
    // =====================================================
    {
      headline: "Research",
      sections: [
        {
          label: "Audit findings",
          paragraphs: [
            "I audited Weld's existing assets and looked at how competitors positioned themselves. Icons, colors, and hierarchy were inconsistent. The site felt like several people had designed it with no shared direction.",
          ],
        },
        {
          label: "Competitive analysis",
          paragraphs: [
            "I looked at direct and indirect competitors: what worked, what felt dated, and where Weld could stand apart. Everyone else was trying to look serious. That left room for personality.",
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
          label: "Website clarity",
          paragraphs: [
            "The priority was clarity: what Weld does, who it's for, and why they should care. Each page had one job, whether that was explaining features, showing pricing, or getting people to sign up.",
          ],
        },
        {
          label: "Brand refresh",
          paragraphs: [
            "I refreshed the visual identity with a bold palette and clean typography. The logo stayed. Everything around it got tighter, and custom icons and illustration added character without losing credibility.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/weld/weldsitemap.svg",
              alt: "Weld sitemap",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "solid",
              src: "/images/works/weld/direction-shape-6206.svg",
              alt: "Weld brand language",
              color: "var(--color-ink)",
            },
            {
              variant: "solid",
              src: "/images/works/weld/direction-shape-6207.svg",
              alt: "Weld brand language",
              color: "var(--color-ink)",
            },
            {
              variant: "solid",
              src: "/images/works/weld/direction-shape-6208.svg",
              alt: "Weld brand language",
              color: "var(--color-ink)",
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
          label: "Design system foundation",
          paragraphs: [
            "The brand system became a Figma library: components, grids, color tokens, and icons. Prototyping got faster, and developers had a clear handoff.",
          ],
        },
        {
          label: "Website redesign",
          paragraphs: [
            "Homepage, pricing, signup, resources, and product pages were rebuilt on the new identity. Navigation was clarified, and the information architecture was reworked so visitors could find what they needed.",
          ],
        },
        {
          label: "Brand personality",
          paragraphs: [
            "Custom icons and illustrations supported the copy instead of replacing it. Infographics carried the harder ideas. The result stayed professional, but not cold.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/weld/weld-website-screens.png",
              alt: "Weld website screens",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/weld/weldscreens.png",
              alt: "Weld website screens",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/weld/weldiconsss.svg",
              alt: "Weld icon pack",
              description: "Custom icon pack",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/weld/weld-website-components1.svg",
              alt: "Website components",
              description: "modular website components with theme switching",
              color: "E6E6E6",
            },
            {
              variant: "solid",
              src: "/images/works/weld/weld-website-components2.svg",
              alt: "Website components",
              description: "modular website components with theme switching",
              color: "E6E6E6",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/weld/Group-13358-1.svg",
              alt: "Website illustration",
            },
            {
              variant: "fill",
              src: "/images/works/weld/Group-13589.svg",
              alt: "Website illustration",
            },
            {
              variant: "fill",
              src: "/images/works/weld/Group-13540.svg",
              alt: "Website illustration",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/weld/Group-13359.svg",
              alt: "Website illustration",
            },
            {
              variant: "fill",
              src: "/images/works/weld/Group-13358-2.svg",
              alt: "Website illustration",
            },
            {
              variant: "fill",
              src: "/images/works/weld/Group-13357-2.svg",
              alt: "Website illustration",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/weld/Group-13360.svg",
              alt: "Website illustration",
            },
            {
              variant: "fill",
              src: "/images/works/weld/Group-13486.svg",
              alt: "Website illustration",
            },
            {
              variant: "fill",
              src: "/images/works/weld/Group-13982.svg",
              alt: "Website illustration",
            },
          ],
        },
        {
          columns: 3,
          frames: [
            {
              variant: "fill",
              src: "/images/works/weld/Group-13357-1.svg",
              alt: "Website illustration",
            },
            {
              variant: "fill",
              src: "/images/works/weld/Group-13478-1.svg",
              alt: "Website illustration",
            },
            {
              variant: "fill",
              src: "/images/works/weld/Group-13358.svg",
              alt: "Website illustration",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/weld/weld-meta-images.png",
              alt: "Weld meta images",
              color: "E6E6E6",
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
          label: "Foundation for growth",
          paragraphs: [
            "New features and pages could ship from the design system instead of starting over. The brand stayed consistent across the website and the product.",
          ],
        },
        {
          label: "Clear communication",
          paragraphs: [
            "The website finally said what Weld did and why anyone should use it. Across the redesign, the message was the same: Weld is the trustworthy way to connect your data tools.",
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;
