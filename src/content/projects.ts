export type Thumb = { src: string; w: 160 | 320 };

export type Project = {
  slug: string;
  title: string;
  description: string;
  client: string;
  services: string;
  year: string;
  location: string;
  image: string;
  imageH: number;
  listImages: Thumb[];
  nextSlug: string;
  masonryY: number;
};

function listThumbs(slug: string, files: readonly string[]): Thumb[] {
  return files.map((file, index) => ({
    src: `/images/works/list/${slug}/${file}`,
    w: index === 2 ? 320 : 160,
  }));
}

/** Display height at 372px card width, from intrinsic dimensions. */
function cardHeight(width: number, height: number) {
  return Math.round((372 * height) / width);
}

const entries = [
  {
    file: "plinto-ai-invoicing.jpg",
    title: "Plinto AI Invoicing",
    slug: "plinto-ai-invoicing",
    client: "Plinto",
    services: "Product Design",
    summary:
      "Designing the human-AI handoff moment for an invoice approval workflow. A single decision component that adapts its interface, gating logic, and visual hierarchy to four risk levels.",
    year: "2026",
    location: "Copenhagen, Denmark",
    w: 1024,
    h: 1022,
    masonryY: 93,
    showcase: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
  {
    file: "powermatch-invoice-reconciliation.jpg",
    title: "Powermatch Invoice Reconciliation",
    slug: "powermatch-invoice-reconciliation",
    client: "Powermatch",
    services: "Product Design",
    summary:
      "Designing an invoice reconciliation feature. Replacing a fragmented cross-tool workflow with a flow for matching payments to invoices.",
    year: "2025",
    location: "Copenhagen, Denmark",
    w: 717,
    h: 963,
    masonryY: 326,
    showcase: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
  {
    file: "ageras-web-ux-ui.jpg",
    title: "Ageras Web UX:UI",
    slug: "ageras",
    client: "Ageras",
    services: "UX/UI Design",
    summary:
      "End-to-end website redesign across four markets, from wireframes and sitemaps to a final UI. Building the foundation for a comprehensive, responsive and scalable design system.",
    year: "2025",
    location: "Copenhagen, Denmark",
    w: 798,
    h: 1024,
    masonryY: 93,
    showcase: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
  {
    file: "coco-care-app.png",
    title: "Coco Care App",
    slug: "coco-care-app",
    client: "Coco Care",
    services: "Product Design",
    summary:
      "A digital physiotherapy platform designed to help patients recover at home and enable physiotherapists to track progress. I designed both the mobile app and web portal from user flows to interface details.",
    year: "2024",
    location: "Copenhagen, Denmark",
    w: 932,
    h: 1024,
    masonryY: 303,
    showcase: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
  {
    file: "rokoko-brand-identity.jpg",
    title: "Rokoko Brand Identity",
    slug: "rokoko-brand-identity",
    client: "Rokoko",
    services: "Brand Identity",
    summary:
      "Rebrand of everything from digital experience, SoMe campaigns, email templates, internal branding to print.",
    year: "2022",
    location: "Copenhagen, Denmark",
    w: 763,
    h: 1025,
    masonryY: 93,
    showcase: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
  {
    file: "rokoko-website-revamp.jpg",
    title: "Rokoko Website Revamp",
    slug: "rokoko-website-revamp",
    client: "Rokoko",
    services: "Web Design",
    summary: "Redesign of the company's main marketing website, webshop and a helpdesk site.",
    year: "2023",
    location: "Copenhagen, Denmark",
    w: 1009,
    h: 1310,
    masonryY: 707,
    showcase: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
  {
    file: "weld-digital-presence.svg",
    title: "Weld Digital Presence",
    slug: "weld-digital-presence",
    client: "Weld",
    services: "Digital Design",
    summary:
      "Website information architecture, wireframing, visual identity and illustration for a data SaaS company.",
    year: "2021",
    location: "Copenhagen, Denmark",
    w: 560,
    h: 560,
    masonryY: 0,
    showcase: ["01.svg", "02.png", "03.svg", "04.jpg"],
  },
  {
    file: "eat-grim-brand-identity.jpg",
    title: "Eat Grim Brand Identity",
    slug: "eat-grim-brand-identity",
    client: "Eat Grim",
    services: "Brand Identity",
    summary:
      "Brand guidelines and digital+print B2B and B2C presence for a sustainable subscription-based startup.",
    year: "2019–2021",
    location: "Copenhagen, Denmark",
    w: 946,
    h: 1147,
    masonryY: 707,
    showcase: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
  },
] as const;

export const projects: Project[] = entries.map((entry, index) => {
  const image = `/images/works/${entry.file}`;
  const nextSlug = entries[(index + 1) % entries.length].slug;

  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.summary,
    client: entry.client,
    services: entry.services,
    year: entry.year,
    location: entry.location,
    image,
    imageH: cardHeight(entry.w, entry.h),
    masonryY: entry.masonryY,
    listImages: listThumbs(entry.slug, entry.showcase),
    nextSlug,
  };
});

export function formatIndex(index: number) {
  return String(index + 1).padStart(3, "0");
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
