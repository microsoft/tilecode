// refactoring TODO list

// for UIST paper

// 2. ability to specify sprite's last direction in when pattern (to enable centipede)
//    - actually in the "sprite separator" section between the when and do sections

// 3. forall rules: termination checking event at beginning of round

// 4. spawn sprite at a location, with initial direction

// post UIST: -------------------------

// - reduce to 3x3 patterns and allow two 3x3 patterns in when

// - portals
//   - doors between levels (one way, two way)
//   - counters with wrap around

// - commands on non-local sprites
//      - addressing by sprite kind means every sprite of that kind is sent message (broadcast)
//      - other forms of addressing?
//    - how do we condition on multiple (non-local) sprites in the same rule

// - scratchpad and associated commands
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

// see games.ts for built-in game
let TileWorld = new tileworld.LoadScreen(null);


