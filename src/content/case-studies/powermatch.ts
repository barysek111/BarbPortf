import powermatchChapters from "./generated/powermatch.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy } from "./types";

export const powermatchCaseStudy = {
  slug: "powermatch-invoice-reconciliation",
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
    ...powermatchChapters,
  ],
} satisfies CaseStudy;
