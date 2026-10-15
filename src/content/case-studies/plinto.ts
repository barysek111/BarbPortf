import plintoChapters from "./generated/plinto.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/plinto";

function solid(file: string, alt: string, description?: string, color?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, description, color };
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
            "Dominant chat: prompting conversation",
            "var(--color-ink)",
          ),
          solid(
            "wireframe-control-room.svg",
            "Wireframe, control room",
            "Dashboard: Quick KPIs, batch overview",
            "var(--color-ink)",
          ),
          solid(
            "wireframe-decision-card.svg",
            "Wireframe, decision card",
            "Decision card: priority queue, prompted action for each invoice",
            "var(--color-ink)",
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
          solid("automatched.png", "Auto-matched invoice"),
          solid("needsreview.png", "Needs review invoice"),
        ]),
        row(2, [
          solid("blocked.png", "Blocked invoice"),
          solid("aichatwindows.png", "AI assistant chat"),
        ]),
      ],
    };
  }

  return chapter;
}

export const plintoCaseStudy = {
  slug: "plinto",
  title: "Plinto: Designing an AI Invoice Approval Interface",
  aboutLabel: "ABOUT THE PROJECT",
  description:
    "A Round 3 design task for a Copenhagen fintech startup. I designed the invoice approval workspace where finance operators review AI recommendations, act through a split view and AI assistant chat, and move invoices across three clear states: Auto-matched, Needs review, and Blocked.",
  meta: [
    {
      label: "MY ROLE",
      value: "UX Research\nInteraction Design\nUI Design\nPrototyping",
    },
    { label: "CLIENT", value: "Plinto" },
    { label: "YEAR", value: "2026" },
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
            "Plinto is an early stage startup building an AI assistant. This case study covers a product design task focused on the approval moment: after the AI has parsed an invoice, matched it against purchase orders, and assigned a status, the user needs to understand status and next steps.",
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
    ...plintoChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
