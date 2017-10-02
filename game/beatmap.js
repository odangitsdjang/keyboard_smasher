class BeatMap {
  constructor(songLink) {
    this.songLink = songLink;
    this.beatMapLink = "";
    this.data = "";
  }

  grabData() {
    // Add more file extensions here as needed
    const extensionIndex = /(mp3|wav)$/.exec(this.songLink).index;
    this.beatMapLink= this.songLink.slice(0, extensionIndex).concat("json");
    this.data = require('./data.json');
  }

  play() {
    this.grabData();

  }
}

export default BeatMap;
