import fs from "node:fs";
import path from "node:path";

const DUMP =
  "/Users/spagett/portfolio-projects/Framercopyy/uncage/output/_Users_spagett_portfolio-projects_Framercopyy_site";
const OUT = path.join(process.cwd(), "docs/research");
fs.mkdirSync(path.join(OUT, "components"), { recursive: true });

function unique(arr) {
  const m = new Map();
  for (const x of arr) m.set(x, (m.get(x) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

function decode(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'");
}

const pages = [
  "index.html",
  "about.html",
  "contact.html",
  "works.html",
  "privacy-policy.html",
  "cookies-policy.html",
];
const workFiles = fs.existsSync(path.join(DUMP, "works"))
  ? fs
      .readdirSync(path.join(DUMP, "works"))
      .filter((f) => f.endsWith(".html"))
      .map((f) => `works/${f}`)
  : [];

const htmlByPage = {};
for (const file of [...pages, ...workFiles]) {
  const full = path.join(DUMP, file);
  if (fs.existsSync(full)) htmlByPage[file] = fs.readFileSync(full, "utf8");
}

const allHtml = Object.values(htmlByPage).join("\n");
const home = htmlByPage["index.html"] || "";

const tokens = {};
for (const [, id, val] of allHtml.matchAll(/--token-([a-f0-9-]+)\s*:\s*([^;}]+)/g)) {
  tokens[`--token-${id}`] = val.trim();
}

function parseHydrate(html) {
  const m = html.match(/data-framer-hydrate-v2="([^"]+)"/);
  if (!m) return null;
  try {
    return JSON.parse(decode(m[1]));
  } catch {
    return null;
  }
}

function extractPresetRules(html) {
  const presets = {};
  const re =
    /(@media[^{]+\{)?[^{}]*\.framer-styles-preset-([a-z0-9]+)[^{]*\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(html))) {
    const media = (m[1] || "default").replace(/[{]/g, "").trim();
    const id = m[2];
    const body = m[3];
    const pick = (prop) => {
      const hit = body.match(new RegExp(`--framer-${prop}:([^;]+)`));
      return hit ? hit[1].trim() : undefined;
    };
    const row = {
      media,
      fontFamily: pick("font-family"),
      fontSize: pick("font-size"),
      fontWeight: pick("font-weight"),
      lineHeight: pick("line-height"),
      letterSpacing: pick("letter-spacing"),
      textTransform: pick("text-transform"),
      paragraphSpacing: pick("paragraph-spacing"),
    };
    if (!presets[id]) presets[id] = [];
    const key = JSON.stringify(row);
    if (!presets[id].some((r) => JSON.stringify(r) === key)) presets[id].push(row);
  }
  return presets;
}

function namedLayers(html) {
  return unique(
    [...html.matchAll(/data-framer-name="([^"]+)"/g)].map((m) => decode(m[1])),
  );
}

function sections(html) {
  return [
    ...html.matchAll(/<(section|nav|footer|header)[^>]*data-framer-name="([^"]+)"/g),
  ].map((m) => ({ tag: m[1], name: decode(m[2]) }));
}

function listedComponents(html) {
  const attr = html.match(/data-framer-components="([^"]+)"/);
  return attr ? attr[1].split(" ") : [];
}

function hintFor(html, id) {
  const re = new RegExp(`\\b${id}\\b[\\s\\S]{0,1800}`);
  const m = html.match(re);
  if (!m) return null;
  const names = [...m[0].matchAll(/data-framer-name="([^"]+)"/g)].map((x) =>
    decode(x[1]),
  );
  const text = [...m[0].matchAll(/>([^<]{1,80})</g)]
    .map((x) => x[1].trim())
    .filter((t) => t && t.length > 1 && !t.startsWith("{"));
  return { names: [...new Set(names)].slice(0, 10), sampleText: text.slice(0, 8) };
}

const allListed = unique(
  Object.values(htmlByPage).flatMap((h) => listedComponents(h)),
);

