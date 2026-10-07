import type { ImageFrameProps, ImageFrameVariant } from "@/components/ui/ImageFrame";
import type { ImageRowColumns } from "@/components/sections/ImageRow";

export type CaseStudySection = {
  label: string;
  paragraphs: readonly string[];
};

export type CaseStudyChapter = {
  headline: string;
  sections: readonly CaseStudySection[];
  imageRows?: readonly {
    columns: ImageRowColumns;
    frames: readonly ImageFrameProps[];
  }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  aboutLabel: string;
  description: string;
  meta: readonly { label: string; value: string }[];
  /** One-column image under the hero copy. Defaults to solid. Omitted studies use the ProjectHero placeholder. */
  heroImage?: {
    src: string;
    alt: string;
    variant?: ImageFrameVariant;
    backgroundSrc?: string;
  };
  chapters: readonly CaseStudyChapter[];
};
