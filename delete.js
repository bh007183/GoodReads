const fs = require('fs');
  
var quoteFolder = './Media/Audio/tim-able-slow-and-deliberatew/';
   
fs.readdir(quoteFolder, (err, files) => {
  if (err) throw err;
  
  for (const file of files) {
      console.log(file + ' : File Deleted Successfully.');
      fs.unlinkSync(quoteFolder+file);
  }
  
});

  
var allFolder = './Media/Audio/Concatinated/';
   
fs.readdir(allFolder, (err, files) => {
  if (err) throw err;
  
  for (const file of files) {
      console.log(file + ' : File Deleted Successfully.');
      fs.unlinkSync(allFolder+file);
  }
  
});

var videoFolder = './Media/Video/';
   
fs.readdir(videoFolder, (err, files) => {
  if (err) throw err;
  
  for (const file of files) {
      console.log(file + ' : File Deleted Successfully.');
      fs.unlinkSync(videoFolder+file);
  }
  
});