import type { CaseStudy } from "./types";

const PLACEHOLDER = "/images/imgplaceholder.jpg";

function frame(description: string) {
  return { variant: "solid" as const, src: PLACEHOLDER, alt: "", description };
}

export const libraryDriftCaseStudy = {
  slug: "library-drift",
  title: "Library Drift: Design System Auditor Plugin",
  aboutLabel: "about the project",
  description:
    "A Figma plugin that scans design files to detect broken links to deleted components and deprecated variants. Solves a real problem for teams working with complex, evolving design systems.",
  meta: [
    {
      label: "My role",
      value: "Plugin UI\nInteraction Design\nVibecoding\nProduction",
    },
    { label: "Tools", value: "Figma\nCursor" },
    { label: "year", value: "2026" },
  ],
  heroImage: {
    src: "/images/works/library-drift.jpg",
    alt: "Library Drift Figma plugin",
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
      imageRows: [
        {
          columns: 2,
          frames: [
            frame(
              '(HERE ADD SCREENSHOT OF PLUGIN SCANNING UI - showing the scan interface with buttons and API token setup). What to show: The initial plugin UI with the Scan button, token field, and "How to" instructions visible',
            ),
            frame(
              '(HERE ADD SCREENSHOT OF PLUGIN SCANNING UI - showing the scan interface with buttons and API token setup). What to show: The initial plugin UI with the Scan button, token field, and "How to" instructions visible',
            ),
          ],
        },
      ],
    },
    {
      headline: "Problem",
      sections: [
        {
          label: "What's Broken",
          paragraphs: [
            "When we delete or deprecate a component, instances still exist in older files pointing to something that no longer exists. Designers see a broken link icon but don't know why, what to replace it with, or how many files are affected. Manual hunting takes time and is error-prone.",
          ],
        },
        {
          label: "Why It Matters",
          paragraphs: [
            "Broken links mess with our workflow. Design consistency suffers. Teams waste time troubleshooting instead of designing. The more we evolve the system, the bigger the problem gets.",
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
            "Library Drift scans a file or selection and catalogs every component instance. It compares each instance to the current library state. If a component is deleted, deprecated, or the variant no longer exists, it flags it with a color-coded badge. Red for deleted. Yellow for deprecated. Orange for variants that went away.",
          ],
        },
        {
          label: "Issue Types & Visibility",
          paragraphs: [
            "The color coding helps users scan fast. Red components are critical, they're completely gone. Yellow variants can still work through the library, just not in their original form. The badges make it obvious which files have which problems.",
          ],
        },
        {
          label: "Find on Canvas",
          paragraphs: [
            "One click in the results table and Figma jumps you to the broken instance. No hunting. That single feature saves more time than anything else in the tool.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            frame(
              "HERE ADD SCREENSHOTS OF PLUGIN UI STATES - showing the results panel with different issue types: deleted, deprecated, variant deleted, etc. What to show: Multiple screenshots of the results panel showing the color-coded badges (red for deleted, yellow for deprecated, orange for variant deleted)",
            ),
            frame(
              "HERE ADD SCREENSHOTS OF PLUGIN UI STATES - showing the results panel with different issue types: deleted, deprecated, variant deleted, etc. What to show: Multiple screenshots of the results panel showing the color-coded badges (red for deleted, yellow for deprecated, orange for variant deleted)",
            ),
            frame(
              "HERE ADD SCREENSHOTS OF PLUGIN UI STATES - showing the results panel with different issue types: deleted, deprecated, variant deleted, etc. What to show: Multiple screenshots of the results panel showing the color-coded badges (red for deleted, yellow for deprecated, orange for variant deleted)",
            ),
          ],
        },
        {
          columns: 3,
          frames: [
            frame(
              'HERE ADD SCREENSHOTS OF INTERACTIVE STATES - showing the scanning progress, the results list, and the "find on canvas" functionality. What to show: Three states — scanning in progress (with progress bar), completed results list, and/or the "Find on canvas" action',
            ),
            frame(
              'HERE ADD SCREENSHOTS OF INTERACTIVE STATES - showing the scanning progress, the results list, and the "find on canvas" functionality. What to show: Three states — scanning in progress (with progress bar), completed results list, and/or the "Find on canvas" action',
            ),
            frame(
              'HERE ADD SCREENSHOTS OF INTERACTIVE STATES - showing the scanning progress, the results list, and the "find on canvas" functionality. What to show: Three states — scanning in progress (with progress bar), completed results list, and/or the "Find on canvas" action',
            ),
          ],
        },
      ],
    },
    {
      headline: "Adoption",
      sections: [
        {
          label: "What's Next",
          paragraphs: [
            "More teams at Saxo asked for it after our design team started using it. It's proven valuable enough that it's now part of how we manage our design system. Future improvements would be batch fixes, direct variant suggestions, and maybe a command to apply a fix across multiple instances at once.",
            "This project proved that small, focused tools can have big impact. It wasn't a flashy product redesign or a new feature. It was solving one specific pain point really well.",
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;
