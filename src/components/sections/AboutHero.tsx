import { Chapter } from "@/components/sections/Chapter";
import { about } from "@/content/about";

/**
 * About-page opener: Chapter with headline plus thinking/making.
 * First-on-page spacing is pt-page-top.
 */
export function AboutHero() {
  return (
    <Chapter
      id="about"
      headingLevel="h1"
      className="pt-page-top"
      headline={about.headline}
      sections={[
        { label: about.thinking.label, paragraphs: [about.thinking.text] },
        {
          label: about.making.label,
          paragraphs: [about.making.text],
          images: [{ src: about.making.image, variant: "fill" }],
        },
      ]}
    />
  );
}
