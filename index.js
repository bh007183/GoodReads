(async () => {
  const TTS = require("./Class/TTS.js");
  const assert = require("node:assert");
  const { chromium, devices, firefox, webkit } = require("playwright");
  let Scraper = require("./Class/Scraper");

  const fs = require("fs");
  var audioconcat = require("audioconcat");
  const MakeVideo = require("./Class/MakeVideo.js");
  // Setup
  const browser = await webkit.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext(devices["iPhone 11"]);
  const page = await context.newPage();
  /////////////////////////////////////////////////////////////////////////
  ///set quotes 
  let url = "https://www.goodreads.com/author/quotes/17212.Marcus_Aurelius";
  /////////////////////////////////////////////////////////////////////////
  let author = url.split(".")[url.split(".").length - 1];
  console.log("author = " + author);
  //
  await page.goto(url);

  let scraper = new Scraper(page);

  await scraper.iPhoneLoadMore(1);

  let tts = new TTS(scraper.getQuotes(), "qVV58SH4CtxEz8JNNx3M");

  await tts.textToSpeachGenerator();

  await setTimeout(() => {}, 900000);

  await tts.getHistoryIds();

  await tts.downloadHistory();

  // await context.close();
  // await browser.close();
//Set Image to go with video
  let mv = new MakeVideo("./Media/Image/marcus-aurelius-8062803_1280.jpg");
  fs.watchFile("./Media/Audio/tim-able-slow-and-deliberatew", () => {
    console.log("Generating audio");
    mv.concatAudio();
  });

  fs.watchFile("./Media/Audio/Concatinated", () => {
    console.log("Generating Video");
    mv.generateVideo();
  });
})();
