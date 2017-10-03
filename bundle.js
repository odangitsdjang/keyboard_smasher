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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entry__ = __webpack_require__(1);

const COMPONENT_RADIUS = 30;
const COMPONENT_COUNT = 3;
const GAME_COMPONENT_SPEED = 4;
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
      this.drawBeatComponent(ctx, canvas, i, options, 1);
    }
  }

  static addGameComponents(ctx, canvas, options) {
    if (options.songAudio.currentTime) {
      // console.log(options.songAudio.currentTime);
      Object.keys(options.beatMapData.beatmaps).forEach(key => {
        options.beatMapData.beatmaps[key].forEach( secondVal => {
          if (secondVal >= options.songAudio.currentTime &&
              secondVal < options.songAudio.currentTime+__WEBPACK_IMPORTED_MODULE_0__entry__["INTERVAL_MILLISECOND"]/1000 )
            options.activeComponents[key].push(0);
        });
      });
    }
  }
  // options.activeComponents = {
  // q: [position]
  // w: [position, position],
  // e: [position, position, position]
  // }
  static removeGameComponents(ctx, canvas, options) {
    Object.keys(options.activeComponents).forEach(key=> {
      options.activeComponents[key].forEach((pos,i)=> {
        // change after adding score logic/physics
        if (options.activeComponents[key][i] > canvas.height ||
            (options.qPressed && key === "q") ||
            (options.wPressed && key === "w") ||
            (options.ePressed && key === "e"))   {
          // delete the element from active components
          options.activeComponents[key].splice(i,1);
        }
      });
    });
  }

  static renderGameComponents(ctx, canvas, options) {
    this.addGameComponents(ctx, canvas, options);
    this.removeGameComponents(ctx, canvas, options);
    Object.keys(options.activeComponents).forEach(key=> {
      options.activeComponents[key].forEach((pos,i)=> {

        options.activeComponents[key][i] += GAME_COMPONENT_SPEED;
        let loc = 0;
        if (key === "q") {
          ctx.fillStyle = "#AA00FF";
          loc = 0;
        }
        else if (key === "w") {
          ctx.fillStyle = "#00AAFF";
          loc = 1;
        }
        else if (key === "e") {
          ctx.fillStyle = "#FFAA00";
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

  // area === 1 specifies user area, 2 specifies game component
  static drawBeatComponent(ctx, canvas, location, options, area) {
    ctx.beginPath();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.arc( canvasWidth/(COMPONENT_COUNT+1) +
    (canvasWidth/(COMPONENT_COUNT+1) * location), canvasHeight-60, COMPONENT_RADIUS,
      0, Math.PI*2, true);
    ctx.fillStyle = "#000000";
    this.changeColor(ctx, location, options);
    ctx.fill();
    ctx.closePath();
  }

  static changeColor(ctx, i, options) {
    if (options.qPressed && i === 0) {
      ctx.fillStyle = "#AA00FF";
    } else if (options.wPressed && i === 1) {
      ctx.fillStyle = "#00AAFF";
    } else if (options.ePressed && i === 2) {
      ctx.fillStyle = "#FFAA00";
    }
  }



}

/* harmony default export */ __webpack_exports__["a"] = (Components);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__onclicks__ = __webpack_require__(3);



// this is for 144 hertz
const INTERVAL_MILLISECOND = 6.944444;
/* harmony export (immutable) */ __webpack_exports__["INTERVAL_MILLISECOND"] = INTERVAL_MILLISECOND;

// currentPlayTime
document.addEventListener('DOMContentLoaded', () => {
    // options.activeComponents = {
    // q: [position]
    // w: [position, position],
    // e: [position, position, position]
    // }
    const options = {
      songAudio: 0,
      beatMapData: 0,
      activeComponents: {
        q: [],
        w: [],
        e: []
      },
      qPressed: false,
      wPressed: false,
      ePressed: false
    };
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    __WEBPACK_IMPORTED_MODULE_2__onclicks__["a" /* default */].addAllLinks(ctx, canvas, options);

    const drawing = setInterval((e) => {
      options.songMilliseconds += INTERVAL_MILLISECOND;
      __WEBPACK_IMPORTED_MODULE_1__canvas__["a" /* default */].draw(ctx, canvas, options);
    }, INTERVAL_MILLISECOND);
    // clear interval  when game over?
});
// console.log(options.songAudio.currentTime);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(0);


class Canvas {
  static drawHealthBar() {

  }

  static draw(ctx, canvas, options) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */].renderGameComponents(ctx, canvas, options);
    __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */].drawUserComponents(ctx, canvas, options);
  }



}


/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_beatmap__ = __webpack_require__(4);

class OnClickUtil {


  static songLinks(ctx, canvas, options) {
    const stopSong = (opt) => {
      opt.songAudio.pause();
      opt.songMilliseconds = 0;
      opt.songAudio.currentTime = 0;
    };

    const songs = document.getElementsByTagName('a');
    for(let i = 0; i < songs.length; i++) {
      songs[i].onclick = () => {
        if (songs[i].getAttribute('data-link')) {
          const songLink = songs[i].getAttribute('data-link');
          if (options.songAudio)
            stopSong(options);
          options.songAudio = new Audio(songLink);
          options.songAudio.play();
          new __WEBPACK_IMPORTED_MODULE_0__game_beatmap__["a" /* default */](ctx, canvas, options, songLink).play();
        } else {
          // should be replaced
          stopSong(options);
        }
      };
    }
  }

  static keyPressedLinks(options) {
    function keyDownHandler(e) {
      if (e.keyCode === 81) {
        options.qPressed = true;
      }
      else if (e.keyCode === 87) {
        options.wPressed = true;
      }
      else if (e.keyCode === 69) {
        options.ePressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode === 81) {
        options.qPressed = false;
      }
      else if (e.keyCode === 87) {
        options.wPressed = false;
      }
      else if (e.keyCode === 69) {
        options.ePressed = false;
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_components__ = __webpack_require__(0);


const beatmap1 = __webpack_require__(6);


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

  play() {
    this.options.beatMapData = this.data;

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

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 5;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"bpm":"173.939","beatmaps":{"q":[1,2.2,2.371439,3.3,4.4,5.5,6.6],"w":[1.25,1.35,1.45,1.55,1.65,2.3772],"e":[1.7,1.8,1.9,1.95,2,2.05]}}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map