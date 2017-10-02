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

export default Components;
