
document.addEventListener('DOMContentLoaded', () => {
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
});
