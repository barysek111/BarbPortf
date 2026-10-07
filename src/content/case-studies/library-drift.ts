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
          label: "What You Get",
          paragraphs: [
            "When the scan finishes, you see a list of all the issues. Each one shows the component name, its state, what file it's in, and where to find it on canvas. You can jump straight to the broken instance and fix it, or export the list to share with your team.",
          ],
        },
        {
          label: "Why It's Different",
          paragraphs: [
            "Most tools just say something is broken. Library Drift tells you why it's broken and where it is. That's the difference between knowing you have a problem and knowing how to fix it.",
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
      ],
    },
    {
      headline: "Design",
      sections: [
        {
          label: "Plugin Interface",
          paragraphs: [
            "The UI needed to be lean. Scan button, token field, results table. Three scanning states: getting started, scanning in progress, and results loaded. Each state is clear about what's happening and what to do next.",
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
          label: "Team Response",
          paragraphs: [
            "After we published it in the Org, designers started using it immediately. It's become part of the cleanup workflow whenever we deprecate a component. Instead of one person manually tracking down broken links, the team can see everything at once.",
          ],
        },
        {
          label: "What We Learned",
          paragraphs: [
            "Performance matters. On complex files, the scan takes time. We added a recommendation in the plugin to use it on selected frames or smaller sections instead of scanning the whole 1284-instance file at once. That one change made it actually usable.",
            "We also learned that teams don't just need the list. They need a way to find the broken thing fast. The \"Find on canvas\" button turned out to be more useful than the detailed issue list.",
          ],
        },
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
