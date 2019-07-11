# Classic Arcade Game (Frogger) Clone Project

## Table of Contents

- [Getting Started](#Getting-Started)
- [Playing the Game](#Playing-the-Game)
- [Future Developments](#Future-Developments)
- [Resources](#Resources)



## Getting Started

You need to have JavaScript enabled in your browser to run this game. This game
is completely browser-based, and you should be able to start playing it by
opening the [main page](index.html) in your browser. If you do not see the
bugs moving across the screen when trying to play the game, make **sure** you
have JavaScript enabled on your browser!

## Playing the Game

The goal of this game is for your player character (the child) to reach the
water at the top of the screen without getting hit by any of the "enemy" bugs.

Your character will move in response to the player pressing the arrow keys
(←,↑,→,↓) in the direction of the pressed arrow key. For example, if the player
presses the **left** arrow key (←), the player character will move **left**
one space, unless the character is at the left edge of the screen, in which
case the character will not move.

The player will be able to tell when they have successfully reached the water
and won the game because a message pops up when the player character reaches
the water, and then resets the game after the player presses a confirmation
button.

If the player character collides with any of the enemies, then the game will
automatically reset without the "win" screen showing!

## Future Developments

Future developments to the game include a timer to add some urgency to the
game, more enemy types (which will likely move differently), collectible items
that increase a new "score" metric, and more characters being available to the
player to choose from (instead of always being the young boy).

## Resources

This game was largely developed from the assets and starter code included in
[this repository](https://github.com/udacity/frontend-nanodegree-arcade-game).

The game also uses [Sweet Alert 2](https://sweetalert2.github.io/) to show the
"win" screen after a game has been completed successfully by the player.
