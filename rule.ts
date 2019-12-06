enum RuleType {  // [4]
    Resting,     // a sprite at rest 
    Moving,      // a sprite moving in a given direction
    Pushing,     // a sprite being pushed in a given direction
    Colliding    // a moving sprite about to collide with another sprite
}

enum MoveDirection { // [4]
    None, Left, Right, Up, Down
}

enum CommandType { // [8]
    Move,     // arg (MoveDirection)
    Paint,    // arg (index of fixed sprite)
    Reverse,
    Stop,
    // Score+1
    // Destroy
    // Life-1
}

enum AttrType {  // [2]
    Exclude,  // tile cannot contain this kind
    Include,  // tile must contain this kind
    OneOf,    // tile must contain at least one labelled thusly
    OK        // tile may contain this kind
}

type Command = { // [8] + [8]
    inst: CommandType;
    arg: number;
}

type WhenDo = {
    col: number;            // [4] the guards and commands associated with a tile in the neighborhood
    row: number;            // [4] (2,2) is the center of neighborhood, graphics coordinate system.
    attrs: AttrType[];      // [2]*N the guard, one attribute per fixed/movable sprite
    witness: number;       // does the guard identify a witness (index of movable sprite)
    commands: Command[];   // the commands
}

type Rule = {
    kind: number[];                 // [4*4] the indices of movable sprite kinds this rule is defined over
    rt: RuleType;
    dir: MoveDirection;             // the direction associated with rule type (Moving, Colliding, Pushing)
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

function makeRestingRule(m: tileWorldEditor.SpriteManager, name: string): Rule {
    let index = m.findName(name).kind();
    return {
        kind: [index],
        rt: RuleType.Resting,
        dir: MoveDirection.None,
        generalize: [],
        whenDo: [{ col: 2, row: 2, attrs: [], witness: index, commands: [] }]
    }
}

// new API for access to low-level representation

interface RuleGetter {
    getKinds(rid: number): number[];  // at most 4
    getType(rid: number): RuleType;
    getDir(rid: number): MoveDirection;
    getWhenDo(rid: number, col: number, row: number): number; // wdid
    getAttrs(rid: number, wdid: number): AttrType[]; // exactly fixed + movable
    getWitness(rid: number, wdid: number): number;
    getCommands(rid: number, wdid: number): Command[]; // at most 4
}
