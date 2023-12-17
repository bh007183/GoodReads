// const axios = require("axios");
// require("dotenv").config();

// class TTS {
//   constructor(quote, voiceId) {
//     this.quote = quote;
//     this.voiceId = voiceId;
//     this.historyIds = [];
//   }

//   textToSpeachGenerator() {
//     console.log(`${process.env.ELLEVEN}`);
//     const options = {
//       method: "POST",
//       headers: {
//         "xi-api-key": process.env.ELLEVEN,
//         "Content-Type": "application/json",
//       },
//       body: '{"text":"' + this.quote + '"}',
//     };
//     console.log(this.voiceId)

//     fetch(
//       "https://api.elevenlabs.io/v1/text-to-speech/" + this.voiceId,
//       options
//     )
//       .then((res) => res.json())
//       .then((res) => console.log(res))
//       .catch((err) => console.error(err));
//   }

//   getHistoryIds() {
//     const options = {
//       method: "GET",
//       headers: { "xi-api-key": process.env.ELLEVEN },
//     };

//     fetch("https://api.elevenlabs.io/v1/history", options)
//       .then((res) => res.json())
//       .then((res) => {
//         console.log(res.history)
//         let ids = res.history.map((v,i) => v.history_item_id)
//         this.historyIds = ids
//       })
//       .catch((err) => console.error(err));
//   }

//   downloadHistory(){
//     const options = {
//         method: 'POST',
//         headers: {'xi-api-key': process.env.ELLEVEN, 'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             history_item_ids: this.historyIds
//         })
//       };
      
//       fetch('https://api.elevenlabs.io/v1/history/download', options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
//   }

 
// }

// module.exports = TTS;
