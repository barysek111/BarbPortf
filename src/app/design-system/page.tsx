import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LabelRoll } from "@/components/ui/LabelRoll";
import { NavLink } from "@/components/layout/NavLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImageRow } from "@/components/sections/ImageRow";
import { PlaygroundGrid } from "@/components/sections/PlaygroundGrid";
import { NavClock } from "@/components/layout/NavClock";
import { DitherOverlay } from "@/components/work/DitherOverlay";
import { WorkCard } from "@/components/work/WorkCard";
import { Hero } from "@/components/home/Hero";
import { Hero2 } from "@/components/home/Hero2";
import { WorksGrid } from "@/components/sections/WorksGrid";
import { Services } from "@/components/home/Services";
import { WhatIDo } from "@/components/home/WhatIDo";
import { Chapter } from "@/components/sections/Chapter";
import { CredentialSection } from "@/components/sections/CredentialSection";
import { ButtonToggleDemo } from "@/app/design-system/ButtonToggleDemo";
import { NextProject } from "@/components/work/NextProject";
import { ViewCursor } from "@/components/work/ViewCursor";
import { ProjectHero } from "@/components/work/ProjectHero";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { agerasCaseStudy } from "@/content/case-studies/ageras";
import { getComponentHosts } from "@/lib/component-usage";
import { hideInternalPage } from "@/lib/internal-page";

// Internal catalogue, same as /archive. Not in the nav. 404 when published.
export const metadata: Metadata = {
  title: "Design system — internal",
  robots: { index: false, follow: false, nocache: true },
};

// Documentation chrome deliberately sits outside the design system: plain
// Inter Display regular, so it never competes with the specimens it labels.
const DOC = "font-display text-[13px] leading-[1.6] tracking-normal normal-case";
const DOC_DIM = `${DOC} text-muted`;
const DOC_TITLE = "font-display text-[15px] leading-[1.4] tracking-normal normal-case";

const notesPagesDone = new Set([
  "plinto",
  "powermatch",
  "ageras",
  "cococare",
  "rokokobrand",
  "rokokoweb",
  "weld",
]);

const notesPages: { href: string; note?: string }[] = [
  { href: "/" },
  { href: "/about" },
  { href: "/playground" },
  { href: "/archive" },
  ...projects.map((project) => ({
    href: `/${project.slug}`,
    note: notesPagesDone.has(project.slug) ? "done" : undefined,
  })),
];

/* ── tokens ─────────────────────────────────────────────────────────── */

const colors = [
  { name: "ink", value: "#1c1c1c", use: "type, rules" },
  { name: "paper", value: "#fff", use: "page background" },
  { name: "muted", value: "#a7a7a7", use: "inactive, secondary" },
  { name: "surface", value: "#f0f0f0", use: "solid image fill" },
  { name: "selection", value: "#ff0c10", use: "text selection" },
];

const breakpoints = [
  { name: "tablet", value: "810px", use: "nav inline, clock, 4-up grid, two-column splits" },
  { name: "desktop", value: "1200px", use: "works list side by side, view project, larger headings" },
  { name: "wide", value: "1400px", use: "type-h3 and type-stat at 36px" },
  { name: "max", value: "1440px", use: "type-h2 at 64px" },
];

const typeLevels = [
  {
    cls: "type-label",
    letterSpacing: "-0.3%",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "regular",
    lineHeight: "130%",
    use: "labels, nav, meta",
  },
  {
    cls: "type-label-medium",
    letterSpacing: "-0.3%",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "semi-bold",
    lineHeight: "130%",
    use: "project hero labels",
  },
  {
    cls: "type-body",
    letterSpacing: "0%",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "medium",
    lineHeight: "110%",
    use: "body copy",
  },
  {
    cls: "type-h3",
    letterSpacing: "-1%",
    textTransform: "uppercase",
    fontSize: "18px (<810), 23px (810 - 1199), 29px (1200 - 1399), 36px (1400>)",
    fontWeight: "medium",
    lineHeight: "100% (<810), 90% (810>)",
    use: "sub-headings",
  },
  {
    cls: "type-stat",
    letterSpacing: "-5%",
    textTransform: "none",
    fontSize: "18px (<810), 23px (810 - 1199), 29px (1200 - 1399), 36px (1400>)",
    fontWeight: "medium",
    lineHeight: "80%",
    use: "stat figures",
  },
  {
    cls: "type-display",
    letterSpacing: "-1%",
    textTransform: "uppercase",
    fontSize: "48px",
    fontWeight: "medium",
    lineHeight: "120%",
    use: "hero titles, open mobile nav",
  },
  {
    cls: "type-h2",
    letterSpacing: "-4%",
    textTransform: "uppercase",
    fontSize: "41px (<1200), 51px (1200 - 1439), 64px (1440>)",
    fontWeight: "medium",
    lineHeight: "100%",
    use: "section headlines",
  },
];

