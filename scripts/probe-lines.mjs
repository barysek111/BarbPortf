// Report how many visual lines a text anchor occupies on live vs local, and the
// width of each line box. Reveals hard breaks and wrap points.
// Usage: node scripts/probe-lines.mjs <width> <anchor...>
import { chromium } from "playwright";

const LIVE = "https://titarvl.framer.website/";
const LOCAL = process.env.LOCAL_URL ?? "http://localhost:3002/";
const width = Number(process.argv[2] ?? 1920);
const anchors = process.argv.slice(3);

const lines = ({ anchors }) => {
  const strip = (s) => (s || "").replace(/\s+/g, "").trim().toLowerCase();
  const out = {};
  for (const a of anchors) {
    const matches = [...document.querySelectorAll("body *")].filter(
      (n) => strip(n.textContent) === a
    );
    const el = matches.sort(
      (x, y) => x.querySelectorAll("*").length - y.querySelectorAll("*").length
    )[0];
    if (!el) { out[a] = null; continue; }
    const r = el.getBoundingClientRect();
    // Group text-node client rects into visual lines by their top coordinate.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const byTop = new Map();
    let n;
    while ((n = walker.nextNode())) {
      if (!n.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      for (const rect of range.getClientRects()) {
        if (rect.width < 0.5) continue;
        const key = Math.round(rect.top);
        const cur = byTop.get(key) || { left: Infinity, right: -Infinity, text: "" };
        cur.left = Math.min(cur.left, rect.left);
        cur.right = Math.max(cur.right, rect.right);
        cur.text += n.textContent;
        byTop.set(key, cur);
      }
    }
    const rows = [...byTop.entries()].sort((x, y) => x[0] - y[0]).map(([top, v]) => ({
      top,
      w: +(v.right - v.left).toFixed(1),
      left: +v.left.toFixed(1),
      text: v.text.replace(/\s+/g, " ").trim().slice(0, 60),
    }));
    out[a] = {
      box: { x: +r.x.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
      fontSize: getComputedStyle(el).fontSize,
      lineCount: rows.length,
      lines: rows,
      html: el.innerHTML.slice(0, 200),
    };
  }
  return out;
};

const browser = await chromium.launch();
for (const [label, url] of [["LIVE", LIVE], ["LOCAL", LOCAL]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      scrollTo(0, y); await new Promise((r) => setTimeout(r, 50));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
  const res = await page.evaluate(lines, { anchors });
  console.log(`\n========== ${label} @ ${width} ==========`);
  for (const a of anchors) {
    const v = res[a];
    if (!v) { console.log(`\n${a}: NOT FOUND`); continue; }
    console.log(`\n${a}  box w=${v.box.w} h=${v.box.h} x=${v.box.x}  font=${v.fontSize}  lines=${v.lineCount}`);
    for (const l of v.lines) console.log(`    w=${String(l.w).padEnd(8)} left=${String(l.left).padEnd(8)} "${l.text}"`);
  }
  await page.close();
}
await browser.close();
