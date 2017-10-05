/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entry__ = __webpack_require__(2);

const COMPONENT_RADIUS = 30;
const COMPONENT_COUNT = 3;
const GAME_COMPONENT_SPEED = 6;
const HEIGHT_FROM_BOTTOM = 60;
const QCOLOR = "#AA00FF";
const WCOLOR = "#00AAFF";
const ECOLOR = "#FFAA00";
// health.style.fontSize = "20px";
// .style.width = "10px";
// Make this class scalable so that if I want to change it later
// then I can just change the numbers up at the top
class Components {

  // Use get so that you can use the constant without parenthesis
  // i.e. Components.componentRadius
  static get componentRadius() {
    return COMPONENT_RADIUS;
  }
  // If 3 components, then divide 4 sections to center it evenly in the center
  static drawUserComponents(ctx, canvas, options) {
    for (let i = 0; i < COMPONENT_COUNT; i++) {
      this.drawBeatComponent(ctx, canvas, i, options);
    }
  }


  static addGameComponents(ctx, canvas, options) {
    if (options.songAudio.currentTime) {
      if (options.songAudio.currentTime > 3 && options.songAudio.currentTime < 5) {
        options.directions.style.color = "rgb(150,150,150)";
      } else if (options.songAudio.currentTime > 5) {
        options.directions.style.color = "rgb(50,50,50)";
      }
      Object.keys(options.beatMapData.beatmaps).forEach(key => {
        options.beatMapData.beatmaps[key].forEach( secondVal => {
          if (secondVal >= options.songAudio.currentTime &&
              secondVal < options.songAudio.currentTime+__WEBPACK_IMPORTED_MODULE_0__entry__["INTERVAL_MILLISECOND"]/1000 ) {
                options.activeComponents[key].push(0);
                // optimization because when we create beatmap we sorted it
                // so we are guaranteed to only have one beatmap per key
                return;
              }
        });
      });
    }
  }
  // options.activeComponents = {
  // q: [position]
  // w: [position, position],
  // e: [position, position, position]
  // }

  // method assumes that array will be kept in reversed order (which it should)
  // because it adds on like a queue
  static removeGameComponents(ctx, canvas, options, health) {
    Object.keys(options.activeComponents).forEach(key=> {
      // makes sure to only use the last game element in each column
      const lastComponent = options.activeComponents[key][0];
      if ((this.amazing(lastComponent, key, canvas, options, health)) ||
          (this.great(lastComponent, key, canvas, options, health)) ||
          (this.good(lastComponent, key, canvas, options, health)) ||
          (this.bad(lastComponent, key, canvas, options, health)) ||
          (this.miss(lastComponent, key, canvas, options, health))) {
        // delete the element from active components
        options.activeComponents[key].shift();
      }
    });
  }

  static renderGameComponents(ctx, canvas, options, health) {
    this.addGameComponents(ctx, canvas, options);
    this.removeGameComponents(ctx, canvas, options, health);
    Object.keys(options.activeComponents).forEach(key=> {
      options.activeComponents[key].forEach((pos,i)=> {

        options.activeComponents[key][i] += GAME_COMPONENT_SPEED;
        let loc = 0;
        if (key === "q") {
          ctx.fillStyle = QCOLOR;
          loc = 0;
        }
        else if (key === "w") {
          ctx.fillStyle = WCOLOR;
          loc = 1;
        }
        else if (key === "e") {
          ctx.fillStyle = ECOLOR;
          loc = 2;
        }

        ctx.beginPath();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        ctx.arc( canvasWidth/(COMPONENT_COUNT+1) +
        (canvasWidth/(COMPONENT_COUNT+1) * loc), pos, COMPONENT_RADIUS,
          0, Math.PI*2, true);
        ctx.fill();
        ctx.closePath();
      });
    });
  }

