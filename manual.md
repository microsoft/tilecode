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
* [Your First Game](#firstgame)
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

![gallery](pics/gallery.gif)

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

![paint art](pics/paintSnake.gif)

 As with the map editor, select the tile/sprite whose art you want to change. 
 Move the cursor down to edit the bitmap (using the **A** button to apply the currently selected color).  
 Press **B** to move from the bitmap pane to the color selector (pressing **B** again will take you back to the top menu).
 Selecting a color will send the cursor back to the bitmap pane so you can resume painting where you left off. 

## Rule Selector

The rule selector screen shows the four kinds of sprites on the left and the different 
types of rules available (**match, press, smash, miscellaneous**).  A tile is highlighted
if there is a rule of that type present. Select a tile to create a new rule or visit an
already present rule. 


## Rule Editor

A rule takes the form of a **When-Do** guarded command. The **When** guard is a predicate/pattern
over the 3x3 local neighborhood around the central sprite. When the guard matches on
the tile map, the commands in the **Do** section execute. More details about programming rules are given below.

## Play

The play button runs the game in full screen mode. Press **B** to exit the game. 

![play game](pics/playGame.gif)

## Settings

Once you get used to the features available in TileCode, 
you can turn off the help suggestions via the gear wheel, 
which takes you to the settings screen. 

![game settings](pics/gameSettings.gif)

# Coding in TileCode {#coding}

Each sprite's behavior is governed by a set of rules that you can program. Let's start with a fresh game. 
Go to the load screen and select game slot #2. If you play the game, you'll see that you can move the 
player sprite around with the direction pad. Let's look at the rules for the player sprite:

![player sprite rules](pics/playerRules.gif)

No surprises here: the rules for the direction pad (upper right quadrant) are lit up. Move the cursor over to the left dpad button:

![left button press](pics/dpadLeft.gif)

## When Patterns

Now press **A** to bring up the rule editor:

![left button rule](pics/dpadLeftRule.gif)

The menu bar shows that this rule is for the player sprite on the press of the left dpad button. Below the menu bar, the editor is divided into two sections:

* *When* section: shows a pattern around the player
* *Do* section: shows commands that will execute when the pattern matches

In this case, when there is no wall in the space to the left of the player sprite, the sprite is sent a move left command.

Moving the cursor to the space to the left of the player sprite and pressing **A** brings up the *Predicate* menu, which shows the predicate flags for each of the four tiles and sprites that could occupy the space:

![predicate flags](pics/dpadLeftAttrs.gif)

The red circle with a slash denotes the wall tile is excluded. In other words, the predicate for the space to the left of the player matches if that space is not painted with the wall tile. If you move the cursor over the flags you will see their meaning:
 
* *green check mark*: one of the tile/sprites marked with a green check mark must be in the space
* *red-slash circle*: the space must not include this tile/sprite (it is excluded from the space)

If a tile/sprite does not have a flag then it does not matter whether the space includes/excludes the tile/sprite.

![attributes](pics/attributes.png)

The reset button on the upper right of the attribute menu clears all the flags. Note that any space in the *When* section that is empty has no flag set, as shown for the space to the right of the player sprite:

![attributes](pics/allOK.gif)

## Do Commands

If all the predicates in the *When* pattern match then the commands in the *Do* section will be executed. Otherwise, the *Do* section is ignored.  The commands of the *Do* section are organized into five rows, which correspond to the center tile and the four tiles adjacent to the center sprite. Move the cursor to the *Do* section and move the cursor up and down to see the correspondence between the rows of the *Do* section and the five tiles in the *When* section:

![add command](pics/addCommand.gif)

![edit command](pics/editCommand.gif)

Each row can contain up to four commands. If you select the left arrow by the player sprite, you will see the other available move commands:

![commands](pics/fourDirections.gif)

As always, press **B** to exit the current menu.

## Adding, Deleting and Navigating Rules

From the rule editor, you can add a rule (of the same type) by moving the cursor to the plus sign, **+**, in the upper right and press **A**. 

![add rule](pics/addRule.gif)

To delete the current rule, navigate to the garbage can and press **A**. 

![delete rule](pics/deleteRule.gif)

To make a rule of a different type, press the **B** button to return to the code screen and select a different rule type. If you want to see all the rules for a sprite, select the sprite from the left column of the code screen and then select the code icon in the upper left.

![player sprite rules](pics/playerRules.gif)

# Sharing Your TileCode Games {#sharing}

The easiest way to share a TileCode game you have created on an Arcade device is to copy the UF2 file from your device and share it with your friend. The UF2 file includes the flash settings in which your games are stored. When your friend copies this UF2 file to their Arcade device, they will get the games you created. Keep in mind that if your friend's Arcade device is not the same as yours, this may not work.

# Having Problems? {#issues}

Please file a [GitHub issue](https://github.com/microsoft/tilecode/issues) if you encounter a problem with TileCode. You can also help us by choosing the most appropriate tag for your issue. 
