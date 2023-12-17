const fs = require("fs");
class Scraper{

    constructor(page){
        this.page = page
        this.loads = 0
        this.allQuotes = []
        this.combinedText = ''
    }

    //Takes a int to determin how many times it clicks on the load more button
    //on mobile version.
    async iPhoneLoadMore(numberOfLoads) {
      
        if ((await this.page.locator(".jsLoadMore").isVisible()) && this.loads <= numberOfLoads) {
          this.loads++;
          await this.page.locator(".jsLoadMore").click();
          await this.page.waitForTimeout(10000);
          console.log("Loading More....");
          await this.iPhoneLoadMore();
        } else {
          await this.iPhoneScrapeData();
          fs.appendFileSync("./test.json", JSON.stringify(this.allQuotes));
          fs.appendFileSync("./currentQuotes.txt", this.combinedText);
        }
      }

      //Scrapes Data
  async iPhoneScrapeData() {
    console.log("Scraping Quotes...");
    let quoteContainer = await this.page.locator(".quote").all();
    console.log(quoteContainer)
    await this.page.setDefaultTimeout(2000);
    for (let v of quoteContainer) {
      let quote;
      let author;
      let book;
      let tags;
      let likes;
      try {
        quote = await v.locator(".quoteBody").textContent();
        author = await v.locator(".quoteAuthor").textContent();
      } catch (err) {
        console.log("Unable to find quote or author");
      }
      try {
        book = await v.locator(".quoteBook").textContent();
      } catch (err) {
        console.log("Unable to find book");
        book = null;
      }
      try {
        tags = await v.locator(".quoteTags").textContent();
      } catch (err) {
        console.log("Unable to find tags");
        tags = null;
      }
      try {
        likes = await v.locator(".quoteLikes").textContent();
      } catch (err) {
        console.log("Unable to find number of likes");
        likes = null;
      }
      let obj = {
        quote,
        author,
        book,
        tags,
        likes,
      };
      this.allQuotes.push(obj);

      let replace1 = obj.quote.replace(/,/g, ",,,,,")
      let replace2 = replace1.replace(/\./g, ".....")
      console.log(replace2)
      this.combinedText += replace2 + '<break time="4s"/>'
   
    }
  }
 
}

module.exports = Scraper