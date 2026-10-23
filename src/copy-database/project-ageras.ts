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
// - Chapter: Design goals & deliverables
// - Chapter: Direction
// - Chapter: Design System
// - Chapter: Prototype & Validation
export const ageras = {
  slug: "ageras",
  title: "Ageras Web UI/UX Consolidation",
  aboutLabel: "about the project",
  description: "A new web interface, and one UI/UX system, for a fintech SaaS suite used by small business owners.",

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
            "Ageras is a fintech SaaS provider. Small business owners use its tools for finances, invoicing, and accounting. The task was to bring a set of product websites into one brand and one product.",
          ],
        },
        {
          label: "01",
          paragraphs: [
            "Navigation patterns and content strategy for clarity and guidance.",
          ],
        },
        {
          label: "02",
          paragraphs: [
            "UI patterns that scale across regional product variants.",
          ],
        },
        {
          label: "03",
          paragraphs: [
            "A design system flexible enough to support Ageras's continued growth.",
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Design goals & deliverables
    // =====================================================
    {
      headline: "Design goals & deliverables",
      sections: [
        {
          label: "Refreshed visual identity",
          paragraphs: [
            "Establish a refreshed visual identity that's approachable, reliable, and distinctly Ageras.",
          ],
        },
        {
          label: "Custom iconography and illustration",
          paragraphs: [
            "Develop a custom icon, illustration, and image style to explain complex content and make the brand recognizable.",
          ],
        },
        {
          label: "New UI and UX for the website",
          paragraphs: [
            "Reimagine the website UI and UX so tasks are easy to finish and products are easy to find.",
          ],
        },
        {
          label: "Scalable design system for web",
          paragraphs: [
            "Build a design system the team can extend and customize as Ageras grows into new markets and product areas.",
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
          label: "Information architecture",
          paragraphs: [
            "The information architecture would put regional variants first without sacrificing global brand coherence. Homepage, product pages, pricing, support, and contact would all adapt to the user's region while feeling like one product.",
          ],
        },
        {
          label: "Regions and services overview",
          paragraphs: [
            "In this part of the process, I created an overview of what regions Ageras offers their products and what the local product and service offering is.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/ageras/sitemap-dk.svg",
              alt: "Sitemap DK",
              description: "Sitemap DK",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/ageras/login-signup-flow.png",
              alt: "Login and signup flow",
              description: "login & signup flow",
            },
            {
              variant: "solid",
              src: "/images/works/ageras/regions-and-services-overview.svg",
              alt: "Regions and services overview",
              description: "Regions and services overview",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Design System
    // =====================================================
    {
      headline: "Design System",
      sections: [
        {
          label: "Component library",
          paragraphs: [
            "Instead of regional silos, I built a scalable component library. Buttons, cards, modals, forms, navigation, tables, and specialized fintech components like account balances and transaction lists.",
          ],
        },
        {
          label: "Visual language",
          paragraphs: [
            "Custom iconography and illustration supported financial concepts visually. An icon set that felt trustworthy and modern. Images that showed real people, not stock photos, building their businesses.",
          ],
        },
        {
          label: "Section components",
          paragraphs: [
            "The system included modular section components. Feature highlights, testimonials, pricing tables, comparison matrices. Each could be used independently or combined into full pages. This approach meant building a new page took days instead of weeks.",
          ],
        },
        {
          label: "Documentation",
          paragraphs: [
            "I wrote documentation for every component and interaction pattern, with usage guidelines and practices, so the team can maintain the system and hand it on.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/ageras/diagram-ageras.svg",
              alt: "Ageras design system",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/ageras/layout-settings.png",
              alt: "Global layout settings for responsiveness and rhythm",
              description: "Global layout settings for responsiveness and rhythm",
            },
            {
              variant: "solid",
              src: "/images/works/ageras/base-components.svg",
              alt: "Base components",
              description: "Base components",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "background",
              src: "/images/works/ageras/icon-pack.svg",
              backgroundSrc: "/images/works/ageras/icons-background.png",
              alt: "Custom brand icon pack",
              description: "Custom brand icon pack",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/ageras/newagerasimgs.png",
              alt: "Website content library",
              description: "Website content library",
              color: "007751",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/ageras/component-docs-cards.png",
              alt: "Documentation and specs",
              description: "Documentation and specs",
            },
            {
              variant: "solid",
              src: "/images/works/ageras/component-docs-sections.png",
              alt: "Documentation and specs",
              description: "Documentation and specs",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Prototype & Validation
    // =====================================================
    {
      headline: "Prototype & Validation",
      sections: [
        {
          label: "Landing page templates",
          paragraphs: [
            "Each template adapts the message, value proposition, and call to action for that user segment and region. Conversion and landing-page practice stay the priority.",
          ],
        },
        {
          label: "High fidelity screens and component library ready to ship",
          paragraphs: [
            "These screens helped align stakeholders and gave engineering the details they needed to build.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/ageras/newwscreens.png",
              alt: "Page screens",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/ageras/pricing.svg",
              alt: "Pricing page",
              color: "002E33",
            },
          ],
        },
      ],
    },
  ],

  // =====================================================
  // PROJECT FACTS (role, client, year)
  // =====================================================
  meta: [
    {
      label: "My role",
      value: "UX/UI Design\nPrototyping\nUsability Testing\nBrand Identity\nEngineer Collaboration",
    },
    {
      label: "client",
      value: "Ageras",
    },
    {
      label: "year",
      value: "2025",
    },
  ],

  // =====================================================
  // HERO IMAGE
  // =====================================================
  heroImage: {
    src: "/images/works/ageras/ageras-hero.png",
    alt: "Ageras quote screen, expense chart, and logo",
    variant: "background",
    backgroundSrc: "/images/works/ageras/ageras-hero-background.png",
  },
} satisfies CaseStudy;
