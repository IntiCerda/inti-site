// Captures the public landing pages at full resolution and writes them to
// disk, which the in-app browser cannot do — its screenshots only come back as
// images, and they cap at 800px wide.
//
// Public pages only. Anything behind a login needs a session this process does
// not have and must not acquire.
import { chromium } from "playwright";
import fs from "node:fs/promises";

const OUT = "C:\\Users\\PC\\Downloads\\Yo\\capturas";

const TARGETS = [
  { name: "compliance-landing", url: "https://compliancemonitor.cl/" },
  { name: "vitrina-planes", url: "https://vitrina-app.com/planes" },
  { name: "inti-site", url: "https://inti-site.vercel.app/" },
];

await fs.mkdir(OUT, { recursive: true });

// deviceScaleFactor 2 gives a retina-density capture, so a crop can be scaled
// down later and stay sharp rather than being upscaled.
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2,
  locale: "es-CL",
});
const page = await ctx.newPage();

for (const t of TARGETS) {
  await page.goto(t.url, { waitUntil: "networkidle", timeout: 60000 });
  // Let entrance animations and counters settle before the shutter.
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${OUT}\\${t.name}.png` });
  await page.screenshot({ path: `${OUT}\\${t.name}-full.png`, fullPage: true });
  console.log(t.name, "->", await page.title());
}

await browser.close();
console.log("listo:", OUT);
