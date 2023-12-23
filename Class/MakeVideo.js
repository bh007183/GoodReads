const fs = require("fs");
var audioconcat = require("audioconcat");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
var videoshow = require("videoshow");

const { getAudioDurationInSeconds } = require("get-audio-duration");

class MakeVideo {
  constructor(images) {
    this.images = images;
    this.audioFile = "./Media/Audio/Concatinated/all.mp3";
  }

  async generateVideo() {
   
    let seconds = await getAudioDurationInSeconds(
      "./Media/Audio/Concatinated/all.mp3"
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
    videoshow([this.images], videoOptions)
      .audio("./Media/Audio/Concatinated/all.mp3")
      .save("./Media/Video/video.mp4")
      .on("start", function (command) {
        console.log("ffmpeg process started:");
      })
      .on("error", function (err, stdout, stderr) {
        console.log("Error:");
        console.log("ffmpeg stderr:");
      })
      .on("end", function (output) {
        console.log("Video created in:");
      });
  }

  concatAudio() {
    var songs = fs.readdirSync("./Media/Audio/tim-able-slow-and-deliberatew");

    let filePath = songs.map(
      (v, i) => "./Media/Audio/tim-able-slow-and-deliberatew/" + v
    );

    
    let audioFile = "./Media/Audio/Concatinated/all.mp3";
    console.log(filePath);
    audioconcat(filePath)
      .concat(audioFile)
      .on("start", function (command) {
        console.log("ffmpeg process started:");
      })
      .on("error", function (err, stdout, stderr) {
        console.error("Error:");
        console.error("ffmpeg stderr:");
      })
      .on("end", function (output) {
        console.error("Audio created in:");
       
        
      });
  }
}

module.exports = MakeVideo;
