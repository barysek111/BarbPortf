import powermatchChapters from "./generated/powermatch.json";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/powermatch";

function solid(file: string, alt: string, description?: string, color?: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt, description, color };
}

function row(columns: 1 | 2 | 3, frames: ReturnType<typeof solid>[]) {
  return { columns, frames };
}

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        row(1, [
          solid(
            "powermatch-diagram.svg",
            "The four features that replaced the three-tool workflow",
            "The four features that replaced the three-tool workflow. Analytics, bulk actions and cross-company views were left for V2.",
          ),
        ]),
        row(1, [
          solid(
            "pmflow.svg",
            "Invoice matching user flow",
            "Flow mapping the main common path to matching an invoice. The journey was designed to be possible to complete without leaving the invoices page.",
          ),
        ]),
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        row(3, [
          solid("details.svg", "Invoice detail view"),
          solid("activitynew.svg", "Activity log"),
          solid("activity.svg", "Reconciliation states"),
        ]),
        row(2, [
          solid(
            "group-427323310.png",
            "Navigating to Invoice Reconciliation and company focus",
            "Navigating to Invoice Reconciliation & Company focus",
            "2F2F2F",
          ),
          solid(
            "group-427323311.png",
            "Choose company and overview",
            "Choose company & overview",
            "2F2F2F",
          ),
        ]),
        row(2, [
          solid(
            "group-427323312.png",
            "Invoice details auto-matched and partially matched",
            "Invoice Details (Auto-matched & Partially Matched)",
            "2F2F2F",
          ),
          solid(
            "group-427323313.png",
            "Invoice page and activity log",
            "Invoice page & activity log",
            "2F2F2F",
          ),
        ]),
      ],
    };
  }

  return chapter;
}

export const powermatchCaseStudy = {
  slug: "powermatch",
  title: "Powermatch: Designing an Invoice Reconciliation feature",
  aboutLabel: "about the project",
  description:
    "An invoice reconciliation feature for Powermatch's internal finance team. It replaces an error-prone workflow across tools with one interface for matching payments to invoices, handling edge cases, and keeping a full audit trail.",
  meta: [
    {
      label: "My role",
      value: "UX Research\nUX & UI Design\nComponent System\nUser Flows\nDev Handoff",
    },
    { label: "client", value: "Powermatch" },
    { label: "year", value: "2025" },
  ],
  heroImage: {
    src: "/images/works/powermatch/pmhero.jpg",
    alt: "Powermatch reconciliation overview",
    variant: "fill",
  },
  chapters: [
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
    ...powermatchChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
