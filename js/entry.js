import components from './components';
import Canvas from './canvas';
import OnClickUtil from './onclicks';
// this is for 144 hertz
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
      qPressed: false,
      wPressed: false,
      ePressed: false
    };
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    OnClickUtil.addAllLinks(ctx, canvas, options);

    const drawing = setInterval((e) => {
      options.songMilliseconds += INTERVAL_MILLISECOND;
      Canvas.draw(ctx, canvas, options);
    }, INTERVAL_MILLISECOND);
    // clear interval  when game over?
});
// console.log(options.songAudio.currentTime);
