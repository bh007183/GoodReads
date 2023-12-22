const TTS = require("./Class/TTS.js")
const fs = require("fs")
var audioconcat = require('audioconcat')
const MakeVideo = require("./Class/MakeVideo.js")
// const axios = require("axios");

async function test(){
  let tts = new TTS()
  
await tts.getHistoryIds()

await tts.downloadHistory()

fs.watchFile("./Media/Audio/tim-able-slow-and-deliberatew", () => {
  console.log("files loaded")
  let mv = new MakeVideo("./Media/Image/marcus-aurelius-8062803_1280.jpg")
            mv.concatAudio()
          
})

}
test()





