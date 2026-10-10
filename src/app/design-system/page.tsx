import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { LabelRoll } from "@/components/ui/LabelRoll";
import { NavLink } from "@/components/layout/NavLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImageRow } from "@/components/sections/ImageRow";
import { PlaygroundGrid } from "@/components/sections/PlaygroundGrid";
import { NavClock } from "@/components/layout/NavClock";
import { WorkCard } from "@/components/work/WorkCard";
import { Hero } from "@/components/home/Hero";
import { Hero2 } from "@/components/home/Hero2";
import { WorksDisplay } from "@/components/sections/WorksDisplay";
import { Services } from "@/components/home/Services";
import { WhatIDo } from "@/components/home/WhatIDo";
import { Chapter } from "@/components/sections/Chapter";
import { CredentialSection } from "@/components/sections/CredentialSection";
import { ButtonToggleDemo } from "@/app/design-system/ButtonToggleDemo";
import { NextProject } from "@/components/work/NextProject";
import { ProjectHero } from "@/components/work/ProjectHero";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { agerasCaseStudy } from "@/content/case-studies/ageras";
import { getComponentHosts } from "@/lib/component-usage";

// Internal reference page. Kept out of the nav and out of search results.
export const metadata: Metadata = {
  title: "Design system — internal",
  robots: { index: false, follow: false, nocache: true },
};

// Documentation chrome deliberately sits outside the design system: plain
// Inter Display regular, so it never competes with the specimens it labels.
const DOC = "font-display text-[13px] leading-[1.6] tracking-normal normal-case";
const DOC_DIM = `${DOC} text-muted`;
const DOC_TITLE = "font-display text-[15px] leading-[1.4] tracking-normal normal-case";

/* ── tokens ─────────────────────────────────────────────────────────── */

const colors = [
  { name: "ink", value: "#000", use: "type, rules" },
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
  { cls: "type-label", spec: "12px, weight 400, all sizes", use: "labels, nav, meta" },
  { cls: "type-label-medium", spec: "12px, weight 600, all sizes", use: "project hero labels" },
  { cls: "type-body", spec: "16px, all sizes", use: "body copy" },
  { cls: "type-h3", spec: "18 → 23 at 810 → 29 at 1200 → 36 at 1400", use: "sub-headings" },
  { cls: "type-stat", spec: "same sizes as type-h3, tighter line", use: "stat figures" },
  { cls: "type-display", spec: "48px, all sizes", use: "hero titles, open mobile nav" },
  { cls: "type-h2", spec: "41 → 51 at 1200 → 64 at 1440", use: "section headlines" },
];

const spacingSteps = [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 44, 56, 64, 76, 96, 104, 152, 176, 216];

/** Shared placeholder for ImageFrame and ImageRow demos. */
const IMAGE_PLACEHOLDER = "/images/imgplaceholder.jpg";

const layoutUtils = [
  { cls: "site-main", use: "page column, max 3840, 96px between sections" },
  { cls: "section-wrap", use: "section column, max 1920, 12px side padding" },
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
    note: "Height: auto, width: fill. Video: square, align top. Hover scale: 110% / 1.4s. Hover: [VIEW] pointer.",
  },
  {
    name: "ImageFrame",
    note: "Max height 700. Fill: no side or top padding, image edge to edge. Solid: surface fill (#f0f0f0) unless `color` is set (any CSS color; bare hex is accepted). Background: image behind. Solid and background padding is inside the frame, equal on all sides: 64px in a 1-column or 2-column image row, 36px in a 3-column row. A frame outside a row uses 64px. Stacked rows stay 24px apart; this padding does not add to that gap. Optional description sits 8px under the frame, type-label in muted. Images stay in the format they were added as.",
  },
  { name: "SectionHeading", note: "Section title. 41px, 51px from desktop 1200, 64px from 1440." },
  { name: "NavLink", note: "Leader on hover and current page. Open menu uses display type, below tablet only." },
  { name: "LabelRoll", note: "Text rolls up on hover." },
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
  NavLink: <NavLink href="/works" label="works" count={projects.length} active />,
  LabelRoll: (
    <span className="type-label inline-flex hover:[&_.label-roll-track]:-translate-y-1/2">
      <LabelRoll>view</LabelRoll>
    </span>
  ),
};

