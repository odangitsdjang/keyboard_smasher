## Table of Contents
- [Basic Structure](#basic-structure)
- [Original beatmap](#original-beatmap)
- [Gameplay](#gameplay)
- [More components](#adding-more-components)
- [Better beatmap](#better-beatmap)

## Overview
This readme will guide you through what I did chronologically through the ~30 hours that I worked on this project.
## Initial thoughts
At first I needed to get a canvas that has three inputs on the bottom. The first thing I did was to make sure that these three inputs (Q W E) are interactive. When you hold down one of the three keys, it will stay lit up until not pressed anymore. I wanted to make sure that my file structure was modular because I knew it was going to get huge. I had a lot of data (beatmap song data, the biggest data structure which we will get to) to get passed around all my classes and files.

### Basic Structure
I decided that in my entry file, the top layer that gets compiled by webpack, I will have a setInterval - later changed to requestAnimationFrame for more consistency - to draw my canvas every 7 milliseconds (60hz). I also kept an options hash that gets passed around in every function that needs the current song's data. Initially it looked like this:
```js
const options = {
  qPressed: false,
  wPressed: false,
  ePressed: false
};
```

I realized immediately, this was very similar to React/Redux store that was being used in my previous project [Flix](https://flix1.herokuapp.com/), except it was being done vanilla JavaScript. With this powerful POJO being passed around it was very simple to implement a keydown feature: just change the options variables and then check that value to draw the user input area with a different color.

## Original Beatmap
Then I had to get beatmap working so that when a song plays circles get spawned on the top and drop to the user area. Initially I made it so that I can have a json file, and then I will read that file and spawn circles at a specific time given by that json file (kept inside options.activeComponents). Obviously this was a lot of hardcoding and I improved this later in [better beatmap](#better-beatmap).

## Gameplay
I then had to implement collision detection and give a different feedback to the user depending on how close the game beatnote was compared to the user hitting the note. The whole qPresed, wPressed, ePressed from before wasn't working as I had hoped because it checked if the button was held down or not, but what I needed was to check if the key was pressed recently.

With that in mind I added another frame logic to my game options:
```js
const options = {
  qUp: {value: false, frames:0 }
  wUp: {value: false, frames:0 }
  eUp: {value: false, frames:0 }
}
```
On each refresh, when Q, W, or E button are pressed, I would change the value to true and update the frame by one. In the next frame I would change the value back to false and frame back to 0. I made sure to add the frames so that it can be customized even more for potential features to the game. For example, held down notes instead of just single tap notes.

## Adding more components
With the game logic done, I added more game components, game data, health bar. Health bar was different from the other components, which simply used the data from options to display different things. I decided to approach the health bar using regular HTML/CSS and DOM manipulation with= JavaScript instead of using the canvas because I was getting pretty comfortable with canvas at this point.

## Better Beatmap
I improved on the beatmap making system so that I can encorporate multiple difficulties and speeds. So the general structure of my beatmap creation is that it takes in a BPM and the length of the song, to calculate each measure, and I simply add in a note every measure. I also have a break, quad, and chorus array structure that need to manually be specified in a structure like so:
```js
this.chorus = [ [BEGINSECONDS, ENDSECONDS],[BEGINSECONDS,ENDSECONDS], [145, 167]];
```
and the file will generate beatmap data where during the break intervals, it will not have any notes, in the chorus array interval it will have double the amount of notes, and in the quad array interval it will have quadriple the amount of notes.

 Instead of making the game beatmap note all come down at different speeds, I made sure that this could be made faster or slower than my default speed: 8.5 pixel change per frame (to a factor of 2). I approached my fast song by making sure that beatmap components go down at 2x the rate (17 pixels per frame) and grabbing the same amount of notes as the default (measure is default). I approached the easier song by using the default speed (8.5), and making sure that the notes only get added in half the time (measure is 1/2), so that there is more space between each note.
