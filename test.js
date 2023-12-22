const TTS = require("./Class/TTS.js")
const fs = require("fs")
var audioconcat = require('audioconcat')
const MakeVideo = require("./Class/MakeVideo.js")
// const axios = require("axios");

async function test(){
  let tts = new TTS()
await tts.getHistoryIds()
await tts.downloadHistory()
let mv = new MakeVideo("./Media/Image/marcus-aurelius-8062803_1280.jpg")
await mv.concatAudio()
await mv.generateVideo()
}
test()





