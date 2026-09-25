import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const MD_DIR = "/Users/spagett/Downloads/files (3)";

const projects = [
  { key: "plinto", md: "plinto-refined.md" },
  { key: "powermatch", md: "powermatch-refined.md" },
  { key: "cococare", md: "cococare-refined.md" },
  { key: "rokokobrand", md: "rokokobrand-refined.md" },
  { key: "rokokoweb", md: "rokokoweb-refined.md" },
  { key: "weld", md: "weld-refined.md" },
  { key: "eatgrim", md: "eatgrim-refined.md" },
];

function parseRefinedMd(md) {
  const chapters = [];
  let current = null;
  let section = null;
  let paragraphLines = [];

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
    if (!section) section = { label: "", paragraphs: [] };
    paragraphLines.push(line.trim());
  }
  flushChapter();
  return chapters;
}

for (const { key, md } of projects) {
  const text = readFileSync(join(MD_DIR, md), "utf8");
  const chapters = parseRefinedMd(text);
  const out = join(ROOT, "src/content/case-studies/generated", `${key}.json`);
  writeFileSync(out, `${JSON.stringify(chapters, null, 2)}\n`);
  console.log(`wrote ${key}: ${chapters.length} chapters`);
}
