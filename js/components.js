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
  static drawComponent(ctx, canvasWidth, canvasHeight, options) {
    for (let i = 0; i < COMPONENT_COUNT; i++) {
      ctx.beginPath();
      ctx.arc(canvasWidth/(COMPONENT_COUNT+1) + (canvasWidth/(COMPONENT_COUNT+1) * i), canvasHeight-60, COMPONENT_RADIUS,
        0, Math.PI*2, true);
      ctx.fillStyle = "#000000";
      this.changeColor(ctx, options, i);
      ctx.fill();
      ctx.closePath();
    }
  }
  static changeColor(ctx, options, i) {
    if (options.qPressed && i === 0) {
      ctx.fillStyle = "#AA00FF";
    } else if (options.wPressed && i === 1) {
        ctx.fillStyle = "#00AAFF";
    } else if (options.ePressed && i === 2) {
      ctx.fillStyle = "#FFAA00";
    }
  }


}

export default Components;
