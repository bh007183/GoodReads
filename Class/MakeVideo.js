const fs = require("fs");
var audioconcat = require("audioconcat");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
var videoshow = require("videoshow");
// Paths to your input files
const { getAudioDurationInSeconds } = require("get-audio-duration");

class MakeVideo {
  constructor(images) {
    this.images = images;
    this.audioFile = "./Media/Audio/Concatinated/all.mp3";
  }

  async generateVideo() {
   
    let seconds = await getAudioDurationInSeconds(
      fs.readFileSync("./Media/Audio/Concatinated/all.mp3")
    ).then((duration) => {
      return Math.ceil(duration);
    });

    var videoOptions = {
      fps: 25,
      loop: seconds, // seconds
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
    console.log(seconds)
    videoshow(images, videoOptions)
      .audio("./Media/Audio/Concatinated/all.mp3")
      .save("./Media/Video/video.mp4")
      .on("start", function (command) {
        console.log("ffmpeg process started:");
      })
      .on("error", function (err, stdout, stderr) {
        console.error("Error:");
        console.error("ffmpeg stderr:");
      })
      .on("end", function (output) {
        console.error("Video created in:");
      });
  }

  concatAudio() {
    var songs = fs.readdirSync("./Media/Audio/tim-able-slow-and-deliberatew");

    let filePath = songs.map(
      (v, i) => "./Media/Audio/tim-able-slow-and-deliberatew/" + v
    );

    let generateVideo = this.generateVideo;
    let audioFile = "./Media/Audio/Concatinated/all.mp3";
    console.log(filePath);
    audioconcat(filePath)
      .concat(audioFile)
      .on("start", function (command) {
        console.log("ffmpeg process started:", command);
      })
      .on("error", function (err, stdout, stderr) {
        console.error("Error:", err);
        console.error("ffmpeg stderr:", stderr);
      })
      .on("end", function (output) {
        console.error("Audio created in:", output);
        generateVideo();
      });
  }
}

module.exports = MakeVideo;
