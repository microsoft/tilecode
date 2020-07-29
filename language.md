# Programming Model

## State

A TileCode state consists of a tile map populated with sprites. Each tile has one of four possible backgrounds, which can change during
an execution. A tile may contain zero, one or more sprites. There are four kinds of sprites. A sprite's kind is fixed for the 
lifetime of the sprite (from creation to destruction). A sprite has a direction (up, down, left, right, resting), indicating the way
the sprite moved between rounds, or if it remained at rest.

## Rounds

A TileCode game proceeds in **rounds**: each round executes all rules in parallel on the current state to determine 
the direction that each sprite should next take, which sprites should be 
created and/or destroyed,  After a round, the movements/actions are executed by the TileCode game engine from the current the state 
(all sprites move synchronously and at the same speed) to determine the next state. A sprite stores the direction 
(left, right, up, down) it moved in the last round (or if it remained at rest), for inspection by the rules in the next round.

## Sprite Kinds
- ordered 1..4
- first one is special: player - camera follows it
- Z order

## Rules and Center Sprites

A TileCode **rule** applies to one or more **center sprites**, those that appear in the center tile of the 3x3 When section.
If you select the center tile of the **When** section, the sprites with green check marks are the ones to which
the rule applies. If there are no sprites with green check marks, the rule will not run (rules cannot yet apply to a tile
by itself). When you visit the rule selector screen, you can choose among the four sprite kinds. When you create a new rule 
from this screen, the currently selected sprite will be the center sprite of the new rule.  You can change which sprite a 
rule applies to by selecting the center tile of the **When** section.

## Events

There are three basic kinds of events in TileCode: button **press**, neighborhood **change**, and sprite **smash**
(there are also some **miscellaneous** events)

### Button Press

During game play, the TileCode game engine raises five button press events: **A button**, **dpad-left**, **dpad-right**, 
**dpad-up**, **dpad-down**.  When a **press** rule fires for a sprite **S** in a round, then no **change** rule
for S will be fired in that round. That is, **press** rules shadow **change** rules, prioritizing events from the user
over internal events. 

### Neighborhood Change

When there is a change to the 3x3 neighborhood of a sprite, 

Changes (all sprites consider)
- painting a tile
- a sprite moved into a tile
- a sprite transitioned from moving to resting
- a sprite created/destroyed


### Sprite Smash
### Miscellaneous

## When-Do Rules

### Tile Predicates

### Sprite Witnesses

### Sprite Direction Predicates

### Commands



