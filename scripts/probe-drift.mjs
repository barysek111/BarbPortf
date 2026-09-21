// Confirm the correct values for the three drift items against the live source:
// the stat figures, the nav clock, and the What I Do headline measure.
import { chromium } from "playwright";

const read = () => {
  const strip = (s) => (s || "").replace(/\s+/g, "").toLowerCase();
  const all = [...document.querySelectorAll("body *")];
  const pick = (test) => all.filter(test).sort((a, b) => a.querySelectorAll("*").length - b.querySelectorAll("*").length)[0];
  const styleOf = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 30),
      fontFamily: cs.fontFamily.split(",")[0],
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
      textTransform: cs.textTransform,
      maxWidth: cs.maxWidth,
      minHeight: cs.minHeight,
      h: +r.height.toFixed(1),
      w: +r.width.toFixed(1),
    };
  };

  // stat figure: a short value like "10+" / "100%"
  const stat = pick((n) => /^(10\+|5\+|25\+|100%)$/.test(strip(n.textContent)));
  // nav clock: contains GMT
  const clockLine = pick((n) => /gmt/.test(strip(n.textContent)));
  const clockBox = clockLine ? clockLine.parentElement : null;
  // What I Do headline
  const wid = pick((n) => n.tagName === "H2" && strip(n.textContent).startsWith("titarvlisadigitalpractice"));

  return {
    stat: styleOf(stat),
    clockLine: styleOf(clockLine),
    clockBox: styleOf(clockBox),
    whatIDo: styleOf(wid),
  };
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
await page.goto(process.env.URL ?? "https://titarvl.framer.website/", { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    scrollTo(0, y); await new Promise((r) => setTimeout(r, 50));
  }
});
await page.waitForTimeout(2500); // let the stat counters finish
const r = await page.evaluate(read);
for (const [k, v] of Object.entries(r)) {
  console.log(`\n${k}:`);
  console.log(v ? JSON.stringify(v, null, 1) : "  not found");
}
await browser.close();
