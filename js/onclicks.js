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
          new BeatMap(ctx, canvas, options, songLink).play();
        } else {
          // should be replaced
          stopSong(options);
        }
      };
    }
  }

  static keyPressedLinks(options) {
    function keyDownHandler(e) {
      if (e.keyCode === 81) {
        options.qPressed = true;
      }
      else if (e.keyCode === 87) {
        options.wPressed = true;
      }
      else if (e.keyCode === 69) {
        options.ePressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode === 81) {
        options.qPressed = false;
      }
      else if (e.keyCode === 87) {
        options.wPressed = false;
      }
      else if (e.keyCode === 69) {
        options.ePressed = false;
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
