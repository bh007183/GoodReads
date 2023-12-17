const assert = require("node:assert");
const { chromium, devices } = require("playwright");
const fs = require("fs");
 let {Scraper} = require("./Class/Scraper");
 let {ElevenLabs} = require("./Class/ElevenLabs/ElevenLabs")


(async () => {
  // Setup
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext(devices["iPhone 11"]);
  const page = await context.newPage();
  let url = "https://www.goodreads.com/author/quotes/4918776.Seneca"
  let author = url.split(".")[url.split(".").length -1]
  console.log(author)
  //
  await page.goto(url);

 let scraper = new Scraper(page)

  await scraper.iPhoneLoadMore(4)

  //Scrapes Data

  await context.close();
  await browser.close();

  

if (fs.existsSync("./currentQuotes.txt")) {
  console.log('File exists!');
  let tts = new ElevenLabs(author)
} else {
  console.log('File does not exist.');
}
})();

