import type { Metadata } from "next";
import Link from "next/link";
import { BracketButton } from "@/components/ui/BracketButton";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImageRow } from "@/components/sections/ImageRow";
import { NavClock } from "@/components/layout/NavClock";
import { WorkCard } from "@/components/work/WorkCard";
import { Hero } from "@/components/home/Hero";
import { HeroRing } from "@/components/home/HeroRing";
import { WorksDisplay } from "@/components/sections/WorksDisplay";
import { Services } from "@/components/home/Services";
import { WhatIDo } from "@/components/home/WhatIDo";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { AboutHero } from "@/components/sections/AboutHero";
import { Chapter } from "@/components/sections/Chapter";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { NextProject } from "@/components/work/NextProject";
import { ProjectHero } from "@/components/work/ProjectHero";
import { ProjectStub } from "@/components/work/ProjectStub";
import { getCaseStudy } from "@/content/case-studies";
import { getProjectNeighbor, projects } from "@/content/projects";
import { agerasCaseStudy } from "@/content/case-studies/ageras";
import { getComponentUsage } from "@/lib/component-usage";

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
  { name: "ink", value: "#000", use: "Type, rules, inverse surfaces" },
  { name: "paper", value: "#fff", use: "Page background" },
  { name: "muted", value: "#a7a7a7", use: "Inactive toggles, secondary meta" },
  { name: "surface", value: "#f0f0f0", use: "ImageFrame solid background fill" },
  { name: "selection", value: "#ff0c10", use: "Text selection only" },
];

const breakpoints = [
  { name: "tablet", value: "810px", use: "Primary layout step: works grid 4-up, ImageRow columns, Chapter/ProjectHero/Services stack-to-split, hero meta, list-mode image strip." },
  { name: "desktop", value: "1200px", use: "Nav inline + NavClock, list rows side-by-side (h-176), WorksDisplay list CTA in text column; type-h2/h3 larger steps continue above." },
  { name: "wide", value: "1400px", use: "Type only — type-h3 reaches its largest step." },
  { name: "max", value: "1440px", use: "Type only — type-h2 reaches its largest step." },
];

const typeLevels = [
  { cls: "type-label", spec: "Martian Mono 12 / 400 / 1.3em / −0.05em / upper", use: "Labels, nav, meta, captions" },
  { cls: "type-label-strong", spec: "Martian Mono 12 / 600 / 1.2em / −0.05em / upper", use: "Emphasised labels, FAQ tags" },
  { cls: "type-body", spec: "Inter Display 16 / 500 / 1.1em", use: "Body copy, form fields" },
  { cls: "type-h3", spec: "Inter Display 18 → 23 → 29 → 36 / 500", use: "Sub-headings, stat figures" },
  { cls: "type-stat", spec: "Inter Display 18 → 23 → 29 → 36 / 500 / 0.8em / −0.05em", use: "Stat figures only. Tight line box so the value can roll on hover." },
  { cls: "type-display", spec: "Inter Display 48 / 500 / 1.2em", use: "Page and hero titles, open mobile nav" },
  { cls: "type-h2", spec: "Inter Display 41 → 51 → 64 / 500 / 1em", use: "Section headlines" },
];

const spacingAliases = [
  { name: "hairline", value: "2px", use: "Near-flush text stacks — nav count, footer meta, card titles" },
  { name: "tight", value: "4px", use: "Image strips and galleries" },
  { name: "gutter", value: "12px", use: "Page side padding and every grid gutter" },
  { name: "header", value: "56px", use: "Headline to content, and sub-section separation" },
  { name: "headline", value: "56px", use: "Alias of header — headline to content" },
  { name: "section", value: "96px", use: "Between sections" },
  { name: "page-top", value: "216px", use: "Page top offset below the nav" },
];

