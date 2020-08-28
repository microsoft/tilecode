## Patterns of Game Play

A game is composed of various [game mechanics](mechanics). Below you'll find
a variety of different mechanics that you can use as a starting point for 
developing your own game.

## Player Movement

The player sprite typically is controlled using the four-way direction pad (dpad).
Here is a tile map where the player sprite is a dog and four types of tile
backgrounds are visible (grey wall, orange sand, blue/green grass, and dark grey sand):

![tile map with dog](pics/dogMap.JPG)

If we want the user to be able to move the dog only on the orange sand, we can use the following rule:

![orange sand](pics/dogMove.JPG)

With this rule, the dog will not be able to move onto any other tile than orange sand.  If we want the dog to be able to move anywhere except the wall, then we can use the following rule instead:

![no wall](pics/dogMoveNoWall.JPG)

Here's how you change the first rule to the second rule:

![sand to wall](pics/dogSandToWall.gif)

## Dog Pushes Cat

In various games, the player sprite can push another object. Here is a rule that allows the player's dog to push a cat around by sending a move right command to both the dog and cat when the cat is immediately to the right of the dog (and the dpad-right button is pressed):

![dog pushes cat](pics/dogPushCatRule.JPG)

Create a tile map with several cats and try pushing them around:

![dog and cat on map](pics/dogMovingCats.gif)

Notice that the dog can push a cat anywhere, including onto another cat or onto a wall.  We create a rule to stop the cat from moving if it is going to smash into the wall:

![cat smash rule](pics/catSmashRule.JPG)

Make sure to generalize the rule to all four directions! You can create a separate smash rule to prevent a cat from smashing into a cat as well:

![cat smash rule](pics/catSmashRule2.JPG)

These two rules will prevent a cat from being pushed onto a wall or onto another cat but will still allow the dog to move onto a tile containing a cat.

## Non-Player Character Movement

Many games have characters that move of their own accord. Let's put some snakes in a pond and have the snakes move back and forth: 

![snake at rest](pics/snakesSwimming.gif)

We will use the change quadrant in the rule selector screen to code four rules for the snake sprite, starting with the snake at rest:

![snake at rest](pics/snakeChangeRule.gif)

When the snake is at rest and there is water to the left of the snake, we send the snake a move-left command:

![snake at rest](pics/snakeRestLeft.JPG)

When the snake has just moved left and there is water to the left of the snake, we send it a move-left command :

![snake moves left](pics/snakeLeftLeft.JPG)

When the snake has just moved left and there is sand to the left of the snake, we send the snake a move-right command:

![snake turns around](pics/snakeLeftRight.JPG)

When the snake has just moved right and there is water to the right of the snake, we send it a move-right command:

![snake moves right](pics/snakeRightRight.JPG)

## Painting Tiles and Move on Change

The snakes know that the cats don't like water, so every time they get to the left edge of the pond, they take a bite of the orange sand to expand the pond's boundary to the left. This is done by modifying the rule that makes the snake turn right when it meets orange sand:

![snake paints water on sand](pics/snakeLeftRightPaint.JPG)

As the cats don't like water, whenever there is water to their right, they move one tile to the left (as long as there is no wall to their left):

![cat avoids water](pics/catAvoidsWater.JPG)

## Scoring and Game Over Conditions

To make the game more interesting, we introduce scoring and a game over condition, supported by the tile map below. We put the light beige tile ("kitty litter") on the left and right sides of the map to give the cats a place to stay away from the snakes.  The goal of the game is for the dog to help as many cats as possible get to the kitty litter on the right side of the pond:

![tile map goal](pics/dogCatMapFull.JPG)

Whenever the cat moves right onto the kitty litter (lining the right side of the game map), the score is increased by ten points:

![cat scores 10](pics/catScore10.JPG)

The game is over when there is no tile that contains both a cat and the orange sand:

![game over](pics/catGameOver.JPG)

Finally, when a cat or dog runs into a snake, the game also is over:

![don't run into snake](pics/catDogSnake.JPG)

## Projectile Movement

For the dog to get cats to the right side of the pond, it must able to beat back the advance of the pond towards the cats. It does so by firing projectiles towards the pond. When these projectiles hit the water, they turn the water back into sand. 

When the A button is pressed, we create a projectile and send it a move-right command:

![dog shoots](pics/dogShoots.JPG)

Once created, the projectile always move to the right:

![projectile moves right](pics/projectileMovesRight.JPG)

When the projectile is going to collide with water, the projectile is destroyed and water painted over by orange sand:

![water to sand](pics/waterToSand.JPG)


