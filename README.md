# Keyboard Smasher
Keyboard Smasher, a game that is personally motivated by:
  - Tap Tap Revolution that used to be popular on the iPhone 4
  - DDR, the OG rhythm beat game
  - Osu, PC game, popularly played with a wacom tablet and keyboard

When initially researching to build this game, I discovered [flash flash revolution](http://www.flashflashrevolution.com/FFR_the_Game.php). I assume this game was also inspired by DDR.

## How to play
The basic goal of the game is to not fail the song and to achieve the highest score possible. A user will fail if his/her health bar reaches the bottom, and the health bar will fall down if the user does not hit the note (Q W or E) on time as the note approaches the bottom part of the canvas.

## Wireframes
When a song starts:
![thisshouldbeworkinglel](./doc/1.png)

Barely hitting a note:
![thisshouldbeworkinglel](./doc/3.png)

Hitting a note close to perfectly:
![thisshouldbeworkinglel](./doc/4.png)

Successfully beat the song!
![thisshouldbeworkinglel](./doc/5.png)

## Requirements (MVP):
  1. Upload a song and make a beatmap, possibly an algorithm to generate a beatmap based on its BPM; make the beatmap making process (beatmap class) scalable and easy.
  2. Have a health bar, score, three buttons on the bottom.
  3. Have popups and remove the beatmap component if it hits the user's key or if it leaves the screen
  4. Be able to click different songs and different songs will play.
  5. Styling


## Bonus:
  1. Have a backend
  2. High scores

## Timeline:
  - Day 1: Get game physics working; make a sample song; figure out how to make beatmaps
  - Day 2: Get all the components into the game; a health bar
  - Day 3: Revisit what I have so far and refactor/polish it
  - Day 4: Style / Bonus
