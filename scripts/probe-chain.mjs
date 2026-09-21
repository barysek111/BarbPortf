// Dump the ancestor chain of a text anchor on live vs local, to compare structure.
// Usage: node scripts/probe-chain.mjs <anchor> [width] [levels]
import { chromium } from "playwright";

const LIVE = "https://titarvl.framer.website/";
const LOCAL = process.env.LOCAL_URL ?? "http://localhost:3002/";
const anchor = process.argv[2] ?? "home";
const width = Number(process.argv[3] ?? 1440);
const levels = Number(process.argv[4] ?? 6);

const chain = ({ anchor, levels }) => {
  const strip = (s) => (s || "").replace(/\s+/g, "").trim().toLowerCase();
  const matches = [...document.querySelectorAll("body *")].filter(
    (n) => strip(n.textContent) === anchor
  );
  let el = matches.sort(
    (x, y) => x.querySelectorAll("*").length - y.querySelectorAll("*").length
  )[0];
  if (!el) return null;
  const rows = [];
  for (let i = 0; i <= levels && el; i++) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    rows.push({
      lvl: i,
      tag: el.tagName.toLowerCase(),
      name: el.getAttribute("data-framer-name") || "",
      cls: (typeof el.className === "string" ? el.className : "").slice(0, 70),
      rect: `${r.x.toFixed(1)},${r.width.toFixed(1)}`,
      disp: cs.display,
      flex: cs.flex,
      gap: cs.gap,
      pad: cs.padding,
      just: cs.justifyContent,
      maxW: cs.maxWidth,
      dir: cs.flexDirection,
      bg: cs.backgroundColor,
      bt: `${cs.borderTopWidth} ${cs.borderTopColor}`,
      bb: `${cs.borderBottomWidth} ${cs.borderBottomColor}`,
      h: r.height.toFixed(1),
    });
    el = el.parentElement;
  }
  return rows;
};

const browser = await chromium.launch();
for (const [label, url] of [["LIVE", LIVE], ["LOCAL", LOCAL]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  const rows = await page.evaluate(chain, { anchor, levels });
  console.log(`\n===== ${label}  "${anchor}" @ ${width} =====`);
  if (!rows) { console.log("  not found"); await page.close(); continue; }
  for (const r of rows) {
    console.log(
      `L${r.lvl} ${r.tag.padEnd(6)} x,w=${r.rect.padEnd(16)} h=${String(r.h).padEnd(7)} ${r.disp.padEnd(10)} flex=${(r.flex||"").padEnd(11)} gap=${(r.gap||"").padEnd(7)} pad=${(r.pad||"").padEnd(12)} dir=${(r.dir||"").padEnd(7)}`
    );
    console.log(`     bg=${r.bg}  borderTop=${r.bt}  borderBottom=${r.bb}`);
    console.log(`     name="${r.name}" cls="${r.cls}"`);
  }
  await page.close();
}
await browser.close();