const spacingSteps = [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 44, 56, 64, 76, 96, 104, 152, 176, 216];

/** Shared placeholder for ImageFrame and ImageRow demos. */
const IMAGE_PLACEHOLDER = "/images/imgplaceholder.jpg";

const layoutUtils = [
  { cls: "page-inset", use: "global side padding (12px ≤1200, 24px above), max 3840 centred" },
  { cls: "page-main", use: "main column — gap-56 between top-level page children below 810px, gap-96 from tablet; each direct child gets the 1920 inner column (same as section-wrap) except footer-bleed and data-page-bleed; first child gets 216px top unless data-skip-page-top" },
  { cls: "page top padding", use: "216px — CSS utility maps to --spacing-page-top; usually automatic on page-main’s first child" },
  { cls: "section-wrap", use: "explicit 1920 cap — nav bar row, footer inner; section components rely on page-main instead" },
  { cls: "data-page-bleed", use: "opt out of page-main inner column when a block must span the full page-inset width" },
  { cls: "ruled-row", use: "row with a top rule" },
  { cls: "stack-front", use: "sits above sticky bands" },
  { cls: "z-nav / z-stack / z-lift", use: "nav, overlays, lifted media" },
  { cls: "label-roll", use: "text rolls on hover" },
  { cls: "mark-leader-before", use: "8px square left of a label" },
  { cls: "below-tablet", use: "styles under 810px" },
  { cls: "appear", use: "fades in on scroll" },
  { cls: "reveal-clip", use: "clips text, no slide" },
];

/* ── components ─────────────────────────────────────────────────────── */

type Entry = { name: string; note?: string };

const atoms: Entry[] = [
  { name: "Button" },
  { name: "NavClock", note: "Time and location. Shown from tablet, 810px." },
  {
    name: "WorkCard",
    note: "Height: auto, width: fill. Video: square, align top. Hover scale: 104% / 0.5s, ease-in. The image turns grayscale in 0.2s. Hover: [VIEW] pointer. Pass `dither` to fade a Bayer dither of ink, muted, and paper over the whole image on hover. The zoom and [view] pointer stay. `caption=\"above\"` stacks the number, then a 2px gap, then the project name, both on the left, then the image. `description` can add that project's description under the name.",
  },
  {
    name: "ImageFrame",
    note: "Max height 700. Fill: no padding, image edge to edge. Solid: surface fill (#f0f0f0) unless `color` is set. Background: image behind. Solid and background padding is equal on all sides, inside the frame: 1-column 24px / 64px (below / from tablet 810); 2-column 24px / 56px; 3-column 24px / 56px. Default `columns` is 1 outside a row. Optional description 8px under the frame, type-label muted. Stacked rows use ImageRowStack (24px below 810, 44px from tablet); padding does not add to stack gap.",
  },
  { name: "SectionHeading", note: "Section title. 41px, 51px from desktop 1200, 64px from 1440." },
  { name: "NavLink", note: "Leader on hover and current page. Open menu uses display type, below tablet only." },
  { name: "LabelRoll", note: "Text rolls up on hover." },
  {
    name: "ViewCursor",
    note: "Fixed [view] label on the pointer. Brackets and the word use the button gap, 4px, with no roll. The frame is 4px of paper at full opacity. Hides the site dot. Shown while hovering a WorkCard, and while hovering the NextProject image.",
  },
  {
    name: "DitherOverlay",
    note: "Bayer dither, 2px blocks, using ink, muted, and paper in equal steps. Fades over the whole image on hover of the parent group in 0.5s, ease-in, the same curve as the 104% zoom, in and out. Pointer events pass through, so a [view] cursor can sit above it. Used on WorksGrid images and the NextProject image.",
  },
];

