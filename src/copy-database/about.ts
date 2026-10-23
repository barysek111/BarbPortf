/**
 * HOW TO EDIT THIS FILE
 * - Change the words inside the quotes. Leave the quotes in place.
 * - Apostrophes are safe inside these quotes, like I'm and don't.
 * - The years use a curly apostrophe, like (’26–present). Keep that character if you want the same look.
 * - Keep commas between items, and keep the brackets [ ] and braces { }.
 * - To add or remove a job or a school, copy or delete one whole block.
 * - To change the portrait, replace the "image" path.
 */

// Contents:
// - Browser description
// - Two text sections and the portrait
// - Jobs
// - Education

export const about = {
  // =====================================================
  // BROWSER DESCRIPTION
  // This sentence is added after the main site description.
  // The space at the start is required.
  // =====================================================
  metaDescriptionExtra: " Background in branding, UX, and product design.",

  // =====================================================
  // TEXT SECTIONS
  // =====================================================
  thinking: {
    label: "A CREATIVE BACKGROUND",
    text: "I came to product design from branding and visual design. Work across websites, digital products, campaigns, and physical things taught me to think about how something looks and how it works. Product design let me use both, and pay closer attention to the people using what I design.",
  },
  making: {
    label: "ALWAYS FIGURING THINGS OUT",
    text: "I often take projects from first discovery all the way through to launch. Still, what I enjoy most is turning an idea into something people can see and use. I am happiest somewhere between thinking and making, whether that means exploring a new concept, prototyping an interaction, or bringing order to a growing design system.",
    image: "/images/about/photo-1.jpg",
    imageAlt: "",
  },

  // =====================================================
  // JOBS
  // =====================================================
  experienceTitle: "Experience",
  jobs: [
    { role: "Product Designer", company: "Saxo Bank", period: "(’26–present)" },
    { role: "Digital Brand Designer", company: "Ageras", period: "(’24–’25)" },
    { role: "Product Designer", company: "Rokoko", period: "(’22–’23)" },
    { role: "Brand Designer", company: "Eat Grim", period: "(’19–’21)" },
    { role: "Designer Intern", company: "1508.dk", period: "(’19)" },
  ],

  // =====================================================
  // EDUCATION
  // =====================================================
  education: {
    title: "Education",
    items: [
      {
        title: "BA in Design & Business - Communication Design",
        meta: "KEA, Københavns Erhvervsakademi",
        year: "(’20)",
      },
      {
        title: "Interaction Design Specialization",
        meta: "Course by University of California San Diego",
        year: "(’25)",
      },
      {
        title: "Innovation Through Design",
        meta: "Course by The University of Sydney",
        year: "(’25)",
      },
      {
        title: "UX Design Professional Certificate",
        meta: "Google Career Certificate",
        year: "(’24)",
      },
    ],
  },
} as const;
