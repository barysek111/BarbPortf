// Rule-level design-system extractor.
//
// Reads the published Framer site's CSSOM (not computed pixels) and maps every
// named layer to the CSS rules that actually match it, grouped by media query.
// Because Framer renders all breakpoint variants into one DOM and marks them
// with `hidden-<hash>` classes, a single page load yields every breakpoint.
//
// Output: docs/research/spec/*.json
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LIVE = "https://titarvl.framer.website/";
const PAGES = {
  home: "",
  works: "works",
  about: "about",
  contact: "contact",
};

// hash -> media query, from the Framer hydrate payload
const hydrate = JSON.parse(readFileSync("docs/research/framer-extract.json", "utf8")).hydrate;
const HASH_MEDIA = Object.fromEntries(hydrate.breakpoints.map((b) => [b.hash, b.mediaQuery]));

const LAYOUT_PROPS = new Set([
  "display", "position", "top", "right", "bottom", "left", "z-index",
  "width", "height", "min-width", "min-height", "max-width", "max-height",
  "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
  "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
  "flex", "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "flex-basis",
  "align-items", "align-self", "justify-content", "justify-self", "gap",
  "row-gap", "column-gap", "order",
  "grid-template-columns", "grid-template-rows", "grid-column", "grid-row",
  "grid-auto-flow", "place-items", "place-content",
  "font-family", "font-size", "font-weight", "line-height", "letter-spacing",
  "text-transform", "text-align", "color", "background-color", "background",
  "border-radius", "border", "border-top", "border-bottom", "opacity",
  "overflow", "mix-blend-mode", "transform", "aspect-ratio", "object-fit",
  "transition", "white-space", "text-decoration",
]);

const extract = ({ HASH_MEDIA, LAYOUT_PROPS }) => {
  const propSet = new Set(LAYOUT_PROPS);

  // 1. Flatten the CSSOM into [{ selector, media, decls }]
  const rules = [];
  const walk = (list, media) => {
    for (const r of list) {
      if (r.type === 1 && r.selectorText) {
        const decls = {};
        for (let i = 0; i < r.style.length; i++) {
          const p = r.style[i];
          if (propSet.has(p)) decls[p] = r.style.getPropertyValue(p);
        }
        if (Object.keys(decls).length) {
          for (const sel of r.selectorText.split(",")) {
            rules.push({ selector: sel.trim(), media, decls });
          }
        }
      } else if (r.cssRules) {
        walk(r.cssRules, r.conditionText || (r.media && r.media.mediaText) || media);
      }
    }
  };
  for (const sheet of document.styleSheets) {
    try { walk(sheet.cssRules, "default"); } catch { /* cross-origin */ }
  }

  // 2. Which breakpoints is a layer visible at?
  const visibility = (el) => {
    const hidden = new Set();
    let p = el;
    while (p) {
      if (p.classList) {
        for (const c of p.classList) {
          if (c.startsWith("hidden-")) hidden.add(c.slice(7));
        }
      }
      p = p.parentElement;
    }
    return [...hidden].map((h) => HASH_MEDIA[h] || h);
  };

  // 3. For each named layer, find every matching rule
  const layers = [];
  const nodes = document.querySelectorAll("[data-framer-name]");
  nodes.forEach((el, idx) => {
    const styles = {};
    for (const r of rules) {
      let hit = false;
      try { hit = el.matches(r.selector); } catch { hit = false; }
      if (!hit) continue;
      styles[r.media] = Object.assign(styles[r.media] || {}, r.decls);
    }
    if (!Object.keys(styles).length) return;

    // ancestor trail of named layers, for structure
    const trail = [];
    let p = el.parentElement;
    while (p) {
      const n = p.getAttribute && p.getAttribute("data-framer-name");
      if (n) trail.unshift(n);
      p = p.parentElement;
    }

    const r = el.getBoundingClientRect();
    layers.push({
      i: idx,
      name: el.getAttribute("data-framer-name"),
      tag: el.tagName.toLowerCase(),
      trail,
      depth: trail.length,
      classes: [...el.classList].filter((c) => !c.startsWith("hidden-") && c !== "ssr-variant"),
      hiddenAt: visibility(el),
      rect: { w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
      styles,
    });
  });

  // 4. Text presets, verbatim
  const presets = {};
  for (const r of rules) {
    const m = r.selector.match(/framer-styles-preset-([a-z0-9]+)/i);
    if (m) {
      presets[m[1]] = presets[m[1]] || {};
      presets[m[1]][r.media] = Object.assign(presets[m[1]][r.media] || {}, r.decls);
    }
  }

  // 5. Every distinct media query in the sheet
  const media = [...new Set(rules.map((r) => r.media))];

  return { layers, presets, media, ruleCount: rules.length };
};

const browser = await chromium.launch();
mkdirSync("docs/research/spec", { recursive: true });
const index = {};

for (const [key, path] of Object.entries(PAGES)) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(LIVE + path, { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      scrollTo(0, y); await new Promise((r) => setTimeout(r, 40));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  const data = await page.evaluate(extract, {
    HASH_MEDIA,
    LAYOUT_PROPS: [...LAYOUT_PROPS],
  });
  writeFileSync(`docs/research/spec/${key}.json`, JSON.stringify(data, null, 2));
  index[key] = {
    layers: data.layers.length,
    rules: data.ruleCount,
    media: data.media,
  };
  console.log(`${key.padEnd(9)} layers=${String(data.layers.length).padEnd(5)} rules=${data.ruleCount}`);
  await page.close();
}

writeFileSync("docs/research/spec/index.json", JSON.stringify(index, null, 2));
await browser.close();
console.log("\nmedia queries:", JSON.stringify(index.home.media, null, 1));
