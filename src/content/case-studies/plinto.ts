import plintoChapters from "./generated/plinto.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/plinto";

function solid(file: string, alt: string, description?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, description };
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
          solid(
            "wireframe-conversational-ease.svg",
            "Wireframe, conversational ease",
            "Conversational: Chat-forward layout with copilot dominant",
          ),
          solid(
            "wireframe-control-room.svg",
            "Wireframe, control room",
            "Dashboard: layout with KPIs, filter and batch overview",
          ),
          solid(
            "wireframe-decision-card.svg",
            "Wireframe, decision card",
            "Decision card: Clean queue and focused decision card",
          ),
        ]),
      ],
    };
  }

  if (chapter.headline === "Prototype") {
    return {
      ...chapter,
      imageRows: [
        row(2, [
          solid("screens exports/Auto-matched invoice.jpg", "Auto-matched invoice"),
          solid("screens exports/Needs review invoice.jpg", "Needs review invoice"),
        ]),
        row(2, [
          solid("screens exports/Blocked invoice.jpg", "Blocked invoice"),
          solid("screens exports/ai chat screens.jpg", "Copilot chat"),
        ]),
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
    src: "/images/works/plinto/plinto-hero.jpg",
    alt: "Plinto invoice approval overview",
    variant: "fill",
  },
  chapters: [
    {
      headline: "SCOPE",
      sections: [
        {
          label: "PROJECT BACKGROUND",
          paragraphs: [
            "Plinto is an early stage startup building an AI virtual controller. This case study covers a product design task focused on the approval moment: after the AI has parsed an invoice, matched it against purchase orders, and assigned a status, the user needs to understand status and next steps.",
          ],
        },
        {
          label: "GOAL 01",
          paragraphs: [
            "Collapse complex backend logic into three operator facing states without hiding the nuance inside each state.",
          ],
        },
        {
          label: "GOAL 02",
          paragraphs: [
            "Make AI reasoning visible in the copilot pane so operators can trust good matches and challenge weak ones.",
          ],
        },
        {
          label: "GOAL 03",
          paragraphs: [
            "Design for speed on Auto-matched invoices while making Blocked cases structurally hard to bypass.",
          ],
        },
      ],
    },
    ...plintoChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
