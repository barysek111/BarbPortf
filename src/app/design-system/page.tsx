import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextMorphing } from "@/components/ui/TextMorphing";
import { MorphingLabel } from "@/components/ui/MorphingLabel";
import { LabelRoll } from "@/components/ui/LabelRoll";
import { NavLink } from "@/components/layout/NavLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImageRow } from "@/components/sections/ImageRow";
import { PlaygroundGrid } from "@/components/sections/PlaygroundGrid";
import { NavClock } from "@/components/layout/NavClock";
import { DitherOverlay } from "@/components/work/DitherOverlay";
import { WorkCard } from "@/components/work/WorkCard";
import { HeroLetter } from "@/components/home/HeroLetter";
import { SplineSquare } from "@/components/spline/SplineSquare";
import { WorksGrid } from "@/components/sections/WorksGrid";
import { Services } from "@/components/home/Services";
import { WhatIDo } from "@/components/home/WhatIDo";
import { Chapter } from "@/components/sections/Chapter";
import { CredentialSection } from "@/components/sections/CredentialSection";
import { ButtonToggleDemo } from "@/app/design-system/ButtonToggleDemo";
import { NextProject } from "@/components/work/NextProject";
import { ViewCursor } from "@/components/work/ViewCursor";
import { ProjectHero } from "@/components/work/ProjectHero";
import { about } from "@/copy-database/about";
import { home } from "@/copy-database/home";
import { projects } from "@/content/projects";
import { ageras as agerasCaseStudy } from "@/copy-database/project-ageras";
import { getComponentHosts } from "@/lib/component-usage";
import { hideInternalPage } from "@/lib/internal-page";
import { Toc } from "@/app/design-system/Toc";

// Internal catalogue. Not in the nav. 404 when published.
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
  { name: "desktop", value: "1200px", use: "works list side by side, larger headings" },
  { name: "wide", value: "1400px", use: "type-stat at 36px" },
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
    fontSize: "23px (<810), 36px (810>)",
    fontWeight: "medium",
    lineHeight: "100% (<810), 90% (810>)",
    use: "sub-headings",
  },
  {
    cls: "type-h3-mono",
    font: "Martian Mono",
    letterSpacing: "-3%",
    textTransform: "uppercase",
    fontSize: "23px (<810), 36px (810>)",
    fontWeight: "regular",
    lineHeight: "130%",
    use: "top nav name",
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
  { cls: "appear", use: "slides up 20px in 0.8s on scroll. Text uses a child span. A whole row uses one child with appear-body" },
  { cls: "reveal-clip", use: "clips text, no slide" },
];

/* ── components ─────────────────────────────────────────────────────── */

type Entry = { name: string; note?: string };

