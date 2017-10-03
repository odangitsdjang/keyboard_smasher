import Components from './components';

class Canvas {
  static drawHealthBar() {

  }

  static draw(ctx, canvas, options) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Components.drawScore(ctx, canvas, options);
    Components.drawHitResponse(ctx, canvas, options);
    Components.renderGameComponents(ctx, canvas, options);
    Components.drawUserComponents(ctx, canvas, options);
  }



}


export default Canvas;
