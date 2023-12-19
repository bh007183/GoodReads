const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

// Paths to your input files
const { getAudioDurationInSeconds } = require("get-audio-duration");

const audioFile =
  "./Media/ElevenLabs_2023-12-18T14_58_05_Chapter 1.mp3";
var videoshow = require("videoshow");

const song = "./Media/marcus-aurelius-8062803_1280.jpg"
// (async() => {

// })()

var images = [
  {
    path: "./Media/marcus-aurelius-8062803_1280.jpg",
    // caption: "Hello world as video subtitle",
    // loop: 12,
  },
  // {
  //   path: "./Media/Screen Shot 2022-04-09 at 3.16.23 PM.png",
  //   caption:
  //     "Until we have begun to go without them, we fail to realize how unnecessary many things are. We've been using them not because we needed them but because we had them.",
  //   loop: 5,
  // },
];

async function getFileLength() {
  let seconds = await getAudioDurationInSeconds(audioFile).then((duration) => {
    return duration;
  });
  return Math.ceil(seconds);
}
console.log(getFileLength());

var videoOptions = {
  fps: 25,
    loop: 1050, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: "libx264",
  size: "640x?",
  audioBitrate: "128k",
  audioChannels: 2,
  format: "mp4",
  pixelFormat: "yuv420p",
};

videoshow(images, videoOptions)
  .audio(audioFile)
  .save("video.mp4")
  .on("start", function (command) {
    console.log("ffmpeg process started:", command);
  })
  .on("error", function (err, stdout, stderr) {
    console.error("Error:", err);
    console.error("ffmpeg stderr:", stderr);
  })
  .on("end", function (output) {
    console.error("Video created in:", output);
  });
