
(async () => {
  const assert = require("node:assert");
const { chromium, devices, firefox, webkit } = require("playwright");
 let Scraper = require("./Class/Scraper");
 let ElevenLabs = require("./Class/ElevenLabs")
  // Setup
  const browser = await webkit.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext(devices["iPhone 11"]);
  const page = await context.newPage();
  /////////////////////////////////////////////////////////////////////////
  let url = "https://www.goodreads.com/author/quotes/17212.Marcus_Aurelius"
  /////////////////////////////////////////////////////////////////////////
  let author = url.split(".")[url.split(".").length -1]
  console.log("author = " + author)
  //
  await page.goto(url);

 let scraper = new Scraper(page)

  await scraper.iPhoneLoadMore(1)

  // await context.close();
  // await browser.close();

console.log("this")
  let {createProject} = new ElevenLabs()
  console.log("Posting to ElevenLabs" + author)
  await createProject(author)
  

})();



