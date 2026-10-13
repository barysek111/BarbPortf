import type { CaseStudy } from "./types";

const media = "/images/works/ageras";

function solid(file: string, alt: string, description?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, description };
}

function row(columns: 1 | 2 | 3, frames: ReturnType<typeof solid>[]) {
  return { columns, frames };
}

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
            "Ageras is a fintech SaaS provider delivering a suite of digital tools designed to empower small business owners with financial management, invoicing, and accounting solutions. With offerings available in multiple regions, I was brought in to consolidate and evolve the digital experience into a single, coherent system.",
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
            "Develop a custom iconography and illustration style, as well as image style, to clarify complex content and boost brand recognition.",
          ],
        },
        {
          label: "New UI and UX for the website",
          paragraphs: [
            "Reimagine the website's UI and UX for seamless task completion and easy product discovery.",
          ],
        },
        {
          label: "Scalable design system for web",
          paragraphs: [
            "Build a scalable design system, making it effortless to expand and customize the suite as Ageras grows into new markets and product areas.",
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
          solid("flooood.png", "Login and signup flow", "login & signup flow"),
          solid("ssss.svg", "Regions and services overview", "Regions and services overview"),
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
            "Detailed documentation was created for every component and interaction pattern, providing clear usage guidelines and best practices. This ensures maintainability and knowledge transfer as the team grows.",
          ],
        },
      ],
      imageRows: [
        row(3, [
          solid(
            "breakpoints.png",
            "Global layout settings for responsiveness and rhythm",
            "Global layout settings for responsiveness and rhythm",
          ),
          solid("buttons-filters.png", "Base components", "Base components"),
          solid("icons-use.png", "Custom brand icon pack", "Custom brand icon pack"),
        ]),
        row(1, [
          {
            ...solid("newagerasimgs.png", "Website content library", "Website content library"),
            color: "007751",
          },
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
            "Each template adapts key messaging, value propositions, and calls to action to the needs of specific user segments and regions, as well as keeping conversion and best marketing practices for landing pages as a top priority.",
          ],
        },
        {
          label: "High fidelity screens and component library ready to ship",
          paragraphs: [
            "These screens helped align stakeholders and gave the engineering team the precise details needed for development",
          ],
        },
      ],
      imageRows: [
        row(1, [solid("newwscreens.png", "Page screens")]),
        row(1, [{ ...solid("pricing.svg", "Pricing page"), color: "002E33" }]),
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
    src: "/images/works/ageras/agerasthumbnailprojectpage.jpg",
    alt: "Ageras website and mobile product screens",
    variant: "solid",
    color: "222222",
  },
} satisfies CaseStudy;
