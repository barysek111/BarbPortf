// One-off: move component dimensions out of the spacing namespace into explicit
// bracket values. A logo width is not a rhythm step and should not look like one.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const VALUES = [11, 26, 28, 50, 58, 139, 150, 200, 363, 390, 450, 600, 678, 680, 720, 760, 10, 12, 24, 32, 1];
const PREFIX = "(?:min-w|min-h|max-w|max-h|w|h)";

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
  for (const v of VALUES) {
    const re = new RegExp(`\\b(${PREFIX})-${v}\\b`, "g");
    const n = (after.match(re) || []).length;
    if (n) { after = after.replace(re, `$1-[${v}px]`); hits.push(`${v}x${n}`); total += n; }
  }
  if (after !== before) {
    writeFileSync(file, after);
    console.log(`${file.replace("src/", "").padEnd(42)} ${hits.join(" ")}`);
  }
}
console.log(`\n${total} dimensions bracketed`);
