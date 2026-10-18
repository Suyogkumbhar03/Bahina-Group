import puppeteer from "puppeteer-core";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:5173";
const OUTPUT_DIR = "C:\\Users\\SUYOG\\.gemini\\antigravity-ide\\brain\\26330acf-925b-42d5-8cee-d97d44ecaecd\\screenshots";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // Test at 1280px
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/?skip=1`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "landing_nav_1280px.png"),
    clip: { x: 0, y: 0, width: 1280, height: 120 },
  });
  console.log("Captured landing_nav_1280px.png");

  // Test at 1080px (laptop width)
  await page.setViewport({ width: 1080, height: 800, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/?skip=1`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, "landing_nav_1080px.png"),
    clip: { x: 0, y: 0, width: 1080, height: 120 },
  });
  console.log("Captured landing_nav_1080px.png");

  await browser.close();
}

run().catch(console.error);
