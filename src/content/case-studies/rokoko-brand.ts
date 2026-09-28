import rokokoBrandChapters from "./generated/rokokobrand.json";
import { buildScopeChapter } from "./parse-refined-md";
import type { CaseStudy } from "./types";

export const rokokoBrandCaseStudy = {
  slug: "rokokobrand",
  title: "Rokoko Brand Identity",
  aboutLabel: "about the project",
  description:
    "Rokoko empowers creators with innovative motion capture technology, enabling artists to bring animated characters to life with intuitive, real-time tools. This project documents the rollout of a revitalized brand identity.",
  meta: [
    {
      label: "My role",
      value:
        "Brand Identity\nMerchandising\nDesign for print\nDesign systems\nPackaging design",
    },
    { label: "client", value: "Rokoko" },
    { label: "year", value: "2022" },
  ],
  chapters: [
    buildScopeChapter(
      "Rokoko is a motion capture company providing hardware and software for animators and creators globally. In 2022, they partnered with E-types for a complete rebrand redefining their visual language across all platforms. My focus was translating the new direction into everyday brand assets, building consistency across packaging, print, digital templates, and merchandising.",
      "The task was to unify all of Rokoko's brand touchpoints under the new identity and bring clarity and cohesion to all brand communication. Deliverables needed to:",
      [
        "Demonstrate visual distinctiveness and reflect Rokoko's position as a creative leader.",
        "Support fast-paced tech environments with adaptable, scalable templates.",
        "Reinforce consistency across packaging, print, digital, and merchandising.",
      ],
    ),
    ...rokokoBrandChapters,
  ],
} satisfies CaseStudy;
