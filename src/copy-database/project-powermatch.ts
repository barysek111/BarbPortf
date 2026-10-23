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
export const powermatch = {
  slug: "powermatch",
  title: "Powermatch: Designing an Invoice Reconciliation feature",
  aboutLabel: "about the project",
  description: "An invoice reconciliation feature for Powermatch's internal finance team. It replaces an error-prone workflow across tools with one interface for matching payments to invoices, handling edge cases, and keeping a full audit trail.",

  // =====================================================
  // PROJECT FACTS (role, client, year)
  // =====================================================
  meta: [
    {
      label: "My role",
      value: "UX Research\nUX & UI Design\nComponent System\nUser Flows\nDev Handoff",
    },
    {
      label: "client",
      value: "Powermatch",
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
    src: "/images/works/powermatch/pmhero.jpg",
    alt: "Powermatch reconciliation overview",
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
          label: "PROBLEM TO SOLVE",
          paragraphs: [
            "An internal finance team handles all billing between Powermatch and the companies it works with. Bank reconciliation was a critical daily task with no in-platform support.",
            "The previous workflow needed three tools to check that payments matched. The finance team cross-referenced Powermatch, an accounting platform, and a spreadsheet by hand.",
          ],
        },
        {
          label: "01",
          paragraphs: [
            "Match invoices to bank payments across two external tools with no in-platform support and no real-time sync",
          ],
        },
        {
          label: "02",
          paragraphs: [
            "Handle complex scenarios like partial payments and company balance surplus with no system logic — resolved manually every time",
          ],
        },
        {
          label: "03",
          paragraphs: [
            "Maintain no shared history of who confirmed, changed, or rejected any invoice-payment match",
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
          label: "Observation",
          paragraphs: [
            "I watched the finance team work. I saw the frustration of switching between tools. I mapped all the exception cases they encountered.",
          ],
        },
        {
          label: "Competitive patterns",
          paragraphs: [
            "I looked at how other B2B finance tools handled reconciliation. The pattern was clear: most tools used one layout for every exception type and only changed labels. That doesn't work when the actual complexity varies so much.",
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
          label: "Three operator states",
          paragraphs: [
            "Auto-matched invoices that the system already knows are correct. Needs review cases where human judgment is required. Blocked cases where something is wrong enough that a single click shouldn't approve.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/powermatch/powermatch-diagram.svg",
              alt: "The four features that replaced the three-tool workflow",
              description: "The four features that replaced the three-tool workflow. Analytics, bulk actions and cross-company views were left for V2.",
            },
          ],
        },
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/powermatch/pmflow.svg",
              alt: "Invoice matching user flow",
              description: "Flow mapping the main common path to matching an invoice. The journey was designed to be possible to complete without leaving the invoices page.",
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
          label: "Final screens",
          paragraphs: [
            "The feature spans three primary surfaces: the enhanced Invoices table, the dedicated Reconciliation Tab, and the Invoice Detail view with reconciliation sidebar and slide-in drawer. Together they cover every reconciliation scenario — from routine auto-match confirmation to complex partial-payment edge cases.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "solid",
              src: "/images/works/powermatch/details.svg",
              alt: "Invoice detail view",
            },
            {
              variant: "solid",
              src: "/images/works/powermatch/activitynew.svg",
              alt: "Activity log",
            },
            {
              variant: "solid",
              src: "/images/works/powermatch/activity.svg",
              alt: "Reconciliation states",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/powermatch/group-427323310.png",
              alt: "Navigating to Invoice Reconciliation and company focus",
              description: "Navigating to Invoice Reconciliation & Company focus",
              color: "2F2F2F",
            },
            {
              variant: "solid",
              src: "/images/works/powermatch/group-427323311.png",
              alt: "Choose company and overview",
              description: "Choose company & overview",
              color: "2F2F2F",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/powermatch/group-427323312.png",
              alt: "Invoice details auto-matched and partially matched",
              description: "Invoice Details (Auto-matched & Partially Matched)",
              color: "2F2F2F",
            },
            {
              variant: "solid",
              src: "/images/works/powermatch/group-427323313.png",
              alt: "Invoice page and activity log",
              description: "Invoice page & activity log",
              color: "2F2F2F",
            },
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;
