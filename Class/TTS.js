const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const { finished, Readable } = require("node:stream");
var extract = require('extract-zip')
var unzipper = require("unzipper");

class TTS {
  constructor(quote, voiceId) {
    this.quote = quote;
    this.voiceId = voiceId;
    this.historyIds = [];
  }

  textToSpeachGenerator() {
    console.log(`${process.env.ELLEVEN}`);
    const options = {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELLEVEN,
        "Content-Type": "application/json",
      },
      body: '{"text":"' + this.quote + '"}',
    };
    console.log(this.voiceId);

    fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/" + this.voiceId,
      options
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
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
  }

  async downloadHistory() {
    console.log(
      JSON.stringify({
        history_item_ids: this.historyIds,
      })
    );
    const options = {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELLEVEN,
        "Content-Type": "application/json",
      },
      body: '{"history_item_ids":["7QB4Md9tXX0ANsQu0YpY","kwphODS1zGhpZk3jGret"]}',
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
            console.log("Stream succeeded.");

            extract("./Media/Audio/files.zip", { dir: "/Users/benhopkins/Javascript/GoodReads/Media/Audio" }, function (err) {
                // handle err
             })
            
          }
        });
      })
      .catch((err) => console.error(err));
  }
}

module.exports = TTS;
