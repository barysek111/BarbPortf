// Which font files does the live site actually download, and how big are they?
// Sizes let us match them to the hashed copies already in public/fonts.
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const seen = [];
page.on("response", async (res) => {
  const u = res.url();
  if (!/\.woff2?($|\?)/.test(u)) return;
  try {
    const buf = await res.body();
    seen.push({ url: u, bytes: buf.length });
  } catch { /* ignore */ }
});
await page.goto("https://titarvl.framer.website/about", { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(async () => {
  for (let y = 0; y < 4000; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
});
await page.waitForTimeout(1500);

// map each loaded FontFace to its src url
const faces = await page.evaluate(() =>
  [...document.fonts]
    .filter((f) => f.status === "loaded")
    .map((f) => ({ family: f.family, weight: f.weight, style: f.style }))
);

console.log("downloaded font files:");
for (const s of seen) console.log(`  ${String(s.bytes).padStart(7)}  ${s.url.split("/").pop()}`);
console.log("\nloaded faces:");
for (const f of faces) console.log(`  ${f.family} / ${f.weight} / ${f.style}`);
await browser.close();
