import powermatchChapters from "./generated/powermatch.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy, CaseStudyChapter } from "./types";

const fill = (src: string, alt: string) => ({ variant: "fill" as const, src, alt });
const solid = (src: string, alt: string) => ({ variant: "solid" as const, src, alt });

const pm = "/images/works/powermatch";

function withImageRows(chapter: CaseStudyChapter): CaseStudyChapter {
  if (chapter.headline === "Research") {
    return {
      ...chapter,
      imageRows: [
        {
          columns: 1,
          frames: [
            solid(`${pm}/research.jpg`, "Powermatch research into the finance reconciliation workflow"),
          ],
        },
        {
          columns: 1,
          frames: [fill(`${pm}/invoices-tab.png`, "Powermatch invoices tab")],
        },
      ],
    };
  }

  if (chapter.headline === "Direction") {
    return {
      ...chapter,
      imageRows: [
        {
          columns: 2,
          frames: [
            solid(`${pm}/group-28.svg`, "Direction exploration one"),
            solid(`${pm}/group-29.svg`, "Direction exploration two"),
          ],
        },
        {
          columns: 3,
          frames: [
            solid(`${pm}/group-30.svg`, "Direction frame V1"),
            solid(`${pm}/group-31.svg`, "Direction frame V2"),
            solid(`${pm}/group-32.svg`, "Direction frame V3"),
          ],
        },
      ],
    };
  }

  if (chapter.headline === "Design") {
    return {
      ...chapter,
      imageRows: [
        {
          columns: 1,
          frames: [solid(`${pm}/choose-company.jpg`, "Choose company")],
        },
        {
          columns: 3,
          frames: [
            solid(`${pm}/choose-company-1.jpg`, "Choose company detail"),
            solid(`${pm}/choose-company-allow-balance.jpg`, "Choose company, allow balance matching"),
            solid(`${pm}/choose-company-2.jpg`, "Choose company alternate"),
          ],
        },
        {
          columns: 3,
          frames: [
            solid(`${pm}/invoice-details-1.svg`, "Invoice details, auto-matched"),
            solid(`${pm}/invoice-details-2.svg`, "Invoice details, auto-matched state two"),
            solid(`${pm}/invoice-details-3.svg`, "Invoice details, auto-matched state three"),
          ],
        },
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
    src: "/images/works/powermatch/hero.jpg",
    alt: "Powermatch invoice reconciliation interface",
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
