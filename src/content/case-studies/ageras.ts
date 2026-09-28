import type { CaseStudy } from "./types";

export const agerasCaseStudy = {
  slug: "ageras",
  title: "Ageras Website UI/UX Consolidation",
  aboutLabel: "about the project",
  description:
    "Reinventing the approach to web interface and consolidating digital UI/UX for a fintech SaaS suite catering to small business owners.",
  chapters: [
    {
      headline: "SCOPE",
      sections: [
        {
          label: "PROJECT BACKGROUND",
          paragraphs: [
            "Ageras was consolidating. Different websites for different regions, different products, different visual languages. The transition meant building one site that could flex to regional needs without losing its identity. I started with research and ended with a design system that would support growth.",
          ],
        },
        {
          label: "The challenge",
          paragraphs: [
            "The task was to consolidate a diverse set of websites for different products, to reflect the transition into one brand and one product. I created one cohesive interface, while ensuring an intuitive, streamlined experience for small business customers of varying tech backgrounds. This meant rethinking:",
            "1. Navigation patterns and content strategy for clarity and guidance.\n2. UI patterns that scale across regional product variants.\n3. A design system flexible enough to support Ageras's continued growth.",
          ],
        },
      ],
    },
    {
      headline: "The Challenge",
      sections: [
        {
          label: "The customization problem",
          paragraphs: [
            "Small business owners using Ageras come from different countries, speak different languages, and have different local regulations. The website needed to reflect that. But it also needed to feel like one product, not a patchwork of regional variants.",
          ],
        },
        {
          label: "System flexibility",
          paragraphs: [
            "The design system had to be powerful enough to support customization without fracturing. Flexible, but not so flexible that it became inconsistent.",
          ],
        },
      ],
    },
    {
      headline: "Research",
      sections: [
        {
          label: "What I audited",
          paragraphs: [
            "I audited the existing digital presence. Looked at what was working in one region and failing in another. Talked to stakeholders across regions about what mattered most locally.",
          ],
        },
        {
          label: "Competitive landscape",
          paragraphs: [
            "The competitive analysis told me fintech players were either too complicated or too simplistic. There was room in the middle.",
          ],
        },
        {
          label: "Regional mapping",
          paragraphs: [
            "I mapped which products were available in which regions, what messaging resonated where, and what the legal and compliance requirements meant for content and disclosure.",
          ],
        },
      ],
    },
    {
      headline: "Direction",
      sections: [
        {
          label: "Modular approach",
          paragraphs: [
            "The site would be built in modular components so each region could customize without rebuilding. A global navigation framework. Regional product sitemaps. Flexible landing pages that could be tailored to local needs.",
          ],
        },
        {
          label: "Information architecture",
          paragraphs: [
            "The information architecture would put regional variants first without sacrificing global brand coherence. Homepage, product pages, pricing, support, and contact would all adapt to the user's region while feeling like one product.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 2 as const,
          frames: [
            {
              variant: "fill" as const,
              src: "/images/works/ageras/sitemaps-dk.jpg",
              alt: "Website sitemap Denmark — organic and paid traffic structures",
            },
            {
              variant: "fill" as const,
              src: "/images/works/ageras/sitemaps-nl.jpg",
              alt: "Website sitemap Netherlands — organic and paid traffic structures",
            },
          ],
        },
        {
          columns: 1 as const,
          frames: [
            {
              variant: "solid" as const,
              src: "/images/works/ageras/login-exploration.jpg",
              alt: "Signup and login flow exploration across payroll, invoicing, and partner paths",
            },
          ],
        },
      ],
    },
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
          label: "Documentation approach",
          paragraphs: [
            "I created detailed documentation for every component. Usage guidelines. States. Responsive behavior. Color and spacing rules. This made it possible for developers to ship consistent implementations without constant design review.",
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
      ],
      imageRows: [
        {
          columns: 2 as const,
          frames: [
            {
              variant: "solid" as const,
              src: "/images/works/ageras/documentation-1.png",
              alt: "Design system documentation overview",
            },
            {
              variant: "solid" as const,
              src: "/images/works/ageras/design-system-screenshot-2025-09-17.png",
              alt: "Design system documentation in Figma",
            },
          ],
        },
        {
          columns: 2 as const,
          frames: [
            {
              variant: "solid" as const,
              src: "/images/works/ageras/design-system-main.jpg",
              alt: "Ageras design system main styles",
            },
            {
              variant: "solid" as const,
              src: "/images/works/ageras/design-system-buttons-filter.jpg",
              alt: "Buttons and filter components",
            },
          ],
        },
        {
          columns: 2 as const,
          frames: [
            {
              variant: "solid" as const,
              src: "/images/works/ageras/design-system-modals-2.jpg",
              alt: "Modal components set two",
            },
            {
              variant: "solid" as const,
              src: "/images/works/ageras/design-system-modals-1.jpg",
              alt: "Modal components set one",
            },
          ],
        },
        {
          columns: 1 as const,
          frames: [
            {
              variant: "solid" as const,
              src: "/images/works/ageras/design-system-components.jpg",
              alt: "Ageras design system component library overview",
            },
          ],
        },
        {
          columns: 2 as const,
          frames: [
            {
              variant: "solid" as const,
              src: "/images/works/ageras/design-system-icons.jpg",
              alt: "Ageras design system icon set",
            },
            {
              variant: "solid" as const,
              src: "/images/works/ageras/ageras-tabs-images.png",
              alt: "Ageras tabbed imagery for product marketing",
            },
          ],
        },
      ],
    },
    {
      headline: "Prototype & Validation",
      sections: [
        {
          label: "Landing page templates",
          paragraphs: [
            "I created main landing pages for clarity and conversion. Each template adapted key messaging and value propositions to regional and user segment needs. High fidelity mockups demonstrated the final look and feel and guided the engineering team on implementation details.",
          ],
        },
        {
          label: "Regional feedback loops",
          paragraphs: [
            "The designs went through rounds of feedback with stakeholders across regions. What worked in Denmark needed tweaking for the Netherlands. What resonated with freelancers didn't work for small studios. The system had to be strong enough to handle that variety.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 2 as const,
          frames: [
            {
              variant: "solid" as const,
              src: "/images/works/ageras/fullpages-1.png",
              alt: "Ageras full-page landing design one",
            },
            {
              variant: "solid" as const,
              src: "/images/works/ageras/fullpages-2.png",
              alt: "Ageras full-page landing design two",
            },
          ],
        },
        {
          columns: 3 as const,
          frames: [
            {
              variant: "fill" as const,
              src: "/images/works/ageras/webmockup-5.jpg",
              alt: "Ageras website mockup five",
            },
            {
              variant: "fill" as const,
              src: "/images/works/ageras/webmockup-4.jpg",
              alt: "Ageras website mockup four",
            },
            {
              variant: "fill" as const,
              src: "/images/works/ageras/webmockup-3.jpg",
              alt: "Ageras website mockup three",
            },
          ],
        },
      ],
    },
    {
      headline: "Outcomes",
      sections: [
        {
          label: "Cohesive multi-market presence",
          paragraphs: [
            "After implementation, Ageras had one cohesive website that felt right in every market. The system was flexible enough that regional teams could customize landing pages and messaging without touching the core design.",
          ],
        },
        {
          label: "Speed to market",
          paragraphs: [
            "Most importantly, the design system meant new pages and features could ship fast. The developers had clear specs. The designers had clear rules. New regional variants didn't require new design work.",
          ],
        },
        {
          label: "The core principle",
          paragraphs: [
            "The best systems are prescriptive about what matters and flexible about everything else. Strong enough to maintain brand coherence. Loose enough to adapt to real-world complexity.",
          ],
        },
      ],
    },
  ],
  meta: [
    {
      label: "My role",
      value:
        "UX/UI Design\nPrototyping\nUsability Testing\nBrand Identity\nEngineer Collaboration",
    },
    { label: "client", value: "Ageras" },
    { label: "year", value: "2025" },
  ],
  heroImage: {
    src: "/images/works/ageras/hero.png",
    alt: "Ageras website and mobile product screens",
  },
} satisfies CaseStudy;
