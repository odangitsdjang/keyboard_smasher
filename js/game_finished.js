class GameFinished {
  constructor(ctx, canvas, options) {
    this.options = options;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  gameFinished(options) {
    if (options.songAudio.currentTime && options.songAudio.duration) {
      if (options.songAudio.currentTime >= options.songAudio.duration - 2)
        return true;
    }
    return false;
  }

  renderGameFinished() {
    // if (this.gameFinished(this.options) && this.options.finishedGameFrame) {
    if (true) {
      // Score:
      // Highest Streak:
      // Amazing:
      // Great:
      // Good:
      // Bad:
      // Miss:
      //
      const keys = Object.keys(this.options.hitResponse.count);
      if (this.options.finishedGameFrame < 30) {
        this.ctx.font = `${this.options.finishedGameFrame}px Arial`;
      } else {
          this.ctx.font = `30px Arial`;
      }
      this.ctx.fillStyle = "#000000";
      const heightInc = 45;
      let height =  (2*this.canvas.height/10);
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
