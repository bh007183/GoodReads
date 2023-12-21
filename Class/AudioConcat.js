var audioconcat = require("audioconcat");
class AudioConcat {
    //Array of audio files strings
  constructor(audioFiles) {
    this.audioFiles = audioFiles;
  }

  ConcatAudio() {
    audioconcat(this.audioFiles)
      .concat("all.mp3")
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
}
