import Components from './components';

class Canvas {
  static drawHealthBar() {

  }

  static draw(ctx, canvas, options) {
    Components.drawComponent(ctx, canvas.width, canvas.height, options);
  }



}


export default Canvas;
