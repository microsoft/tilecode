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
    kind: number[]; // the indices of movable sprite kinds this rule is defined over
    rt: RuleType;
    dir?: MoveDirection;
    generalize: MoveDirection[];  // the other directions to generalize this rule to 
    whenDo: WhenDo[];
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

// deprecate all below
/*
let bd = ["Boulder", "Diamond"]

let ruleA: Rule =  {
    event:  RuleType.Resting,
    kinds:  ["Player"],
    dir:    TileDir.None,
    guards: [],
    commands: [ { kinds: ["Player"], inst:CommandType.Paint, 
                    dir:TileDir.None, kind: "Space"} ] 
}

let ruleB: Rule = {
    event: RuleType.Pushing,
    kinds: ["Player"],
    dir: TileDir.Right,
    guards: [ { x:1, y:0, none:["Wall", "Boulder"] } ],
    commands: [{
        kinds: ["Player"], inst: CommandType.Move,
        dir: TileDir.Right
    }]
}

let ruleC: Rule = {
    event: RuleType.Pushing,
    kinds: ["Player"],
    dir: TileDir.Right,
    guards: [{ x: 1, y: 0, has: ["Boulder"] },
             { x: 2, y: 0, exactly: ["Space"] }
            ],
    commands: [
        { kinds:["Player"], inst: CommandType.Move, dir: TileDir.Right},
        { kinds:["Boulder"], inst: CommandType.Move, dir: TileDir.Right}
    ]
}

let ruleC_Left: Rule = {
    event: RuleType.Pushing,
    kinds: ["Player"],
    dir: TileDir.Left,
    guards: [{ x: -1, y: 0, has: ["Boulder"] },
    { x: -2, y: 0, exactly: ["Space"] }
    ],
    commands: [
        { kinds: ["Player"], inst: CommandType.Move, dir: TileDir.Left },
        { kinds: ["Boulder"], inst: CommandType.Move, dir: TileDir.Left }
    ]
}

let ruleG: Rule = {
    event: RuleType.Resting,
    kinds: bd,
    guards: [
        { x: 0, y: 1, exactly: ["Space"] },
    ],
    commands: [
        { kinds: bd, inst: CommandType.Move, dir: TileDir.Down }
    ]
}

let ruleH: Rule = {
    event: RuleType.Resting,
    kinds: bd,
    guards: [
        { x: -1, y: 0, exactly: ["Space"] },
        { x: -1, y: 1, exactly: ["Space"] },
        { x: 0, y: 1, some: bd },
    ],
    commands: [
        { kinds: bd, inst: CommandType.Move, dir: TileDir.Left, highlight: true},
        { kinds: bd, inst: CommandType.None }
    ]
}

let ruleI: Rule = {
    event: RuleType.Moving,
    dir: TileDir.Down,
    kinds: bd,
    guards: [
        { x: 0, y: 1, has: ["Space"], none: bd  }
    ],
    commands: [
        { kinds: bd, inst: CommandType.Move, dir: TileDir.Down }
    ]
}

let ruleAttr: Rule = {
    event: RuleType.Moving,
    dir: TileDir.Down,
    kinds: bd,
    guards: [ ],
    commands: []
}
*/