const atoms: Entry[] = [
  { name: "Button" },
  { name: "NavClock", note: "Time and location. Shown from tablet, 810px." },
  {
    name: "WorkCard",
    note: "Height: auto, width: fill. Video: square, align top. Hover scale: 104% / 0.5s, ease-in. The image turns grayscale in 0.2s. Hover: [VIEW] pointer. Pass `dither` to fade a Bayer dither of ink, muted, and paper over the whole image on hover. The zoom and [view] pointer stay. `caption=\"above\"` stacks the year, formatted [2026] in muted, then a 2px gap, then the project name, both on the left, then the image. `description` can add that project's description under the name.",
  },
  {
    name: "ImageFrame",
    note: "Max height 700. Fill: no padding, image edge to edge. Solid: surface fill (#f0f0f0) unless `color` is set. Background: image behind. Solid and background padding is equal on all sides, inside the frame: 24px below tablet 810, 56px from tablet, on every column count. Default `columns` is 1 outside a row. Optional `maxHeight` (px) caps the image inside a solid or background frame; omitted frames keep the column max. Optional description 8px under the frame, type-label muted. Stacked rows use ImageRowStack (24px below 810, 44px from tablet); padding does not add to stack gap.",
  },
  { name: "SectionHeading", note: "Section title. 41px, 51px from desktop 1200, 64px from 1440." },
  { name: "NavLink", note: "One link for both bars. Below tablet the overlay label is plain type-display text, with no roll and no leader. From tablet it is type-label, the text rolls on hover, and the leader shows on hover and the current page." },
  { name: "LabelRoll", note: "Text rolls up on hover." },
  {
    name: "TextMorphing",
    note: "Blur crossfade between phrases, with a threshold dissolve. Pass any number of phrases through texts, at least two. Does not set a font, size, weight, or color — pass a type class on className. Width hugs the longest phrase. The blur distance scales with the font size. Reduced motion shows the first phrase, still.",
  },
  {
    name: "MorphingLabel",
    note: "type-label morph used in HeroLetter. Phrases are home.hero.letterLabel, in order. Add a line there to add a word. Width hugs the longest phrase. Placement is className. Reduced motion shows the first phrase, still.",
  },
  {
    name: "ViewCursor",
    note: "Fixed [view] label on the pointer. Brackets and the word use the button gap, 4px, with no roll. The frame is 4px of paper at full opacity. Hides the site dot. Shown while hovering a WorkCard, and while hovering the NextProject image.",
  },
  {
    name: "SplineSquare",
    note: "Square block, not a page section. Height is 50vh below desktop 1200 and 80vh from 1200. Width follows the square. The React export of the interactive letter is /spline-square.splinecode. It is drawn near the size of the block, capped at 1280px and 1.5× the screen density, then scaled to fill the frame so the picture is not cropped. Rendering pauses while the block is off screen. A failed graphics context does not raise a page error. If the browser cannot create a rendering context the block stays empty.",
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
      <WorkCard project={projects[0]} />
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
  TextMorphing: <TextMorphing className="type-label" texts={home.hero.letterLabel} />,
  MorphingLabel: <MorphingLabel />,
  ViewCursor: <ViewCursor inline />,
  SplineSquare: <SplineSquare />,
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
  { name: "HeroLetter", note: "Ink background bleeds edge to edge, like the footer. Labels and the scroll button stay in the page column (page-inset + section-wrap) and are paper. Below tablet 810 the MorphingLabel sits centered on the top edge of the Spline square and the role sits centered on the bottom edge, with no gap. From tablet the MorphingLabel is on the left and the role is on the right, both vertically centered in the column. The scroll button sits 24px above the bottom of the full-viewport section. The center frame holds SplineSquare, centered horizontally and vertically. The nav reads it through its own invert, with no separate ink treatment on this section." },
  {
    name: "WorksGrid",
    note: "Grid by default. The heading and a stacked grid and list toggle sit on one row, 12px apart. The toggle column has 4px top padding, 8px from 1440, so the first toggle's brackets meet the heading caps. The toggles have 2px between them and replace the project count. 2 columns below tablet 810, 4 from tablet. Column gap 12px on every viewport. Cells align to the top of the row. Each cell stacks the year, formatted [2026] in muted, and the project name with a 2px gap, both on the left, then the image, 12px apart. Each list row uses the Services row structure. 24px padding above and below, a top rule, and the row grows with its content. Below tablet 810 the picture is 128px wide, with height from its aspect ratio, and 12px between it and the text. The right column stacks two blocks with 12px between them: the year and project name, then the description. Below tablet the year sits above the project name with 12px between them. From tablet the year and name stay on one row, aligned to the top, and a long name wraps beside the year. The year is the project year in brackets, like [2026], in muted. From tablet the row is two equal halves with a 12px gap, the same halfway split as the nav, so the description lines up with the nav's right half. The left half is two equal subcolumns with a 12px gap: the year and name, aligned to the top, then the picture aligned to the left of its subcolumn. The picture is 128px tall, contained, and scales down to stay inside that subcolumn. The right half is the description in type-body, max 500px. Each list row is one link and uses the same [view] pointer as the grid. Hover on a grid cell, or anywhere on a list row, keeps the [view] pointer and runs the same image treatment: grayscale in 0.2s, zoom to 104% in 0.5s ease-in, and a Bayer dither of ink, muted, and paper (2px blocks) fading over the picture on that same 0.5s ease-in. In the list the dither follows the contained picture, aligned top left, and the zoom is clipped to the picture. Each grid card and each list row uses appear, rising 20px in 0.8s when it scrolls into view.",
  },
  { name: "Services", note: "The heading sits in the right half from desktop 1200. Below tablet 810 each row is two columns with 12px between them: the 56px icon on the left, and on the right the number, in muted, stacked above the name with 12px between them, then the description 12px below that pair. From tablet 810 the row is two equal halves with a 12px gap. The left half is two equal subcolumns: the number, in muted, and the name on one row, aligned to the top, with a long name wrapping beside the number, and the icon in the right subcolumn. The right half is the description, max 500px. Each row uses appear, rising 20px in 0.8s when it scrolls into view." },
  { name: "WhatIDo", note: "Tag row, then heading — gap-36 between them (same headline-to-body step as Services)." },
  {
    name: "Chapter",
    note: "Stacks below tablet; chapter headline is full width under 810px, then max 70% of the left column from tablet. Omit `headline` to drop the left title; from tablet the subsections stay in the right column. Two columns from 810. Right column subsections use gap-24 below 810px, gap-36 from tablet. Body paragraphs use gap-12. A subsection can include an image in the right column, fill unless a variant is set. The image is the same width as the subsection text, with 36px above it. Solid and background frames use the 1-column inset: 24px below 810, 56px from tablet.",
  },
  {
    name: "CredentialSection",
    note: "Title and year on one line, meta below. 50/50 from tablet 810. Title offsets to the right half from desktop 1200. Each row uses appear, rising 20px in 0.8s when it scrolls into view.",
  },
  {
    name: "ImageRow",
    note: "1–3 frames. gap-12 between grid cells on all viewports. Below 810px: 1-column rows stay one column; 2-column rows stay two columns side by side; 3-column rows use a 2×2 grid (two on the first row, third bottom-left, bottom-right empty). From tablet 810: 1, 2, or 3 equal columns. Solid and background padding follows ImageFrame (24px below tablet, 56px from tablet, on every column count). Each cell is frame plus optional caption (8px gap). From tablet, when any frame has a caption in a 2- or 3-column row, equal-height frames then top-aligned captions. Captions are type-label muted. Media is vertically centered inside the padded frame on multi-column rows. 1-column rows hug the image and keep media top-aligned.",
  },
  { name: "ChapterBlock", note: "Chapter copy, then image rows. gap-36 between them below 810px, gap-96 from tablet." },
  {
    name: "ImageRowStack",
    note: "Single-column grid, 24px between stacked image rows below 810px, 44px from tablet. In-row cell gap is on ImageRow (12px). Solid and background padding is inside the frame and does not add to the stack gap.",
  },
  {
    name: "PlaygroundGrid",
    note: "3 columns below desktop 1200, 6 from desktop. 12px between columns, 96px between rows on every viewport. Each cell has 24px padding on the left and right below tablet 810, 32px from tablet. Images keep their ratio, fill the padded cell, and sit on the top of the row. Row height follows the tallest image. Empty cell space is the page color.",
  },
];

const shell: Entry[] = [
  { name: "SiteLayout", note: "Cursor, nav, page-inset + page-main (gap-56 below 810px, gap-96 from tablet), footer. Side padding lives only on page-inset. page-main caps each direct child at 1920 centred — section components do not repeat section-wrap. Footer ink uses footer-bleed (excluded from that cap); footer content uses page-inset + section-wrap. On /playground only, adds html.theme-ink (ink background, paper text) and passes tone=\"ink\" to Footer. The nav does not take a tone. The class and tone come off on every other route, which stay paper. Route changes fade the outgoing page out, then fade the next page in (400ms each). The nav keeps the outgoing route until the incoming fade starts. Playground theme follows the live route so the incoming page is already ink or paper. Reduced motion skips the fade." },
  { name: "PageFade", note: "Wraps the main column. On an in-site link click, the current page is snapshotted, fades out, then the next page fades in. Each step is 400ms, ease 0.45, 0, 0.55, 1. The snapshot sits under the nav. `onShow` runs when the outgoing fade ends and the incoming fade starts. Same-page hashes, new tabs, and external links do not fade. A route change starts at the top, unless the url hash matches an element on the page. First load does not fade. Reduced motion swaps with no fade." },
  { name: "SiteCursor", note: "16px dot on fine pointers, placed on the pointer with no follow delay. Hidden while hovering a WorkCard or the NextProject image, where the [view] label is the cursor." },
  {
    name: "Nav",
    note: "Fixed, full width, same side padding as the page shell (12px at 1200px and below, 24px above). The bar uses appear, rising 20px in 0.8s when it loads. The bar has 24px padding above the name and 12px below it. The name links to the homepage. It is the site name, set in type-h3-mono, one line, vertically centered in the bar. Below tablet 810 it shows the short name. Empty bar space lets clicks through to the page. Menu below tablet 810. The sheet and the links fade over 400ms, ease 0.45, 0, 0.55, 1, on open and on close, including when a link navigates. Reduced motion snaps. From tablet, the right half is 3 columns and 2 rows with 12px between columns and 2px between rows. Row one is works, about, and the time. Row two is playground and the place. Each row is one 1.3em line, so the clock shares the same lines as the links. The clock column lines up with the third meta column in ProjectHero. Works links to the homepage and shows the active mark there and on a project page. The bar has no fill. Its text is paper with mix-blend-difference, so it turns dark on a light page and light on a dark page, including photos. That is the only place this blend is used. The open menu sheet below tablet is solid paper and sits behind the bar, so the same blend reads as ink text on that sheet. `path` overrides the route used for the active mark. The menu closes from the live route.",
  },
  {
    name: "Footer",
    note: "tone=\"paper\" (default) flips to ink near the bottom of the page, with a 1s color and wordmark-filter transition. tone=\"ink\" stays solid ink and paper text, wordmark inverted, with no scroll listener and no transition. footer-bleed paints edge-to-edge; vertical spacing comes from page-main gap-96 above the band and py-96 inside. Content uses page-inset + section-wrap. 96px gap between the link row and the wordmark. Wordmark is an SVG that fills the content width on every breakpoint. Below tablet 810 it is the short wordmark; from tablet it is the full wordmark. Columns swap at desktop 1200.",
  },
  { name: "SmoothScroll", note: "Smooth scroll and in-view reveals. Same-page hash links scroll to that id, keeping its scroll-margin, including while a smooth scroll is already moving." },
];

const work: Entry[] = [
  {
    name: "ProjectHero",
    note: "Title is full width below 810px, max 70% of the container from tablet. gap-36 between title and about/meta below 810px, gap-56 from tablet. About and meta stack below 810 with gap-24 between blocks; two columns from tablet 810 with gap-12. Each meta block uses gap-12 between label and value. About column uses desktop:pr-152. About and meta labels use type-label-medium. Values stay type-label. gap-36 between the copy block and hero image below 810px, gap-96 from tablet. Image is one column, solid unless a variant is passed. `color` sets the solid fill. Background uses `imageBackgroundSrc` behind the image.",
  },
  {
    name: "NextProject",
    note: "Case-study footer: py-96 inside the section. Bracket label above the project name, both centered on the image. The image has a 20% paper overlay. Image hover matches WorksGrid: grayscale in 0.2s, 104% zoom in 0.5s ease-in, Bayer dither fade, and the [view] pointer.",
  },
];

/* ── page ───────────────────────────────────────────────────────────── */

const SECTION_PREVIEWS: Record<string, React.ReactNode> = {
  HeroLetter: <HeroLetter />,
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
      imageBackgroundSrc={agerasCaseStudy.heroImage?.backgroundSrc}
      imageColor={
        agerasCaseStudy.heroImage &&
        "color" in agerasCaseStudy.heroImage &&
        typeof agerasCaseStudy.heroImage.color === "string"
          ? agerasCaseStudy.heroImage.color
          : undefined
      }
    />
  ),
  NextProject: <NextProject slug="ageras" />,
  PlaygroundGrid: <PlaygroundGrid />,
};

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
        <Toc groups={toc} rowClassName={`${DOC} flex flex-wrap items-baseline gap-x-12 gap-y-2`} />
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
                {"font" in t ? `Font: ${t.font}, ` : ""}
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
