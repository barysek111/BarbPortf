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
  heroImageRow?: readonly ImageFrameProps[];
  chapters: readonly CaseStudyChapter[];
  next?: { title: string; href: string };
  scatter?: readonly { src: string; x: string; y: string; w: number; h: number }[];
};
