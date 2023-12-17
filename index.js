const assert = require("node:assert");
const { chromium, devices, firefox, webkit } = require("playwright");
const fs = require("fs");
 let Scraper = require("./Class/Scraper");


 let ElevenLabs = require("./Class/ElevenLabs")


 let labs = new ElevenLabs();



// (async () => {
//   // Setup
//   const browser = await webkit.launch({ headless: false, slowMo: 50 });
//   const context = await browser.newContext(devices["iPhone 11"]);
//   const page = await context.newPage();
//   let url = "https://www.goodreads.com/author/quotes/17212.Marcus_Aurelius"
//   let author = url.split(".")[url.split(".").length -1]
//   console.log("author = " + author)
//   //
//   await page.goto(url);

//  let scraper = new Scraper(page)

//   await scraper.iPhoneLoadMore(1)

//   //Scrapes Data

//   await context.close();
//   await browser.close();
// console.log("this")
//   await createProject(author)
  

// })();


function createProject(author) {
  const form = new FormData();
  form.append("author", author);
  form.append("default_model_id", "eleven_multilingual_v2");
  form.append("default_paragraph_voice_id", "MBtA80mrlErJ8xjUHgHV");
  form.append("default_title_voice_id", "MBtA80mrlErJ8xjUHgHV");
  form.append("from_document", fs.readFileSync("./currentQuotes.txt", "utf8"));
  form.append("from_url", "null");
  form.append("name", author);
  form.append(
    "pronunciation_dictionary_locators",
    '[\n  "./Dictionaries/index.pls"\n]'
  );

  const options = {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELLEVEN,
      // "Content-Type": "multipart/form-data",
    },
  };

  options.body = form;

  fetch("https://api.elevenlabs.io/v1/projects/add", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

createProject("Marcus Auralius")

