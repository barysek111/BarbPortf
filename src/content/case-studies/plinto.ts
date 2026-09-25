import plintoChapters from "./generated/plinto.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy } from "./types";

export const plintoCaseStudy = {
  slug: "plinto-ai-invoicing",
  title: "Plinto: Designing an AI Invoice Approval Interface",
  aboutLabel: "about the project",
  description:
    "A Round 3 design task for a Copenhagen fintech startup. I designed the invoice approval workspace where finance operators review AI recommendations, act through a split view and copilot chat, and move invoices across three clear states: Auto-matched, Needs review, and Blocked.",
  meta: [
    {
      label: "My role",
      value: "UX Research\nInteraction Design\nUI Design\nPrototyping",
    },
    { label: "client", value: "Plinto" },
    { label: "year", value: "2026" },
  ],
  chapters: [
    buildScopeChapter(
      "Plinto is an early stage Copenhagen startup building an AI virtual controller for financial controlling. Finance teams processing dozens of invoices each week often work across disconnected tools with no single place to review AI output and record a decision. This case study covers a product design task focused on the approval moment: after the AI has parsed an invoice, matched it against purchase orders, and assigned a status, the operator needs to understand the recommendation and act with confidence.",
      "A generic approve or reject pattern breaks down in an AI-assisted workflow. A clean match should take seconds. A duplicate or missing PO should not allow a fast approval path. The interface had to express risk through a simple status model, adapt the detail panel and copilot conversation to each case, and keep every override documented.",
      [
        "Collapse complex backend logic into three operator facing states without hiding the nuance inside each state",
        "Make AI reasoning visible in the copilot pane so operators can trust good matches and challenge weak ones",
        "Design for speed on Auto-matched invoices while making Blocked cases structurally hard to bypass",
      ],
    ),
    ...plintoChapters,
  ],
} satisfies CaseStudy;
