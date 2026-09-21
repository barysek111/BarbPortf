// Extract every @font-face rule the live site declares, plus which fonts the
// browser actually loaded and at what weight.
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://titarvl.framer.website/about", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

const r = await page.evaluate(() => {
  const faces = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of rules) {
      if (rule.constructor.name === "CSSFontFaceRule" || rule.type === 5) {
        faces.push({
          family: rule.style.getPropertyValue("font-family"),
          weight: rule.style.getPropertyValue("font-weight"),
          style: rule.style.getPropertyValue("font-style"),
          stretch: rule.style.getPropertyValue("font-stretch"),
          src: rule.style.getPropertyValue("src").slice(0, 150),
          unicodeRange: rule.style.getPropertyValue("unicode-range").slice(0, 60),
        });
      }
    }
  }
  const loaded = [...document.fonts].map((f) => ({
    family: f.family, weight: f.weight, style: f.style, status: f.status,
  }));
  // what weight is actually computed on key text
  const probe = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { fontFamily: cs.fontFamily, fontWeight: cs.fontWeight, fontSize: cs.fontSize };
  };
  return { faces, loaded, h2: probe("h2"), p: probe("p") };
});

console.log(`@font-face rules: ${r.faces.length}`);
for (const f of r.faces) {
  console.log(`  ${f.family.padEnd(28)} w=${f.weight.padEnd(10)} style=${f.style.padEnd(8)} ${f.src.replace(/url\(|\)|"/g, "").split("/").pop()}`);
}
console.log(`\nloaded (${r.loaded.filter(f => f.status === "loaded").length} of ${r.loaded.length}):`);
for (const f of r.loaded.filter((f) => f.status === "loaded")) {
  console.log(`  ${f.family.padEnd(28)} weight=${f.weight} style=${f.style}`);
}
console.log("\ncomputed h2:", JSON.stringify(r.h2));
console.log("computed p :", JSON.stringify(r.p));
await browser.close();
