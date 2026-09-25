// Guard: fail if any gap/padding/margin utility uses a value outside the scale.
//
// Tailwind does not error on unknown utilities — `gap-7` silently produces no
// CSS — so this is the only thing that actually enforces the spacing system.
// Component dimensions (w-, h-, min-*, max-*, inset-) are deliberately exempt;
// they use explicit brackets and are not rhythm.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SCALE = [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 44, 56, 64, 76, 96, 104, 152, 176, 216];
const ALIASES = ["hairline", "tight", "gutter", "header", "headline", "section", "page-top"];
const PREFIX = "(?:gap-x|gap-y|gap|px|py|pt|pr|pb|pl|p|mx|my|mt|mr|mb|ml|m)";

// Dimension utilities read from the same --spacing-* namespace, so a value off
// the scale silently emits nothing. They must be bracketed instead, e.g.
// h-[60px]. Fractions (w-1/2) and keywords (w-full) are legitimate.
const SIZE_PREFIX = "(?:min-w|min-h|max-w|max-h|size|w|h)";

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.tsx?$/.test(e)) files.push(full);
  }
})("src");

const re = new RegExp(`\\b${PREFIX}-([a-z0-9-]+)\\b`, "g");
// capture what follows so `w-1/2` can be told apart from `w-1`
const sizeRe = new RegExp(`\\b${SIZE_PREFIX}-(\\d+)(/\\d+)?\\b`, "g");
const violations = [];

// Prose mentions class names too (documentation, descriptions), so only string
// literals that actually look like class lists are scanned.
const isProse = (s) => /\. |, | — |\?|:[a-z]+ [a-z]+ [a-z]+ /.test(s);
const STRING = /"([^"\\\n]*)"|'([^'\\\n]*)'|`([^`\\]*)`/g;

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const s of line.matchAll(STRING)) {
      const body = s[1] ?? s[2] ?? s[3] ?? "";
      if (!body || isProse(body)) continue;
      for (const m of body.matchAll(re)) {
        const raw = m[1];
        if (ALIASES.includes(raw)) continue;
        if (/^(?:auto|px|full|screen|min|max|fit|reverse)$/.test(raw)) continue;
        if (!/^\d+$/.test(raw)) continue;
        if (SCALE.includes(Number(raw))) continue;
        violations.push({ file: file.replace("src/", ""), line: i + 1, token: m[0] });
      }
      for (const m of body.matchAll(sizeRe)) {
        if (m[2]) continue; // fraction such as w-1/2
        if (SCALE.includes(Number(m[1]))) continue;
        violations.push({
          file: file.replace("src/", ""),
          line: i + 1,
          token: m[0],
          hint: `use ${m[0].replace(/-(\d+)$/, "-[$1px]")}`,
        });
      }
    }
  });
}

if (!violations.length) {
  console.log(`spacing ok — scale: ${SCALE.join(" ")}`);
  console.log(`aliases: ${ALIASES.join(" ")}`);
  process.exit(0);
}

console.error(`${violations.length} off-scale spacing value(s):\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ${v.token}${v.hint ? `  → ${v.hint}` : ""}`);
}
console.error(`\nAllowed: ${SCALE.join(" ")}`);
console.error(`Or an alias: ${ALIASES.join(" ")}`);
console.error(`Component dimensions should use brackets, e.g. w-[139px].`);
process.exit(1);