const ATOM_PREVIEWS: Record<string, React.ReactNode> = {
  Button: (
    <>
      <Button href="#">view all</Button>
      <ButtonToggleDemo />
    </>
  ),
  NavClock: <NavClock />,
  WorkCard: (
    <div className="max-w-[390px]">
      <WorkCard project={projects[0]} index={0} />
    </div>
  ),
  ImageFrame: (
    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
      <ImageFrame variant="fill" src={IMAGE_PLACEHOLDER} alt="" description="Short caption under this frame" />
      <ImageFrame variant="solid" src={IMAGE_PLACEHOLDER} alt="" description="Short caption under this frame" />
      <ImageFrame
        variant="solid"
        src={IMAGE_PLACEHOLDER}
        alt=""
        color="055E42"
        description="Solid fill, custom color"
      />
      <ImageFrame
        variant="background"
        src={IMAGE_PLACEHOLDER}
        alt=""
        backgroundSrc={IMAGE_PLACEHOLDER}
        description="Short caption under this frame"
      />
    </div>
  ),
  SectionHeading: <SectionHeading>LATEST WORK</SectionHeading>,
  NavLink: <NavLink href="/" label="works" count={projects.length} active />,
  LabelRoll: (
    <span className="type-label inline-flex hover:[&_.label-roll-track]:-translate-y-1/2">
      <LabelRoll>view</LabelRoll>
    </span>
  ),
  ViewCursor: <ViewCursor inline />,
  DitherOverlay: (
    <div className="group relative max-w-[390px]">
      <Image
        src={projects[0].image}
        alt={projects[0].title}
        width={372}
        height={projects[0].imageH}
        className="block h-auto w-full"
      />
      <DitherOverlay src={projects[0].image} />
    </div>
  ),
};

const sections: Entry[] = [
  { name: "Hero", note: "Full height. From tablet 810: frame is 60vw, labels sit on the sides." },
  {
    name: "Hero2",
    note: "Same labels and scroll button as Hero. Cards lie flat in one row, each skewed 10° so the side edges stay vertical and the top and bottom slope down to the right. Each card is centered vertically in the row. Horizontal overlap is -64px and each card sits 44px higher than the one before it. The leftmost card paints on top; each card to the right sits underneath the one before it. Hover does not change that order. The stack hugs those cards and stays centered in the viewport on both axes, including when it is wider than the screen. Hover ends when the pointer leaves that card, including into the empty space around the stack. Every card's width is clamp(100px, 12vw, 140px) and its height follows that file's own ratio. Hover lifts that card 80px straight up on a spring with a 1.3s period and 0.25 bounce, without resizing it or moving the others. Leaving it, or hovering another, puts the previous card back on the same spring. Uses the hero ring images except the 1st, 4th, 6th, 11th, and last. Shown order, by source image, is 5, 7, 3, 13, 8, 9, 2, 10, 12. Stage is transparent so the page color shows. No prev, dots, or next bar.",
  },
  {
    name: "WorksGrid",
    note: "Grid by default. The heading and a stacked grid and list toggle sit on one row, 12px apart. The toggle column has 4px top padding, 8px from 1440, so the first toggle's brackets meet the heading caps. The toggles have 2px between them and replace the project count. 2 columns below tablet 810, 4 from tablet. Column gap 12px on every viewport. Cells align to the top of the row. Each cell stacks the number and the project name with a 2px gap, both on the left, then the image, 12px apart. List stacks below desktop; side by side from 1200, with view project. The list shows the project description in muted type-body. Image strip is 4-up and 176px tall from tablet 810. Grid hover keeps the [view] pointer, turns the image grayscale in 0.2s, zooms to 104% in 0.5s ease-in, and fades a Bayer dither of ink, muted, and paper (2px blocks) over the whole image on that same 0.5s ease-in.",
  },
  { name: "Services", note: "Rows stack below tablet. 50/50 from 810. Title sits in the right half from desktop 1200." },
  { name: "WhatIDo", note: "Tag row, then heading — gap-36 between them (same headline-to-body step as Services)." },
  {
    name: "Chapter",
    note: "Stacks below tablet; chapter headline is full width under 810px, then max 70% of the left column from tablet. Two columns from 810. Right column subsections use gap-24 below 810px, gap-36 from tablet. Body paragraphs use gap-12. A subsection can include an image in the right column, fill unless a variant is set. The image is the same width as the subsection text, with 36px above it.",
  },
  {
    name: "CredentialSection",
    note: "Title and year on one line, meta below. 50/50 from tablet 810. Title offsets to the right half from desktop 1200.",
  },
  {
    name: "ImageRow",
    note: "1–3 frames. gap-12 between grid cells on all viewports. Below 810px: 1-column rows stay one column; 2-column rows stay two columns side by side; 3-column rows use a 2×2 grid (two on the first row, third bottom-left, bottom-right empty). From tablet 810: 1, 2, or 3 equal columns. Solid and background padding follows ImageFrame (24px below tablet on all column counts; from tablet: 64px / 56px / 56px for 1 / 2 / 3 columns). Each cell is frame plus optional caption (8px gap). From tablet, when any frame has a caption in a 2- or 3-column row, equal-height frames then top-aligned captions. Captions are type-label muted. Media is vertically centered inside the padded frame on multi-column rows. 1-column rows hug the image and keep media top-aligned.",
  },
  { name: "ChapterBlock", note: "Chapter copy, then image rows. gap-36 between them below 810px, gap-96 from tablet." },
  {
    name: "ImageRowStack",
    note: "Single-column grid, 24px between stacked image rows below 810px, 44px from tablet. In-row cell gap is on ImageRow (12px). Solid and background padding is inside the frame and does not add to the stack gap.",
  },
  {
    name: "PlaygroundGrid",
    note: "3 columns below desktop 1200, 6 from desktop. 12px between columns, 64px between rows. Each cell has 32px padding on the left and right. Images keep their ratio, fill the padded cell, and sit on the top of the row. Row height follows the tallest image. Empty cell space is the page color.",
  },
];

