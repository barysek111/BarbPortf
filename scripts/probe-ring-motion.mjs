import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto((process.env.LOCAL_URL ?? "http://localhost:3002") + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);

const sample = () => {
  const frame = document.querySelector('[data-name="3D Carousel"]');
  const cards = [...frame.querySelectorAll("img")].slice(0, 3).map((i) => {
    const r = i.getBoundingClientRect();
    return `${r.x.toFixed(1)},${r.y.toFixed(1)},${r.width.toFixed(1)}`;
  });
  return cards.join(" | ");
};

const t0 = await page.evaluate(sample);
await page.waitForTimeout(2500);
const t1 = await page.evaluate(sample);

console.log("t=0.0s  " + t0);
console.log("t=2.5s  " + t1);
console.log("\nmoving: " + (t0 !== t1 ? "YES" : "NO — positions identical"));

const info = await page.evaluate(() => {
  const inner = document.querySelector('[data-name="3D Carousel"] img')?.parentElement;
  const cs = inner ? getComputedStyle(inner) : null;
  return {
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    innerTransition: cs?.transitionProperty,
    innerDuration: cs?.transitionDuration,
    innerBoxShadow: cs?.boxShadow,
  };
});
console.log("\n" + JSON.stringify(info, null, 1));
if (errors.length) console.log("\nconsole errors:\n  " + errors.slice(0, 5).join("\n  "));
await browser.close();
