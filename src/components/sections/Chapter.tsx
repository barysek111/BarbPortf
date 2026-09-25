/** One right-column block: sub-headline plus one or more body paragraphs. */
export type ChapterSection = {
  label: string;
  paragraphs: string[];
};

/**
 * Two-column chapter: headline left, stacked sub-sections right.
 * Section-to-section space is pb-section (96px) on the root only.
 */
export function Chapter({
  headline,
  sections,
}: {
  headline: string;
  sections: ChapterSection[];
}) {
  return (
    <section className="w-full max-w-(--container-section) px-gutter pb-section" data-name="Section - Chapter">
      <div className="grid grid-cols-1 items-start gap-gutter desktop:grid-cols-2">
        <h2 className="type-h2 appear" data-appear="60">
          <span>{headline}</span>
        </h2>
        <div className="flex flex-col gap-36">
          {sections.map((section, sectionIndex) => (
            <div key={`${section.label}-${sectionIndex}`}>
              <p className="type-label appear" data-appear="20">
                <span>{section.label}</span>
              </p>
              <div className="mt-12 flex flex-col gap-[1.1em]">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="type-body appear whitespace-pre-line"
                    data-appear="60"
                  >
                    <span>{paragraph}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
