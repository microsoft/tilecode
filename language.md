# Programming Model

## State

A TileCode state consists of a tile map populated with sprites. Each tile has one of four possible backgrounds, which can change during
an execution. A tile may contain zero, one or more sprites. There are four kinds of sprites. A sprite's kind is fixed for the 
lifetime of the sprite (from creation to destruction). A sprite has a direction (up, down, left, right, resting), indicating the way
the sprite moved between rounds, or if it remained at rest.

## Rounds

A TileCode game proceeds in **rounds**: eachround executes all rules in parallel on the current state to determine 
if the game should proceed/end, the direction that each sprite should next take, and which sprites should be 
created and/or destroyed. After a round, the movements/actions are executed by the TileCode game engine from the current the state 
(all sprites move synchronously and at the same speed) to determine the next state. A sprite stores the direction 
(left, right, up, down) it moved in the last round (or if it remained at rest), for inspection by the rules in the next round.

## Events

There are three basic kinds of events in TileCode: button **press**, neighborhood **change**, and sprite **smash**.

### Button Press
### Neighborhood Change
### Sprite Smash

## When-Do Rules

### Tile Predicates

### Sprite Witnesses

### Sprite Direction Predicates

### Commands



