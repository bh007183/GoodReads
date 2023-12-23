const TTS = require("./Class/TTS.js")
const fs = require("fs")
var audioconcat = require('audioconcat')
const MakeVideo = require("./Class/MakeVideo.js")
const { getAudioDurationInSeconds } = require("get-audio-duration");
var videoshow = require("videoshow");
async function test(){
  let tts = new TTS()
  
await tts.getHistoryIds()

await tts.downloadHistory()
let mv = new MakeVideo("./Media/Image/marcus-aurelius-8062803_1280.jpg")
fs.watchFile("./Media/Audio/tim-able-slow-and-deliberatew", () => {
  console.log("Generating audio")

            mv.concatAudio()
          
})

fs.watchFile("./Media/Audio/Concatinated", () => {
  console.log("Generating Video")
  mv.generateVideo();
 
          
})

}
test()





