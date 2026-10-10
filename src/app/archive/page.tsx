import type { Metadata } from "next";
import { ChapterBlock } from "@/components/sections/ChapterBlock";
import { cocoCareArchivedChapters } from "@/content/case-studies/coco-care";
import type { CaseStudyChapter } from "@/content/case-studies/types";

// Internal reference page. Kept out of the nav and out of search results.
export const metadata: Metadata = {
  title: "Archive — internal",
  robots: { index: false, follow: false, nocache: true },
};

const DOC = "font-display text-[13px] leading-[1.6] tracking-normal normal-case";
const DOC_DIM = `${DOC} text-muted`;
const DOC_TITLE = "font-display text-[15px] leading-[1.4] tracking-normal normal-case";

type ArchivedBlock = {
  id: string;
  name: string;
  from: string;
  note: string;
  chapter: CaseStudyChapter;
};

function archivedChapter(headline: string): CaseStudyChapter {
  const chapter = cocoCareArchivedChapters.find((item) => item.headline === headline);
  if (!chapter) throw new Error(`Archived chapter missing: ${headline}`);
  return chapter;
}

/** Case-study chapters hidden from their pages. Add the next one here. */
const blocks: ArchivedBlock[] = [
  {
    id: "focus-areas",
    name: "Focus areas",
    from: "Coco Care",
    note: "Hidden from /cococare. Consistency, Transparency, Speed, and Reminders.",
    chapter: archivedChapter("focus areas"),
  },
];

/** Components taken off the live site. Add the next one here. */
const components: { id: string; name: string; note: string }[] = [];

export default function ArchivePage() {
  const toc = [
    ...(components.length
      ? [{ label: "Components", links: components.map((item) => ({ id: item.id, label: item.name })) }]
      : []),
    { label: "Blocks", links: blocks.map((item) => ({ id: item.id, label: item.name })) },
  ];

  return (
    <main className="flex flex-col gap-96 pt-216 pb-96">
      <header className="section-wrap flex flex-col gap-16">
        <p className={DOC_DIM}>internal — not linked, not indexed</p>
        <h1 className={`${DOC_TITLE} text-[24px]`}>Archive</h1>
        <p className={`${DOC} max-w-[680px]`}>
          Components and case-study blocks taken off the live site. The copy stays here.
        </p>
        <nav aria-label="Contents" className="flex flex-col gap-8">
          {toc.map((group) => (
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
      </header>

      {blocks.map((block) => (
        <section key={block.id} id={block.id} className="flex scroll-mt-104 flex-col gap-16">
          <div className="section-wrap flex flex-col gap-4">
            <h2 className={DOC_TITLE}>{block.name}</h2>
            <p className={DOC}>
              <span className={DOC_DIM}>{block.from}. </span>
              {block.note}
            </p>
          </div>
          <ChapterBlock
            headline={block.chapter.headline}
            sections={block.chapter.sections}
            imageRows={block.chapter.imageRows}
          />
        </section>
      ))}
    </main>
  );
}
