class GameFinished {
  constructor(ctx, canvas, options) {
    this.options = options;
  }

  gameFinished(options) {
    if (options.songAudio.currentTime && options.songAudio.duration) {
      if (options.songAudio.currentTime >= options.songAudio.duration - 2)
        return true;
    }
    return false;
  }

  renderGameFinished() {
    if (this.gameFinished(this.options)) {
      
    }
  }


}
export default GameFinished;