  static drawBeatComponent(ctx, canvas, location, options) {
    ctx.beginPath();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.arc( canvasWidth/(COMPONENT_COUNT+1) +
    (canvasWidth/(COMPONENT_COUNT+1) * location), canvasHeight-HEIGHT_FROM_BOTTOM, COMPONENT_RADIUS,
      0, Math.PI*2, true);
    ctx.fillStyle = "#000000";
    this.changeColor(ctx, location, options);
    ctx.fill();
    ctx.closePath();
  }

  static changeColor(ctx, i, options) {
    if (options.qHeld && i === 0) {
      ctx.fillStyle = QCOLOR;
    } else if (options.wHeld && i === 1) {
      ctx.fillStyle = WCOLOR;
    } else if (options.eHeld && i === 2) {
      ctx.fillStyle = ECOLOR;
    }
  }

  static drawHitResponse(ctx, canvas, options) {
    if (options.hitResponse.value) {
      if (options.hitResponse.frames <= 45) {
        ctx.font = 50 - options.hitResponse.frames + "px Arial";
      } else if (options.hitResponse.frames > 45) {
        options.hitResponse.value = 0;
      }
      options.hitResponse.frames++;
      ctx.fillStyle = "#000000";
      ctx.fillText(options.hitResponse.value, canvas.width/2 - 100, canvas.height/2-20);
    }
  }

  static drawScore(ctx, canvas, options) {
    // const gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    // gradient.addColorStop("0.8","black");
    // gradient.addColorStop("0.9","blue");
    // gradient.addColorStop("1.0","magenta");
    // ctx.fillStyle = gradient;
    ctx.font = "22px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: "+options.score, canvas.width-180, 40);
  }

  static drawStreak(ctx, canvas, options) {
    ctx.font = "22px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Streak: "+options.streak.value, canvas.width-180, 80);
  }

  static miss(pos, key, canvas, options, health) {
    if ( pos > canvas.height ) {
      options.hitResponse.value = "miss";
      options.hitResponse.frames = 0;
      options.hitResponse.count.Miss++;
      let healthVal = parseInt(window.getComputedStyle(health).width);
      healthVal -= 50;
      healthVal = healthVal < 0 ? 0 : healthVal ;
      if (healthVal <= 0) options.gameOver = 1;
      health.style.width = healthVal+'px';
      if (options.streak.value > options.streak.highest)
        options.streak.highest = options.streak.value;
      options.streak.value = 0;
      if (options.score >= 10) options.score -= 10;
      return true;
    }
    return false;
  }

  // only remove bad if it's past the user space
  static bad(pos, key, canvas, options, health) {
    let retVal = 0;
    if (key === "q" && options.qUp.value) {
      if (pos < canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3))
        retVal = 1;
      else if (pos > canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = 2;
    } else if (key === "w" && options.wUp.value) {
      if (pos < canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3))
        retVal = 1;
      else if (pos > canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = 2;
    } else if (key === "e" && options.eUp.value) {
      if (pos < canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3))
        retVal = 1;
      else if (pos > canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = 2;
    }
    if (retVal) {
      options.hitResponse.value = "Bad";
      options.hitResponse.frames = 0;
      options.hitResponse.count.Bad++;
      let healthVal = parseInt(window.getComputedStyle(health).width);
      healthVal -= 30;
      healthVal = healthVal < 0 ? 0 : healthVal ;
      if (healthVal <= 0) options.gameOver = 1;
      health.style.width = healthVal+'px';
      if (options.streak.value > options.streak.highest)
        options.streak.highest = options.streak.value;
      options.streak.value = 0;
      if (options.score >= 5) options.score -= 5;
    }
    if (retVal === 1) retVal = 0;
    return retVal;

  }

  static good(pos, key, canvas, options, health) {
    let retVal = false;
    if (key === "q" && options.qUp.value) {
      // The bottom part of the component is touching the top part of user area
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = true;
    } else if (key === "w" && options.wUp.value) {
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = true;
    } else if (key === "e" && options.eUp.value) {
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = true;
    }
    if (retVal) {
      options.hitResponse.value = "Good";
      options.hitResponse.frames = 0;
      options.hitResponse.count.Good++;
      let healthVal = parseInt(window.getComputedStyle(health).width);
      healthVal += 10;
      healthVal = healthVal >= 500 ? 500 : healthVal;
      health.style.width = healthVal+'px';
      options.streak.value++;
      if (options.streak.value > options.streak.highest)
        options.streak.highest = options.streak.value;
      options.score += 20;
    }
    return retVal;
  }

  static great(pos, key, canvas, options, health) {
    let retVal = false;
    if (key === "q" && options.qUp.value) {
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*2)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM )
        retVal = true;
    } else if (key === "w" && options.wUp.value) {
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*2)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM )
        retVal = true;
    } else if (key === "e" && options.eUp.value) {
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*2)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM )
        retVal = true;
    }
    if (retVal) {
      options.hitResponse.value = "Great!";
      options.hitResponse.frames = 0;
      options.hitResponse.count.Great++;
      let healthVal = parseInt(window.getComputedStyle(health).width);
      healthVal += 15;
      healthVal = healthVal >= 500 ? 500 : healthVal;
      health.style.width = healthVal+'px';
      options.streak.value++;
      if (options.streak.value > options.streak.highest)
        options.streak.highest = options.streak.value;
      options.score += 30;
    }
    return retVal;
  }

  static amazing(pos, key, canvas, options, health) {
    let retVal = false;
    if (key === "q" && options.qUp.value) {
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*1.3)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS*(0.666) )
        retVal = true;
    } else if (key === "w" && options.wUp.value) {
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*1.3)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS*(0.666) )
        retVal = true;
    } else if (key === "e" && options.eUp.value) {
      if (pos > canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*1.3)
          && pos < canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS*(0.666) )
        retVal = true;
    }
    if (retVal) {
      options.hitResponse.value = "Amazing!!";
      options.hitResponse.frames = 0;
      options.hitResponse.count.Amazing++;
      let healthVal = parseInt(window.getComputedStyle(health).width);
      healthVal += 20;
      healthVal = healthVal >= 500 ? 500 : healthVal;
      health.style.width = healthVal+'px';
      options.streak.value++;
      if (options.streak.value > options.streak.highest)
        options.streak.highest = options.streak.value;
      options.score += 50;
    }
    return retVal;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Components);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_beatmap__ = __webpack_require__(4);

