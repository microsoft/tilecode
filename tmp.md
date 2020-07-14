
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
