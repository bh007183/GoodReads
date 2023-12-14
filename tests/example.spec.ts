import { test, expect } from '@playwright/test';



test("start", async ({ page }) => {
  await page.goto('https://www.goodreads.com/author/quotes/17212.Marcus_Aurelius');

  // Click the get started link.
  let quotes = await page.locator(".quoteText");

  let el = await page.$$eval('.quoteText', nodes => nodes.map(n => {
    return n
  }));
  console.log(quotes)
  page.on('console', async (msg) => {
    const msgArgs = msg.args();
    const logValues = await Promise.all(msgArgs.map(async arg => await arg.jsonValue()));
    console.log(...logValues);
});



  // Expects page to have a heading with the name of Installation.
 
});