/** Placeholders from the Ageras case-study gallery (design-system demos only). */
const MEDIA_A = "/images/framer/O7ToMbwrW2Kyojg6kIITlM4Cs-b1efb23d.avif";
const MEDIA_B = "/images/framer/nZVIc7KvsqiOi1p5VDtfGUs53EA-e8994ee4.avif";
const MEDIA_C = "/images/framer/QD2AxA7bZdiagkNhpHtgD6IuDIo-0f8ca57f.avif";

const layoutUtils = [
  { cls: "site-main", use: "Outermost wrap. Caps the page at 3840px and centres it." },
  { cls: "section-wrap", use: "Section wrap. Caps at 1920px with the 10px gutter." },
  { cls: "stack-front", use: "Lifts a section above the sticky/pinned bands behind it (z-stack)." },
  { cls: "z-nav / z-stack / z-lift", use: "Stacking tokens: fixed nav (8), hero meta / stack-front (3), overlaid type or media (1)." },
  { cls: "label-roll", use: "Bracket label roll line; pair with group-hover:-translate-y-full on BracketButton, toggles, NextProject." },
  { cls: "mark-leader / mark-leader-before", use: "8px square one gutter left of a label (nav active, footer links, list toggle when .is-on)." },
  { cls: "below-tablet", use: "Variant for width < 810px (strictly below tablet). Used by WorksDisplay list image strip." },
  { cls: "appear", use: "One-shot in-view reveal. Offset via data-appear 20/30/60. Not a hover effect." },
  { cls: "reveal-clip", use: "Clips text to its box with no entrance offset." },
];

/* ── components ─────────────────────────────────────────────────────── */

type Entry = { name: string; file: string; note: string };

const atoms: Entry[] = [
  {
    name: "BracketButton",
    file: "ui/BracketButton.tsx",
    note: "The only button style. Square brackets frame the label, which rolls up to a duplicate on hover (label-roll). Renders as a link when given href, otherwise a button.",
  },
  {
    name: "NavClock",
    file: "layout/NavClock.tsx",
    note: "Live local time plus location, desktop nav only. Ticks once a second and is hidden below 1200px.",
  },
  {
    name: "WorkCard",
    file: "work/WorkCard.tsx",
    note: "Project thumbnail with an index and title caption. The whole card links to the project. Hover scales the image to 110% over 700ms, clipped to the image, and replaces the pointer with a [VIEW] label that follows it. Caption row has no side padding: muted index flush left, title flush right, pt-gutter above. Used by the home grid and the works page.",
  },
  {
    name: "ImageFrame",
    file: "ui/ImageFrame.tsx",
    note: "Case-study frame: max-h 800px (row height ≤ 800). fill: full-width object-cover, no surface pad (intrinsic height until row stretch). solid / background: p-44, bg-surface on solid; image scales in the padded area (max-h-full); orientation-aware contain. In ImageRow, columns stretch to the tallest frame.",
  },
];

