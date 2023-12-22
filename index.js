
(async () => {
  const TTS = require("./Class/TTS.js")
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

  await scraper.iPhoneLoadMore(2)

  let tts = new TTS(scraper.getQuotes(),"qVV58SH4CtxEz8JNNx3M")

  await tts.textToSpeachGenerator()

  await setTimeout(() => {}, 900000);

  await tts.getHistoryIds()

  await tts.downloadHistory()

  // await context.close();
  // await browser.close();

console.log("this")

  

})();



