import Components from '../js/components';

const beatmap1 = require('../songs/Cartoon-Immortality.json');
 // duration 235.23s

// this class still needs work to allow multiple songs
class BeatMap {
  constructor(ctx, canvas, options, songLink) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.options = options;
    this.songLink = songLink;
    this.beatMapLink = "";
    this.data = beatmap1;
  }

  // Given the bpm get an array of seconds where there is a new measure
  increments(bpm) {
    return  (1 / (bpm/60));
  }

  makeBeatMap(measure) {
    // const songLengthSeconds = this.options.songAudio.duration;
    // for some reason duration returns NaN (I guess it happens too fast)
    const songLengthSeconds = 235 - 3;
    let current = measure;
    const retArr = [];
    for (let i = 0; i < songLengthSeconds; i+=measure) {
      current-3 > 0 ? retArr.push(current-3) : "";
      current += measure;
    }
    // inplace shuffle retArr
    this.shuffle(retArr);
    const data = {beatmaps: {}};
    data.beatmaps["q"] = retArr.slice(0, retArr.length/3);
    data.beatmaps["w"] = retArr.slice(retArr.length/3, 2*retArr.length/3);
    data.beatmaps["e"] = retArr.slice(2 * retArr.length/3);
    console.log(data);
    return data;
  }

  play() {
    this.options.beatMapData = this.makeBeatMap(this.increments(173.939));
    this.options.score = 0;
  }

  shuffle(arr) {
    for (let i = arr.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
  }

  // this function doesn't work because you cannot dynamically require files in javascript..
  grabData() {

    // Add more file extensions here as needed
    const extensionIndex = /(mp3|wav)$/.exec(this.songLink).index;
    this.beatMapLink = ".".concat(this.songLink.slice(0, extensionIndex).concat("json"));
    this.data = require(this.beatMapLink);
  }
}

export default BeatMap;