const sections: Entry[] = [
  { name: "Hero", file: "home/Hero.tsx", note: "Full-height opener. Below 810px, “latest work” is hidden and “product designer” is centred over the carousel (z-stack). From tablet, meta is pinned left and right again. Scroll cue centred with bottom-gutter (12px) from the viewport bottom. hero-frame only centres and sets width (100vw / 60vw from 810px); HeroRing owns the 5:4 height — same as its design-system preview. mb-section sits outside the 100svh box so the next section starts 96px below the fold." },
  { name: "HeroRing", file: "home/HeroRing.tsx", note: "Cards on a tilted ring in perspective. Stage is aspect 5:4 at 100% of parent width; layout scales the oval to those bounds. Spins continuously at 4°/s (~90s/turn) with no hover pause or flip. Honours reduced-motion. On the homepage the parent is hero-frame (60vw); on the design-system page the parent is the content column." },
  { name: "WorksDisplay", file: "sections/WorksDisplay.tsx", note: "The single way projects are displayed, with a grid/list toggle (label-roll + mark-leader-before when .is-on). Default title is “LATEST WORK”; the bracket count is projects.length. Grid is 2 equal columns below 810px, then 4 fluid columns from tablet up. Column gap is gutter (12px); row gap is 44px. List rows use muted bottom rules. Below desktop (1200px) each list row stacks: copy, image strip, then view project, with gap-gutter between stack items. From tablet–1199px the summary is 60% width with year top-right and a four-across image strip (h-176); below tablet the summary is full width, year under copy, strip 2×2. From desktop the row is side-by-side h-176 with the CTA at the bottom of the text column. pb-section on the root; pb-header is title-to-grid only. Props: title, headingLevel, className. Must stay a direct child of site-main." },
  { name: "Services", file: "home/Services.tsx", note: "Headline “SERVICES” is full width, matching Education/Experience. Ruled rows stack only below 810px; from tablet up, two equal halves. Left is the 64×64 SVG icon beside “[01] Title”; right is the muted type-label description (wraps; full copy visible at every width). Row content is vertically centred. Each row owns muted top/bottom rules. Height is content plus 24px above and below." },
  { name: "WhatIDo", file: "home/WhatIDo.tsx", note: "Label above a large statement block, with a 12px (gutter) gap between them. Section-to-section space is pb-section on the root." },
  { name: "Experience", file: "sections/Experience.tsx", note: "Headline left above a list of roles, each row pairing the role with its company and years. Used on /about. Rows carry muted top/bottom rules; height is content plus 24px above and below." },
  { name: "Education", file: "sections/Education.tsx", note: "Courses, certificates and degrees. Same muted ruled-list layout as Experience — both render through CredentialSection, so a layout change reaches both; only the label, headline and rows differ. Headline is left-aligned. Used on /about." },
  { name: "AboutHero", file: "sections/AboutHero.tsx", note: "About-page opener: Chapter with the headline plus thinking/making sections. The making section includes a half-width ImageFrame. First-on-page pt-page-top is passed to Chapter." },
  { name: "Chapter", file: "sections/Chapter.tsx", note: "Two-column chapter from tablet (810px): headline left (max-width 70% of the left column), sub-sections right. Below 810px stacks with gap-36 between the headline and the section stack, matching gap-36 between sub-sections. Each sub-section is type-label plus type-body paragraphs; gap-[1.1em] between paragraphs matches type-body line-height (typography rhythm, not spacing scale). Optional ImageFrames in the right-column stack (gap-36) at half column width. Props: headline, sections[{ label, paragraphs[], images? }], headingLevel, className, id. pb-section on the root only." },
  {
    name: "ImageRow",
    file: "sections/ImageRow.tsx",
    note: "Case-study media row: columns 1 | 2 | 3 (equal grid fractions from tablet, stacked on phone). gap-gutter between frames (matches works-grid). Row height = tallest frame, max 800px. Stacked ImageRows: vertical gap = gutter (globals.css); only the last row in a stack gets pb-section. Design-system preview shows 1-, 2-, and 3-column examples.",
  },
];

const shell: Entry[] = [
  { name: "CredentialSection", file: "sections/CredentialSection.tsx", note: "Shared ruled-list layout behind Experience and Education. Never rendered on its own — edit it to change both at once. Section headline is full width (no half-column cap); optional label stacks below it. Each row is three columns at every width: equal-width title and meta (1fr / 1fr), then year auto-aligned right; copy wraps within its column instead of stacking or clipping. Rows own muted top/bottom rules so the list reads as continuous." },
  { name: "SiteLayout", file: "layout/SiteLayout.tsx", note: "Wraps every route with smooth scroll, nav and footer." },
  { name: "Nav", file: "layout/Nav.tsx", note: "Fixed bar using mix-blend so it inverts against whatever sits behind it. Collapses to a [menu] overlay below 1200px." },
  { name: "Footer", file: "layout/Footer.tsx", note: "Oversized wordmark with contact and meta rows. Links reveal an 8px mark on hover. Top padding is pt-104 (104px). Bottom padding is pb-24 (24px)." },
  { name: "SmoothScroll", file: "layout/SmoothScroll.tsx", note: "Lenis provider. Also drives the appear reveals." },
];

