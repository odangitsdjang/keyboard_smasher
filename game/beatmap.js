import Components from '../js/components';
import OnClickUtil from '../js/onclicks';
const beatmap1 = require('../songs/Cartoon-Immortality.json');
let OFFSET_TO_HIT_USER_AREA = 1;
// this class still needs work to allow multiple songs
class BeatMap {
  constructor(options, ctx, songLink) {
    this.options = options;
    this.ctx = ctx;
    // check the start of the songname the get the right beatmap
    // careful changing the folder name, because then this will break!!!
    if (songLink[8] === "C") {
      this.song = 2;
    } else if (songLink[8] === "S") {
      this.song = 3;
    } else if (songLink[8] === "B") {
      this.song = 1;
    }
  }
  // Given the bpm get an array of seconds where there is a new measure
  increments(bpm, speed = 1) {
    return (1 / (bpm / 60)) / speed;
  }

  // chorus section = [[begin, end], [begin, end]]
  makeBeatMap(tracknum) {
    this.songData(tracknum);
    let current = this.measure;
    const retArr = [];
    let i = 0;
    while (i < this.songLengthSeconds) {
      // subtract 2 : moving at 9 pixels, we want to achieve 540 pixels down
      // and at 60 hz, we can move 540 pixels down per second, so
      // that's why we have a 1 second offset

      // break
      for (let j = 0; j < this.break.length; j++) {
        if (this.break[j][0] - OFFSET_TO_HIT_USER_AREA <= i && i <= this.break[j][1] - OFFSET_TO_HIT_USER_AREA) {
          while (i <= this.break[j][1] - OFFSET_TO_HIT_USER_AREA) {
            current += this.measure;
            i += this.measure;

          }
          continue;
        }
      }

      // hook
      for (let j = 0; j < this.chorus.length; j++) {
        if (this.chorus[j][0] - OFFSET_TO_HIT_USER_AREA <= i && i <= this.chorus[j][1] - OFFSET_TO_HIT_USER_AREA) {
          retArr.push(current - OFFSET_TO_HIT_USER_AREA);
          current += this.measure / 2;
          i += this.measure / 2;
          continue;
        }
      }

      if (current - 2 > 0)
        retArr.push(current - OFFSET_TO_HIT_USER_AREA);

      current += this.measure;
      i += this.measure;
    }
    // inplace shuffle retArr
    this.shuffle(retArr);
    const data = { beatmaps: {} };
    data.beatmaps["q"] = retArr.slice(0, retArr.length / 3).sort((a, b) => a - b);
    data.beatmaps["w"] = retArr.slice(retArr.length / 3, 2 * retArr.length / 3).sort((a, b) => a - b);
    data.beatmaps["e"] = retArr.slice(2 * retArr.length / 3).sort((a, b) => a - b);
    console.log(data);
    return data;
  }

  play() {
    // OnClickUtil.resetSongPoints(this.options, this.ctx);
    this.options.beatMapData = this.makeBeatMap(this.song);
  }

  shuffle(arr) {
    for (let i = arr.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
  }

  songData(tracknum) {
    if (tracknum === 1) {
      // const songLengthSeconds = this.options.songAudio.duration;
      // for some reason duration returns NaN (I guess it happens too fast)
      this.bpm = 194;
      this.songLengthSeconds = 201 - 1;  // subtract 1 to end beatmap 3 seconds earlier
      this.chorus = [[20.79, 21.5], [68, 90], [145, 167]];  // find the chorus manually from mp3
      this.options.speed = 9;
      this.break = [[0, 11.7]];
      this.options.songName = "Run Me Dry";
      this.measure = this.increments(this.bpm, 0.5);
    } else if (tracknum === 2) {
      this.songLengthSeconds = 232 - 1;  // subtract 1 to end beatmap 3 seconds earlier
      this.chorus = [[68, 90], [145, 167], [189, 195]];  // find the chorus manually from mp3
      this.bpm = 173.939;
      this.break = [[5, 10]];
      this.options.speed = 9;
      this.options.songName = "Immortality";
      this.measure = this.increments(this.bpm);
    } else if (tracknum === 3) {
      this.songLengthSeconds = 211 - 1;
      // this.chorus = [[68,90], [145, 167]];
      this.bpm = 156;
      this.options.songName = "Limitless";
      this.chorus = [];
      this.break = [[5, 10]];
      this.options.speed = 18;
      this.measure = this.increments(this.bpm, 2);

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
