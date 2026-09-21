// Query the extracted rule-level spec.
// Usage:
//   node scripts/spec.mjs <page> list [filter]      list layer names
//   node scripts/spec.mjs <page> show <name>        show rules for a layer
//   node scripts/spec.mjs <page> tree [maxDepth]    structural tree
import { readFileSync } from "node:fs";

const page = process.argv[2] ?? "home";
const cmd = process.argv[3] ?? "list";
const arg = process.argv[4];

const data = JSON.parse(readFileSync(`docs/research/spec/${page}.json`, "utf8"));

const fmt = (styles) => {
  const out = [];
  // default first, then media queries
  const keys = Object.keys(styles).sort((a, b) => (a === "default" ? -1 : b === "default" ? 1 : 0));
  for (const k of keys) {
    if (/display-p3|aspect-ratio:1|webkit-named-image|100dvh/.test(k)) continue;
    const decls = styles[k];
    if (!Object.keys(decls).length) continue;
    out.push(`  @ ${k}`);
    for (const [p, v] of Object.entries(decls)) out.push(`      ${p}: ${v};`);
  }
  return out.join("\n");
};

if (cmd === "list") {
  const seen = new Map();
  for (const l of data.layers) {
    if (arg && !l.name.toLowerCase().includes(arg.toLowerCase())) continue;
    const k = l.name;
    seen.set(k, (seen.get(k) || 0) + 1);
  }
  for (const [name, n] of [...seen.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`${String(n).padStart(3)}x  ${name}`);
  }
  console.log(`\n${seen.size} distinct names, ${data.layers.length} layers`);
}

if (cmd === "show") {
  const hits = data.layers.filter((l) => l.name.toLowerCase() === arg.toLowerCase());
  if (!hits.length) {
    console.log("no exact match; try:");
    for (const l of data.layers.filter((l) => l.name.toLowerCase().includes((arg || "").toLowerCase())).slice(0, 20)) {
      console.log("  " + l.name);
    }
  }
  for (const l of hits.slice(0, 4)) {
    console.log(`\n=== "${l.name}" <${l.tag}>  rect ${l.rect.w}x${l.rect.h}`);
    console.log(`    trail: ${l.trail.join(" > ")}`);
    if (l.hiddenAt.length) console.log(`    hidden at: ${l.hiddenAt.join(" | ")}`);
    console.log(fmt(l.styles));
  }
}

if (cmd === "tree") {
  const max = Number(arg ?? 4);
  for (const l of data.layers) {
    if (l.depth > max) continue;
    const pad = "  ".repeat(l.depth);
    const vis = l.hiddenAt.length ? `   [hidden: ${l.hiddenAt.map((m) => m.replace(/[()]|min-width: |max-width: /g, "")).join(",")}]` : "";
    console.log(`${pad}${l.name}  <${l.tag}> ${l.rect.w}x${l.rect.h}${vis}`);
  }
}
