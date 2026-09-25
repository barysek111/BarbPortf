import { ImageFrame, type ImageFrameProps } from "@/components/ui/ImageFrame";
import { cn } from "@/lib/cn";

export type ImageRowColumns = 1 | 2 | 3;

const columnClass: Record<ImageRowColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 tablet:grid-cols-2",
  3: "grid-cols-1 tablet:grid-cols-3",
};

/**
 * Case-study media row: 1, 2, or 3 equal-width frames with gap-gutter (same as works-grid column gap).
 * Frames cap at 800px height (ImageFrame); row matches the tallest frame in the row.
 * Vertical spacing: globals.css — stacked rows use pb-gutter; last row in a stack uses pb-section.
 */
export function ImageRow({
  columns,
  frames,
}: {
  columns: ImageRowColumns;
  frames: ImageFrameProps[];
}) {
  return (
    <section
      className="w-full max-w-(--container-section) px-gutter"
      data-name="Section - Image Row"
    >
      <div className={cn("grid items-stretch gap-gutter", columnClass[columns])}>
        {frames.map((frame, index) => (
          <ImageFrame key={`${frame.src}-${index}`} {...frame} />
        ))}
      </div>
    </section>
  );
}
