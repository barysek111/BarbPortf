import { ImageFrame, type ImageFrameProps } from "@/components/ui/ImageFrame";
import { cn } from "@/lib/cn";

export type ImageRowColumns = 1 | 2 | 3;

const columnClass: Record<ImageRowColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 tablet:grid-cols-2",
  3: "grid-cols-1 tablet:grid-cols-3",
};

const imageSizes: Record<ImageRowColumns, string> = {
  1: "100vw",
  2: "(max-width: 809px) 100vw, 50vw",
  3: "(max-width: 809px) 100vw, 33vw",
};

/** Case-study media row: 1, 2, or 3 equal-width frames with gap-12. Stack with ImageRowStack. */
export function ImageRow({
  columns,
  frames,
}: {
  columns: ImageRowColumns;
  frames: ImageFrameProps[];
}) {
  return (
    <section className="w-full" data-name="Section - Image Row">
      <div className={cn("grid items-stretch gap-12", columnClass[columns])}>
        {frames.map((frame, index) => (
          <ImageFrame
            key={`${frame.src}-${index}`}
            {...frame}
            columns={columns}
            sizes={imageSizes[columns]}
          />
        ))}
      </div>
    </section>
  );
}