class OnClickUtil {

  static resetSong(options, ctx) {
    options.score = 0;
    options.streak = {value: 0, highest: 0 };
    options.activeComponents = {
      q: [],
      w: [],
      e: []
    };
    options.hitResponse = { value: 0, frames: 0, count: {Amazing: 0, Great: 0, Good: 0, Bad: 0, Miss: 0 } };
    options.streakResponse = { value: 0, frames: 0, highest: 0 };
    options.finishedGameFrame = 0;
    options.gameOver = 0;
    let health = document.querySelector(".bar");
    health.style.width = "500px";
  }
  static songLinks(ctx, canvas, options) {

    const stopSong = (opt, context) => {
      opt.songAudio.pause();
      opt.songAudio.currentTime = 0;
      this.resetSong(opt, context);
    };

    const songs = document.getElementsByTagName('a');
    for(let i = 0; i < songs.length; i++) {
      songs[i].onclick = () => {
        if (songs[i].getAttribute('data-link')) {
          const songLink = songs[i].getAttribute('data-link');
          if (options.songAudio)
            stopSong(options, ctx);
          options.songAudio = new Audio(songLink);
          options.songAudio.play();
          new __WEBPACK_IMPORTED_MODULE_0__game_beatmap__["a" /* default */](options, ctx, songLink).play();
        } else {
          // should be replaced
          stopSong(options);
        }
      };
    }
  }

