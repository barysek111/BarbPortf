// Headless live-vs-local measuring harness for the 1:1 rebuild.
// Usage: node scripts/compare-live.mjs <probeSet> [widths csv] [--shot] [--styles]
//   node scripts/compare-live.mjs wrap 390,810,1200,1440,1920
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const ROUTE = process.env.ROUTE ?? "";
const LIVE = "https://titarvl.framer.website/" + ROUTE;
const LOCAL = (process.env.LOCAL_URL ?? "http://localhost:3002/") + ROUTE;

const probeSet = process.argv[2] ?? "wrap";
const widths = (process.argv[3] ?? "1440").split(",").map(Number).filter(Boolean);
const wantShot = process.argv.includes("--shot");
const wantStyles = process.argv.includes("--styles");
// Live nav auto-hides once the page has been scrolled, so nav probes must not scroll.
const noScroll = process.argv.includes("--noscroll");

// Anchors are matched with ALL whitespace stripped, because Framer letter-splits
// some text into per-glyph spans ("s c r o l l d o w n").
const PROBES = {
  wrap: [
    "home", "works[10]", "about", "contact",
    "titarvl—creativedirection", "latestwork", "vol.01", "[scrolldown]",
    "[viewall]", "chronicae", "arcanestudio", "service(s)",
    "sitestructure", "whatido", "aselectedapproach",
    "theadvantage", "experienceguidesthework",
    "frequentlyaskedquestions", "claritybuildstheimage",
    "voicesbehindthework",
  ],
  nav: ["home", "works[10]", "about", "contact", "[scrolldown]", "[viewall]", "latestwork"],
  about: [
    "about", "info", "[scrolldown]", "process", "thinking", "making",
    "practice", "experience", "career", "service(s)", "type", "focus", "status",
    "openforwork", "concept", "structure", "execution",
  ],
  services: ["service(s)", "[01]", "sitestructure", "visualassets", "visualsystem", "identitysystem"],
};

const collect = ({ anchors, wantStyles }) => {
  const strip = (s) => (s || "").replace(/\s+/g, "").trim().toLowerCase();
  const props = [
    "display", "position", "width", "height", "maxWidth", "padding", "margin",
    "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing",
    "textTransform", "color", "backgroundColor", "mixBlendMode", "gap",
    "flexDirection", "gridTemplateColumns", "borderTopColor", "borderTopWidth",
    "borderBottomWidth", "opacity", "visibility",
  ];

  const out = {};
  for (const a of anchors) {
    const matches = [...document.querySelectorAll("body *")].filter(
      (n) => strip(n.textContent) === a
    );
    // deepest = fewest descendant elements
    const el = matches.sort(
      (x, y) => x.querySelectorAll("*").length - y.querySelectorAll("*").length
    )[0];
    if (!el) { out[a] = null; continue; }
    const r = el.getBoundingClientRect();
    const rec = {
      x: +r.x.toFixed(1), y: +(r.y + scrollY).toFixed(1),
      w: +r.width.toFixed(1), h: +r.height.toFixed(1),
    };
    if (wantStyles) {
      const cs = getComputedStyle(el);
      rec.s = {};
      for (const p of props) rec.s[p] = cs[p];
      rec.tag = el.tagName.toLowerCase();
      rec.name = el.getAttribute("data-framer-name") || undefined;
      rec.cls = (typeof el.className === "string" ? el.className : "").slice(0, 100);
    }
    out[a] = rec;
  }
  out._doc = { w: innerWidth, scrollW: document.documentElement.scrollWidth, bodyH: document.body.scrollHeight };
  return out;
};

async function measure(page, url, width, label) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  if (!noScroll) {
    // force lazy/in-view content to render, then return to top
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      scrollTo(0, 0);
    });
  }
  await page.waitForTimeout(1200);
  const data = await page.evaluate(collect, { anchors: PROBES[probeSet], wantStyles });
  if (wantShot) {
    mkdirSync("docs/design-references", { recursive: true });
    await page.screenshot({
      path: `docs/design-references/${label}-${width}.png`,
      fullPage: true,
    });
  }
  return data;
}

const browser = await chromium.launch();
const report = {};
for (const width of widths) {
  const ctxA = await browser.newPage();
  const ctxB = await browser.newPage();
  const [live, local] = await Promise.all([
    measure(ctxA, LIVE, width, "live"),
    measure(ctxB, LOCAL, width, "local"),
  ]);
  await ctxA.close();
  await ctxB.close();
  report[width] = { live, local };

  console.log(`\n${"=".repeat(64)}\n  WIDTH ${width}   live doc ${live._doc.scrollW} / local doc ${local._doc.scrollW}`);
  console.log(`${"=".repeat(64)}`);
  console.log("anchor".padEnd(26) + "live x/y/w".padEnd(24) + "local x/y/w".padEnd(24) + "Δ");
  for (const a of PROBES[probeSet]) {
    const L = live[a];
    const R = local[a];
    if (!L && !R) { console.log(a.padEnd(26) + "— missing both —"); continue; }
    if (!L) { console.log(a.padEnd(26) + "MISSING ON LIVE"); continue; }
    if (!R) { console.log(a.padEnd(26) + "".padEnd(24) + "MISSING ON LOCAL"); continue; }
    const d = [L.x - R.x, L.y - R.y, L.w - R.w].map((n) => +n.toFixed(0));
    const flag = Math.abs(d[0]) > 2 || Math.abs(d[2]) > 3 ? "  <<<" : "";
    console.log(
      a.padEnd(26) +
      `${L.x} / ${L.y} / ${L.w}`.padEnd(24) +
      `${R.x} / ${R.y} / ${R.w}`.padEnd(24) +
      `x${d[0]} y${d[1]} w${d[2]}${flag}`
    );
  }
}
await browser.close();
mkdirSync("docs/research", { recursive: true });
writeFileSync(`docs/research/compare-${probeSet}.json`, JSON.stringify(report, null, 2));