const work: Entry[] = [
  { name: "ProjectHero", file: "work/ProjectHero.tsx", note: "Case-study opener: type-h2 title (full width below 810px, max-w-1/2 from tablet), then about plus three meta blocks. Below 810px all four stack with uniform gap-16 between sections (contents flattens meta into the same column); from tablet, two columns with three equal meta columns on the right. The about label uses type-label, same as meta labels. Left column has 160px inner right padding from tablet so the body stays clear of the meta. A one-column solid ImageRow sits under that copy, inside this component. pb-section (96px, the page-section gap) on the copy separates it from the row; the row’s own last-row pb-section is the gap before the next section. imageSrc defaults to public/images/project-hero-placeholder.jpg; pass a project image to replace it (Ageras uses public/images/works/ageras/hero.png). Props: title, aboutLabel, description, meta, imageSrc, imageAlt." },
  {
    name: "CaseStudyPage",
    file: "work/CaseStudyPage.tsx",
    note: "Case study shell: ProjectHero (copy plus its one-column solid image row), stacked Chapter blocks (optional imageRows per chapter), then NextProject for the following project in list order. Content from src/content/case-studies/.",
  },
  {
    name: "NextProject",
    file: "work/NextProject.tsx",
    note: "Closing project-page link. type-h3 title, bracket label, and that project’s home-grid thumbnail centered behind them at 50vw below 810px, 25vw from tablet. A 40% white overlay (bg-paper/40) covers the image only, under the type. Only the image and the title-plus-label are links; the empty space around them is not. Hovering either blurs the image (12px) and scales it to 125% inside the clipped frame so the blur does not wash the edges white, and rolls the label. Both return when the pointer leaves. 500ms. pt-104 plus the previous section’s pb-section (96px) matches the gap below (this section’s pb-section plus the footer’s pt-104). Props: title, href, imageSrc, label. Case studies pass the next project in src/content/projects.ts order; the last project (Eat Grim) passes the previous one and label “previous project”.",
  },
  { name: "ProjectStub", file: "work/ProjectStub.tsx", note: "Fallback when no entry in src/content/case-studies/ — single image, then the same NextProject neighbor as a case study." },
];

/* ── page ───────────────────────────────────────────────────────────── */

// Rendered from the same modules the routes import, so a change made to any of
// these propagates to every instance on the site.
const SECTION_PREVIEWS: Record<string, React.ReactNode> = {
  Hero: <Hero />,
  HeroRing: <HeroRing />,
  WorksDisplay: <WorksDisplay />,
  Services: <Services />,
  WhatIDo: <WhatIDo />,
  Experience: <Experience />,
  Education: <Education />,
  AboutHero: <AboutHero />,
  ImageRow: (
    <div className="flex flex-col gap-header">
      <ImageRow columns={1} frames={[{ variant: "fill", src: MEDIA_A, alt: "" }]} />
      <ImageRow
        columns={2}
        frames={[
          { variant: "solid", src: MEDIA_A, alt: "" },
          { variant: "background", src: MEDIA_B, alt: "", backgroundSrc: MEDIA_C },
        ]}
      />
      <ImageRow
        columns={3}
        frames={[
          { variant: "fill", src: MEDIA_A, alt: "" },
          { variant: "solid", src: MEDIA_B, alt: "" },
          { variant: "background", src: MEDIA_B, alt: "", backgroundSrc: MEDIA_C },
        ]}
      />
    </div>
  ),
  Chapter: (
    <Chapter
      headline={agerasCaseStudy.chapters[0].headline}
      sections={agerasCaseStudy.chapters[0].sections}
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
    />
  ),
  CaseStudyPage: (() => {
    const study = getCaseStudy("plinto");
    return study ? <CaseStudyPage study={study} /> : null;
  })(),
  NextProject: (() => {
    const neighbor = getProjectNeighbor("ageras");
    return neighbor ? (
      <NextProject
        title={neighbor.project.title}
        href={`/${neighbor.project.slug}`}
        imageSrc={neighbor.project.image}
        label={neighbor.label}
      />
    ) : null;
  })(),
  ProjectStub: <ProjectStub project={projects[0]} />,
};