  // This method was used to begin to tackle the problem
  // written in problems.md #1-2
  static handleKeyFrames(options) {
    const FRAMES_BEFORE_SWITCHING = 1;
    if (options.qUp.value) {
      if (options.qUp.frames === FRAMES_BEFORE_SWITCHING) {
        options.qUp.frames = 0;
        options.qUp.value = false;
      } else {
        options.qUp.frames++;
      }
    }
    if (options.wUp.value) {
      if (options.wUp.frames === FRAMES_BEFORE_SWITCHING) {
        options.wUp.frames = 0;
        options.wUp.value = false;
      } else {
        options.wUp.frames++;
      }
    }
    if (options.eUp.value) {
      if (options.eUp.frames === FRAMES_BEFORE_SWITCHING) {
        options.eUp.frames = 0;
        options.eUp.value = false;
      } else {
        options.eUp.frames++;
      }
    }
  }

  static keyPressedLinks(options) {
    function keyDownHandler(e) {
      if (e.keyCode === 81) {
        options.qHeld = true;
        options.qUp.value = true;
        options.qUp.frames = 0;
      }
      else if (e.keyCode === 87) {
        options.wHeld = true;
        options.wUp.value = true;
        options.wUp.frames = 0;
      }
      else if (e.keyCode === 69) {
        options.eHeld = true;
        options.eUp.value = true;
        options.eUp.frames = 0;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode === 81) {
        options.qHeld = false;
      }
      else if (e.keyCode === 87) {
        options.wHeld = false;
      }
      else if (e.keyCode === 69) {
        options.eHeld = false;
      }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }

  static addAllLinks(ctx, canvas, options) {
    OnClickUtil.songLinks(ctx, canvas, options);
    OnClickUtil.keyPressedLinks(options);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (OnClickUtil);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__onclicks__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_finished__ = __webpack_require__(7);




// import { }  from '../game/algorithm';

// export const INTERVAL_MILLISECOND = 6.944444;   144hz
// 60hz
const INTERVAL_MILLISECOND = 16.666666;
/* harmony export (immutable) */ __webpack_exports__["INTERVAL_MILLISECOND"] = INTERVAL_MILLISECOND;


// currentPlayTime
document.addEventListener('DOMContentLoaded', () => {
    // options.activeComponents = {
    // q: [position]
    // w: [position, position],
    // e: [position, position, position]
    // }
    const directions = document.getElementById("direction");
    const options = {
      songAudio: 0,
      beatMapData: 0,
      activeComponents: {
        q: [],
        w: [],
        e: []
      },
      score: 0,
      hitResponse: { value: 0, frames: 0, count: {Amazing: 0, Great: 0, Good: 0, Bad: 0, Miss: 0 }},
      streak: { value: 0, highest: 0 },
      finishedGameFrame: 0,
      gameOver: 0,
      userAreaResponse: { frames: 0 },
      qHeld: false,
      qUp: {value: false, frames:0 },
      wHeld: false,
      wUp: {value: false, frames:0 },
      eHeld: false,
      eUp: {value: false, frames:0 },
      directions: directions
    };
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    __WEBPACK_IMPORTED_MODULE_2__onclicks__["a" /* default */].addAllLinks(ctx, canvas, options);
    const g = new __WEBPACK_IMPORTED_MODULE_3__game_finished__["a" /* default */](ctx, canvas, options);
    // const drawing = setInterval((e) => {
    //   OnClickUtil.handleKeyFrames(options);
    //   Canvas.draw(ctx, canvas, options);
    //
    // }, INTERVAL_MILLISECOND);

    requestAnimationFrame(e=>{
      __WEBPACK_IMPORTED_MODULE_1__canvas__["a" /* default */].draw(ctx, canvas, options, g);
    });
    // clear interval  when game over?
});
// console.log(options.songAudio.currentTime);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__onclicks__ = __webpack_require__(1);


class Canvas {
  static drawHealthBar() {

  }

  static draw(ctx, canvas, options, g) {
    let health = document.querySelector(".bar");
    if (!options.gameOver) {
      __WEBPACK_IMPORTED_MODULE_1__onclicks__["a" /* default */].handleKeyFrames(options);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */].drawScore(ctx, canvas, options);
      __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */].drawStreak(ctx, canvas, options);
      __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */].drawHitResponse(ctx, canvas, options);
      __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */].renderGameComponents(ctx, canvas, options, health);
      __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */].drawUserComponents(ctx, canvas, options);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    g.renderGameFinished();
    requestAnimationFrame(e=>{
      Canvas.draw(ctx, canvas, options, g);
    });

  }



}


