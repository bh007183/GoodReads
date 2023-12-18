require("dotenv").config();
class ElevenLabs {

    constructor(author) {
      this.author = author;
      this.file = new File(fs.readFileSync("./currentQuotes.txt"), "currentQuotes.txt")
    }
  
    

  createProject() {
      const form = new FormData();
      form.append("author", this.author);
      form.append("default_model_id", "eleven_multilingual_v2");
      form.append("default_paragraph_voice_id", "MBtA80mrlErJ8xjUHgHV");
      form.append("default_title_voice_id", "MBtA80mrlErJ8xjUHgHV");
      form.append("from_document", file);
      form.append("from_url", "null");
      form.append("name", this.author);
    
      const options = {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELLEVEN,
          // "Content-Type": "multipart/form-data",
        },
      };
    
      options.body = form;
    
      fetch("https://api.elevenlabs.io/v1/projects/add", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }
  }
  module.exports = ElevenLabs




  
  