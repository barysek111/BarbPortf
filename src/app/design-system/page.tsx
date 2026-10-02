import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LabelRoll } from "@/components/ui/LabelRoll";
import { NavLink } from "@/components/layout/NavLink";
import { ImageRowStack } from "@/components/sections/ImageRowStack";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { ImageRow } from "@/components/sections/ImageRow";
import { NavClock } from "@/components/layout/NavClock";
import { WorkCard } from "@/components/work/WorkCard";
import { Hero } from "@/components/home/Hero";
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
  { name: "tablet", value: "810px", use: "Nav inline + NavClock; footer desktop layout; works grid 4-up; ImageRow columns; Chapter/ProjectHero/Services split; hero meta; list image strip." },
  { name: "desktop", value: "1200px", use: "WorksDisplay list rows side-by-side (h-176) + view project CTA; type-h2/h3 larger steps continue above." },
  { name: "wide", value: "1400px", use: "Type only — type-h3 reaches its largest step." },
  { name: "max", value: "1440px", use: "Type only — type-h2 reaches its largest step." },
];

const typeLevels = [
  { cls: "type-label", spec: "Martian Mono 12 / 400 / 1.3em / −0.05em / upper", use: "Labels, nav, meta, captions" },
  { cls: "type-body", spec: "Inter Display 16 / 500 / 1.1em", use: "Body copy, form fields" },
  { cls: "type-h3", spec: "Inter Display 18 → 23 → 29 → 36 / 500", use: "Sub-headings, stat figures" },
  { cls: "type-stat", spec: "Inter Display 18 → 23 → 29 → 36 / 500 / 0.8em / −0.05em", use: "Stat figures only. Tight line box so the value can roll on hover." },
  { cls: "type-display", spec: "Inter Display 48 / 500 / 1.2em", use: "Page and hero titles, open mobile nav" },
  { cls: "type-h2", spec: "Inter Display 41 → 51 → 64 / 500 / 1em", use: "Section headlines" },
];

/** Common rhythm steps — use these numeric utilities only (no semantic spacing class names). */
const spacingRhythm = [
  { utility: "gap-2 / p-2", value: "2px", use: "Near-flush text stacks — nav count, footer meta, card titles" },
  { utility: "gap-4", value: "4px", use: "Image strips and galleries" },
  { utility: "gap-12 / px-12", value: "12px", use: "Page side padding (section-wrap), grid gutters" },
  { utility: "gap-36", value: "36px", use: "Headline block to content (Services, CredentialSection, Chapter stack)" },
  { utility: "gap-56", value: "56px", use: "ProjectHero copy stacks" },
  { utility: "gap-96 (site-main)", value: "96px", use: "Between direct children of site-main / case-study article; ProjectHero copy → hero image" },
  { utility: "pt-216", value: "216px", use: "Page top offset below the nav" },
];

/** Placeholders from the Ageras case-study gallery (design-system demos only). */
const MEDIA_A = "/images/framer/O7ToMbwrW2Kyojg6kIITlM4Cs-b1efb23d.avif";
const MEDIA_B = "/images/framer/nZVIc7KvsqiOi1p5VDtfGUs53EA-e8994ee4.avif";
const MEDIA_C = "/images/framer/QD2AxA7bZdiagkNhpHtgD6IuDIo-0f8ca57f.avif";

const layoutUtils = [
  { cls: "site-main", use: "Page wrap. Caps at 3840px, centres content, gap-96 between sections; Footer is last child (same max width)." },
  { cls: "section-wrap", use: "Section wrap. Caps at 1920px with 12px horizontal padding." },
  { cls: "gap-36", use: "36px — section headline to content (Services, Experience/Education, Chapter below tablet)." },
  { cls: "gap-56", use: "56px — ProjectHero in-section copy rhythm." },
  { cls: "gap-96", use: "96px — between site-main children or in-section stacks (ProjectHero)." },
  { cls: "ruled-row (lib/ruled-row.ts)", use: "Row: px-12 py-24 + border-t. Services, CredentialSection, Works list." },
  { cls: "stack-front", use: "Lifts a section above the sticky/pinned bands behind it (z-stack)." },
  { cls: "z-nav / z-stack / z-lift", use: "Stacking tokens: fixed nav (8), hero meta / stack-front (3), overlaid type or media (1)." },
  { cls: "label-roll / label-roll-track", use: "Roll stack: clip on outer line box; track shifts −50% on control hover (translate transition on track)." },
  { cls: "mark-leader-before", use: "8px square 12px left of label — NavLink (hover + active), Button toggle when pressed." },
  { cls: "below-tablet", use: "Variant for width < 810px (strictly below tablet). Used by WorksDisplay list image strip." },
  { cls: "appear", use: "One-shot in-view reveal. Offset via data-appear 20/30/60. Not a hover effect." },
  { cls: "reveal-clip", use: "Clips text to its box with no entrance offset." },
];

