import Components from './components';
import OnClickUtil from './onclicks';
class Canvas {
  static drawHealthBar() {

  }

  static draw(ctx, canvas, options, g) {
    let health = document.getElementById("health");
    if (!options.gameOver) {
      OnClickUtil.handleKeyFrames(options);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Components.drawScore(ctx, canvas, options);
      Components.drawStreak(ctx, canvas, options);
      Components.drawHitResponse(ctx, canvas, options);
      Components.renderGameComponents(ctx, canvas, options, health);
      Components.drawUserComponents(ctx, canvas, options);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    g.renderGameFinished();
    requestAnimationFrame(e=>{
      Canvas.draw(ctx, canvas, options, g);
    });

  }



}


export default Canvas;
