// Feasibility probe: can we read rule-level CSS (not just computed pixels)
// from the published Framer site, including media queries and named layers?
import { chromium } from "playwright";

const LIVE = "https://titarvl.framer.website/";

const audit = () => {
  let readable = 0, blocked = 0, rules = 0, mediaRules = 0;
  const mediaQueries = new Set();
  const sheets = [];
  for (const sheet of document.styleSheets) {
    try {
      const list = sheet.cssRules;
      readable++;
      let n = 0, m = 0;
      const walk = (rl) => {
        for (const r of rl) {
          n++;
          if (r.media) { m++; mediaQueries.add(r.conditionText || r.media.mediaText); }
          if (r.cssRules) walk(r.cssRules);
        }
      };
      walk(list);
      rules += n; mediaRules += m;
      sheets.push({ href: sheet.href ? sheet.href.slice(0, 80) : "(inline)", n });
    } catch {
      blocked++;
      sheets.push({ href: sheet.href ? sheet.href.slice(0, 80) : "(inline)", n: "BLOCKED" });
    }
  }
  // how many layers carry a human-readable name + framer class
  const named = document.querySelectorAll("[data-framer-name]").length;
  const ssrVariants = document.querySelectorAll("[class*='ssr-variant']").length;
  const hiddenHash = new Set();
  for (const el of document.querySelectorAll("[class*='hidden-']")) {
    for (const c of el.classList) if (c.startsWith("hidden-")) hiddenHash.add(c);
  }
  return {
    readable, blocked, rules, mediaRules,
    mediaQueries: [...mediaQueries].sort(),
    sheets,
    namedLayers: named,
    ssrVariants,
    breakpointHashes: [...hiddenHash],
  };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(LIVE, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
const r = await page.evaluate(audit);
console.log(`stylesheets readable=${r.readable} blocked=${r.blocked}`);
console.log(`total rules=${r.rules}  rules inside @media=${r.mediaRules}`);
console.log(`named layers (data-framer-name)=${r.namedLayers}`);
console.log(`ssr-variant wrappers=${r.ssrVariants}`);
console.log(`breakpoint hash classes=${JSON.stringify(r.breakpointHashes)}`);
console.log(`\nmedia queries found (${r.mediaQueries.length}):`);
for (const m of r.mediaQueries) console.log("  " + m);
console.log(`\nsheets:`);
for (const s of r.sheets) console.log(`  ${String(s.n).padEnd(8)} ${s.href}`);
await browser.close();
