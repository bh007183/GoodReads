require("dotenv").config();
const axios = require("axios")
//Genny
// const sdk = require('api')('@genny-api/v1.0#eqij1clm8s4s2v');

// sdk.auth('');
// sdk.syncTts({text: "We suffer more often in imagination than in reality",speaker: "6380894dd72424f0cfbdbe97", speed: 1})
//   .then(({ data }) => console.log(data))
//   .catch(err => console.error(err));

//   sdk.auth('');
// sdk.asyncRetrieveJob({jobId: '657bc9256053e2f3caa474a5'})
//   .then(({ data }) => console.log(data.data[0].urls))
//   .catch(err => console.error(err));

//Bryan Lee JR 6380894dd72424f0cfbdbe97 or 649287ed1620a0002382b3b5

////////////////////////////////////////////

// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "xi-api-key": process.env.ELLEVEN,
//   },
//   body: {"text":"Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts"}
// };

//  axios({
//     url: "https://api.elevenlabs.io/v1/text-to-speech/Ivon1LSWWnV83sKHgIJE",
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "xi-api-key": process.env.ELLEVEN,
//       },
//     data: {"text":"Born and raised in the charming south, I can add a touch of sweet southern hospitality to your audiobooks and podcasts"}
//  }).then((response) => console.log(response.data))
//  .catch((err) => console.error(err.data));
const options = {method: 'GET', "xi-api-key": process.env.ELLEVEN};

axios({
    url: 'https://api.elevenlabs.io/v1/history',
    method: "GET",
    header:{
        "xi-api-key": process.env.ELLEVEN
    }
}).then(response => console.log(response))
.catch(err => console.error(err));

// fetch('https://api.elevenlabs.io/v1/history', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));