const shell: Entry[] = [
  { name: "SiteLayout", note: "Cursor, nav, page-inset + page-main (gap-56 below 810px, gap-96 from tablet), footer. Side padding lives only on page-inset. page-main caps each direct child at 1920 centred — section components do not repeat section-wrap. Footer ink uses footer-bleed (excluded from that cap); footer content uses page-inset + section-wrap." },
  { name: "SiteCursor", note: "16px dot on fine pointers, placed on the pointer with no follow delay. Hidden while hovering a WorkCard or the NextProject image, where the [view] label is the cursor." },
  {
    name: "Nav",
    note: "Fixed, full width, same side padding as the page shell (12px at 1200px and below, 24px above). The logo links to the homepage. It is colored with the nav text, max height 28px, vertically centered in the bar. Empty bar space lets clicks through to the page. Menu below tablet 810. From tablet, the right half is 3 columns and 2 rows with 12px between columns and 2px between rows. Row one is works, about, and the time. Row two is playground and the place. Each row is one 1.3em line, so the clock shares the same lines as the links. The clock column lines up with the third meta column in ProjectHero. Works links to the homepage and shows the active mark there and on a project page.",
  },
  {
    name: "Footer",
    note: "Flips to ink near the bottom of the page. footer-bleed paints edge-to-edge; vertical spacing comes from page-main gap-96 above the band and py-96 inside. Content uses page-inset + section-wrap. 96px gap between the link row and the wordmark. Wordmark stacks below tablet; SVG from tablet. Columns swap at desktop 1200.",
  },
  { name: "SmoothScroll", note: "Smooth scroll and in-view reveals." },
];

const work: Entry[] = [
  {
    name: "ProjectHero",
    note: "Title is full width below 810px, max 70% of the container from tablet. gap-36 between title and about/meta below 810px, gap-56 from tablet. About and meta stack below 810 with gap-24 between blocks; two columns from tablet 810 with gap-12. Each meta block uses gap-12 between label and value. About column uses desktop:pr-152. About and meta labels use type-label-medium. Values stay type-label. gap-36 between the copy block and hero image below 810px, gap-96 from tablet. Image is one column, solid unless a variant is passed. `color` sets the solid fill.",
  },
  {
    name: "NextProject",
    note: "Case-study footer: py-96 inside the section. Bracket label above the project name, both centered on the image. Image hover matches WorksGrid: grayscale in 0.2s, 104% zoom in 0.5s ease-in, Bayer dither fade, and the [view] pointer.",
  },
];

