/**
 * HOW TO EDIT THIS FILE
 * - Change the words inside the quotes. Leave the quotes in place.
 * - Apostrophes are safe inside these quotes, like I'm and don't.
 * - Keep commas between items, and keep the brackets [ ] and braces { }.
 * - Link addresses are in the "links" section. Replace only the address, not the label next to it.
 * - Do not rename the labels on the left (name, email, works, and so on).
 *
 * This file is the text that shows on every page: the name, the menu,
 * the footer, and a few labels that repeat.
 */

// Contents:
// - Site name, browser title, description, email, clock, links
// - Menu
// - Footer
// - Labels used by more than one page

export const global = {
  // =====================================================
  // SITE (name, browser title, email, clock, links)
  // =====================================================
  site: {
    name: "BARBORA GADLINOVA",
    title: "Barbora Gadlinova — Product Designer",
    description: "Portfolio of Barbora Gadlinova, product designer based in Copenhagen.",
    email: "barboragadlinova@gmail.com",
    timezone: "Europe/Copenhagen",
    clockLabel: "Copenhagen, DK",
    links: {
      resume: "https://drive.google.com/file/d/1LpCfCp_pGDMXybvYA6mNpW9bz-8PGaUR/view",
      linkedin: "https://www.linkedin.com/in/barboragadlinova/",
    },
  },

  /** Spaces and dash between a page name and the site name in the browser tab. */
  titleSeparator: " — ",

  // =====================================================
  // MENU
  // =====================================================
  nav: {
    ariaLabel: "Primary",
    works: "Works",
    playground: "Playground",
    about: "About",
    menu: "menu",
    close: "close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    /** Spoken after the site name on the logo link, for screen readers. */
    homeLinkSuffix: "home",
  },

  // =====================================================
  // FOOTER
  // =====================================================
  footer: {
    enquiry: "for all enquiries please contact",
    resume: "view resume",
    linkedin: "linkedin",
    wordmarkLine1: "BARB",
    wordmarkLine2: "G.",
    wordmarkAlt: "",
  },

  // =====================================================
  // LABELS THAT REPEAT ACROSS PAGES
  // =====================================================
  cursor: {
    view: "view",
  },
  brackets: {
    open: "[",
    close: "]",
  },
  nextProject: {
    next: "next project",
    previous: "previous project",
    imageAlt: "",
  },
  /** Empty description for decorative pictures that already have a text label nearby. */
  decorativeImageAlt: "",
  meta: {
    /** Added after a project summary in the page description. The project name is inserted between these two. */
    projectClientLeadIn: " Client: ",
    projectClientEnd: ".",
  },
  carousel: {
    /** Used only if a carousel is not given its own label. The homepage sets its own. */
    defaultLabel: "Photo carousel",
    roleDescription: "carousel",
    of: " of ",
    colon: ": ",
    liveBefore: "Slide ",
    previous: "Previous slide",
    next: "Next slide",
    goTo: "Go to slide ",
  },
} as const;
