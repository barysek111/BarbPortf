/**
 * HOW TO EDIT THIS FILE
 * - Change the words inside the quotes. Leave the quotes in place.
 * - Apostrophes are safe inside these quotes, like I'm and don't.
 * - Keep commas between items, and keep the brackets [ ] and braces { }.
 * - To add or remove a service, copy or delete one whole block in "services".
 * - To change a service icon, replace the "icon" path.
 * - The HeroLetter left label cycles every line in "letterLabel". Add or remove a line to change the morph.
 * - "What I do" also appears on the About page. Editing it here changes both pages.
 */

// Contents:
// - HeroLetter (top of the home page)
// - Services
// - What I do

export const home = {
  // =====================================================
  // HERO LETTER (top of the home page)
  // =====================================================
  hero: {
    /** HeroLetter left label. Morphs in this order. The first phrase is the still state. */
    letterLabel: ["product", "experience", "ux", "interface"],
    role: "designer",
    scrollDown: "scroll down",
  },

  // =====================================================
  // SERVICES (also shown on the About page)
  // =====================================================
  servicesHeading: "SERVICES",
  servicesIconAlt: "",
  services: [
    {
      index: "[01]",
      title: "UX Research",
      description:
        "I run user interviews, usability tests, and journey mapping to make sure design decisions are rooted in what people actually need rather than what seems right in a meeting room.",
      icon: "/images/services/barboragadlinova-home-ux-research.svg",
    },
    {
      index: "[02]",
      title: "Design ops and management",
      description:
        "Complex things get simpler when someone takes the time to tidy them up. I streamline workflows, build systems that scale, and share what I learn so the whole team benefits.",
      icon: "/images/services/barboragadlinova-home-design-ops.svg",
    },
    {
      index: "[03]",
      title: "Interface Design",
      description:
        "I design interfaces that are clear, considered, and visually strong. Every detail is thought through and everything is handed off in a state that is ready to build.",
      icon: "/images/services/barboragadlinova-home-interface-design.svg",
    },
    {
      index: "[04]",
      title: "Prototyping",
      description:
        "I turn early concepts into interactive prototypes in Figma so flows, interactions, and edge cases can be tested and refined before any code gets written.",
      icon: "/images/services/barboragadlinova-home-prototyping.svg",
    },
    {
      index: "[05]",
      title: "Accessibility",
      description:
        "I treat accessibility as part of the design process from the start. WCAG principles are built in by default and I have completed dedicated training in inclusive design.",
      icon: "/images/services/barboragadlinova-home-accessibility.svg",
    },
    {
      index: "[06]",
      title: "Craft and consistency",
      description:
        "I raise the bar on design standards: quality, usability, and decisions I can explain. The details matter. They usually decide whether something feels right.",
      icon: "/images/services/barboragadlinova-home-craft.svg",
    },
  ],

  // =====================================================
  // WHAT I DO (also shown on the About page)
  // =====================================================
  whatIDo: {
    tags: ["what i do"],
    body: "I'm a designer with a lot of opinions and questions about interfaces. Curiosity keeps me prototyping and asking exploring solutions. Detail oriented, amateur nail tech, dog lover.",
  },
} as const;
