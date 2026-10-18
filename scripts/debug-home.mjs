import puppeteer from "puppeteer-core";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.type(), msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));

  console.log("Navigating to http://localhost:5173/hospitality...");
  await page.goto("http://localhost:5173/hospitality", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));
  await browser.close();
}

run().catch((e) => console.error(e));
