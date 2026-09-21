// Check pseudo-elements and shadows on the live services rows — the remaining
// ways a hairline divider can be drawn once borders are ruled out.
import { chromium } from "playwright";

const LIVE = "https://titarvl.framer.website/";

const probe = () => {
  const out = { rows: [], pseudoRules: [], shadowRules: [] };

  // Rules that draw via pseudo-elements or shadows, anywhere in the sheet.
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    const walk = (list) => {
      for (const r of list) {
        if (r.cssRules) { walk(r.cssRules); continue; }
        if (!r.selectorText) continue;
        if (/::(before|after)/.test(r.selectorText)) {
          out.pseudoRules.push({ sel: r.selectorText, css: r.style.cssText.slice(0, 160) });
        }
        const sh = r.style && r.style.getPropertyValue("box-shadow");
        if (sh && sh !== "none") {
          out.shadowRules.push({ sel: r.selectorText.slice(0, 80), shadow: sh.slice(0, 120) });
        }
      }
    };
    walk(rules);
  }

  // The service rows themselves: computed pseudo + shadow + background.
  for (const el of document.querySelectorAll("[data-framer-name]")) {
    const name = el.getAttribute("data-framer-name") || "";
    if (!/service/i.test(name)) continue;
    const r = el.getBoundingClientRect();
    if (r.height < 100) continue;
    const cs = getComputedStyle(el);
    const after = getComputedStyle(el, "::after");
    const before = getComputedStyle(el, "::before");
    out.rows.push({
      name,
      rect: `${r.width.toFixed(0)}x${r.height.toFixed(0)}`,
      bg: cs.backgroundColor,
      shadow: cs.boxShadow,
      outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`,
      after: { content: after.content, h: after.height, w: after.width, bg: after.backgroundColor },
      before: { content: before.content, h: before.height, w: before.width, bg: before.backgroundColor },
      parentBg: el.parentElement ? getComputedStyle(el.parentElement).backgroundColor : "",
    });
  }
  return out;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(LIVE, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    scrollTo(0, y); await new Promise((r) => setTimeout(r, 40));
  }
  scrollTo(0, 0);
});
await page.waitForTimeout(1000);
const r = await page.evaluate(probe);

console.log(`pseudo-element rules: ${r.pseudoRules.length}`);
for (const p of r.pseudoRules.slice(0, 12)) console.log(`   ${p.sel}\n      ${p.css}`);
console.log(`\nbox-shadow rules: ${r.shadowRules.length}`);
for (const s of r.shadowRules.slice(0, 12)) console.log(`   ${s.sel}\n      ${s.shadow}`);
console.log(`\nservice rows: ${r.rows.length}`);
for (const row of r.rows.slice(0, 6)) {
  console.log(`   ${row.name}  ${row.rect}`);
  console.log(`      bg=${row.bg}  parentBg=${row.parentBg}`);
  console.log(`      shadow=${row.shadow}`);
  console.log(`      outline=${row.outline}`);
  console.log(`      ::before content=${row.before.content} ${row.before.w}x${row.before.h} bg=${row.before.bg}`);
  console.log(`      ::after  content=${row.after.content} ${row.after.w}x${row.after.h} bg=${row.after.bg}`);
}
await browser.close();
