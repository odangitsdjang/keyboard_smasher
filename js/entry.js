import components from './components';
import Canvas from './canvas';
import OnClickUtil from './onclicks';

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

    OnClickUtil.addAllLinks(ctx, canvas, options);

    const drawing = setInterval((e) => {
      Canvas.draw(ctx, canvas, options);
    }, 10);
    // clear interval  when game over?
});
