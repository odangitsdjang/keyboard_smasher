import components from './components';
import Canvas from './canvas';
import OnClickUtil from './onclicks';
import GameFinished from './game_finished';
// import { }  from '../game/algorithm';

// export const INTERVAL_MILLISECOND = 6.944444;   144hz
// 60hz
export const INTERVAL_MILLISECOND = 16.666666;

// currentPlayTime
document.addEventListener('DOMContentLoaded', () => {
    // options.activeComponents = {
    // q: [position]
    // w: [position, position],
    // e: [position, position, position]
    // }
    const directions = document.getElementById("direction");
    const options = {
      songAudio: 0,
      beatMapData: 0,
      activeComponents: {
        q: [],
        w: [],
        e: []
      },
      score: 0,
      hitResponse: { value: "", frames: 0, count: {Amazing: 0, Great: 0, Good: 0, Bad: 0, Miss: 0 }},
      streak: { value: 0, highest: 0 },
      finishedGameFrame: 0,
      gameOver: 0,
      gameSuccess: 0,
      userAreaResponse: { frames: 0 },
      qHeld: false,
      qUp: {value: false, frames:0 },
      wHeld: false,
      wUp: {value: false, frames:0 },
      eHeld: false,
      eUp: {value: false, frames:0 },
      directions: directions
    };
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    OnClickUtil.addAllLinks(ctx, canvas, options);
    const g = new GameFinished(ctx, canvas, options);
    // const drawing = setInterval((e) => {
    //   OnClickUtil.handleKeyFrames(options);
    //   Canvas.draw(ctx, canvas, options);
    //
    // }, INTERVAL_MILLISECOND);

    requestAnimationFrame(e=>{
      Canvas.draw(ctx, canvas, options, g);
    });
    // clear interval  when game over?
});
// console.log(options.songAudio.currentTime);
