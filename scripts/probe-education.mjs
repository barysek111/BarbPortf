import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto((process.env.LOCAL_URL ?? "http://localhost:3002") + "/about", { waitUntil: "networkidle" });
await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));} });
await page.waitForTimeout(700);
const rows = await page.evaluate(() => {
  const sec = document.querySelector('[data-name="Section - Education"]');
  if (!sec) return null;
  const head = [...sec.querySelectorAll("p,h2")].slice(0,2).map(n => n.textContent.trim());
  const rows = [...sec.querySelectorAll(".border-t")].map(r =>
    [...r.querySelectorAll("p")].map(p => p.textContent.trim())
  );
  return { head, rows };
});
console.log(rows ? JSON.stringify(rows, null, 1) : "Education section not found");
await browser.close();
