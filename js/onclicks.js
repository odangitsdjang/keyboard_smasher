class OnClickUtil {
  static songLinks() {
    const songs = document.getElementsByTagName('a');
    for(let i = 0; i < songs.length; i++) {
      songs[i].onclick = () => {
        if (songs[i].getAttribute('data-link')) {
          const songLink = songs[i].getAttribute('data-link');
          window.song = new Audio(songLink);
          window.song.play();
          // BeatMap(songLink).play();
        } else {
          window.song.pause();
          window.song.currentTime = 0;
        }
      };
    }
  }

  static keyPressedLinks() {
    let qPressed = false;
    let wPressed = false;
    let ePressed = false;

    function keyDownHandler(e) {
      if (e.keyCode === 81) {
        qPressed = true;
      }
      else if (e.keyCode === 87) {
        wPressed = true;
      }
      else if (e.keyCode === 69) {
        ePressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode === 81) {
        qPressed = false;
      }
      else if (e.keyCode === 87) {
        wPressed = false;
      }
      else if (e.keyCode === 69) {
        ePressed = false;
      }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }

  static addAllLinks(ctx, canvas) {
    OnClickUtil.songLinks();
    OnClickUtil.keyPressedLinks();
  }
}

export default OnClickUtil;
