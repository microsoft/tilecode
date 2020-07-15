[![TileCode](pics/meowbit.gif)](https://microsoft.github.io/tilecode/)

# Introduction

TileCode is a game creation app that allows you to design and play games directly on MakeCode Arcade devices. 
TileCode games are based on the familiar paradigm of a gameboard with pieces that can move from one tile of 
the board to an nearby tile. You can run TileCode: 
* in a [web browser](https://microsoft.github.io/tilecode/), or 
* on any [MakeCode Arcade device](https://arcade.makecode.com/hardware).

Copy this [UF2 file](https://github.com/microsoft/tilecode/releases/download/v3.5.5/arcade-all.uf2) to your 
device to get started (works for all MakeCode Arcade devices)after you connected your device to the computer via an USB cable.

# Overview 

* [Tour of TileCode](#tour)
* [Coding in TileCode](#coding)
* [Sharing TileCode Games](#sharing)
* [Having Problems?](#issues)

# Tour of TileCode {#tour}

Let's take a quick tour through the various screens of TileCode.  All editing takes place via the tile paradigm: 
* move the square-shaped cursor between nearby tiles using the direction pad (dpad); 
* select a tile using the **A** button to perform an action; 
* press the **B** button to take you back to the menu of the current screen or to the previous screen

## Load Screen

The load screen of TileCode lets you select one of eight games to program and play (slots colored blue already have game assets):

![load screen](pics/loadScreen.gif)

All game assets (gameboard, images and code) are stored in the flash memory of your Arcade device, so your changes will remain even if you power the device off. Assets are saved to flash whenever you transition between screens.

## Game Home Screen

The game's home screen displays after a game slot has been selected:

![home page](pics/homePage1.gif)

Each TileCode game has four kinds of tile backgrounds and four kinds of sprites to work with, as shown on the screen. You can visit the art gallery to change the background art or sprite art by selecting the background/sprite. 

![help cursor](pics/helpGallery.gif)

## Gallery

In the gallery, simply move to the artwork you wish and select it with the **A** button:

![gallery](pics/gallery.GIF)

When you are done, use the **B** button to return to the game home screen.

## Menu bar

The menu bar of the game home screen has four main commands in addition to the gear wheel (for game settings): 
* tile map editor (red map icon)
* bitmap editor (paint brush icon) 
* rule selector (</> icon)
* play game (green play icon)

![menu bar](pics/menuOptions.png)

## Map Editor

The map editor lets you paint the game world's tiles and place sprites on tiles. 
Select one of the four backgrounds and move the cursor down to the map. 
Press **A** to paint a tile with the current background. 
Press **B** to return to the menu bar and select another background or sprite. 
After selecting a sprite, the **A** button will place the sprite on a tile, 
replacing the sprite that is there (or removing it if it is the same as the selected sprite). 

![tile map editor](pics/map.gif)

You can paint tiles quickly by holding down the **A** button while moving the cursor. 
The reset button (upper right) resets the camera to the upper left of the map. 
To return to the game screen, press the **B** button.

## Paint Editor

The paint editor lets you change the art associated with a tile or sprite.

![paint art](pics/paintSnake.GIF)

 As with the map editor, select the tile/sprite whose art you want to change. 
 Move the cursor down to edit the bitmap (using the **A** button to apply the currently selected color).  
 Press **B** to move from the bitmap pane to the color selector (pressing **B** again will take you back to the top menu).
 Selecting a color will send the cursor back to the bitmap pane so you can resume painting where you left off. 

## Rule Selector

The rule selector screen shows the four kinds of sprites on the left and the different 
types of rules available (**change, press, smash, miscellaneous**).  A tile is highlighted
if there is a rule of that type present. Select a tile to create a new rule or visit an
already present rule. 

![rule selector](pics/ruleSelector.gif)

![rule selector](pics/ruleSelector.gif)

## Rule Editor

A rule takes the form of a **When-Do** guarded command. The **When** guard is a predicate/pattern
over the 3x3 local neighborhood around the central sprite. When the guard matches on
the tile map, the commands in the **Do** section execute. More details about programming rules are given below.

![rule selector](pics/ruleEditor.gif)


## Play

The play button runs the game in full screen mode. Press **B** to exit the game. 

## Settings

Once you get used to the features available in TileCode, 
you can turn off the help suggestions via the gear wheel, 
which takes you to the settings screen. 

![game settings](pics/gameSettings.gif)

# Coding in TileCode {#coding}

Coding in TileCode is done by creating a set of rules to determine the sprite’s behavior. Let’s start with a fresh game example. Go to the load screen and select game slot #1 which will open "Hello Apple" game. If you play the game, you’ll see that you can move the player sprite around with the direction pad. The player goal is to eat as many apple as possible while avoiding the snakes. 

Let’s learn how we can create this game step by step. 

* Step 1: Delete an existing game to make space for this game. Go to one of the existing slots and then click on the settings wheel and select "delete" button. 

![select_gear_example](pics/menuGearSelection.png)
![delete_game_example](pics/deleteGame.png)

* Step 2: Select the player, the apple and the snake from the gallery for your game. Pick any tiles you like for the terrain. 

![hello_game_sprites](pics/helloGameSprites.png)

* Step 3: Build your game map. For this you will need to go to the map editor. Here you can select any tile you prefer and got and paint it on the board (see example of apple paint below). In the case of our "Hello Apple" game we want our player to avoid the walls, walk on grass, pick apples and avoid snakes so we will build our game board to support that game play scenario. 

![hello_map_edit](pics/helloMapEditing.png)
![hello_map_apple_edit](pics/helloMapAppleEdit.png)

* Step 4: Make the player move. Now let's create our first game rule and bring our player to life. To do so we will select the **right arrow** buttton from the **press** rules. Initially we will only allow our player to move to right. 

![hello_rules_gallery](pics/helloRulesAll.png)
![hello_motion_simple](pics/helloMotionSimple.png)

* Step 5: Make the player react to the game board. In order for our player to respect the boundaries of our game board we now need to create 2 more rules: make him walk on grass but not be able to walk on walls. 

![hello_grass_motion_rule](pics/helloMotionGrass.png)
![hello_wall_motion_rule](pics/helloBounceWall.png)

* Step 6: Eat the apples 
![hello_collision_apple_rule](pics/collisionAppleRule.png)

* Step 7: Avoid the snakes 
![hello_collision_snake_rule](pics/helloLooseGame.png)

# Sharing Your TileCode Games {#sharing}

The easiest way to share a TileCode game you have created on an Arcade device is to copy the UF2 file from your device and share it with your friend. The UF2 file includes the flash settings in which your games are stored. When your friend copies this UF2 file to their Arcade device, they will get the games you created. Keep in mind that if your friend's Arcade device is not the same as yours, this may not work.

# Having Problems? {#issues}

Please file a [GitHub issue](https://github.com/microsoft/tilecode/issues) if you encounter a problem with TileCode. You can also help us by choosing the most appropriate tag for your issue. 
