const GAME_OVER_SOUND_LINK = "./songs/gameover.wav";

class GameFinished {
  constructor(ctx, canvas, options) {
    this.options = options;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  gameSuccess() {
    if (this.options.gameOver === 0 && this.options.songAudio.currentTime && this.options.songAudio.duration) {
      if (this.options.songAudio.currentTime >= this.options.songAudio.duration - 1) {
        this.options.gameOver = 2;
        return true;
      }
    }
    return false;
  }

  renderGameFinished() {
    if (this.gameSuccess() || this.options.gameOver) {
      const keys = Object.keys(this.options.hitResponse.count);
      if (this.options.finishedGameFrame < 30) {
        this.ctx.font = `${this.options.finishedGameFrame}px Open Sans`;
      } else {
          this.ctx.font = `30px Open Sans`;
      }
      this.ctx.fillStyle = "#000000";
      const heightInc = 45;
      let height =  (2*this.canvas.height/10);
      const successOrGameOver = this.options.gameOver === 1 ? "Game Over!" : "Success!";

      if (this.options.finishedGameFrame === 0) {
        this.options.songAudio.pause();
        this.options.songAudio.currentTime = 0;
        if (this.options.gameOver === 1) {
          // only make this play once
          this.options.songAudio = new Audio(GAME_OVER_SOUND_LINK);
          this.options.songAudio.play();
        } else {
          // SUCCESS SONG WILL GO IN HERE
        }
      }
      this.ctx.fillText(this.options.songName,
        this.canvas.width/2 - 100, height+=heightInc);
      this.ctx.fillText(successOrGameOver,
        this.canvas.width/2 - 100, height+=heightInc);
      this.ctx.fillText(`Score: ${this.options.score}`,
        this.canvas.width/2 - 100, height+=heightInc);
      this.ctx.fillText(`Longest Streak: ${this.options.streak.highest}`,
        this.canvas.width/2 - 100, height+=heightInc);

      keys.forEach(key =>  {
        this.ctx.fillText(`${key}: ${this.options.hitResponse.count[key]}`,
           this.canvas.width/2 - 100, height+=heightInc);
      });

      this.options.finishedGameFrame++;
    }
  }


}
export default GameFinished;
