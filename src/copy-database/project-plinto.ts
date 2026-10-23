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
// - Chapter: Mapping three operator states
// - Chapter: Design
// - Chapter: Prototype
// - Chapter: Next steps
export const plinto = {
  slug: "plinto",
  title: "Plinto: Designing an AI Invoice Approval Interface",
  aboutLabel: "ABOUT THE PROJECT",
  description: "A Round 3 design task for a Copenhagen fintech startup. I designed the invoice approval workspace where finance operators review AI recommendations, act through a split view and AI assistant chat, and move invoices across three clear states: Auto-matched, Needs review, and Blocked.",

  // =====================================================
  // PROJECT FACTS (role, client, year)
  // =====================================================
  meta: [
    {
      label: "MY ROLE",
      value: "UX Research\nInteraction Design\nUI Design\nPrototyping",
    },
    {
      label: "CLIENT",
      value: "Plinto",
    },
    {
      label: "YEAR",
      value: "2026",
    },
  ],

  // =====================================================
  // HERO IMAGE
  // =====================================================
  heroImage: {
    src: "/images/works/plinto/plinto-hero.jpg",
    alt: "Plinto invoice approval overview",
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
          label: "PROJECT BACKGROUND",
          paragraphs: [
            "Plinto is an early-stage startup building an AI assistant. This case study covers a product design task focused on the approval moment. After the AI has parsed an invoice, matched it to purchase orders, and assigned a status, the user needs to understand that status and what to do next.",
          ],
        },
        {
          label: "GOAL 01",
          paragraphs: [
            "Collapse complex backend logic into three operator-facing states, without hiding the nuance inside each state.",
          ],
        },
        {
          label: "GOAL 02",
          paragraphs: [
            "Make AI reasoning visible in the AI assistant pane so operators can trust good matches and challenge weak ones.",
          ],
        },
        {
          label: "GOAL 03",
          paragraphs: [
            "Design for speed on Auto-matched invoices while making Blocked cases hard to approve by mistake.",
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Mapping three operator states
    // =====================================================
    {
      headline: "Mapping three operator states",
      sections: [
        {
          label: "01 Auto-matched",
          paragraphs: [
            "PO, vendor, and amount align within policy. The operator confirms quickly. Primary action is approve swiftly and have AI summary available.",
          ],
        },
        {
          label: "02 Needs Review",
          paragraphs: [
            "A person has to judge. That covers variance, first-time vendors, policy edge cases, and other exceptions. The UI shows the specific issue and suggested next steps, and may ask for a reason or checklist before approval.",
          ],
        },
        {
          label: "03 Blocked",
          paragraphs: [
            "Hard stop. Duplicate suspicion, no PO match, or other conditions that should not proceed on a single click. Resolution options stay explicit and the AI assistant explains why approval is unavailable.",
          ],
          images: [
            {
              variant: "solid",
              src: "/images/works/plinto/plinto-diagram.svg",
              alt: "Three operator states: Auto-matched, Needs review, and Blocked",
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
          label: "Layout options",
          paragraphs: [
            "I tested three layout directions. Chat-forward with the AI assistant dominant. Dashboard-first with KPI strip and invoice table. Minimal decision card with compact facts. The control room layout with queue plus split view won because it matched how people actually worked.",
          ],
        },
        {
          label: "Interaction pattern",
          paragraphs: [
            "Selecting an invoice opens the AI assistant pane with context loaded. Quick actions in chat trigger typed replies, a brief thinking state, and AI confirmation. The action footer updates so approval shows as completed in place.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "solid",
              src: "/images/works/plinto/wireframe-conversational-ease.svg",
              alt: "Wireframe, conversational ease",
              description: "Dominant chat: prompting conversation",
              color: "var(--color-ink)",
            },
            {
              variant: "solid",
              src: "/images/works/plinto/wireframe-control-room.svg",
              alt: "Wireframe, control room",
              description: "Dashboard: Quick KPIs, batch overview",
              color: "var(--color-ink)",
            },
            {
              variant: "solid",
              src: "/images/works/plinto/wireframe-decision-card.svg",
              alt: "Wireframe, decision card",
              description: "Decision card: priority queue, prompted action for each invoice",
              color: "var(--color-ink)",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Prototype
    // =====================================================
    {
      headline: "Prototype",
      sections: [
        {
          label: "Deliverables",
          paragraphs: [
            "The final deliverable was a clickable HTML prototype of the workspace. Three desktop states: Auto-matched, Needs review, and Blocked. Each shows how the shared shell carries different content density and actions.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/plinto/automatched.png",
              alt: "Auto-matched invoice",
            },
            {
              variant: "solid",
              src: "/images/works/plinto/needsreview.png",
              alt: "Needs review invoice",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/plinto/blocked.png",
              alt: "Blocked invoice",
            },
            {
              variant: "solid",
              src: "/images/works/plinto/aichatwindows.png",
              alt: "AI assistant chat",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Next steps
    // =====================================================
    {
      headline: "Next steps",
      sections: [
        {
          label: "What I would test",
          paragraphs: [
            "Do AI replies feel faster than form buttons, or do they add uncertainty? When an invoice is Blocked, can operators find the right resolution without support?",
          ],
        },
        {
          label: "Next possible iteration",
          paragraphs: [
            "Next tasks are batch actions on Auto-matched, vendor management, tolerance rules per client, and analytics on overrides.",
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;
