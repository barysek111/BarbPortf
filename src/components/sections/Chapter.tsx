import { ImageFrame, type ImageFrameProps } from "@/components/ui/ImageFrame";
import { cn } from "@/lib/cn";

/** One right-column block: sub-headline plus body paragraphs and optional images. */
export type ChapterSection = {
  label: string;
  paragraphs: readonly string[];
  /** ImageFrames in the right-column stack (same gap-36 as sections); each is half that column. */
  images?: readonly ImageFrameProps[];
};

/**
 * Two-column chapter: headline left (max 70% of that column), stacked sub-sections right.
 * Images sit in the right-column stack (gap-36, same as section-to-section) at half column width.
 * Section-to-section space is pb-section (96px) on the root only.
 */
export function Chapter({
  headline,
  sections,
  headingLevel = "h2",
  className,
  id,
}: {
  headline: string;
  sections: readonly ChapterSection[];
  headingLevel?: "h1" | "h2";
  /** Extra section-level classes, e.g. a page's top offset. */
  className?: string;
  id?: string;
}) {
  const Heading = headingLevel;

  return (
    <section
      id={id}
      className={cn("w-full max-w-(--container-section) px-gutter pb-section", className)}
      data-name="Section - Chapter"
    >
      <div className="grid grid-cols-1 items-start gap-36 tablet:grid-cols-2 tablet:gap-gutter">
        <Heading className="type-h2 appear max-w-[70%]" data-appear="60">
          <span>{headline}</span>
        </Heading>
        <div className="flex flex-col gap-36">
          {sections.flatMap((section, sectionIndex) => [
            <div key={`${section.label}-${sectionIndex}`}>
              <p className="type-label appear" data-appear="20">
                <span>{section.label}</span>
              </p>
              {/* 1.1em matches type-body line-height — typography rhythm, not spacing scale */}
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
            </div>,
            ...(section.images ?? []).map((frame, imageIndex) => (
              <div key={`${section.label}-${sectionIndex}-img-${imageIndex}`} className="w-1/2">
                <ImageFrame {...frame} />
              </div>
            )),
          ])}
        </div>
      </div>
    </section>
  );
}
