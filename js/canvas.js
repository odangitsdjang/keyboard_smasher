import Components from './components';
import OnClickUtil from './onclicks';
class Canvas {
  static drawHealthBar() {

  }

  static draw(ctx, canvas, options, g) {


    OnClickUtil.handleKeyFrames(options);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    g.renderGameFinished();
    Components.drawScore(ctx, canvas, options);
    Components.drawStreak(ctx, canvas, options);
    Components.drawHitResponse(ctx, canvas, options);
    Components.renderGameComponents(ctx, canvas, options);
    Components.drawUserComponents(ctx, canvas, options);
    requestAnimationFrame(e=>{
      Canvas.draw(ctx, canvas, options, g);
    });

  }



}


export default Canvas;
