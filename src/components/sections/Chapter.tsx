export type ChapterBlock = {
  label: string;
  text: string;
};

const defaults = {
  headline: "STUDIO, WORK, AND APPROACH",
  blocks: [
    {
      label: "thinking",
      text: "Every project begins with a clear idea. Concept and structure come first, shaping decisions and defining direction. A thoughtful approach ensures that each design is intentional, relevant, and built on a strong conceptual foundation.",
    },
    {
      label: "making",
      text: "This is where ideas are translated into form. Through precise execution, attention to detail, and systematic workflows, concepts become functional, scalable, and visually consistent across digital platforms and touchpoints.",
    },
  ] satisfies ChapterBlock[],
};

/**
 * Two-column chapter: headline left, stacked copy blocks right.
 * Section-to-section space is pb-section (96px) on the root only.
 * The about page keeps its own inline layout and does not use this.
 */
export function Chapter({
  headline = defaults.headline,
  blocks = defaults.blocks,
}: {
  headline?: string;
  blocks?: ChapterBlock[];
} = {}) {
  return (
    <section className="w-full max-w-(--container-section) px-gutter pb-section" data-name="Section - Chapter">
      <div className="grid grid-cols-1 items-start gap-gutter desktop:grid-cols-2">
        <h2 className="type-h2 appear" data-appear="60">
          <span>{headline}</span>
        </h2>
        <div className="flex flex-col gap-36 [&_.type-body]:mt-12">
          {blocks.map((block) => (
            <div key={block.label}>
              <p className="type-label appear" data-appear="20">
                <span>{block.label}</span>
              </p>
              <p className="type-body appear" data-appear="60">
                <span>{block.text}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
