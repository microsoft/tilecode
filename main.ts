// refactoring TODO list

// 1. separation of rule event from rule's associated central sprite witness
//    - this paves the way for having rules over tiles, to do cellular automata stuff
//    - other events that could be interesting
//      - scratchpad
//    - main issue that arises: event ordering and event shadowing

// 2. ability to specify sprite's last direction in when pattern (to enable centipede)
//    - actually in the "sprite separator" section between the when and do sections

// 3. forall rules: termination checking event at beginning of round

// 4. scratchpad and associated commands
//    - a separate tile map for "counters"
//      - but now we have the problem of two different "namespaces" and
//        which namespace a rule belongs to
//      - instead, it's just part of the one tile map and we use distinct
//        counter sprites (but how to hide this? special marker for hiding tiles) 
//    - pattern is to have one row per counter, with left-marker for zero
//      and right-marker for upper-bound
//    - each row has one (named or indexed) counter sprite
//      - sprite-left-move: counter decrement
//      - sprite-right-move: counter increment
//    - collision on markers for boundary conditions
//       - allows us to take action "within round"  
//    - raises the following questions
//      - how do we invoke commands on "non-local" sprites
//      - addressing by sprite kind means every spriter of that kind is sent message (broadcast)
//      - other forms of addressing?

// see games.ts for built-in game
let TileWorld = new tileworld.LoadScreen(null);


