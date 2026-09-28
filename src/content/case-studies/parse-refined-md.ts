import type { CaseStudyChapter } from "./types";

type MutableSection = { label: string; paragraphs: string[] };
type MutableChapter = { headline: string; sections: MutableSection[] };

/** Parse refined case-study markdown: ## chapter, **sub-section**, body paragraphs. */
export function parseRefinedMd(md: string): CaseStudyChapter[] {
  const chapters: MutableChapter[] = [];
  let current: MutableChapter | null = null;
  let section: MutableSection | null = null;
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (section && paragraphLines.length) {
      section.paragraphs.push(paragraphLines.join(" ").trim());
      paragraphLines = [];
    }
  };

  const flushSection = () => {
    flushParagraph();
    if (current && section) {
      current.sections.push(section);
      section = null;
    }
  };

  const flushChapter = () => {
    flushSection();
    if (current) {
      chapters.push(current);
      current = null;
    }
  };

  for (const rawLine of md.split("\n")) {
    const line = rawLine.trimEnd();
    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      flushChapter();
      current = { headline: h2[1], sections: [] };
      continue;
    }

    const sub = line.match(/^\*\*(.+)\*\*$/);
    if (sub) {
      flushSection();
      section = { label: sub[1], paragraphs: [] };
      continue;
    }

    if (!line.trim()) continue;
    if (!current) continue;
    if (!section) {
      section = { label: "", paragraphs: [] };
    }
    paragraphLines.push(line.trim());
  }

  flushChapter();
  return chapters;
}

export function buildScopeChapter(
  background: string,
  challengeIntro: string,
  challengeBullets: readonly string[],
): CaseStudyChapter {
  const numbered =
    challengeBullets.length > 0
      ? challengeBullets.map((item, index) => `${index + 1}. ${item}`).join("\n")
      : "";

  return {
    headline: "SCOPE",
    sections: [
      { label: "PROJECT BACKGROUND", paragraphs: [background] },
      {
        label: "The challenge",
        paragraphs: numbered ? [challengeIntro, numbered] : [challengeIntro],
      },
    ],
  };
}
