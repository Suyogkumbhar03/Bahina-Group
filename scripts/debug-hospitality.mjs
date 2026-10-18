import puppeteer from "puppeteer-core";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function debug() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"]
  });

  const page = await browser.newPage();
  page.on("console", msg => console.log("PAGE CONSOLE:", msg.type(), msg.text()));
  page.on("pageerror", err => console.error("PAGE ERROR:", err));

  console.log("Navigating to http://localhost:5173/hospitality?lang=en ...");
  await page.goto("http://localhost:5173/hospitality?lang=en", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 2000));

  const bodyHtml = await page.evaluate(() => document.body.innerHTML);
  console.log("BODY HTML LENGTH:", bodyHtml.length);
  console.log("BODY HTML SNIPPET:", bodyHtml.slice(0, 500));

  await browser.close();
}

debug().catch(console.error);
