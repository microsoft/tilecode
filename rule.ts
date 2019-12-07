// bytecode representation

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

// kinds: 4*[4]  16
// rt:    [4]    20
// dir:   [4]    24
// gen:   4*[4]  40
// whendo: [1-12]*[4+4+N*2+4+4*8]  = [1-12]*[12+32+N*2]= [1-12]*[48+32]

type Rule = {
    kind: number[];                 // the indices of movable sprite kinds this rule is defined over
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

function makeRestingRule(m: tileworld.ImageManager, kind: number): Rule {
    return {
        kind: [kind],
        rt: RuleType.Resting,
        dir: MoveDirection.Left,
        generalize: [],
        whenDo: [{ col: 2, row: 2, attrs: [], witness: kind, commands: [] }]
    }
}

// new API for access to low-level representation

interface ProgramInterface {
    getRuleIds(): number[];
    getKinds(rid: number): number[];  // at most 4
    setKinds(rid: number, kinds: number[]): void;
    getType(rid: number): RuleType;
    setType(rid: number, rt: RuleType): void;
    getDir(rid: number): MoveDirection;
    setDir(rid: number, dir: MoveDirection): void;
    getGeneral(rid: number): MoveDirection[]; 
    setGeneral(rid: number, g: MoveDirection[]): void;
    getWhenDo(rid: number, col: number, row: number): number; // wdid or -1
    makeWhenDo(rid: number, col: number, row: number): number; // new wdid or existing
    getAttrs(rid: number, wdid: number): AttrType[]; // exactly fixed + movable
    setAttrs(rid: number, wdid: number, attrs: AttrType[]): void;
    getWitness(rid: number, wdid: number): number;
    setWitness(rid: number, wdid: number, wit: number): void;
    getCommands(rid: number, wdid: number): Command[]; // at most 4
    setCommands(rid: number, wdid: number, c: Command[]): void;
}

namespace tileworld {

    let lastRule: IdRule = null;
    let prog: Program = null;

    function getRule(rid: number) {
        if (lastRule == null || lastRule.id != rid) {
            lastRule = prog.rules.find(r => r.id == rid);
        }
        return lastRule.rule;
    }

    export function getRuleIds(): number[] {
        return prog.rules.map(r => r.id);
    }

    export function getKinds(rid: number): number[] {
        return getRule(rid).kind;
    }

    export function setKinds(rid: number, kind: number[]) {
        getRule(rid).kind = kind;
    }

    export function getType(rid: number) {
        return getRule(rid).rt;
    }

    export function setType(rid: number, rt: RuleType) {
        getRule(rid).rt = rt;
    }

    export function getDir(rid: number): MoveDirection {
        return getRule(rid).dir;
    }

    export function setDir(rid: number, dir: MoveDirection) {
        getRule(rid).dir = dir;
    }

    export function getGeneral(rid: number): MoveDirection[] {
        return getRule(rid).generalize;
    }
    
    export function setGeneral(rid: number, general: MoveDirection[]) {
        getRule(rid).generalize = general;
    }

    export function getWhenDo(rid: number, col: number, row: number) {
        let whendo = getRule(rid).whenDo.find(wd => wd.col == col && wd.row == row);
        if (whendo == undefined)
            return -1;
        else
            return getRule(rid).whenDo.indexOf(whendo);
    }

    export function makeWhenDo(rid: number, col: number, row: number) {
        return 0;
    }

    export function getAttrs(rid: number, wdid: number): AttrType[] {
        return [];
    }

    export function setAttrs(rid: number, wdid: number, attrs: AttrType[]) {

    }

    export function getWitness(rid: number, wdid: number) {
        return 0;
    }

    export function setWitness(rid: number, wdid: number, wit: number) {

    }

    export function getCommands(rid: number, wdid: number): Command[] {
        return [];
    }

    export function setCommands(rid: number, wdid: number, c: Command[]) {
        
    }
}
