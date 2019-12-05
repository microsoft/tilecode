enum RuleType {
    Resting,     // a sprite at rest 
    Moving,      // a sprite moving in a given direction
    Pushing,     // a sprite being pushed in a given direction
    Colliding    // a moving sprite about to collide with another sprite
}

enum MoveDirection {
    None, Left, Right, Up, Down
}

enum CommandType {
    Move,     // arg (MoveDirection)
    Paint,    // arg (index of fixed sprite)
    Reverse,
    Stop,
}

enum AttrType {
    Exclude,  // tile cannot contain this kind
    Include,  // tile must contain this kind
    OneOf,    // tile must contain at least one labelled thusly
    OK        // tile may contain this kind
}

type Command = {
    inst: CommandType;
    arg: number;
}

type WhenDo = {
    col: number;            // the guards and commands associated with a tile in the neighborhood
    row: number;            // (2,2) is the center of neighborhood, graphics coordinate system.
    attrs: AttrType[];      // the guard, one attribute per fixed/movable sprite
    witness?: number;       // does the guard identify a witness (index of movable sprite)
    commands?: Command[];   // the commands
}

type Rule = {
    kind: number[];                 // the indices of movable sprite kinds this rule is defined over
    rt: RuleType;
    dir?: MoveDirection;            // the direction associated with rule type (Moving, Colliding, Pushing)
    generalize: MoveDirection[];    // the other directions to generalize this rule to 
    whenDo: WhenDo[];               // guarded commands
}

type IdRule = {
    id: number;
    rule: Rule;
}

// fixed sprites are ordered before movable sprites (0-based)
type Program = {
    fixed: number;      // the number of fixed sprites
    movable: number;    // the number of movable sprites
    rules: IdRule[];    // the rules
}
