# Game Mechanics

The behavior of a video game can be described informally in English by **game mechanics**, 
the desired interactions and relationships among the game elements, which includes both 
digital elements (such as tiles and sprites in TileCode) and physical elements 
(the buttons on a gaming handheld). 

For example, the classic Snake video game can be partially described as follows:
- "the snake is composed of a head and body segments"
- "the snake is always in motion"
- "each segment of the snake body follows the segment/head in front of it" 
- "the user changes which way the head of the snake moves using the direction pad"
- "the snake grows by one segment each time it eats an apple"
- "the game ends if the snake head collides with a barrier or a segment of the snake body"

Game mechanics generally fall into one of three categories:
- **player rules** govern how the player sprites move - in TileCode, usually via a **press** rule, as well as **smash** events
- **physics rules** govern how non-player sprites move, usually via **change** or **smash** events
- **goal rules** are conditions for ending the game with win/loss

## Checklist

When you analyze a video game's mechanics, it's good to have a checklist of questions
to ask about the game:
- what are the **key elements** of the game? what are their characteristics? are they stationary or do they move? how do they move?
- which sprite does the player control? how do the game controller buttons influence sprite movement?
- what are the relationships between the key elements?  For example, see the first three mechanics for the Snake game above.
- what conditions cause sprites to be destroyed or created?
- what conditions cause the game to end?

When we talk about **key elements**, we mean that there may be various elements of the game which, if eliminated,
would not affect the game play. 

## Refining Mechanics

The mechanics for the Snake game given above is highly ambiguous and leaves much undefined; 
for example, what does it mean for a segment of the snake to "follow" the segment in front of it?  
Much of this imprecision can be discovered, discussed, and worked through using pencil and paper.  Once 
the mechanics are programmed using the TileCode app, testing will continue to reveal
issues and help to further refine the mechanics.

Video games offer several advantages for the process of developing an (English) description, 
refining it, and then implementing it.  

First, they provide a plentiful source of examples: many retro video games are available to 
play freely on the web or on low-cost battery-powered gaming handhelds.  The process of 
describing the mechanics of an existing game is an interesting exercise in its own right, 
a form of "reverse engineering" where one analyzes the behavior of a program to extract
a high-level descriptiopn of that behavior. Analyzing and describing the mechanics of 
existing games and then implementing them is a great way to get started, before creating 
one’s own games. 

Second, many video games can be simulated on a tabletop with basic art supplies, 
so one can work through these activities without the aid of a computer.
