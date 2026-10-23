import type { CaseStudy } from "./types";

const media = "/images/works/ageras";

function mediaSrc(file: string) {
  return `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
}

function solid(file: string, alt: string, description?: string, color?: string) {
  return { variant: "solid" as const, src: mediaSrc(file), alt, description, color };
}

function background(file: string, backgroundFile: string, alt: string, description?: string) {
  return {
    variant: "background" as const,
    src: mediaSrc(file),
    backgroundSrc: mediaSrc(backgroundFile),
    alt,
    description,
  };
}

function row(columns: 1 | 2 | 3, frames: readonly (ReturnType<typeof solid> | ReturnType<typeof background>)[]) {
  return { columns, frames };
}

export const agerasCaseStudy = {
  slug: "ageras",
  title: "Ageras Web UI/UX Consolidation",
  aboutLabel: "about the project",
  description:
    "A new web interface, and one UI/UX system, for a fintech SaaS suite used by small business owners.",
  chapters: [
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
        row(1, [solid("sitemap-dk.svg", "Sitemap DK", "Sitemap DK")]),
        row(2, [
          solid("login-signup-flow.png", "Login and signup flow", "login & signup flow"),
          solid("regions-and-services-overview.svg", "Regions and services overview", "Regions and services overview"),
        ]),
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
        row(1, [solid("diagram-ageras.svg", "Ageras design system")]),
        row(2, [
          solid(
            "layout-settings.png",
            "Global layout settings for responsiveness and rhythm",
            "Global layout settings for responsiveness and rhythm",
          ),
          solid("base-components.svg", "Base components", "Base components"),
        ]),
        row(1, [
          background("icon-pack.svg", "icons-background.png", "Custom brand icon pack", "Custom brand icon pack"),
        ]),
        row(1, [
          solid("newagerasimgs.png", "Website content library", "Website content library", "007751"),
        ]),
        row(2, [
          solid("component-docs-cards.png", "Documentation and specs", "Documentation and specs"),
          solid("component-docs-sections.png", "Documentation and specs", "Documentation and specs"),
        ]),
      ],
    },
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
        row(1, [solid("newwscreens.png", "Page screens")]),
        row(1, [solid("pricing.svg", "Pricing page", undefined, "002E33")]),
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
    src: "/images/works/ageras/ageras-hero.png",
    alt: "Ageras quote screen, expense chart, and logo",
    variant: "background",
    backgroundSrc: "/images/works/ageras/ageras-hero-background.png",
  },
} satisfies CaseStudy;
