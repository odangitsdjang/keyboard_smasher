## Three notes coming on the same side all at once:

1. Holding down a key should be penalized
2. If a note is in the awesome zone and another is in the good zone, should not immediately count the good zone note.
  - Need to do the keyboard clicks more precisely



TODO:
MAKE THE GAME MORE FUN BY IMPROVING BEATMAP.JS
FIREWORKS EVERY 50 STREAK



Unsolved problems
1. In Components:addGameComponents, tried optimizing more by shifting out the beatmapData but didn't work because addGameComponents is not completely reliable in getting all the game data every single frame (there might be a millisecond that is missed while rendering, and might miss the game data, in which case it would miss the one note in the beginning and just not render notes after the missed note)