/* ── page ───────────────────────────────────────────────────────────── */

const SECTION_PREVIEWS: Record<string, React.ReactNode> = {
  Hero: <Hero />,
  Hero2: <Hero2 />,
  WorksGrid: <WorksGrid />,
  Services: <Services />,
  WhatIDo: <WhatIDo />,
  CredentialSection: (
    <CredentialSection
      name="Section - Experience"
      title={about.experienceTitle}
      rows={about.jobs.slice(0, 3).map((job) => ({
        title: job.role,
        meta: job.company,
        year: job.period,
      }))}
    />
  ),
  ImageRow: (
    <div className="flex flex-col gap-32">
      {([2, 1] as const).map((columns) => (
        <div key={columns} className="flex flex-col gap-8">
          <p className={DOC_TITLE}>
            ImageRow — {columns} {columns === 1 ? "column" : "columns"}
          </p>
          <ImageRow
            columns={columns}
            frames={Array.from({ length: columns }, () => ({
              variant: "solid" as const,
              src: IMAGE_PLACEHOLDER,
              alt: "",
            }))}
          />
        </div>
      ))}
    </div>
  ),
  Chapter: (
    <Chapter
      headline={about.headline}
      sections={[
        { label: about.thinking.label, paragraphs: [about.thinking.text] },
        {
          label: about.making.label,
          paragraphs: [about.making.text],
          images: [{ src: about.making.image, alt: "", variant: "fill" }],
        },
      ]}
    />
  ),
  ProjectHero: (
    <ProjectHero
      title={agerasCaseStudy.title}
      aboutLabel={agerasCaseStudy.aboutLabel}
      description={agerasCaseStudy.description}
      meta={agerasCaseStudy.meta}
      imageSrc={agerasCaseStudy.heroImage?.src}
      imageAlt={agerasCaseStudy.heroImage?.alt}
      imageVariant={agerasCaseStudy.heroImage?.variant}
      imageColor={agerasCaseStudy.heroImage?.color}
    />
  ),
  NextProject: <NextProject slug="ageras" />,
  PlaygroundGrid: <PlaygroundGrid />,
};

function Toc({
  groups,
}: {
  groups: { label: string; links: { id: string; label: string }[] }[];
}) {
  return (
    <nav aria-label="Contents" className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.label} className={`${DOC} flex flex-wrap items-baseline gap-x-12 gap-y-2`}>
          <span className="text-muted">{group.label}</span>
          {group.links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="underline">
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}

function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-96 flex-col gap-16">
      <div className="flex flex-col gap-4">
        <h2 className={DOC_TITLE}>{title}</h2>
        {lede ? <p className={DOC}>{lede}</p> : null}
      </div>
      {children}
    </section>
  );
}

/** Direct importers, read from the real import graph. */
function UsedOn({ name, hosts }: { name: string; hosts: Record<string, string[]> }) {
  const list = hosts[name];
  return <p className={DOC_DIM}>{list?.length ? `used on: ${list.join(", ")}` : "used on: —"}</p>;
}

function Row({
  entry,
  hosts,
  children,
}: {
  entry: Entry;
  hosts: Record<string, string[]>;
  children?: React.ReactNode;
}) {
  return (
    <div id={entry.name} className="flex scroll-mt-96 flex-col gap-12">
      <h3 className={DOC_TITLE}>{entry.name}</h3>
      {entry.note ? <p className={`${DOC} max-w-[680px]`}>{entry.note}</p> : null}
      {children}
      <UsedOn name={entry.name} hosts={hosts} />
    </div>
  );
}

function linksFor(entries: Entry[]) {
  return entries.map((entry) => ({ id: entry.name, label: entry.name }));
}

