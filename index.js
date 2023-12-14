const assert = require("node:assert");
const { chromium, devices } = require("playwright");
const fs = require("fs");

(async () => {
  // Setup
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext(devices["iPhone 11"]);
  const page = await context.newPage();
  //
  await page.goto(
    "https://www.goodreads.com/author/quotes/4918776.Seneca"
  );

  //   fs.appendFileSync("./test.json", JSON.stringify(quote))
  let allQuotes = [];
  let loads = 0;

  // iPhoneLoadMore()

  // async function iPhoneLoadMore() {
  //   if ((await page.locator(".jsLoadMore").isVisible()) && loads < 5) {
  //     loads++;
  //     await page.locator(".jsLoadMore").click();
  //     await page.waitForTimeout(10000);
  //     console.log("fired");
  //     iPhoneLoadMore();
  //   } else {
  //     await iPhoneScrapeData();
  //     fs.appendFileSync("./test.json", JSON.stringify(allQuotes));
  //     await context.close();
  //     await browser.close();
  //   }
  // }

  // async function iPhoneScrapeData() {
    let quoteContainer = await page.locator(".quote").all();
    for (v of quoteContainer) {
      let quote = await v.locator(".quoteBody").textContent();
      let author = await v.locator(".quoteAuthor").textContent();
      let book = await v.locator(".quoteBook").textContent();
      let tags = await v.locator(".quoteTags").textContent();
      let likes = await v.locator(".quoteLikes").textContent();
      let obj = {
        quote,
        author,
        book,
        tags,
        likes
      };
      allQuotes.push(obj);
      console.log(obj)
    }
  // }

  //  <a class="next_page" rel="next" href="/author/quotes/17212.Marcus_Aurelius?page=2">next »</a>

  //  let next = await page.locator("next_page").click()
})();