function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-44">
      <div className="flex flex-col gap-gutter">
        <p className={DOC_DIM}>{title}</p>
        {intro ? <p className={`${DOC} max-w-[680px]`}>{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

/** Routes that reach this component, read from the real import graph. */
function UsedOn({ name, usage }: { name: string; usage: Record<string, string[]> }) {
  const routes = usage[name];
  return (
    <p className={DOC_DIM}>
      {routes?.length ? `Used on: ${routes.join(", ")}` : "Not currently used on any route"}
    </p>
  );
}

function Row({
  entry,
  usage,
  children,
}: {
  entry: Entry;
  usage: Record<string, string[]>;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-gutter">
      <div className="flex flex-wrap items-baseline gap-gutter">
        <p className={DOC_TITLE}>{entry.name}</p>
        <p className={DOC_DIM}>{entry.file}</p>
      </div>
      <p className={`${DOC} max-w-[680px]`}>{entry.note}</p>
      <UsedOn name={entry.name} usage={usage} />
      {children ? <div className="pt-24">{children}</div> : null}
    </div>
  );
}

export default function DesignSystemPage() {
  const usage = getComponentUsage();

  return (
    <main className="section-wrap flex flex-col gap-152 pt-page-top pb-152">
      <header className="flex flex-col gap-16">
        <p className={DOC_DIM}>internal reference — not linked, not indexed</p>
        <h1 className={`${DOC_TITLE} text-[24px]`}>Design system</h1>
        <p className={`${DOC} max-w-[680px]`}>
          Every token below is extracted from the source stylesheet rather than measured from rendered pixels. Query the
          raw spec with <code>node scripts/spec.mjs home show &quot;&lt;layer&gt;&quot;</code>.
        </p>
      </header>

      <Section title="Colour">
        <div className="grid grid-cols-1 gap-36 tablet:grid-cols-2 desktop:grid-cols-4">
          {colors.map((c) => (
            <div key={c.name} className="flex flex-col gap-gutter">
              <div className="h-[60px] w-full" style={{ background: c.value }} />
              <p className={DOC_TITLE}>{c.name}</p>
              <p className={DOC_DIM}>{c.value}</p>
              <p className={DOC}>{c.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Breakpoints"
        intro="Tailwind's defaults are cleared, so only these four exist. The 1400 and 1440 split is real: the h3 preset steps at 1400 while the h2 preset steps at 1440."
      >
        <div className="flex flex-col gap-24">
          {breakpoints.map((b) => (
            <div key={b.name} className="flex flex-col gap-8 desktop:flex-row desktop:gap-24">
              <p className={`${DOC_TITLE} desktop:w-[150px]`}>{b.name}</p>
              <p className={`${DOC_DIM} desktop:w-[100px]`}>{b.value}</p>
              <p className={`${DOC} flex-1`}>{b.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Spacing"
        intro="One 4px-based scale shared by gap, padding and margin. The token number is the pixel value, so gap-12 is 12px — never a multiplier. Steps of 4 up to 44, then 8 upward. There is no base step, so only these 19 values exist. Component dimensions (logo width, thumbnail height, hero frame) are not rhythm and use explicit brackets like w-[139px] instead. Tailwind does not error on an unknown utility — gap-7 silently does nothing — so `npm run check:spacing` is what enforces the scale."
      >
        <div className="flex flex-wrap items-end gap-24">
          {[0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 44, 56, 64, 76, 96, 104, 152, 176, 216].map((n) => (
            <div key={n} className="flex flex-col gap-gutter">
              <div className="bg-ink" style={{ width: n, height: n }} />
              <p className={DOC_DIM}>{n}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-24">
          {spacingAliases.map((a) => (
            <div key={a.name} className="flex flex-col gap-hairline desktop:flex-row desktop:gap-24">
              <p className={`${DOC_TITLE} desktop:w-[150px]`}>{a.name}</p>
              <p className={`${DOC_DIM} desktop:w-[100px]`}>{a.value}</p>
              <p className={`${DOC} flex-1`}>{a.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type levels">
        <div className="flex flex-col gap-headline">
          {typeLevels.map((t) => (
            <div key={t.cls} className="flex flex-col gap-gutter">
              <div className="flex flex-wrap items-baseline gap-gutter">
                <p className={DOC_TITLE}>{t.cls}</p>
                <p className={DOC_DIM}>{t.spec}</p>
              </div>
              <p className={DOC}>{t.use}</p>
              <p className={`${t.cls} pt-16`}>The quick brown fox jumps over the lazy dog</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Layout utilities">
        <div className="flex flex-col gap-24">
          {layoutUtils.map((u) => (
            <div key={u.cls} className="flex flex-col gap-8 desktop:flex-row desktop:gap-24">
              <p className={`${DOC_TITLE} desktop:w-[150px]`}>{u.cls}</p>
              <p className={`${DOC} flex-1`}>{u.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Atoms">
        <div className="flex flex-col gap-section">
          <Row entry={atoms[0]} usage={usage}>
            <BracketButton href="#">view all</BracketButton>
          </Row>
          <Row entry={atoms[1]} usage={usage}>
            <NavClock />
          </Row>
          <Row entry={atoms[2]} usage={usage}>
            <div className="max-w-[390px]">
              <WorkCard project={projects[0]} index={0} />
            </div>
          </Row>
          <Row entry={atoms[3]} usage={usage}>
            <div className="grid grid-cols-1 gap-tight tablet:grid-cols-3">
              <ImageFrame variant="fill" src={MEDIA_A} alt="" />
              <ImageFrame variant="solid" src={MEDIA_B} alt="" />
              <ImageFrame variant="background" src={MEDIA_B} alt="" backgroundSrc={MEDIA_C} />
            </div>
          </Row>
        </div>
      </Section>

      <Section title="Section components">
        <p className={`${DOC} max-w-[680px]`}>
          Each one below is the live component, imported from the same module the routes use — editing it here changes
          every instance across the site. Folders: home/ (homepage blocks), sections/ (shared page sections), work/
          (case-study and project UI), layout/ (shell), ui/ (atoms). Sticky and full-height sections behave differently
          outside their page context, so treat position as approximate and everything else as real. Seen in place on{" "}
          <Link href="/" className="underline">
            the homepage
          </Link>
          .
        </p>
        <div className="flex flex-col gap-152">
          {sections.map((e) => (
            <div key={e.name} className="flex flex-col gap-24">
              <div className="flex flex-col gap-gutter">
                <div className="flex flex-wrap items-baseline gap-gutter">
                  <p className={DOC_TITLE}>{e.name}</p>
                  <p className={DOC_DIM}>{e.file}</p>
                </div>
                <p className={`${DOC} max-w-[680px]`}>{e.note}</p>
                <UsedOn name={e.name} usage={usage} />
              </div>
              {SECTION_PREVIEWS[e.name]}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shell">
        <div className="flex flex-col gap-header">
          {shell.map((e) => (
            <Row key={e.name} entry={e} usage={usage} />
          ))}
        </div>
      </Section>

      <Section title="Work">
        <div className="flex flex-col gap-header">
          {work.map((e) => (
            <Row key={e.name} entry={e} usage={usage}>
              {SECTION_PREVIEWS[e.name]}
            </Row>
          ))}
        </div>
      </Section>
    </main>
  );
}
