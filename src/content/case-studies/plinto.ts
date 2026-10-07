import plintoChapters from "./generated/plinto.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/plinto";

function solid(file: string, alt: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt };
}

function row(columns: 1 | 2 | 3, frames: ReturnType<typeof solid>[]) {
  return { columns, frames };
}

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          solid("wireframe-conversational-ease.svg", "Wireframe, conversational ease"),
          solid("wireframe-control-room.svg", "Wireframe, control room"),
          solid("wireframe-decision-card.svg", "Wireframe, decision card"),
        ]),
      ],
    };
  }

  if (chapter.headline === "Prototype") {
    return {
      ...chapter,
      imageRows: [
        row(1, [solid("screens exports/Auto-matched invoice.jpg", "Auto-matched invoice")]),
        row(1, [solid("screens exports/Needs review invoice.jpg", "Needs review invoice")]),
        row(1, [solid("screens exports/Blocked invoice.jpg", "Blocked invoice")]),
        row(1, [solid("screens exports/ai chat screens.jpg", "Copilot chat")]),
      ],
    };
  }

  return chapter;
}

export const plintoCaseStudy = {
  slug: "plinto",
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
  heroImage: {
    src: "/images/works/plinto/plinto%20project%20hero.jpg",
    alt: "Plinto invoice approval overview",
  },
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
    ...plintoChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
