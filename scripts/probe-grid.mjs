// Confirm the projects grid renders identically on / and /works.
import { chromium } from "playwright";

const BASE = process.env.LOCAL_URL ?? "http://localhost:3002";

const read = () => {
  // the projects grid: the widest multi-column grid on the page
  const grid = [...document.querySelectorAll("div")]
    .filter((n) => {
      const cs = getComputedStyle(n);
      return cs.display === "grid" && cs.gridTemplateColumns.split(" ").length >= 3;
    })
    .sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0];
  if (!grid) return null;
  const cs = getComputedStyle(grid);
  const r = grid.getBoundingClientRect();
  const first = grid.firstElementChild?.getBoundingClientRect();
  return {
    gridWidth: +r.width.toFixed(1),
    columns: cs.gridTemplateColumns,
    rows: cs.gridTemplateRows,
    gap: `${cs.rowGap} / ${cs.columnGap}`,
    cards: grid.children.length,
    firstCard: first ? `${first.width.toFixed(1)}x${first.height.toFixed(1)}` : null,
  };
};

const browser = await chromium.launch();
for (const route of ["/", "/works"]) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  const r = await page.evaluate(read);
  console.log(`${route.padEnd(8)} ${r ? JSON.stringify(r, null, 1) : "5-col grid not found"}`);
  await page.close();
}
await browser.close();
