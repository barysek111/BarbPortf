/**
 * HOW TO EDIT THIS FILE
 * - Change the words inside the quotes. Leave the quotes in place.
 * - Apostrophes are safe inside these quotes, like I'm and don't.
 * - Keep commas between items, and keep the brackets [ ] and braces { }.
 * - To add a paragraph, copy one quoted line inside "paragraphs" and change the words.
 * - To add or remove a chapter, copy or delete one whole chapter block.
 * - To change a picture, replace the "src" path. The file must already be in the public folder.
 * - Do not change the "slug" line. The web address depends on it.
 * - Do not rename the labels on the left (slug, title, paragraphs, and so on).
 */

import type { CaseStudy, CaseStudyChapter } from "@/content/case-studies/types";

// This file is the text for one project page.
//
// Contents:
// - Title, intro, and project facts
// - Hero image
// - Chapter: SCOPE
// - Chapter: Key user needs
// - Chapter: UX Goals
// - Chapter: structure and patterns
// - Chapter: Design
// - Chapter: Testing
// - Chapter: Outcomes
export const cococare = {
  slug: "cococare",
  title: "Coco Care Interface Design",
  aboutLabel: "about the project",
  description: "Designing the interface for the Coco Care web app and mobile app, an AI motion-capture tool for physio rehabilitation.",

  // =====================================================
  // PROJECT FACTS (role, client, year)
  // =====================================================
  meta: [
    {
      label: "My role",
      value: "UX & UI\nDesign System\nUser Flows\nPrototyping\nUsability Testing",
    },
    {
      label: "client",
      value: "Coco Care",
    },
    {
      label: "year",
      value: "2024",
    },
  ],

  // =====================================================
  // HERO IMAGE
  // =====================================================
  heroImage: {
    src: "/images/works/cococare/cococarenewhero.svg",
    alt: "Coco Care product overview",
    variant: "solid",
    color: "FFBC9B",
  },

  // =====================================================
  // CHAPTERS, IN THE ORDER THEY APPEAR ON THE PAGE
  // =====================================================
  chapters: [
    // =====================================================
    // CHAPTER: SCOPE
    // =====================================================
    {
      headline: "SCOPE",
      sections: [
        {
          label: "BACKGROUND and challenge",
          paragraphs: [
            "Coco Care helps patients do personalized, evidence-based rehabilitation at home in an app. I designed the patient and physio experience, and the foundation for scheduling, exercise tracking, and other functions that support engagement, compliance, and recovery.",
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Key user needs
    // =====================================================
    {
      headline: "Key user needs",
      sections: [
        {
          label: "01",
          paragraphs: [
            "Let physiotherapists assign, monitor, and adjust plans for many patients at once, including in bulk.",
          ],
        },
        {
          label: "02",
          paragraphs: [
            "Help patients consistently complete their home rehab exercises. Motivate them and become part of their routine.",
          ],
        },
        {
          label: "03",
          paragraphs: [
            "Provide both patients and physios with clear, engaging feedback and reminders that support ongoing progress and communication.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/persona-jonas.svg",
              alt: "Persona, Jonas",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/persona-alice.svg",
              alt: "Persona, Alice",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/project-goals.svg",
              alt: "Coco Care project goals",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: UX Goals
    // =====================================================
    {
      headline: "UX Goals",
      sections: [
        {
          label: "Onboarding",
          paragraphs: [
            "Get people into the program smoothly, and let them finish daily tasks without help, across ages and levels of comfort with tech.",
          ],
        },
        {
          label: "Guidance",
          paragraphs: [
            "Make exercise flows painless, including for people with limited accessibility needs. Keep the tone and visual language positive, encouraging, and personal.",
          ],
        },
        {
          label: "Insights & Data",
          paragraphs: [
            "Give physios actionable data and clear navigation across task flows, so they can make fast, informed decisions.",
          ],
        },
        {
          label: "Reassurance",
          paragraphs: [
            "Deliver feedback, reminders, and support in the channels each person prefers, including a direct physio chat.",
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: structure and patterns
    // =====================================================
    {
      headline: "structure and patterns",
      sections: [
        {
          label: "Separate experiences, shared goals",
          paragraphs: [
            "We first defined the relationship logic between patients and physiotherapists. To reduce cognitive load, we kept patient user flows simple, while focusing on control and efficiency for specialists.",
          ],
        },
        {
          label: "Physiotherapist portal",
          paragraphs: [
            "This portal allows specialists to manage patients, track compliance, create or edit programs, monitor progress, and communicate via chat.",
          ],
        },
        {
          label: "Patient-facing app",
          paragraphs: [
            "The home screen provides a complete overview of the recovery journey. Early testing revealed that patients prefer seeing their data in one place, as long as it remains encouraging and not overwhelming.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/cococare-onboardingflow.svg",
              alt: "Coco Care onboarding flow",
              description: "Onboarding flow",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/cococare-exerciseflow.svg",
              alt: "Coco Care exercise flow",
              description: "Training flow",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/cococare-sitemap-admin.svg",
              alt: "Coco Care admin sitemap",
              description: "Information architecture map - Admin view",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/cococare-sitemap-fysio.svg",
              alt: "Coco Care physiotherapist sitemap",
              description: "Information architecture map - Physiotherapist view",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Design
    // =====================================================
    {
      headline: "Design",
      sections: [
        {
          label: "Design system",
          paragraphs: [
            "I set a shared UI language and consistent patterns across the platform: reusable modules, hierarchies, and interactions. That supports usability, accessibility, and trust. It also let us prototype quickly and work together through the roadmap.",
          ],
        },
        {
          label: "Functional Prototype",
          paragraphs: [
            "I made a semi-polished prototype and tested a staging version of selected flows. That let us apply the important feedback before launch.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/design-r-fe.png",
              alt: "Coco Care design screen",
              color: "EFEAE1",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/design-r-frame-6187.svg",
              alt: "Coco Care design screen",
              color: "2A2A2A",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/design-r-frame-427321985.svg",
              alt: "Coco Care design screen",
              color: "FFBC9B",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/portal-patient-overview-table.svg",
              alt: "Coco Care portal patient overview",
              description: "Portal patient overview table",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/app-home-dashboard.svg",
              alt: "Coco Care app home dashboard",
              description: "App home dashboard",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/design-portal-1.png",
              alt: "Coco Care pre-training flow",
              description: "PRE-TRAINING FLOW",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/design-portal-2.png",
              alt: "Coco Care training flow",
              description: "TRAINING FLOW",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/design-portal-3.png",
              alt: "Coco Care post-training flow",
              description: "POST-TRAINING FLOW AND PROFILE",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/design-portal-4.png",
              alt: "Coco Care utility pages",
              description: "SELECTION OF UTILITY PAGES",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/design-patient.png",
              alt: "Coco Care patient page",
              description: "Overview of compliance, SMART goal, pain development, activity history",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/design-portal-program-builder.png",
              alt: "Coco Care program builder",
              description: "Create a program for a patient in the drag-and-drop editor",
            },
          ],
        },
        {
          columns: 2,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/design-portal-active-program.png",
              alt: "Coco Care active program",
              description: "Frequency, Note, current exercises",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/design-portal-smart-score.png",
              alt: "Coco Care goals",
              description: "patient's progress, history and setting a new goal",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Testing
    // =====================================================
    {
      headline: "Testing",
      sections: [
        {
          label: "Who I tested with",
          paragraphs: [
            "I ran usability tests with three patients and three physiotherapists on the core flows. Onboarding, daily exercises, program creation, and checking progress.",
          ],
        },
        {
          label: "What worked",
          paragraphs: [
            "Patients got through onboarding in about a minute and moved through exercise flows without getting stuck. The instructions were clear enough. Physiotherapists picked up the program builder quickly and liked dragging exercises around to build a routine.",
          ],
        },
      ],
      imageRows: [
        {
          columns: 3,
          frames: [
            {
              variant: "solid",
              src: "/images/works/cococare/testing-edit-6197.svg",
              alt: "Coco Care testing revision",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/testing-edit-6198.svg",
              alt: "Coco Care testing revision",
            },
            {
              variant: "solid",
              src: "/images/works/cococare/testing-edit-6199.svg",
              alt: "Coco Care testing revision",
            },
          ],
        },
      ],
    },
    // =====================================================
    // CHAPTER: Outcomes
    // =====================================================
    {
      headline: "Outcomes",
      sections: [
        {
          label: "Impressions and ease",
          paragraphs: [
            "Feedback was positive in both groups. People liked the clear instructions and the navigation. Some asked for more visual cues and reminders on the dashboard. Those went into the next iteration, to raise compliance and satisfaction.",
          ],
        },
        {
          label: "On a good track",
          paragraphs: [
            "The biggest win is that patients started feeling like they had a coach in their pocket. Physiotherapists felt like they had visibility into what was happening at home. That's what drove compliance up more than any feature or detail.",
          ],
        },
      ],
    },
  ],
} satisfies CaseStudy;

// =====================================================
// ARCHIVED CHAPTERS
// These are not shown on the live project page.
// The internal archive page still uses them.
// =====================================================
export const cococareArchivedChapters = [
  // =====================================================
  // CHAPTER: focus areas
  // =====================================================
  {
    headline: "focus areas",
    sections: [
      {
        label: "Consistency",
        paragraphs: [
          "Patients forget their exercises or are unsure if they're doing them correctly.",
        ],
      },
      {
        label: "Transparency",
        paragraphs: [
          "Progress tracking is unclear or missing, lowering motivation.",
        ],
      },
      {
        label: "Speed",
        paragraphs: [
          "Physios want more efficient ways to assign, update, and monitor training plans.",
        ],
      },
      {
        label: "Reminders",
        paragraphs: [
          "Both groups requested better reminders and feedback loops.",
        ],
      },
    ],
  },
] satisfies readonly CaseStudyChapter[];
