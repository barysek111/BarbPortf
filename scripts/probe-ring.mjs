// Verify the hero ring fills its frame, renders every card, and stays inside.
import { chromium } from "playwright";

const BASE = process.env.LOCAL_URL ?? "http://localhost:3002";

const read = () => {
  const frame = document.querySelector('[data-name="3D Carousel"]');
  if (!frame) return null;
  const f = frame.getBoundingClientRect();
  const stage = frame.firstElementChild;
  const s = stage?.getBoundingClientRect();
  const cards = [...frame.querySelectorAll("img")].map((img) => {
    const r = img.getBoundingClientRect();
    return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: +r.x.toFixed(1), y: +r.y.toFixed(1) };
  });
  const sized = cards.filter((c) => c.w > 0 && c.h > 0);
  const outside = sized.filter(
    (c) => c.x + c.w < f.x - 1 || c.x > f.x + f.width + 1 || c.y + c.h < f.y - 1 || c.y > f.y + f.height + 1
  );
  return {
    viewport: `${innerWidth}x${innerHeight}`,
    frame: `${f.width.toFixed(1)}x${f.height.toFixed(1)}`,
    halfViewport: `${(innerWidth / 2).toFixed(1)}x${(innerHeight / 2).toFixed(1)}`,
    stageFillsFrame: s ? Math.abs(s.width - f.width) < 1 && Math.abs(s.height - f.height) < 1 : null,
    cards: cards.length,
    sized: sized.length,
    fullyOutsideFrame: outside.length,
    firstCard: sized[0] ?? null,
  };
};

const browser = await chromium.launch();
for (const [w, h] of [[1920, 1000], [1440, 900], [390, 780]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  const r = await page.evaluate(read);
  console.log(`\n${w}x${h}`);
  console.log(r ? JSON.stringify(r, null, 1) : "  frame not found");
  await page.close();
}
await browser.close();
