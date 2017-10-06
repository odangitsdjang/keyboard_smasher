import Components from '../js/components';
import OnClickUtil from '../js/onclicks';
const beatmap1 = require('../songs/Cartoon-Immortality.json');
const OFFSET_TO_HIT_USER_AREA = 1;
// this class still needs work to allow multiple songs
class BeatMap {
  constructor(options, ctx) {
    this.options = options;
    this.ctx = ctx;
  }
  // Given the bpm get an array of seconds where there is a new measure
  increments(bpm) {
    return  (1 / (bpm/60));
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
        if  (this.break[j][0]-OFFSET_TO_HIT_USER_AREA <= i && i <= this.break[j][1]-OFFSET_TO_HIT_USER_AREA) {
          while (i <= this.break[j][1] - OFFSET_TO_HIT_USER_AREA) {
            current += this.measure;
            i += this.measure;

          }
          continue;
        }
      }

      // chorus
      for (let j = 0; j < this.chorus.length; j++) {
        if (this.chorus[j][0]-OFFSET_TO_HIT_USER_AREA <= i && i <= this.chorus[j][1]-OFFSET_TO_HIT_USER_AREA) {
          retArr.push(current -OFFSET_TO_HIT_USER_AREA);
          current += this.measure/2;
          i += this.measure/2;
          continue;
        }
      }

      if (current-2 > 0)
        retArr.push(current-OFFSET_TO_HIT_USER_AREA);

      current += this.measure;
      i+= this.measure;
    }
    // inplace shuffle retArr
    this.shuffle(retArr);
    const data = {beatmaps: {}};
    data.beatmaps["q"] = retArr.slice(0, retArr.length/3).sort((a,b)=>a-b);
    data.beatmaps["w"] = retArr.slice(retArr.length/3, 2*retArr.length/3).sort((a,b)=>a-b);
    data.beatmaps["e"] = retArr.slice(2 * retArr.length/3).sort((a,b)=>a-b);
    console.log(data);
    return data;
  }

  play() {
    // OnClickUtil.resetSongPoints(this.options, this.ctx);
    this.options.beatMapData = this.makeBeatMap(1);
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
      this.songLengthSeconds = 230 - 1;  // subtract 2 to end beatmap 4 seconds earlier
      this.chorus = [[68,90], [145, 167]];  // find the chorus manually from mp3
      this.bpm = 173.939;
      this.break = [[5,10]];
    }
    this.measure = this.increments(this.bpm);
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
