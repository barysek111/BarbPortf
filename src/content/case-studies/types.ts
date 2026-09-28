import type { ImageFrameProps } from "@/components/ui/ImageFrame";
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
  /** One-column solid image under the hero copy. Omitted studies use the ProjectHero placeholder. */
  heroImage?: { src: string; alt: string };
  chapters: readonly CaseStudyChapter[];
};
