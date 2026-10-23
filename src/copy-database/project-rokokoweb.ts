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
export const rokokoWeb = {
  slug: "rokokoweb",
  title: "Rokoko Website Revamp",
  aboutLabel: "about the project",
  description: "Rokoko makes motion-capture software and hardware. The products let people bring animated characters to life with an intuitive, real-time, full-body system.",

  // =====================================================
  // PROJECT FACTS (role, client, year)
  // =====================================================
  meta: [
    {
      label: "My role",
      value: "UX/UI Design\nWireframing & Prototyping\nBrand Identity\nWeb Design\nDesign Systems",
    },
    {
      label: "client",
      value: "Rokoko",
    },
    {
      label: "year",
      value: "2023",
    },
  ],

  // =====================================================
  // HERO IMAGE
  // =====================================================
  heroImage: {
    src: "/images/works/rokokoweb/webrokokohero.png",
    alt: "Rokoko website overview",
    variant: "background",
    backgroundSrc: "/images/works/rokokoweb/fillllbckgr.png",
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
            "The product line was expanding, and the audience was becoming more global. The redesign still had to cover a complex set of needs and stay true to Rokoko's new brand.",
            "1. Make a site that stays clear, can grow, and tells a consistent story.\n2. Build an adaptable framework for marketing, and clear navigation between support and e-commerce.\n3. Develop a design system that stays coherent as features and content change.",
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
          label: "Site audit",
          paragraphs: [
            "I audited the existing site and mapped what worked and what didn't. Looked at how competitors structured their sites and where Rokoko could differentiate. Talked to users across different segments to understand what each audience actually came looking for.",
          ],
        },
        {
          label: "The opportunity",
          paragraphs: [
            "The competitive analysis showed most motion capture companies didn't serve diverse audiences well. That was the opportunity.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokoweb/competitors.svg",
              alt: "Competitor benchmarking chart",
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
          label: "Three zones, one brand",
          paragraphs: [
            "The site needed three distinct zones that felt like one brand. Marketing for discovery and storytelling. Knowledge base for support and learning. E-commerce for sales. Each would have different visual density and interaction patterns, but all three would feel like Rokoko.",
          ],
        },
        {
          label: "Information architecture",
          paragraphs: [
            "I mapped out the information architecture carefully. Product overviews. Industry solutions. Community resources. Support docs. Shop. Each section had a clear purpose and a logical entry point.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokoweb/rokokositemap.svg",
              alt: "Rokoko sitemap",
              description: "Sitemap for marketing website",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokoweb/comp.svg",
              alt: "Rokoko website components",
              description: "Overview of components needed for modular website section system",
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
          label: "Modular template system",
          paragraphs: [
            "I created modular templates so the marketing team could rapidly build new pages without design support. Homepage, product pages, industry solutions, user stories, pricing, help articles, shop product pages. Each template was flexible but on-brand.",
          ],
        },
        {
          label: "Design system documentation",
          paragraphs: [
            "The design system documented everything. Components, color rules, typography, interaction patterns, and responsive behavior. This made it possible for the Webflow developer to build without constant back-and-forth.",
          ],
        },
        {
          label: "Visual language",
          paragraphs: [
            "Visual exploration established the look and feel. The new brand was bold and modern. The website needed to match that energy while staying functional and fast.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokoweb/screens/1.png",
              alt: "Rokoko website",
            },
            {
              variant: "solid",
              src: "/images/works/rokokoweb/screens/2.png",
              alt: "Rokoko website",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokoweb/screens/3.png",
              alt: "Rokoko website",
            },
            {
              variant: "solid",
              src: "/images/works/rokokoweb/screens/4.png",
              alt: "Rokoko website",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokoweb/screens/5.png",
              alt: "Rokoko website",
            },
            {
              variant: "solid",
              src: "/images/works/rokokoweb/screens/6.png",
              alt: "Rokoko website",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "background",
              src: "/images/works/rokokoweb/screens/mobile.png",
              backgroundSrc: "/images/works/rokokoweb/fillllbckgr.png",
              alt: "Rokoko website on mobile",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/rokokoweb/screens/7.png",
              alt: "Rokoko website",
            },
            {
              variant: "solid",
              src: "/images/works/rokokoweb/screens/8.png",
              alt: "Rokoko website",
            },
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;
