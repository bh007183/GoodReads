const fs = require("fs");
var audioconcat = require("audioconcat");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
var videoshow = require("videoshow");
// Paths to your input files
const { getAudioDurationInSeconds } = require("get-audio-duration");

class MakeVideo {

    constructor(images){

        this.images = images
        this.audioFile = "./Media/Audio/Concatinated/all.mp3"

    }
  async concatAudio() {
    var songs = fs.readdirSync("./Media/Audio/tim-able-slow-and-deliberatew");

    let filePath = songs.map(
      (v, i) => "./Media/Audio/tim-able-slow-and-deliberatew/" + v
    );

    audioconcat(filePath)
      .concat(this.audioFile)
      .on("start", function (command) {
        console.log("ffmpeg process started:", command);
      })
      .on("error", function (err, stdout, stderr) {
        console.error("Error:", err);
        console.error("ffmpeg stderr:", stderr);
      })
      .on("end", function (output) {
        console.error("Audio created in:", output);
      });
  }

  async generateVideo(){
    let seconds = await getAudioDurationInSeconds(this.audioFile).then((duration) => {
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
      
      videoshow(images, videoOptions)
        .audio(this.audioFile)
        .save("./Media/Video/video.mp4")
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
      
  }
}

module.exports = MakeVideo