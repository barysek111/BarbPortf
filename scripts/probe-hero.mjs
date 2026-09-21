// Verify the hero frame is half the viewport on desktop and that its child is
// contained: fully visible, aspect preserved, no overflow.
import { chromium } from "playwright";

const BASE = process.env.LOCAL_URL ?? "http://localhost:3002";

const read = () => {
  const frame = document.querySelector('[data-name="3D Carousel"]');
  if (!frame) return null;
  const f = frame.getBoundingClientRect();
  const child = frame.firstElementChild;
  const c = child?.getBoundingClientRect();
  const img = child instanceof HTMLImageElement ? child : null;
  return {
    viewport: `${innerWidth}x${innerHeight}`,
    frame: `${f.width.toFixed(1)}x${f.height.toFixed(1)}`,
    expected: `${(innerWidth / 2).toFixed(1)}x${(innerHeight / 2).toFixed(1)}`,
    child: c ? `${c.width.toFixed(1)}x${c.height.toFixed(1)}` : null,
    objectFit: child ? getComputedStyle(child).objectFit : null,
    overflowsFrame: c ? c.width > f.width + 0.5 || c.height > f.height + 0.5 : null,
    natural: img ? `${img.naturalWidth}x${img.naturalHeight}` : null,
  };
};

const browser = await chromium.launch();
for (const [w, h] of [[1920, 1000], [1440, 900], [900, 800], [390, 780]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(900);
  const r = await page.evaluate(read);
  console.log(`\n${w}x${h}`);
  if (!r) { console.log("  frame not found"); await page.close(); continue; }
  console.log(`  frame    ${r.frame}   (half viewport would be ${r.expected})`);
  console.log(`  child    ${r.child}  object-fit=${r.objectFit}  natural=${r.natural}`);
  console.log(`  overflows frame: ${r.overflowsFrame}`);
  await page.close();
}
await browser.close();
