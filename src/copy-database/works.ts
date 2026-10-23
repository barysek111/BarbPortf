/**
 * HOW TO EDIT THIS FILE
 * - Change the words inside the quotes. Leave the quotes in place.
 * - Apostrophes are safe inside these quotes, like I'm and don't.
 * - Keep commas between items, and keep the brackets [ ] and braces { }.
 * - To add or remove a project card, copy or delete one whole block.
 * - Each project also needs a matching file in this folder named project- and then the slug.
 * - To change the card picture, replace "image". To change the list pictures, replace the names in "listFiles".
 * - imageWidth and imageHeight are the picture's real pixel size. Update them if you replace the picture.
 * - Do not change "slug". The web address depends on it.
 */

// Contents:
// - Works heading and the grid / list switch
// - Project cards, in the order they appear on the page

export type WorkCardCopy = {
  slug: string;
  title: string;
  description: string;
  client: string;
  services: string;
  year: string;
  location: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  listFolder: string;
  listFiles: readonly string[];
  masonryY: number;
};

export const works = {
  // =====================================================
  // WORKS GRID (on the home page)
  // =====================================================
  heading: "LATEST WORK",
  grid: "grid",
  list: "list",
  viewProject: "view project",
  listImageAlt: "",

  // =====================================================
  // PROJECT CARDS
  // =====================================================
  projects: [{
  slug: "library-drift",
  title: "Library Drift Figma Plugin",
  description: "A Figma plugin that scans design files for broken links to deleted components and deprecated variants. It solves a real problem for teams with complex, evolving design systems.",
  client: "Saxo Bank",
  services: "Plugin Design",
  year: "2026",
  location: "Copenhagen, Denmark",
  image: "/images/works/library-drift-thumb.png",
  imageWidth: 1220,
  imageHeight: 1220,
  listFolder: "library-drift",
  listFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  masonryY: 93,
}, {
  slug: "plinto",
  title: "Plinto AI Invoicing",
  description: "Invoice approval workspace for a fintech startup: split view, AI assistant chat, and three states (Auto-matched, Needs review, and Blocked).",
  client: "Plinto",
  services: "Product Design",
  year: "2026",
  location: "Copenhagen, Denmark",
  image: "/images/works/plinto-ai-invoicing.jpg",
  imageWidth: 1080,
  imageHeight: 1350,
  listFolder: "plinto-ai-invoicing",
  listFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  masonryY: 93,
}, {
  slug: "powermatch",
  title: "Powermatch Invoice Reconciliation",
  description: "An invoice reconciliation feature that replaces a fragmented cross-tool workflow with one flow for matching payments to invoices.",
  client: "Powermatch",
  services: "Product Design",
  year: "2025",
  location: "Copenhagen, Denmark",
  image: "/images/works/powermatch-invoice-reconciliation.jpg",
  imageWidth: 1350,
  imageHeight: 1080,
  listFolder: "powermatch-invoice-reconciliation",
  listFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  masonryY: 326,
}, {
  slug: "ageras",
  title: "Ageras Web UX&UI",
  description: "End-to-end website redesign across four markets, from wireframes and sitemaps to final UI, and the foundation for a responsive, scalable design system.",
  client: "Ageras",
  services: "UX/UI Design",
  year: "2025",
  location: "Copenhagen, Denmark",
  image: "/images/works/ageras-web-ux-ui.jpg",
  imageWidth: 1080,
  imageHeight: 1500,
  listFolder: "ageras",
  listFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  masonryY: 93,
}, {
  slug: "cococare",
  title: "Coco Care App",
  description: "A digital physiotherapy platform designed to help patients recover at home and enable physiotherapists to track progress. I designed both the mobile app and web portal from user flows to interface details.",
  client: "Coco Care",
  services: "Product Design",
  year: "2024",
  location: "Copenhagen, Denmark",
  image: "/images/works/coco-care-app.jpg",
  imageWidth: 1080,
  imageHeight: 1350,
  listFolder: "coco-care-app",
  listFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  masonryY: 303,
}, {
  slug: "rokokobrand",
  title: "Rokoko Brand Identity",
  description: "Rebrand across digital, social campaigns, email templates, internal branding, and print.",
  client: "Rokoko",
  services: "Brand Identity",
  year: "2022",
  location: "Copenhagen, Denmark",
  image: "/images/works/rokoko-brand-identity.jpg",
  imageWidth: 1080,
  imageHeight: 1500,
  listFolder: "rokoko-brand-identity",
  listFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  masonryY: 93,
}, {
  slug: "rokokoweb",
  title: "Rokoko Website Revamp",
  description: "Redesign of the company's main marketing website, webshop and a helpdesk site.",
  client: "Rokoko",
  services: "Web Design",
  year: "2023",
  location: "Copenhagen, Denmark",
  image: "/images/works/rokokowebthumb.png",
  imageWidth: 1080,
  imageHeight: 1350,
  listFolder: "rokoko-website-revamp",
  listFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  masonryY: 707,
}, {
  slug: "weld",
  title: "Weld Digital Experience",
  description: "Website information architecture, wireframing, visual identity and illustration for a data SaaS company.",
  client: "Weld",
  services: "Digital Design",
  year: "2021",
  location: "Copenhagen, Denmark",
  image: "/images/works/weld-digital-presence.svg",
  imageWidth: 560,
  imageHeight: 560,
  listFolder: "weld-digital-presence",
  listFiles: ["01.svg", "02.png", "03.svg", "04.jpg"],
  masonryY: 0,
}, {
  slug: "eatgrim",
  title: "Eat Grim Brand",
  description: "Brand guidelines and digital+print B2B and B2C presence for a sustainable subscription-based startup.",
  client: "Eat Grim",
  services: "Brand Identity",
  year: "2019",
  location: "Copenhagen, Denmark",
  image: "/images/works/eat-grim-brand-identity.jpg",
  imageWidth: 946,
  imageHeight: 1147,
  listFolder: "eat-grim-brand-identity",
  listFiles: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  masonryY: 707,
}] satisfies readonly WorkCardCopy[],
} as const;
