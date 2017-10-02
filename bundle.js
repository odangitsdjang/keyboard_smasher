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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__canvas__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__onclicks__ = __webpack_require__(3);




document.addEventListener('DOMContentLoaded', () => {
    const options = {
      songAudio: 0,
      songMilliseconds: 0,
      qPressed: false,
      wPressed: false,
      ePressed: false
    };
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    __WEBPACK_IMPORTED_MODULE_2__onclicks__["a" /* default */].addAllLinks(ctx, canvas, options);

    const drawing = setInterval((e) => {
      __WEBPACK_IMPORTED_MODULE_1__canvas__["a" /* default */].draw(ctx, canvas, options);
    }, 10);
    // clear interval  when game over?
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const COMPONENT_RADIUS = 20;
const COMPONENT_COUNT = 3;

// Make this class scalable so that if I want to change it later
// then I can just change the numbers up at the top
class Components {

  // Use get so that you can use the constant without parenthesis
  // i.e. Components.componentRadius
  static get componentRadius() {
    return COMPONENT_RADIUS;
  }



  // If 3 components, then divide 4 sections to center it evenly in the center
  static drawUserComponents(ctx, canvasWidth, canvasHeight, options) {
    for (let i = 0; i < COMPONENT_COUNT; i++) {
      this.drawBeatComponent(ctx, canvasWidth, canvasHeight, i, options, 1);
    }
  }

  // area === 1 specifies user area, 2 specifies game component
  static drawBeatComponent(ctx, canvasWidth, canvasHeight, location, options, area) {
    ctx.beginPath();
    ctx.arc( canvasWidth/(COMPONENT_COUNT+1) +
    (canvasWidth/(COMPONENT_COUNT+1) * location), canvasHeight-60, COMPONENT_RADIUS,
      0, Math.PI*2, true);
    ctx.fillStyle = "#000000";
    if (area)
      this.changeColor(ctx, location, options, area);
    ctx.fill();
    ctx.closePath();
  }

  static changeColor(ctx, i, options, area) {
    if (area === 1) {
      if (options.qPressed && i === 0) {
        ctx.fillStyle = "#AA00FF";
      } else if (options.wPressed && i === 1) {
        ctx.fillStyle = "#00AAFF";
      } else if (options.ePressed && i === 2) {
        ctx.fillStyle = "#FFAA00";
      }
    } else if (area === 2) {
      ctx.fillStyle = "#FFFFFF";
    }
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Components);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(1);


class Canvas {
  static drawHealthBar() {

  }

  static draw(ctx, canvas, options) {
    __WEBPACK_IMPORTED_MODULE_0__components__["a" /* default */].drawUserComponents(ctx, canvas.width, canvas.height, options);

  }



}


/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_beatmap__ = __webpack_require__(5);

class OnClickUtil {


  static songLinks(options) {
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
          new __WEBPACK_IMPORTED_MODULE_0__game_beatmap__["a" /* default */](songLink).play();
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
    OnClickUtil.songLinks(options);
    OnClickUtil.keyPressedLinks(options);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (OnClickUtil);


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    this.data = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./data.json\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  }

  play() {
    this.grabData();

  }
}

/* harmony default export */ __webpack_exports__["a"] = (BeatMap);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map