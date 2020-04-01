// refactoring TODO list

// 1. separation of rule event from rule's associated central sprite witness
//    - this paves the way for having rules over tiles, to do cellular automata stuff
//    - other events that could be interesting
//    - main issue that arises: event ordering and event shadowing. Our underlying structure is:
//      - start-round (termination/next-level check)
//      - external events (button press)
//      - context-change (generate and collect commands, then resolve)
//      - collision detection

// 2. ability to specify sprite's last direction in when pattern (to enable centipede)
//    - actually in the "sprite separator" section between the when and do sections

// 3. forall rules: termination checking event at beginning of round

// 4. portals
//   - doors between levels
//   - counters with wrap around

// 5. scratchpad and associated commands
//    - a separate tile map for "counters"
//      - for now, one tile map with different rooms in it
//      - the counter room is unreachable in game play. 

//    - pattern is to have one row per counter, with left-marker for zero
//      and right-marker for upper-bound

//    - special markers could be paired portal tiles
//      - enter left-marker moving to left and you exit right-marker moving to left
//      - then boundary conditions are easy to figure out
//      - and with portal pairs you can do wrap around worlds as well

//    - each row has one (named or indexed) counter sprite
//      - sprite-left-move: counter decrement
//      - sprite-right-move: counter increment
//    - collision on markers for boundary conditions
//       - allows us to take action "within round"  
//    - raises the following questions
//      - how do we invoke commands on "non-local" sprites
//      - addressing by sprite kind means every spriter of that kind is sent message (broadcast)
//      - other forms of addressing?
//    - how do we condition on multiple (non-local) sprites in the same rule

// see games.ts for built-in game
let TileWorld = new tileworld.LoadScreen(null);


