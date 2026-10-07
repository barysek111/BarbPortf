import powermatchChapters from "./generated/powermatch.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy, CaseStudyChapter } from "./types";

const media = "/images/works/powermatch";

function solid(file: string, alt: string) {
  const src = `${media}/${file.split("/").map(encodeURIComponent).join("/")}`;
  return { variant: "solid" as const, src, alt };
}

function row(columns: 1 | 2 | 3, frames: ReturnType<typeof solid>[]) {
  return { columns, frames };
}

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Research") {
    return {
      ...chapter,
      imageRows: [row(1, [solid("competitor-analysis.png", "Competitor analysis")])],
    };
  }

  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [row(1, [solid("invoices-tab.png", "Invoices tab, V1 scope")])],
    };
  }

  if (chapter.headline === "Design") {
    const layoutIndex = chapter.sections.findIndex((section) => section.label === "Layout exploration");
    const sections =
      layoutIndex === -1
        ? [...chapter.sections, { label: "Wireframes", paragraphs: [] }]
        : [
            ...chapter.sections.slice(0, layoutIndex + 1),
            { label: "Wireframes", paragraphs: [] },
            ...chapter.sections.slice(layoutIndex + 1),
          ];

    return {
      ...chapter,
      sections,
      imageRows: [
        row(1, [solid("nav-exploration.png", "Navigation structure")]),
        row(1, [solid("layout-exploration.png", "Layout exploration")]),
        row(1, [solid("Powermatch-userflow.svg", "User flow")]),
        row(1, [solid("recon-tab-large.png", "Reconciliation tab")]),
        row(1, [solid("recon-tab-choose-company.png", "Choose company")]),
        row(1, [solid("recon-tab-pending-approval.png", "Pending approval")]),
        row(1, [solid("recon-invoice-partial-match.png", "Partial match")]),
        row(1, [solid("invoices-tab.png", "Invoices tab")]),
        row(1, [solid("invoice-detail-auto-matched.png", "Invoice detail, auto-matched")]),
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
    "Designing an invoice reconciliation feature for Powermatch's internal finance team to replace an error-prone cross-tool workflow with a single interface for matching payments to invoices, handling edge cases, and maintaining a full audit trail.",
  meta: [
    {
      label: "My role",
      value: "UX Research\nUX & UI Design\nComponent System\nUser Flows\nDev Handoff",
    },
    { label: "client", value: "Powermatch" },
    { label: "year", value: "2025" },
  ],
  heroImage: {
    src: "/images/works/powermatch/pw1hero.jpg",
    alt: "Powermatch reconciliation overview",
  },
  chapters: [
    buildScopeChapter(
        "Powermatch is a Danish B2B staffing platform that manages the full lifecycle between companies and their contractors — from recruitment and matching to timesheets and invoicing. An internal finance team handles all billing between Powermatch and the companies it works with. Bank reconciliation — verifying that every issued invoice has a matching bank payment — was a critical daily task with no in-platform support.",
        "Three tools, no sync, no shared logic. The finance team was manually cross-referencing Powermatch, the e-conomic accounting platform, and a manually-refreshed Google Sheet to reconcile invoices and payments — with no support for edge cases and no record of who made any change.",
        [
          "Match invoices to bank payments across two external tools — with no in-platform support and no real-time sync",
          "Handle complex scenarios like partial payments and company balance surplus with no system logic — resolved manually every time",
          "Maintain no shared history of who confirmed, changed, or rejected any invoice-payment match",
        ],
    ),
    ...powermatchChapters.map(withImageRows),
  ],
} satisfies CaseStudy;
