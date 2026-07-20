// Verification driver: loads the built site in headless Edge with real WebGL
// (swiftshader), waits past the loading screen, and captures each station.
import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = "http://localhost:4173";

const shots = [
  ["name", 0],
  ["stats", 0],
  ["skills", 0],
  ["projects", 0],
  ["experience", 0],
  ["education", 0],
  ["contact", 0],
];

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "shell",
  args: ["--use-angle=swiftshader", "--no-sandbox", "--window-size=1440,900"],
  defaultViewport: { width: 1440, height: 900 },
});

const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CONSOLE: " + m.text());
});

for (const [section] of shots) {
  await page.goto(`${BASE}/?fly=${section}`, { waitUntil: "networkidle2", timeout: 60000 });
  // wait for the loading screen to disappear (setReady → gone)
  await page
    .waitForFunction(() => !document.querySelector(".loading-content"), { timeout: 45000 })
    .catch(() => errors.push(`TIMEOUT waiting for loader on ${section}`));
  await new Promise((r) => setTimeout(r, 2500)); // let camera settle + text render
  await page.screenshot({ path: `.claude/station-${section}.png` });
  console.log(`shot: station-${section}.png`);
}

// click-zoom test: go to projects, click centre planet
await page.goto(`${BASE}/?fly=projects`, { waitUntil: "networkidle2" });
await page.waitForFunction(() => !document.querySelector(".loading-content"), { timeout: 45000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 2000));
await page.mouse.click(720, 450);
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: ".claude/station-planet-zoom.png" });
console.log("shot: station-planet-zoom.png");

console.log(errors.length ? "ERRORS:\n" + errors.join("\n") : "NO PAGE ERRORS");
await browser.close();
