import components from './components';
import Canvas from './canvas';
import OnClickUtil from './onclicks';
// this handles 144 hertz monitors ;)
export const INTERVAL_MILLISECOND = 6.944444;
// currentPlayTime
document.addEventListener('DOMContentLoaded', () => {
    // options.activeComponents = {
    // q: [position]
    // w: [position, position],
    // e: [position, position, position]
    // }
    const options = {
      songAudio: 0,
      beatMapData: 0,
      activeComponents: {
        q: [],
        w: [],
        e: []
      },
      score: 0,
      hitResponse: { value: 0, frames: 0 },
      qHeld: false,
      qUp: {value: false, frames:0 },
      wHeld: false,
      wUp: {value: false, frames:0 },
      eHeld: false,
      eUp: {value: false, frames:0 }
    };
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    OnClickUtil.addAllLinks(ctx, canvas, options);

    const drawing = setInterval((e) => {
      options.songMilliseconds += INTERVAL_MILLISECOND;
      OnClickUtil.handleKeyFrames(options);
      Canvas.draw(ctx, canvas, options);

    }, INTERVAL_MILLISECOND);

    // requestAnimationFrame
    // clear interval  when game over?
});
// console.log(options.songAudio.currentTime);
