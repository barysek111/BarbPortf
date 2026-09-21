// One-off: move off-scale spacing values onto the 4px scale.
// Only gap / padding / margin utilities are touched — w-, h-, min-*, inset-,
// top/left/right/bottom are component dimensions and keep their literal values.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const MAP = [
  // descending, so a newly written value can never be re-matched
  [222, 216],
  [150, 152],
  [100, 104],
  [60, 64],
  [52, 56],
  [42, 44],
  [30, 32],
  [22, 24],
  [7, 8],
  [6, 8],
  [5, 4],
  [1, 2],
];

// longest-first so `px` wins over `p`
const PREFIX = "(?:gap-x|gap-y|gap|px|py|pt|pr|pb|pl|p|mx|my|mt|mr|mb|ml|m)";

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (e.endsWith(".tsx")) files.push(full);
  }
})("src");

let total = 0;
for (const file of files) {
  const before = readFileSync(file, "utf8");
  let after = before;
  const hits = [];
  for (const [from, to] of MAP) {
    const re = new RegExp(`\\b(${PREFIX})-${from}\\b`, "g");
    const n = (after.match(re) || []).length;
    if (n) {
      after = after.replace(re, `$1-${to}`);
      hits.push(`${from}->${to} x${n}`);
      total += n;
    }
  }
  if (after !== before) {
    writeFileSync(file, after);
    console.log(`${file.replace("src/", "").padEnd(42)} ${hits.join("  ")}`);
  }
}
console.log(`\n${total} replacements`);
