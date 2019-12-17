// bytecode representation

enum RuleType {
    Resting = 0,     // a sprite at rest 
    Moving,      // a sprite moving in a given direction
    Pushing,     // a sprite being pushed in a given direction
    Colliding    // a moving sprite about to collide with another sprite
}

enum MoveDirection {
    Left = 0, Right, Up, Down
}

// move
// - left, right, up, down, uturn, stop, ...

// tile-based commands
// - paint art (of tile)
// - create sprite (at tile)
// - 

// sprite property
// - zero-remaining
// - one remaining
// - health up
// - health down

// game reset
// game win
// game end
// game next-level
// game score+1, score-1


enum CommandType {
    Move,           // arg (MoveDirection) + Stop, UTurn, ... tie to sprite
    Paint           // arg (index of fixed sprite) - these commands are not tied to sprite
}

enum AttrType {
    OK = 0,    // tile cannot contain this kind
    Include,   // tile must contain this kind
    OneOf,     // tile must contain at least one labelled thusly
    Exclude    // tile may contain this kind
}

class Command {
    constructor(
        public inst: CommandType,
        public arg: number
    ) { }
}

class WhenDo {
    constructor(
        public col: number,            // the guards and commands associated with a tile in the neighborhood
        public row: number,            // (2,2) is the center of neighborhood, graphics coordinate system.
        public attrs: AttrType[],      // the guard, one attribute per fixed/movable sprite
        public commands: Command[]     // the commands
    ) { }
}

class Rule {
    constructor( 
        public kind: number[],                 // the indices of movable sprite kinds this rule is defined over
        public rt: RuleType,
        public dir: MoveDirection,             // the direction associated with rule type (Moving, Colliding, Pushing)
        public whenDo: WhenDo[]               // guarded commands (limit on number of these? 6 for now)
    ) { }
}

class IdRule {
    constructor(
        public id: number,
        public rule: Rule
    ) { }
}
// transform: FlipRotate of rule with different id

enum FlipRotate { Horizontal, Vertical, Left, Right };

// fixed sprites are ordered before movable sprites (0-based)
type Program = {
    fixed: number;      // the number of fixed sprites
    movable: number;    // the number of movable sprites
    rules: IdRule[];    // the rules
}

// TODO: make things more compact through application of transformations
// TODO: ordering of rules (pairs).

function makeNewRule(kind: number[], rt: RuleType, dir: MoveDirection): Rule {
    return new Rule(kind, rt, dir, []);
}

// new API for access to low-level representation

namespace tileworld {

    let lastRule: IdRule = null;
    let prog: Program = null;

    // TODO: packed 16-bit representation managed here
    // (10 bits for rule, 4 for whendo, 2 for command)

    // - move to a single number to represent rid+wid+cid

    function getRule(rid: number) {
        if (lastRule == null || lastRule.id != rid) {
            lastRule = prog.rules.find(r => r.id == rid);
        }
        return lastRule.rule;
    }

    function wrapRule(r: Rule) {
        let newRule = new IdRule(prog.rules.length, r);
        prog.rules.push(newRule);
        return newRule.id;
    }

    export function setProgram(p: Program) {
        prog = p;
        lastRule = null;
    }

    export function makeRule(kind: number, rt: RuleType, dir: MoveDirection): number {
        return wrapRule(makeNewRule([kind], rt, dir));
    }

    export function removeRule(rid: number) {
        // TODO
    }

    export function getRuleIds(): number[] {
        return prog.rules.map(r => r.id);
    }

