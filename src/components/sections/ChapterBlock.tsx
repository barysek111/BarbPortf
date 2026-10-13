import { Chapter, type ChapterSection } from "@/components/sections/Chapter";
import { ImageRow, type ImageRowColumns } from "@/components/sections/ImageRow";
import { ImageRowStack } from "@/components/sections/ImageRowStack";
import type { ImageFrameProps } from "@/components/ui/ImageFrame";

export function ChapterBlock({
  headline,
  sections,
  imageRows,
  headingLevel,
  id,
  className,
}: {
  headline: string;
  sections: readonly ChapterSection[];
  imageRows?: readonly {
    columns: ImageRowColumns;
    frames: readonly ImageFrameProps[];
  }[];
  headingLevel?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-96">
      <Chapter
        headline={headline}
        sections={sections}
        headingLevel={headingLevel}
        id={id}
        className={className}
      />
      {imageRows && imageRows.length > 0 ? (
        <ImageRowStack>
          {imageRows.map((row, index) => (
            <ImageRow key={`${headline}-row-${index}`} columns={row.columns} frames={[...row.frames]} />
          ))}
        </ImageRowStack>
      ) : null}
    </div>
  );
}
