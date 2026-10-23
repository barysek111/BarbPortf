import type { CaseStudy } from "./types";

export const libraryDriftCaseStudy = {
  slug: "library-drift",
  title: "Library Drift Design System Plugin",
  aboutLabel: "about the project",
  description:
    "A Figma plugin that scans design files for broken links to deleted components and deprecated variants. It solves a real problem for teams with complex, evolving design systems.",
  meta: [
    {
      label: "My role",
      value: "Plugin UI\nInteraction Design\nVibecoding\nProduction",
    },
    { label: "Tools", value: "Figma\nCursor" },
    { label: "year", value: "2026" },
  ],
  heroImage: {
    src: "/images/works/librarydrifther.png",
    alt: "Library Drift Figma plugin",
    variant: "background",
    backgroundSrc: "/images/works/herobackgrunddd.png",
  },
  chapters: [
    {
      headline: "Scope",
      sections: [
        {
          label: "Project Background",
          paragraphs: [
            "Our design system is large and in transition. As we evolve components, some get deleted, renamed, or deprecated. Designers working across legacy and new systems run into broken links all the time. They end up manually digging through Figma to find what's wrong. There was no plugin that did this well, so we built one.",
          ],
        },
        {
          label: "The Challenge",
          paragraphs: [
            "Design teams need a fast way to scan their files and find broken links without manually checking every component. The tool had to be simple enough to run with one click, clear enough to understand what's broken, and helpful enough to guide designers to fix it. The scan also had to work reasonably fast on individual frames without taking forever on huge files.",
          ],
        },
      ],
    },
    {
      headline: "Solution",
      sections: [
        {
          label: "How It Works",
          paragraphs: [
            "Library Drift scans a file or selection and catalogs every component instance. It compares each instance to the current library state. Each result uses badges for where it lives, what it is, and what's wrong. Library or Local. Component in blue, or Variant in purple. Deleted in black. Deprecated in gray.",
          ],
        },
        {
          label: "Issue Types & Visibility",
          paragraphs: [
            "The badges are there so a result can be read at a glance. Deleted means it's gone. Deprecated means it still exists in the library, just not in that form. Library versus Local, and Component versus Variant, say what you're looking at before you jump to it.",
          ],
        },
        {
          label: "Find on Canvas",
          paragraphs: [
            "One click on Find on canvas and Figma jumps you to the broken instance. No hunting. That single feature saves more time than anything else in the tool.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 1,
          frames: [
            {
              variant: "solid",
              src: "/images/works/library-drift/libdrift-diagram.svg",
              alt: "Three steps: scan the file, compare instances to the library, and summarize issues.",
              maxHeight: 400,
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/library-drift/group-10.svg",
              alt: "Library Drift scan results",
              color: "var(--color-ink)",
            },
            {
              variant: "solid",
              src: "/images/works/library-drift/group-11.svg",
              alt: "Library Drift scan results",
              color: "var(--color-ink)",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/library-drift/1111.svg",
              alt: "Library Drift scan results",
              color: "var(--color-ink)",
            },
            {
              variant: "solid",
              src: "/images/works/library-drift/2222.svg",
              alt: "Library Drift scan results",
              color: "var(--color-ink)",
            },
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;