/* ── components ─────────────────────────────────────────────────────── */

type Entry = { name: string; file: string; note: string };

const atoms: Entry[] = [
  {
    name: "Button",
    file: "ui/Button.tsx",
    note: "Simple (default): `[` gap-4 LabelRoll `]`; roll on hover. Toggle on/off as before. Nav uses NavLink.",
  },
  {
    name: "NavClock",
    file: "layout/NavClock.tsx",
    note: "Live local time plus location (flex col gap-2), from tablet (810px) up. Ticks once a second.",
  },
  {
    name: "WorkCard",
    file: "work/WorkCard.tsx",
    note: "Project thumbnail with index + title. WorkThumbMedia: images intrinsic height; mp4/webm in aspect-square frame, object-cover object-top (crops bottom e.g. watermark). Loop muted autoplay. Hover scale 110% / 1.4s. [VIEW] on pointer.",
  },
  {
    name: "ImageFrame",
    file: "ui/ImageFrame.tsx",
    note: "Case-study frame: max-h 800px (row height ≤ 800). fill: full-width object-cover, no surface pad (intrinsic height until row stretch). solid / background: p-44, bg-surface on solid; image scales in the padded area (max-h-full); orientation-aware contain. Uses next/image. In ImageRow, columns stretch to the tallest frame.",
  },
  {
    name: "SectionHeading",
    file: "ui/SectionHeading.tsx",
    note: "Section title (type-h2 + appear). Parent stack uses gap-36 for headline-to-content on Services / Credential / Chapter (stacked). Props: as (h1 | h2), appear (20 | 30 | 60), className.",
  },
  {
    name: "NavLink",
    file: "layout/NavLink.tsx",
    note: "Nav only: LabelRoll on label + leader (hover + active via markLeaderNavClass). Menu open: type-display row. Optional [count]. No extra left padding on label.",
  },
  {
    name: "LabelRoll",
    file: "ui/LabelRoll.tsx",
    note: "Two-line roll stack; used inside Button and NavLink.",
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
      <ImageFrame variant="fill" src={MEDIA_A} alt="" />
      <ImageFrame variant="solid" src={MEDIA_B} alt="" />
      <ImageFrame variant="background" src={MEDIA_B} alt="" backgroundSrc={MEDIA_C} />
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
  { name: "Hero", file: "home/Hero.tsx", note: "Full-height opener (HeroRing in home/HeroRing.tsx). Section-to-section rhythm from site-main gap-96. Scroll cue bottom-12. hero-frame 100vw / 60vw from tablet." },
  { name: "WorksDisplay", file: "sections/WorksDisplay.tsx", note: "Client component: headline + count, then grid/list Button toggles (gap-12 from title, gap-2 between toggles). List: ruled rows; title type-label, description type-body ink; copy block gap-8 + view project (desktop); image strip tablet:h-176. Overlay Link below 1200px. Must stay a direct child of site-main." },
  { name: "Services", file: "home/Services.tsx", note: "Section root gap-36; title in right half from desktop 1200px. Each row: ruledRowClass; 50/50 from tablet (gap-12), items-start. Left strip: below 810 flex row icon then index+title (gap-12); from tablet grid — index+title | icon. Right: type-body max-w-[500px]. Below 810: strip, gap-24, description." },
  { name: "WhatIDo", file: "home/WhatIDo.tsx", note: "flex flex-col gap-12 between tag row and SectionHeading." },
  { name: "Chapter", file: "sections/Chapter.tsx", note: "Two-column from tablet: gap-36 mobile stack / tablet:gap-12 between columns. Right stack max-w-[500px] justify-self-start. Sub-sections gap-36; sub-blocks gap-12 label→body. Optional ImageFrames at half width in right stack." },
  {
    name: "CredentialSection",
    file: "sections/CredentialSection.tsx",
    note: "Experience and Education. ruledRowClass rows. Stacked: row1 title (left) + year (right); row2 meta left — year column reserved from the top. Tablet+ 50/50 title | meta|year subgrid.",
  },
  {
    name: "ImageRow",
    file: "sections/ImageRow.tsx",
    note: "Case-study media row: 1–3 columns, gap-12 between frames. Stack multiple rows with ImageRowStack (gap-12; optional last-row pb-96 when not using parent gap-96).",
  },
  {
    name: "ChapterBlock",
    file: "sections/ChapterBlock.tsx",
    note: "Case-study unit: Chapter + optional ImageRowStack (gap-96 between copy and media; gap-12 between rows). padLast false — article gap-96 separates chapters. Used on /[slug] routes.",
  },
  {
    name: "ImageRowStack",
    file: "sections/ImageRowStack.tsx",
    note: "Wraps stacked ImageRows with gap-12. Prop padLast (default true) adds pb-96 on last row when needed outside site-main/article gap-96.",
  },
];

const shell: Entry[] = [
  { name: "SiteLayout", file: "layout/SiteLayout.tsx", note: "SmoothScroll → SiteCursor + Nav + site-main (sections + Footer). Footer wrapper -mt-96 + h-96 spacer." },
  { name: "SiteCursor", file: "layout/SiteCursor.tsx", note: "Pointer-fine only: 16px paper-filled dot + mix-blend-mode difference (dark on paper, light on ink). Portaled to body; cursor:none on html. Lerp ~0.11 rAF. z-index-cursor." },
  { name: "Nav", file: "layout/Nav.tsx", note: "Fixed bar, mix-blend exclusion. Menu overlay below 810px only. From tablet: Works + About column (gap-2) + NavClock. No Home link." },
  { name: "Footer", file: "layout/Footer.tsx", note: "Client: scroll-synced ink flip when ≥50% of footer band is visible (Lenis + resize); 1s paper↔ink (smooth ease) on bg/text, SVG invert. Band pt-104 pb-44, gap-44 between meta row and wordmark; spacer h-96 paper. Row 1: contact/links grid order. Row 2: mobile BARB/G.; tablet+ SVG." },
  { name: "SmoothScroll", file: "layout/SmoothScroll.tsx", note: "Lenis provider. Also drives the appear reveals. Always active via SiteLayout." },
];

const work: Entry[] = [
  { name: "ProjectHero", file: "work/ProjectHero.tsx", note: "Case-study opener: flex flex-col gap-96 + embedded hero ImageRow; copy uses gap-56. h1 full width below 1200px, desktop:max-w-1/2 from 1200px. About | meta: 2-col grid from tablet with gap-12. About column pad-right: none when stacked (<810); tablet:pr-56 (810–1199); desktop:pr-[160px] (1200+). Props: title, aboutLabel, description, meta, imageSrc, imageAlt." },
  {
    name: "NextProject",
    file: "work/NextProject.tsx",
    note: "Closing project link. pt-104 + pb-96. Grid group: image zoom 125% + white overlay (paper 40% opacity) on hover/focus-within; no blur. Title + Button stacked center. Image link tabIndex -1.",
  },
];

/* ── page ───────────────────────────────────────────────────────────── */

// Rendered from the same modules the routes import, so a change made to any of
// these propagates to every instance on the site.
const SECTION_PREVIEWS: Record<string, React.ReactNode> = {
  Hero: <Hero />,
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
    <ImageRowStack>
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
    </ImageRowStack>
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
  NextProject: <NextProject slug="ageras" />,
};

function Section({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-44">
      <div className="flex flex-col gap-12">
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
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-baseline gap-12">
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
    <main className="section-wrap flex flex-col gap-152 pt-216 pb-152">
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
            <div key={c.name} className="flex flex-col gap-12">
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
            <div key={n} className="flex flex-col gap-12">
              <div className="bg-ink" style={{ width: n, height: n }} />
              <p className={DOC_DIM}>{n}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-24">
          {spacingRhythm.map((a) => (
            <div key={a.utility} className="flex flex-col gap-2 desktop:flex-row desktop:gap-24">
              <p className={`${DOC_TITLE} desktop:w-[180px]`}>{a.utility}</p>
              <p className={`${DOC_DIM} desktop:w-[100px]`}>{a.value}</p>
              <p className={`${DOC} flex-1`}>{a.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type levels">
        <div className="flex flex-col gap-56">
          {typeLevels.map((t) => (
            <div key={t.cls} className="flex flex-col gap-12">
              <div className="flex flex-wrap items-baseline gap-12">
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
        <div className="flex flex-col gap-96">
          {atoms.map((entry) => (
            <Row key={entry.name} entry={entry} usage={usage}>
              {ATOM_PREVIEWS[entry.name]}
            </Row>
          ))}
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
              <div className="flex flex-col gap-12">
                <div className="flex flex-wrap items-baseline gap-12">
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
        <div className="flex flex-col gap-56">
          {shell.map((e) => (
            <Row key={e.name} entry={e} usage={usage} />
          ))}
        </div>
      </Section>

      <Section title="Work">
        <div className="flex flex-col gap-56">
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
