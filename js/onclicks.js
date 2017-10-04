import BeatMap from '../game/beatmap';
class OnClickUtil {


  static songLinks(ctx, canvas, options) {
    const stopSong = (opt) => {
      opt.songAudio.pause();
      opt.songMilliseconds = 0;
      opt.songAudio.currentTime = 0;
      opt.score = 0;
    };

    const songs = document.getElementsByTagName('a');
    for(let i = 0; i < songs.length; i++) {
      songs[i].onclick = () => {
        if (songs[i].getAttribute('data-link')) {
          const songLink = songs[i].getAttribute('data-link');
          if (options.songAudio)
            stopSong(options);
          options.songAudio = new Audio(songLink);
          options.songAudio.play();
          new BeatMap(options, songLink).play();
        } else {
          // should be replaced
          stopSong(options);
        }
      };
    }
  }

  // This method was used to begin to tackle the problem
  // written in problems.md #1-2
  static handleKeyFrames(options) {
    const FRAMES_BEFORE_SWITCHING = 1;
    if (options.qUp.value) {
      if (options.qUp.frames === FRAMES_BEFORE_SWITCHING) {
        options.qUp.frames = 0;
        options.qUp.value = false;
      } else {
        options.qUp.frames++;
      }
    }
    if (options.wUp.value) {
      if (options.wUp.frames === FRAMES_BEFORE_SWITCHING) {
        options.wUp.frames = 0;
        options.wUp.value = false;
      } else {
        options.wUp.frames++;
      }
    }
    if (options.eUp.value) {
      if (options.eUp.frames === FRAMES_BEFORE_SWITCHING) {
        options.eUp.frames = 0;
        options.eUp.value = false;
      } else {
        options.eUp.frames++;
      }
    }
  }

  static keyPressedLinks(options) {
    function keyDownHandler(e) {
      if (e.keyCode === 81) {
        options.qHeld = true;
        options.qUp.value = true;
        options.qUp.frames = 0;
      }
      else if (e.keyCode === 87) {
        options.wHeld = true;
        options.wUp.value = true;
        options.wUp.frames = 0;
      }
      else if (e.keyCode === 69) {
        options.eHeld = true;
        options.eUp.value = true;
        options.eUp.frames = 0;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode === 81) {
        options.qHeld = false;
      }
      else if (e.keyCode === 87) {
        options.wHeld = false;
      }
      else if (e.keyCode === 69) {
        options.eHeld = false;
      }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }

  static addAllLinks(ctx, canvas, options) {
    OnClickUtil.songLinks(ctx, canvas, options);
    OnClickUtil.keyPressedLinks(options);
  }
}

export default OnClickUtil;
