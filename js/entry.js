import components from './components';
import Canvas from './canvas';
import OnClickUtil from './onclicks';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    OnClickUtil.addAllLinks(ctx, canvas);

    const drawing = setInterval((e) => {
      Canvas.draw(ctx, canvas);
    }, 100);
    // clear interval  when game over?
});
