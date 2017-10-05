import Components from '../js/components';
import OnClickUtil from '../js/onclicks';
const beatmap1 = require('../songs/Cartoon-Immortality.json');

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
      // subtract 2 : moving at 6 pixels, we want to achieve 740 pixels down
      // and at 60 hz, we can move 360 pixels down per second, so 2 seconds is
      // pretty close: 720 ~ 740

      // break
      for (let j = 0; j < this.break.length; j++) {
        if  (this.break[j][0]-2 <= i && i <= this.break[j][1]-2) {
          while (i <= this.break[j][1] - 2) {
            current += this.measure;
            i += this.measure;

          }
          continue;
        }
      }

      // chorus
      for (let j = 0; j < this.chorus.length; j++) {
        if (this.chorus[j][0]-2 <= i && i <= this.chorus[j][1]-2) {
          retArr.push(current -2);
          current += this.measure/2;
          i += this.measure/2;
          continue;
        }
      }

      if (current-2 > 0)
        retArr.push(current-2);

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
      this.songLengthSeconds = 230 - 2;  // subtract 2 to end beatmap 4 seconds earlier
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
