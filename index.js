const assert = require("node:assert");
const { chromium, devices } = require("playwright");
const fs = require("fs");
 let {Scraper} = require("./Class/Scraper");

(async () => {
  // Setup
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext(devices["iPhone 11"]);
  const page = await context.newPage();
  //
  await page.goto("https://www.goodreads.com/author/quotes/4918776.Seneca");

 let scraper = new Scraper(page)

  await scraper.iPhoneLoadMore(2)

  //Scrapes Data

  await context.close();
  await browser.close();
})();

