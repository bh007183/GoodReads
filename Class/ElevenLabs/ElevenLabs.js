require("dotenv").config();
class ElevenLabs {
  constructor(author) {
    this.author = author
  }

  createProject() {
    const form = new FormData();
    form.append("author", this.author);
    form.append("default_paragraph_voice_id", "MBtA80mrlErJ8xjUHgHV");
    form.append("default_title_voice_id", "MBtA80mrlErJ8xjUHgHV");
    form.append("from_document", "./currentQuotes.txt");
    form.append("from_url", "null");
    form.append("name", this.author);
    form.append(
      "pronunciation_dictionary_locators",
      '[\n  "./Dictionaries/index.pls"\n]'
    );

    const options = {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELLEVEN,
        "Content-Type": "multipart/form-data",
      },
    };

    options.body = form;

    fetch("https://api.elevenlabs.io/v1/projects/add", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
}

module.exports = {ElevenLabs}
