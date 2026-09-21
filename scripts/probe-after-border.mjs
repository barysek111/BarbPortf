import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://titarvl.framer.website/", { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));} scrollTo(0,0); });
await page.waitForTimeout(800);
const r = await page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll("[data-framer-name]")) {
    const n = el.getAttribute("data-framer-name") || "";
    if (!/Service Card/i.test(n)) continue;
    const a = getComputedStyle(el, "::after");
    out.push({ n,
      borderTop: `${a.borderTopWidth} ${a.borderTopStyle} ${a.borderTopColor}`,
      borderBottom: `${a.borderBottomWidth} ${a.borderBottomStyle} ${a.borderBottomColor}`,
      borderLeft: `${a.borderLeftWidth} ${a.borderLeftStyle} ${a.borderLeftColor}`,
      radius: a.borderRadius, inset: `${a.top}/${a.left}`, pos: a.position, z: a.zIndex });
  }
  return out;
});
for (const x of r.slice(0,4)) console.log(JSON.stringify(x, null, 1));
await browser.close();
