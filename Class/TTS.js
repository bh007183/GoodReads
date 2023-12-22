const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const { finished, Readable } = require("node:stream");
var extract = require("extract-zip");
var unzipper = require("unzipper");
var MakeVideo = require("./MakeVideo.js")

class TTS {
  constructor(quoteData, voiceId) {
    this.quoteData = quoteData;
    this.voiceId = voiceId;
    this.historyIds = [];
  }

  async textToSpeachGenerator() {
    for (let v of this.quoteData) {
      setTimeout(() => {}, 3000);
      const options = {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELLEVEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: v.quote }),
      };

      await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/" + this.voiceId,
        options
      )
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }

  async getHistoryIds() {
    const options = {
      method: "GET",
      headers: { "xi-api-key": process.env.ELLEVEN },
    };

    await fetch("https://api.elevenlabs.io/v1/history", options)
      .then((res) => res.json())
      .then((res) => {
        let ids = res.history.map((v, i) => v.history_item_id);
        this.historyIds = ids;
      })
      .catch((err) => console.error(err));
      console.log("1")
  }

  async downloadHistory() {
    
    const options = {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELLEVEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        history_item_ids: this.historyIds,
      }),
    };

    await fetch("https://api.elevenlabs.io/v1/history/download", options)
      .then(async (response) => {
        return response.blob();
      })
      .then((response) => {
        //Single MP3
        // const buffer = await response.arrayBuffer();
        // const array = new Uint8Array(buffer);
        // await fs.writeFileSync("./Media/Audio/test.mp3", array);
        //Zip File
        const stream = fs.createWriteStream(`./Media/Audio/files.zip`);
        finished(Readable.fromWeb(response.stream()).pipe(stream), (err) => {
          if (err) {
            console.log("Stream failed.", err);
          } else {
            console.log("2")
            console.log("Stream succeeded.");

            extract(
              "./Media/Audio/files.zip",
              { dir: "/Users/benhopkins/Javascript/GoodReads/Media/Audio" },
              function (err) {
                // handle err
              }
            );

          }
        });
      })
      .catch((err) => console.error(err));
  }
}

module.exports = TTS;
