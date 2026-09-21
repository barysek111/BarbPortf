// Report rendered gap values for the column/cell groups in question.
import { chromium } from "playwright";

const BASE = process.env.LOCAL_URL ?? "http://localhost:3002";

const read = () => {
  const out = [];
  const add = (label, el) => {
    if (!el) return out.push({ label, note: "not found" });
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    out.push({
      label,
      display: cs.display,
      cols: cs.gridTemplateColumns || "-",
      rowGap: cs.rowGap,
      colGap: cs.columnGap,
      width: +r.width.toFixed(1),
      children: el.children.length,
    });
  };
  const strip = (s) => (s || "").replace(/\s+/g, "").toLowerCase();
  const all = [...document.querySelectorAll("*")];

  // WorksDisplay grid
  const grid = all
    .filter((n) => {
      const cs = getComputedStyle(n);
      return cs.display === "grid" && cs.gridTemplateColumns.split(" ").length >= 3;
    })
    .sort((a, b) => b.getBoundingClientRect().width - a.getBoundingClientRect().width)[0];
  add("WorksDisplay grid", grid);

  // Services row (has the ::after divider) and its parts
  const svcSection = all.find((n) => n.getAttribute?.("data-name") === "Section - Services");
  if (svcSection) {
    const row = [...svcSection.querySelectorAll("div")].find((n) => {
      const r = n.getBoundingClientRect();
      return r.height > 180 && r.height < 260 && r.width > 1000;
    });
    add("Services row (left|right)", row);
    const strip2 = row ? [...row.children][1] : null;
    add("Services image strip", strip2);
    add("Services info column", row ? row.children[0] : null);
  }

  // Experience header
  const expSection = all.find((n) => n.getAttribute?.("data-name") === "Section - Experience");
  if (expSection) {
    const header = [...expSection.querySelectorAll("div")].find(
      (n) => getComputedStyle(n).display === "grid" && n.querySelector("h2")
    );
    add("Experience header (outer)", header);
    const inner = header ? [...header.children].find((c) => getComputedStyle(c).display === "grid") : null;
    add("Experience header (inner: title+career)", inner);
    const jobRow = [...expSection.querySelectorAll("div")].find(
      (n) => getComputedStyle(n).display === "grid" && getComputedStyle(n).borderTopWidth !== "0px"
    );
    add("Experience job row", jobRow);
  }

  // Footer + editorial header for comparison
  const foot = all.find((n) => n.tagName === "FOOTER");
  if (foot) {
    const bottom = [...foot.querySelectorAll("div")].find(
      (n) => getComputedStyle(n).display === "grid" && n.children.length === 4
    );
    add("Footer bottom row", bottom);
  }
  const ed = all.find(
    (n) => getComputedStyle(n).display === "grid" && n.querySelector("h2") && strip(n.textContent).includes("theadvantage")
  );
  add("EditorialHeader", ed);

  return out;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    scrollTo(0, y); await new Promise((r) => setTimeout(r, 40));
  }
  scrollTo(0, 0);
});
await page.waitForTimeout(1200);
const rows = await page.evaluate(read);
for (const r of rows) {
  if (r.note) { console.log(`${r.label.padEnd(38)} ${r.note}`); continue; }
  console.log(
    `${r.label.padEnd(38)} ${r.display.padEnd(6)} colGap=${String(r.colGap).padEnd(7)} rowGap=${String(r.rowGap).padEnd(7)} kids=${String(r.children).padEnd(3)} w=${String(r.width).padEnd(8)} cols=${r.cols}`
  );
}
await browser.close();
