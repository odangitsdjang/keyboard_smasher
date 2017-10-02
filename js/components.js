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
  static drawComponent(ctx, canvasWidth, canvasHeight) {
    for (let i = 0; i < COMPONENT_COUNT; i++) {
      ctx.beginPath();
      ctx.arc(canvasWidth/(COMPONENT_COUNT+1) + (canvasWidth/(COMPONENT_COUNT+1) * i), canvasHeight-60, COMPONENT_RADIUS,
        0, Math.PI*2, true);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.closePath();
    }
  }
  static changeColor() {
    
  }


}

export default Components;
