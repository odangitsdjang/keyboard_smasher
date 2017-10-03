import {INTERVAL_MILLISECOND} from './entry';
const COMPONENT_RADIUS = 30;
const COMPONENT_COUNT = 3;
const GAME_COMPONENT_SPEED = 3;
const HEIGHT_FROM_BOTTOM = 60;

const QCOLOR = "#AA00FF";
const WCOLOR = "#00AAFF";
const ECOLOR = "#FFAA00";
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
      // console.log(options.songAudio.currentTime);
      Object.keys(options.beatMapData.beatmaps).forEach(key => {
        options.beatMapData.beatmaps[key].forEach( secondVal => {
          if (secondVal >= options.songAudio.currentTime &&
              secondVal < options.songAudio.currentTime+INTERVAL_MILLISECOND/1000 )
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

  // method assumes that array will be kept in reversed order (which it should)
  // because it adds on like a queue
  static removeGameComponents(ctx, canvas, options) {
    Object.keys(options.activeComponents).forEach(key=> {
      // makes sure to only use the last game element in each column
      const lastComponent = options.activeComponents[key][0];
      if (lastComponent > canvas.height ||
          (this.amazing(lastComponent, key, canvas, options)) ||
          (this.great(lastComponent, key, canvas, options)) ||
          (this.good(lastComponent, key, canvas, options)) ||
          (this.bad(lastComponent, key, canvas, options))) {
        // delete the element from active components
        options.activeComponents[key].shift();
      }
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

  static drawHitResponse(ctx, canvas, options) {
    if (options.hitResponse.value) {
      if (options.hitResponse.frames < 10) {
        ctx.font = "50px Arial";
      } else if (options.hitResponse.frames < 15) {
        ctx.font = "40px Arial";
      } else if (options.hitResponse.frames < 27) {
        ctx.font = "35px Arial";
      } else if (options.hitResponse.frames < 30) {
        ctx.font = "30px Arial";
      } else if (options.hitResponse.frames > 45) {
        options.hitResponse.value = 0;
      }
      options.hitResponse.frames++;
      ctx.fillStyle = "#000000";
      ctx.fillText(options.hitResponse.value, canvas.width/2 - 100, canvas.height/2-20);
    }
  }

  static drawScore(ctx, canvas, options) {
    const gradient=ctx.createLinearGradient(0,0,canvas.width,0);
    gradient.addColorStop("0.8","black");
    gradient.addColorStop("0.9","blue");
    gradient.addColorStop("1.0","magenta");
    ctx.fillStyle = gradient;
    ctx.font = "22px Arial";
    // ctx.fillStyle = "#000000";
    ctx.fillText("Score: "+options.score, canvas.width-130, 40);

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


  static bad(pos, key, canvas, options) {
    let retVal = false;
    if (key === "q" && options.qUp.value) {
      if (pos < canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3)
          || pos > canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = true;
    } else if (key === "w" && options.wUp.value) {
      if (pos < canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3)
          || pos > canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = true;
    } else if (key === "e" && options.eUp.value) {
      if (pos < canvas.height - HEIGHT_FROM_BOTTOM - (COMPONENT_RADIUS*3)
          || pos > canvas.height - HEIGHT_FROM_BOTTOM + COMPONENT_RADIUS)
        retVal = true;
    }
    if (retVal) {
      options.hitResponse.value = "Bad";
      options.hitResponse.frames = 0;
      options.score -= 50;
    }
    return false;
  }

  static good(pos, key, canvas, options) {
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
      options.hitResponse.value = "good";
      options.hitResponse.frames = 0;
      options.score += 100;
    }
    return false;
  }

  static great(pos, key, canvas, options) {
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
      options.score += 150;
    }
    return false;
  }

  static amazing(pos, key, canvas, options) {
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
      options.hitResponse.value = "Amazing";
      options.hitResponse.frames = 0;
      options.score += 250;
    }
    return retVal;
  }
}

export default Components;
