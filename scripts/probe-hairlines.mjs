// Find thin, wide elements (rules/dividers) on the live page, with their
// position, colour and nearest named ancestor.
// Usage: node scripts/probe-hairlines.mjs [width] [yMin] [yMax]
import { chromium } from "playwright";

const LIVE = "https://titarvl.framer.website/";
const width = Number(process.argv[2] ?? 1440);
const yMin = Number(process.argv[3] ?? 0);
const yMax = Number(process.argv[4] ?? 1e9);

const find = ({ yMin, yMax }) => {
  const named = (el) => {
    let p = el;
    while (p) {
      const n = p.getAttribute && p.getAttribute("data-framer-name");
      if (n) return n;
      p = p.parentElement;
    }
    return "";
  };
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    const y = r.top + scrollY;
    if (r.height > 0 && r.height <= 3 && r.width >= 100 && y >= yMin && y <= yMax) {
      const cs = getComputedStyle(el);
      out.push({
        y: +y.toFixed(1),
        x: +r.x.toFixed(1),
        w: +r.width.toFixed(1),
        h: +r.height.toFixed(2),
        bg: cs.backgroundColor,
        bt: `${cs.borderTopWidth} ${cs.borderTopColor}`,
        tag: el.tagName.toLowerCase(),
        cls: (typeof el.className === "string" ? el.className : "").slice(0, 60),
        near: named(el),
      });
    }
  }
  return out.sort((a, b) => a.y - b.y);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(LIVE, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    scrollTo(0, y); await new Promise((r) => setTimeout(r, 50));
  }
  scrollTo(0, 0);
});
await page.waitForTimeout(1000);
const rows = await page.evaluate(find, { yMin, yMax });
console.log(`found ${rows.length} thin elements @ ${width}`);
for (const r of rows) {
  console.log(`y=${String(r.y).padEnd(10)} x=${String(r.x).padEnd(8)} w=${String(r.w).padEnd(9)} h=${String(r.h).padEnd(6)} bg=${r.bg.padEnd(22)} bt=${r.bt.padEnd(20)} near="${r.near}" cls="${r.cls}"`);
}
await browser.close();
