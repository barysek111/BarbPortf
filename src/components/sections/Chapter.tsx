import { ImageFrame, type ImageFrameProps } from "@/components/ui/ImageFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** One right-column block: sub-headline plus body paragraphs (gap-12) and optional images. */
export type ChapterSection = {
  label: string;
  paragraphs: readonly string[];
  /** ImageFrames in the right column, same width as the subsection text, with gap-36 above. Fill unless a variant is set. */
  images?: readonly ImageFrameProps[];
};

/**
 * Two-column chapter: headline left (max 70% of that column), stacked sub-sections right.
 * Between-section rhythm comes from page-main gap-96.
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
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className} data-name="Section - Chapter">
      <div className="grid grid-cols-1 items-start gap-36 tablet:grid-cols-2 tablet:gap-12">
        <SectionHeading as={headingLevel} className="max-w-[70%]">
          {headline}
        </SectionHeading>
        <div className="flex w-full max-w-[500px] flex-col gap-36 justify-self-start">
          {sections.flatMap((section, sectionIndex) => [
            <div key={`${section.label}-${sectionIndex}`} className="flex flex-col gap-12">
              <p className="type-label appear" data-appear="20">
                <span>{section.label}</span>
              </p>
              <div className="flex flex-col gap-12">
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
              <ImageFrame
                key={`${section.label}-${sectionIndex}-img-${imageIndex}`}
                {...frame}
                variant={frame.variant ?? "fill"}
              />
            )),
          ])}
        </div>
      </div>
    </section>
  );
}