    export function getRulesForKind(kind: number): number[] {
        return prog.rules.filter(r => r.rule.kind.indexOf(kind) != -1).map(r => r.id)
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

    export function getWhenDo(rid: number, col: number, row: number) {
        let whendo = getRule(rid).whenDo.find(wd => wd.col == col && wd.row == row);
        if (whendo == null)
            return -1;
        else
            return getRule(rid).whenDo.indexOf(whendo);
    }

    export function makeWhenDo(rid: number, col: number, row: number) {
        let whenDo = new WhenDo(col, row, [], []);
        getRule(rid).whenDo.push(whenDo);
        return getRule(rid).whenDo.length-1;
    }

    export function getAttr(rid: number, wdid: number, aid: number): AttrType {
        return getRule(rid).whenDo[wdid].attrs[aid];
    }

    export function setAttr(rid: number, wdid: number, aid: number, attr: AttrType) {
        getRule(rid).whenDo[wdid].attrs[aid] = attr;
    }

    export function getInst(rid: number, wdid: number, cid: number) {
        let c = getRule(rid).whenDo[wdid].commands[cid];
        return (c == null) ? -1: c.inst;
    }

    export function getArg(rid: number, wdid: number, cid: number) {
        let c = getRule(rid).whenDo[wdid].commands[cid];
        return (c == null) ? -1 : c.arg;
    }

    export function setInst(rid: number, wdid: number, cid: number, n: number) {
        let commands = getRule(rid).whenDo[wdid].commands;
        while (cid >= commands.length && cid < 4) {
            commands.push(new Command(-1, -1));
        }
        commands[cid].inst = n;
    }
    
    export function setArg(rid: number, wdid: number, cid: number, n: number) {
        let commands = getRule(rid).whenDo[wdid].commands;
        while (cid >= commands.length && cid < 4) {
            commands.push(new Command(-1, -1));
        }
        commands[cid].arg = n;
    }

    export function removeCommand(rid: number, wdid: number, cid: number) {
        let commands = getRule(rid).whenDo[wdid].commands;
        if (cid < commands.length) {
            commands.removeAt(cid);
        }
    }

    // useful utilities
    export function makeIds(rules: Rule[]): IdRule[] {
        return rules.map((r, i) => { return new IdRule(i, r); });
    }

    export function moveXdelta(dir: MoveDirection) {
        return dir == MoveDirection.Left ? -1 : (dir == MoveDirection.Right ? 1 : 0);
    }

    export function moveYdelta(dir: MoveDirection) {
        return dir == MoveDirection.Up ? -1 : (dir == MoveDirection.Down ? 1 : 0);
    }

    export function oppDir(dir: MoveDirection, dir2: MoveDirection) {
        return (dir == MoveDirection.Left && dir2 == MoveDirection.Right) ||
            (dir == MoveDirection.Right && dir2 == MoveDirection.Left) ||
            (dir == MoveDirection.Up && dir2 == MoveDirection.Down) ||
            (dir == MoveDirection.Down && dir2 == MoveDirection.Up);
    }

    export function flipRotateDir(d: MoveDirection, fr: FlipRotate) {
        if (fr == FlipRotate.Horizontal) {
            return d == MoveDirection.Left ? MoveDirection.Right : d == MoveDirection.Right ? MoveDirection.Left : d;
        } else if (fr == FlipRotate.Vertical) {
            return d == MoveDirection.Up ? MoveDirection.Down : d == MoveDirection.Down ? MoveDirection.Up : d;
        } else if (fr == FlipRotate.Left) {
            switch (d) { // counter clockwise
                case MoveDirection.Left: return MoveDirection.Down;
                case MoveDirection.Down: return MoveDirection.Right;
                case MoveDirection.Right: return MoveDirection.Up;
                case MoveDirection.Up: return MoveDirection.Left;
            }
        } else {
            switch (d) {  // clockwise
                case MoveDirection.Left: return MoveDirection.Up;
                case MoveDirection.Up: return MoveDirection.Right;
                case MoveDirection.Right: return MoveDirection.Down;
                case MoveDirection.Down: return MoveDirection.Left;
            }
        }
        return d;
    }

    // rule transformations: flip and rotate

    function flipCommands(commands: Command[], fr: FlipRotate) {
        return commands.map(c => { return new Command(c.inst, c.inst == CommandType.Move ? flipRotateDir(c.arg, fr) : c.arg); })
    }

    function transformCol(col: number, row: number, fr: FlipRotate) {
        if (fr == FlipRotate.Horizontal || fr == FlipRotate.Vertical)
            return fr == FlipRotate.Horizontal ? 4 - col : col;
        else {
            // make (0,0) center for rotation
            row = 2 - row;
            return fr == FlipRotate.Left ? (-row) + 2 : row + 2;
        }
    }

    function transformRow(row: number, col: number, fr: FlipRotate) {
        if (fr == FlipRotate.Horizontal || fr == FlipRotate.Vertical)
            return fr == FlipRotate.Horizontal ? row : 4 - row;
        else {
            col = col - 2;
            return fr == FlipRotate.Left ? (-col) + 2 : col + 2;
        }
    }

    // TODO: make this an online transformation (view of) over a rule to save space
    export function flipRule(rid: number, fr: FlipRotate) {
        // TODO: convert this to using C-level API
        let srcRule = getRule(rid);
        let tgtRule = makeNewRule(srcRule.kind, srcRule.rt, flipRotateDir(srcRule.dir, fr));
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (Math.abs(2 - col) + Math.abs(2 - row) > 2)
                    continue;
                let whendo = srcRule.whenDo.find(w => w.col == col && w.row == row);
                if (!whendo)
                    continue;
                let tgtWhenDo: WhenDo = {
                    col: transformCol(col, row, fr),
                    row: transformRow(row, col, fr),
                    attrs: whendo.attrs,
                    commands: flipCommands(whendo.commands, fr)
                };
                tgtRule.whenDo.push(tgtWhenDo);
            }
        }
        return wrapRule(tgtRule);
    }

    let buf: Buffer = null
    let bitIndex = 0;

    function readWriteBuf(v: number, bits: number, write: boolean) {
        let byteIndex = bitIndex >> 3;
        if (byteIndex >= buf.length) {
            // shouldn't get here
            control.assert(false, 43);
        }
        let shift = bitIndex - (byteIndex << 3);
        if (shift + bits >= 8) {
            // packing error - can't have value that spans byte boundary
            control.assert(false, 44);
        }
        let byte = buf.getUint8(byteIndex);
        let mask = 0x1;
        for(let i=0; i<bits; i++) { mask = mask | (mask << 1); }
        mask = mask << shift;
        mask = mask ^ 0xffffffff;

        if (write) {
            buf.setUint8((byte & mask) | (v << shift), byteIndex);
        }
        
        bitIndex += bits;

        return (byte & mask) >> shift;
    }

    function writeBuf(v: number, bits: number) {
        readWriteBuf(v, bits, true);
    }

    function readBuf(bits: number) {
        return readWriteBuf(0, bits, false);
    }

    function colRowToLRUD(col: number, row: number) {
        // control.assert(Math.abs(2 - col) + Math.abs(2 - row) <= 2, 42);
        if (col == 2 && row == 2) {
            writeBuf(MoveDirection.Left, 2);
            writeBuf(MoveDirection.Right, 2);
            return;
        }
        while (col < 2) { writeBuf(MoveDirection.Left, 2); col++; }
        while (col > 2) { writeBuf(MoveDirection.Right, 2); col--; }
        while (row < 2) { writeBuf(MoveDirection.Up, 2); row++; }
        while (row > 2) { writeBuf(MoveDirection.Down, 2); row--; }
    }

    // pack things so that they'll be easy to read off
    function packRule(r: Rule) {
        // compute length (at most 13 whenDo, at most 5 whenDo have commands)
        // so max = 3 + 39 + 20 = 62
        let len = 3 + r.whenDo.length * 3;
        r.whenDo.forEach(wd => { len += (wd.commands.length > 0 ? 4 : 0)});
        buf = control.createBuffer(len);

        r.kind.forEach(v => { writeBuf(v, 4); });   // 2 bytes
        // pad out the rest with 0xf
        for(let i = r.kind.length; i < 4; i++) { writeBuf(0xf, 4); }

        writeBuf(r.rt, 2);
        writeBuf(r.dir, 2);                         // 2.5 bytes
        // how many when dos do we have
        writeBuf(r.whenDo.length, 4);               // 3 bytes
        // should we establish an order??
        r.whenDo.forEach(wd => {
            colRowToLRUD(wd.col, wd.row);                       // + .5 byte
            let cnt = 0;
            wd.attrs.forEach(a => { writeBuf(a, 2); cnt++; });  // +2 bytes
            for(;cnt<=8;cnt++) { writeBuf(0,2); }
            writeBuf(wd.commands.length, 4);                    // +.5 byte
        });
        // now, write out the commands (at most 5 non-zero)
        r.whenDo.forEach(wd => {
            // 1 byte for each command
            let i = 0;
            for(; i < wd.commands.length; i++) {
                writeBuf(wd.commands[i].inst, 4);
                writeBuf(wd.commands[i].arg, 4);
            }
            if (i > 0) {
                // padd the rest
                for(let j = i; j < 4; j++) {
                    writeBuf(0xff, 8);
                }
            }
        });
    }

    function storeRule(r: IdRule) {
        packRule(r.rule);
        settings.writeBuffer(r.id.toString(), buf);
    }

    // first, let's fully unpack
    function unPackRule() {
        let kinds = [];
        for(let i = 0; i<4; i++) {
          let kind = readBuf(4);
          if (kind != 0xf) kinds.push(kind);
        }
        let rt = readBuf(2);
        let dir = readBuf(2);
        let rule = new Rule(kinds, rt, dir, []);
        let whenDoLen = readBuf(4);
        let hasCommands: WhenDo[] = [];
        for(let i = 0; i<whenDoLen; i++) {
            let firstMove = readBuf(2);
            let secondMove = readBuf(2);
            let col = 2 + moveXdelta(firstMove) + moveXdelta(secondMove);
            let row = 2 + moveYdelta(firstMove) + moveYdelta(secondMove);
            let whenDo = new WhenDo(col, row, [], []);
            for(let a = 0; a < 8; a++) {
                let attr = readBuf(2);
                whenDo.attrs.push(attr);
            }
            let cmdLen = readBuf(4);
            if (cmdLen > 0) hasCommands.push(whenDo);
            rule.whenDo.push(whenDo);
        }
        hasCommands.forEach(wd => {
            for(let i = 0; i < 4; i++) {
                let inst = readBuf(4);
                let arg = readBuf(4);
                if (inst != 0xf) {
                    wd.commands.push(new Command(inst, arg));
                }
            }
        })
        return rule
    }

    function retrieveRule(rid: number) {
        buf = settings.readBuffer(rid.toString());
        return unPackRule();
    }
}