/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_components__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_onclicks__ = __webpack_require__(1);


const beatmap1 = __webpack_require__(5);

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
    // console.log(data);
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
      this.songLengthSeconds = 235 - 4;  // subtract 4 to end beatmap 4 seconds earlier
      this.chorus = [[68,90], [145, 167]];
      this.bpm = 173.939;
      this.break = [];
    }
    this.measure = this.increments(this.bpm);
  }

  // this function doesn't work because you cannot dynamically require files in javascript..
  grabData() {

    // Add more file extensions here as needed
    const extensionIndex = /(mp3|wav)$/.exec(this.songLink).index;
    this.beatMapLink = ".".concat(this.songLink.slice(0, extensionIndex).concat("json"));
    this.data = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BeatMap);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"bpm":"173.939","beatmaps":{"q":[1,1.1,1.3,2.2,2.371439,3.3,3.5,3.7,3.9,4,4.1,4.4,5.5,6.6],"w":[1.25,1.35,1.45,1.55,1.65,2.3772],"e":[0.10453664790530048,0.4494851643392228,0.7944336807731451,1.139382197207067,1.484330713640989,1.8292792300749108,2.1742277465088327,2.5191762629427545,2.8641247793766764,3.2090732958105983,3.55402181224452,3.898970328678442,4.243918845112364,4.588867361546286,4.933815877980208,5.2787643944141305,5.623712910848052,5.968661427281974,6.313609943715896,6.658558460149818,7.00350697658374,7.348455493017662,7.693404009451584,8.038352525885506,8.383301042319427,8.72824955875335,9.073198075187271,9.418146591621193,9.763095108055115,10.108043624489037,10.452992140922959,10.79794065735688,11.142889173790802,11.487837690224724,11.832786206658646,12.177734723092568,12.52268323952649,12.867631755960412,13.212580272394334]}}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 6;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameFinished {
  constructor(ctx, canvas, options) {
    this.options = options;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  gameFinished(options) {
    if (options.songAudio.currentTime && options.songAudio.duration) {
      if (options.songAudio.currentTime >= options.songAudio.duration - 2)
        return true;
    }
    return false;
  }

  renderGameFinished() {
    if (this.gameFinished(this.options) || this.options.gameOver) {
      const keys = Object.keys(this.options.hitResponse.count);
      if (this.options.finishedGameFrame < 30) {
        this.ctx.font = `${this.options.finishedGameFrame}px Arial`;
      } else {
          this.ctx.font = `30px Arial`;
      }
      this.ctx.fillStyle = "#000000";
      const heightInc = 45;
      let height =  (2*this.canvas.height/10);
      const successOrGameOver = this.options.gameOver ? "Game Over!" : "Success!";
      this.ctx.fillText(successOrGameOver,
        this.canvas.width/2 - 100, height+=heightInc);
      this.ctx.fillText(`Score: ${this.options.score}`,
        this.canvas.width/2 - 100, height+=heightInc);
      this.ctx.fillText(`Longest Streak: ${this.options.streak.highest}`,
        this.canvas.width/2 - 100, height+=heightInc);

      keys.forEach(key =>  {
        this.ctx.fillText(`${key}: ${this.options.hitResponse.count[key]}`,
           this.canvas.width/2 - 100, height+=heightInc);
      });

      this.options.finishedGameFrame++;
    }
  }


}
/* harmony default export */ __webpack_exports__["a"] = (GameFinished);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map