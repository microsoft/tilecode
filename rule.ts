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

function makeRestingRule(m: tileWorldEditor.ImageManager, kind: number): Rule {
    return {
        kind: [kind],
        rt: RuleType.Resting,
        dir: MoveDirection.None,
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

class ProgramWrapper implements ProgramInterface {
    private lastRule: IdRule;
    constructor(private prog: Program) {
        this.lastRule = null;
    }
    private getRule(rid: number) {
        if (this.lastRule == null || this.lastRule.id != rid) {
            this.lastRule = this.prog.rules.find(r => r.id == rid);
        }
        return this.lastRule.rule;
    }
    getRuleIds(): number[] {
        return this.prog.rules.map(r => r.id);
    }
    getKinds(rid: number): number[] {
        return this.getRule(rid).kind;
    }
    setKinds(rid: number, kind: number[]) {
        this.getRule(rid).kind = kind;
    }
    getType(rid: number) {
        return this.getRule(rid).rt;
    }
    setType(rid: number, rt: RuleType) {
        this.getRule(rid).rt = rt;
    }
    getDir(rid: number): MoveDirection {
        return this.getRule(rid).dir;
    }
    setDir(rid: number, dir: MoveDirection) {
        this.getRule(rid).dir = dir;
    }
    getGeneral(rid: number): MoveDirection[] {
        return this.getRule(rid).generalize;
    }
    setGeneral(rid: number, general: MoveDirection[]) {
        this.getRule(rid).generalize = general;
    }
    getWhenDo(rid: number, col: number, row: number) {
        let whendo = this.getRule(rid).whenDo.find(wd => wd.col == col && wd.row == row);
        if (whendo == undefined)
            return -1;
        else
            return this.getRule(rid).whenDo.indexOf(whendo);
    }
    makeWhenDo(rid: number, col: number, row: number) {
        return 0;
    }
    getAttrs(rid: number, wdid: number): AttrType[] {
        return [];
    }
    setAttrs(rid: number, wdid: number, attrs: AttrType[]) {

    }
    getWitness(rid: number, wdid: number) {
        return 0;
    }
    setWitness(rid: number, wdid: number, wit: number) {

    }
    getCommands(rid: number, wdid: number): Command[] {
        return [];
    }
    setCommands(rid: number, wdid: number, c: Command[]) {
        
    }
}