export default function DesignSystemPage() {
  hideInternalPage();

  const hosts = getComponentHosts();
  const toc = [
    {
      label: "Notes",
      links: [{ id: "notes", label: "Notes" }],
    },
    {
      label: "Tokens",
      links: [
        { id: "colour", label: "Colour" },
        { id: "breakpoints", label: "Breakpoints" },
        { id: "spacing", label: "Spacing" },
        { id: "type", label: "Type" },
        { id: "layout", label: "Layout" },
      ],
    },
    { label: "Atoms", links: linksFor(atoms) },
    { label: "Sections", links: linksFor(sections) },
    { label: "Shell", links: linksFor(shell) },
    { label: "Work", links: linksFor(work) },
  ];

  return (
    <>
      <header className="flex flex-col gap-16">
        <p className={DOC_DIM}>internal — not linked, not indexed</p>
        <h1 className={`${DOC_TITLE} text-[24px]`}>Design system</h1>
        <Toc groups={toc} />
      </header>

      <Section id="notes" title="NOTES">
        <ul className={`${DOC} flex list-disc flex-col gap-4 pl-20`}>
          {notesPages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="underline-offset-2 hover:underline">
                {page.href}
              </Link>
              {page.note ? <span className={DOC_DIM}> {page.note}</span> : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="colour" title="Colour">
        <ul className="flex flex-col gap-8">
          {colors.map((c) => (
            <li key={c.name} className="flex items-center gap-12">
              <span
                className="h-24 w-24 shrink-0 border border-ink"
                style={{ background: c.value }}
              />
              <span className={DOC_TITLE}>{c.name}</span>
              <span className={DOC_DIM}>{c.value}</span>
              <span className={DOC}>{c.use}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="breakpoints" title="Breakpoints" lede="used for: layout and type.">
        <ul className="flex flex-col gap-4">
          {breakpoints.map((b) => (
            <li key={b.name} className={`${DOC} flex flex-wrap items-baseline gap-x-12 gap-y-2`}>
              <span className={`${DOC_TITLE} w-[88px]`}>{b.name}</span>
              <span className={`${DOC_DIM} w-[64px]`}>{b.value}</span>
              <span>{b.use}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="spacing" title="Spacing" lede="used for: gap, padding, margin.">
        <ul className="flex flex-wrap items-center gap-x-16 gap-y-8">
          {spacingSteps.map((n) => (
            <li key={n} className="flex items-center gap-4">
              <span className="h-[8px] bg-ink" style={{ width: Math.max(n, 1) }} />
              <span className={DOC_DIM}>{n}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" title="Type" lede="used for: all text.">
        <div className="flex flex-col gap-24">
          {typeLevels.map((t) => (
            <div key={t.cls} className="flex flex-col gap-8">
              <p className={DOC_TITLE}>{t.cls}</p>
              <p className={DOC}>
                {t.fontSize}, Weight: {t.fontWeight}, Spacing: {t.letterSpacing}, Line height: {t.lineHeight}
                {t.textTransform === "none" ? "" : `, Transform: ${t.textTransform}`}
                <span className={DOC_DIM}>. Used for: {t.use}</span>
              </p>
              <p className={t.cls}>The quick brown fox jumps over the lazy dog</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="layout" title="Layout" lede="used for: page structure.">
        <ul className="flex flex-col gap-4">
          {layoutUtils.map((u) => (
            <li key={u.cls} className={`${DOC} flex flex-wrap items-baseline gap-x-12 gap-y-2`}>
              <span className={`${DOC_TITLE} min-w-[180px]`}>{u.cls}</span>
              <span>{u.use}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="atoms" title="Atoms">
        <div className="flex flex-col gap-56">
          {atoms.map((entry) => (
            <Row key={entry.name} entry={entry} hosts={hosts}>
              {ATOM_PREVIEWS[entry.name]}
            </Row>
          ))}
        </div>
      </Section>

      <Section id="sections" title="Sections">
        <div className="flex flex-col gap-96">
          {sections.map((entry) => (
            <Row key={entry.name} entry={entry} hosts={hosts}>
              {SECTION_PREVIEWS[entry.name]}
            </Row>
          ))}
        </div>
      </Section>

      <Section id="shell" title="Shell">
        <div className="flex flex-col gap-24">
          {shell.map((entry) => (
            <Row key={entry.name} entry={entry} hosts={hosts} />
          ))}
        </div>
      </Section>

      <Section id="work" title="Work">
        <div className="flex flex-col gap-96">
          {work.map((entry) => (
            <Row key={entry.name} entry={entry} hosts={hosts}>
              {SECTION_PREVIEWS[entry.name]}
            </Row>
          ))}
        </div>
      </Section>
    </>
  );
}