const sections: Entry[] = [
  { name: "Hero", note: "Full height. From tablet 810: frame is 60vw, labels sit on the sides." },
  {
    name: "Hero2",
    note: "Same labels and scroll button as Hero. The ring is an isometric lift carousel: portrait cards stand on a tilted row and the selected card widens and lifts. Uses the hero ring images except the 1st, 4th, 6th, 11th, and last. Stage is transparent so the page color shows. No prev, dots, or next bar.",
  },
  {
    name: "WorksDisplay",
    note: "Grid by default. Column gap 64px on every viewport. List stacks below desktop; side by side from 1200, with view project. Image strip is 4-up and 176px tall from tablet 810.",
  },
  { name: "Services", note: "Rows stack below tablet. 50/50 from 810. Title sits in the right half from desktop 1200." },
  { name: "WhatIDo", note: "Tag row, then heading." },
  {
    name: "Chapter",
    note: "Stacks below tablet. Two columns from 810. A subsection can include an image in the right column, fill unless a variant is set. The image is the same width as the subsection text, with 36px above it.",
  },
  {
    name: "CredentialSection",
    note: "Title and year on one line, meta below. 50/50 from tablet 810. Title offsets to the right half from desktop 1200.",
  },
  {
    name: "ImageRow",
    note: "1–3 frames. Columns from tablet 810. Solid and background frames use 64px padding in 1 and 2 columns, and 36px in 3, on all sides.",
  },
  { name: "ChapterBlock", note: "Chapter copy, then image rows." },
  {
    name: "ImageRowStack",
    note: "24px between row frames. Solid and background padding is inside the frame and does not add to that gap.",
  },
  {
    name: "PlaygroundGrid",
    note: "3 columns below desktop 1200, 6 from desktop. 12px between columns, 64px between rows. Each cell has 32px padding on the left and right. Images keep their ratio, fill the padded cell, and sit on the top of the row. Row height follows the tallest image. Empty cell space is the page color.",
  },
];

const shell: Entry[] = [
  { name: "SiteLayout", note: "Cursor, nav, page, footer." },
  { name: "SiteCursor", note: "16px dot on fine pointers, placed on the pointer with no follow delay. Hidden while hovering a WorkCard." },
  {
    name: "Nav",
    note: "Fixed. Menu below tablet 810. From tablet, the right half is 3 equal columns with gap-12: works and about, playground, clock. The clock lines up with the third meta column in ProjectHero.",
  },
  {
    name: "Footer",
    note: "Flips to ink near the bottom of the page. 104px of page color sits above the ink band. 104px between the link row and the wordmark. Wordmark stacks below tablet; SVG from tablet. Columns swap at desktop 1200.",
  },
  { name: "SmoothScroll", note: "Smooth scroll and in-view reveals." },
];

const work: Entry[] = [
  {
    name: "ProjectHero",
    note: "Title is full width below desktop, half width from 1200. About and meta are two columns from tablet 810. About and meta labels use type-label-medium. Values stay type-label. Image is one column, solid unless a variant is passed. `color` sets the solid fill.",
  },
  { name: "NextProject", note: "Image zooms to 125% on hover. Title and button centered." },
];

/* ── page ───────────────────────────────────────────────────────────── */

const SECTION_PREVIEWS: Record<string, React.ReactNode> = {
  Hero: <Hero />,
  Hero2: <Hero2 />,
  WorksDisplay: <WorksDisplay />,
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
      {([1, 2, 3] as const).map((columns) => (
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
    <section id={id} className="flex scroll-mt-104 flex-col gap-16">
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
    <div id={entry.name} className="flex scroll-mt-104 flex-col gap-12">
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
  const hosts = getComponentHosts();
  const toc = [
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
    <main className="section-wrap flex flex-col gap-96 pt-216 pb-96">
      <header className="flex flex-col gap-16">
        <p className={DOC_DIM}>internal — not linked, not indexed</p>
        <h1 className={`${DOC_TITLE} text-[24px]`}>Design system</h1>
        <Toc groups={toc} />
      </header>

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
              <p className={`${DOC} flex flex-wrap items-baseline gap-x-12 gap-y-2`}>
                <span className={DOC_TITLE}>{t.cls}</span>
                <span className={DOC_DIM}>{t.spec}</span>
                <span>used for: {t.use}</span>
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
    </main>
  );
}
