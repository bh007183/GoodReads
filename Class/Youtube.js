const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

class YouTube{

    constructor(videoFile){
        this.videoFile = videoFile
        this.youtube = google.youtube('v3')

    }


// initialize the Youtube API library


// very basic example of uploading a video to youtube
async runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, './client_secret_841672384400-ios0vf9k8dd8pnuva7j3e4ud9p6lbvgp.apps.googleusercontent.com.json'),
    scopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube',
    ],
  });
  google.options({auth});

  const fileSize = fs.statSync(this.videoFile).size;
  const res = await this.youtube.videos.insert(
    {
      part: 'id,snippet,status',
      notifySubscribers: false,
      requestBody: {
        snippet: {
          title: 'Node.js YouTube Upload Test',
          description: 'Testing YouTube upload via Google APIs Node.js Client',
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: fs.createReadStream(this.videoFile),
      },
    },
    {
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0, null);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  );
  console.log('\n\n');
  console.log(res.data);
  return res.data;
}

}

module.exports = YouTube