const componentHints = {};
for (const [id] of allListed) {
  if (!id.startsWith("framer-") || id.includes("lib")) continue;
  for (const html of Object.values(htmlByPage)) {
    const hint = hintFor(html, id);
    if (hint) {
      componentHints[id] = hint;
      break;
    }
  }
}

function collectCssValues(html, prop) {
  const re = new RegExp(`${prop}\\s*:\\s*([^;}]+)`, "g");
  return unique([...html.matchAll(re)].map((m) => m[1].trim())).slice(0, 50);
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function visibleText(html) {
  const main = html.match(/<div id="main"[\s\S]*$/);
  return stripTags(main ? main[0].slice(0, 500000) : html).slice(0, 25000);
}

const typePresets = extractPresetRules(home);
const hydrate = parseHydrate(home);

const pageSummaries = {};
for (const [file, html] of Object.entries(htmlByPage)) {
  pageSummaries[file] = {
    breakpoints: parseHydrate(html)?.breakpoints || null,
    components: listedComponents(html).filter(
      (c) => c.startsWith("framer-") && !c.includes("lib"),
    ),
    sections: sections(html),
    namedLayers: namedLayers(html),
    presets: [
      ...new Set(
        [...html.matchAll(/framer-styles-preset-([a-z0-9]+)/g)].map((m) => m[1]),
      ),
    ],
    textPreview: visibleText(html).slice(0, 8000),
  };
}

const hoverRules = [];
const hoverRe = /([^{}]*:hover[^{]*)\{([^}]+)\}/g;
let hm;
while ((hm = hoverRe.exec(home)) && hoverRules.length < 100) {
  hoverRules.push({
    selector: hm[1].trim().slice(-200),
    css: hm[2].trim().slice(0, 400),
  });
}

const keyframes = [...home.matchAll(/@keyframes\s+([^{\s]+)/g)].map((m) => m[1]);

const extraColors = unique(
  [...allHtml.matchAll(/#([0-9a-fA-F]{3,8})\b/g)].map((m) => `#${m[1].toLowerCase()}`),
);

const presetIdMap = unique(
  [...allHtml.matchAll(/data-styles-preset="([^"]+)"/g)].map((m) => m[1]),
);

const out = {
  extractedAt: new Date().toISOString(),
  source: DUMP,
  tokens,
  extraColors,
  hydrate,
  typePresets,
  presetIdMap: Object.fromEntries(presetIdMap),
  layout: {
    maxWidths: collectCssValues(home, "max-width").filter(
      ([v]) => /px|%/.test(v) && v.length < 40,
    ),
    paddings: collectCssValues(home, "padding").filter(([v]) => v.length < 80),
    gaps: collectCssValues(home, "gap").filter(([v]) => v.length < 40),
    radii: collectCssValues(home, "border-radius").filter(([v]) => v.length < 40),
    grids: collectCssValues(home, "grid-template-columns").filter(
      ([v]) => v.length < 80,
    ),
  },
  listedComponents: allListed,
  componentHints,
  hoverRules,
  keyframes: [...new Set(keyframes)],
  transitions: unique(
    [...home.matchAll(/transition:[^;}]+/g)].map((m) => m[0]).filter((s) => s.length < 140),
  ).slice(0, 40),
  homeSections: sections(home),
  homeNamedLayers: namedLayers(home),
  pages: pageSummaries,
};

fs.writeFileSync(path.join(OUT, "framer-extract.json"), JSON.stringify(out, null, 2));
fs.writeFileSync(
  path.join(OUT, "page-text.json"),
  JSON.stringify(
    Object.fromEntries(
      Object.entries(pageSummaries).map(([k, v]) => [k, v.textPreview]),
    ),
    null,
    2,
  ),
);

console.log(
  JSON.stringify(
    {
      wrote: path.join(OUT, "framer-extract.json"),
      pages: Object.keys(htmlByPage).length,
      tokens: Object.keys(tokens).length,
      presets: Object.keys(typePresets),
      components: Object.keys(componentHints),
      homeSections: sections(home).map((s) => s.name),
      hoverRules: hoverRules.length,
      keyframes: [...new Set(keyframes)].length,
    },
    null,
    2,
  ),
);
