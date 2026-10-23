/**
 * HOW TO EDIT THIS FILE
 * - This text is for the internal archive page. It is not on the public website.
 * - Change the words inside the quotes. Leave the quotes in place.
 * - Keep commas between items, and keep the brackets [ ] and braces { }.
 */

// Contents:
// - Page title
// - Intro
// - Archived component note
// - Archived Coco Care block

export const archive = {
  // =====================================================
  // PAGE
  // =====================================================
  metaTitle: "Archive — internal",
  eyebrow: "internal — not linked, not indexed",
  title: "Archive",
  intro: "Components and case-study blocks taken off the live site. The copy stays here.",
  contentsLabel: "Contents",
  componentsLabel: "Components",
  blocksLabel: "Blocks",

  // =====================================================
  // ARCHIVED COMPONENT
  // =====================================================
  nextProjectCanvas: {
    id: "next-project-canvas",
    name: "NextProjectCanvas",
    note: "Scatter canvas next-project footer (scroll parallax). Live case studies use NextProject instead.",
  },

  // =====================================================
  // ARCHIVED BLOCK
  // =====================================================
  focusAreas: {
    id: "focus-areas",
    name: "Focus areas",
    from: "Coco Care",
    note: "Hidden from /cococare. Consistency, Transparency, Speed, and Reminders.",
    headline: "focus areas",
  },
} as const;
