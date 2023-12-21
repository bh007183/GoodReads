const TTS = require("./Class/TTS.js")
// const axios = require("axios");


// ////////////////////////////////////////////

// var ffmpeg = require("fluent-ffmpeg");
// this._ffmpeger = ffmpeg("Media/video/islands_-_2119 (540p).mp4")
//   .videoCodec("libx264")
//   .format("mp4")
//   .input("/Users/benhopkins/Javascript/GoodReads/Media/audio/ElevenLabs_2023-12-15T04_43_01_Aaryan - majestic and deep_gen_s50_sb75_se0_b_m2.mp3")
//   .input("/Users/benhopkins/Javascript/GoodReads/Media/audio/relaxing-145038.mp3")
//   .complexFilter(
//     [
      
//       {
//         filter: "drawtext",
//         options: {
//           text: "True happiness is to enjoy the present, without anxious dependence upon the future, not to amuse ourselves with either hopes or fears but to rest satisfied with what we have, which is sufficient, for he that is so wants nothing. The greatest blessings of mankind are within us and within our reach. A wise man is content with his lot, whatever it may be, without wishing for what he has not.",
//         //   fontsize: 36,
//           fontcolor: "white",
//         //   x: "(main_w/2-text_w/2)",
//         //   y: "(text_h/2)+15",
//           shadowcolor: "black",
//           shadowx: 2,
//           shadowy: 2,
//         },
//         outputs: "output",
//       },
//       {
//         filter: "amix",
//         options: { inputs: 3, duration: "longest" },
//       },
     
//     ],
//     "output"
//   )
//   .save("video.mp4");

async function test(){
  let tts = new TTS()

  await tts.getHistoryIds()
  await tts.downloadHistory()
}
test()



