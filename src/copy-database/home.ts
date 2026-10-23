/**
 * HOW TO EDIT THIS FILE
 * - Change the words inside the quotes. Leave the quotes in place.
 * - Apostrophes are safe inside these quotes, like I'm and don't.
 * - Keep commas between items, and keep the brackets [ ] and braces { }.
 * - To add or remove a service, copy or delete one whole block in "services".
 * - To change a service icon, replace the "icon" path.
 * - The hero pictures are in order. Do not reorder them unless you mean to change the carousel.
 * - "What I do" also appears on the About page. Editing it here changes both pages.
 */

// Contents:
// - Hero (top of the home page)
// - Hero pictures
// - Services
// - What I do

export const home = {
  // =====================================================
  // HERO SECTION (top of the home page)
  // =====================================================
  hero: {
    latestWork: "latest work",
    role: "product designer",
    scrollDown: "scroll down",
    carouselLabel: "Latest work",
    /** Screen-reader name of each hero picture. A two-digit number is added, like "Work 05". */
    slideTitlePrefix: "Work ",
    images: [
      { src: "/images/hero/ring-01.jpg", alt: "", w: 1061, h: 1500 },
      { src: "/images/hero/ring-02.jpg", alt: "", w: 1154, h: 1154 },
      { src: "/images/hero/ring-03.png", alt: "", w: 1462, h: 1458 },
      { src: "/images/hero/ring-04.png", alt: "", w: 1408, h: 1434 },
      { src: "/images/hero/ring-05.jpg", alt: "", w: 941, h: 1123 },
      { src: "/images/hero/ring-06.jpg", alt: "", w: 2384, h: 2383 },
      { src: "/images/hero/ring-07.jpg", alt: "", w: 1036, h: 1352 },
      { src: "/images/hero/ring-08.jpg", alt: "", w: 1009, h: 1310 },
      { src: "/images/hero/ring-09.svg", alt: "", w: 560, h: 560 },
      { src: "/images/hero/ring-10.jpg", alt: "", w: 787, h: 1070 },
      { src: "/images/hero/ring-11.jpg", alt: "", w: 787, h: 1009 },
      { src: "/images/hero/ring-12.jpg", alt: "", w: 787, h: 787 },
      { src: "/images/hero/ring-13.jpg", alt: "", w: 1292, h: 1720 },
      { src: "/images/hero/ring-14.jpg", alt: "", w: 946, h: 1147 },
    ],
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
      icon: "/images/services/ux-research.svg",
    },
    {
      index: "[02]",
      title: "Design ops and management",
      description:
        "Complex things get simpler when someone takes the time to tidy them up. I streamline workflows, build systems that scale, and share what I learn so the whole team benefits.",
      icon: "/images/services/product-design.svg",
    },
    {
      index: "[03]",
      title: "Interface Design",
      description:
        "I design interfaces that are clear, considered, and visually strong. Every detail is thought through and everything is handed off in a state that is ready to build.",
      icon: "/images/services/interface-design.svg",
    },
    {
      index: "[04]",
      title: "Prototyping",
      description:
        "I turn early concepts into interactive prototypes in Figma so flows, interactions, and edge cases can be tested and refined before any code gets written.",
      icon: "/images/services/prototyping.svg",
    },
    {
      index: "[05]",
      title: "Accessibility",
      description:
        "I treat accessibility as part of the design process from the start. WCAG principles are built in by default and I have completed dedicated training in inclusive design.",
      icon: "/images/services/accessibility.svg",
    },
    {
      index: "[06]",
      title: "Craft and consistency",
      description:
        "I raise the bar on design standards: quality, usability, and decisions I can explain. The details matter. They usually decide whether something feels right.",
      icon: "/images/services/design-systems.svg",
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
