// Compare the services row rule (drawn as an ::after bottom border) live vs local.
import { chromium } from "playwright";

const read = () => {
  const strip = (s) => (s || "").replace(/\s+/g, "").toLowerCase();
  // find the row that contains the first service tag, then walk up to the 212px row
  const all = [...document.querySelectorAll("body *")];
  const tag = all.filter((n) => strip(n.textContent) === "sitestructure").pop();
  if (!tag) return null;
  let el = tag;
  for (let i = 0; i < 10 && el; i++) {
    const r = el.getBoundingClientRect();
    if (r.height > 180 && r.height < 260 && r.width > 1000) {
      const a = getComputedStyle(el, "::after");
      return {
        rect: `${r.width.toFixed(0)}x${r.height.toFixed(0)}`,
        padding: getComputedStyle(el).padding,
        gap: getComputedStyle(el).gap,
        afterContent: a.content,
        afterPos: a.position,
        afterInset: `${a.top}/${a.left}/${a.right}/${a.bottom}`,
        afterBorderBottom: `${a.borderBottomWidth} ${a.borderBottomStyle} ${a.borderBottomColor}`,
      };
    }
    el = el.parentElement;
  }
  return null;
};

const browser = await chromium.launch();
for (const [label, url] of [["LIVE ", "https://titarvl.framer.website/"], ["LOCAL", process.env.LOCAL_URL ?? "http://localhost:3002/"]]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      scrollTo(0, y); await new Promise((r) => setTimeout(r, 40));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  const r = await page.evaluate(read);
  console.log(`${label}  ${r ? JSON.stringify(r, null, 1) : "row not found"}`);
  await page.close();
}
await browser.close();
