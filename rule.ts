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

enum CommandType {
    Move,           // arg (MoveDirection) + Stop, UTurn, ... tie to sprite
    Paint,          // 4 tiles
    Sprite,         // various commands
    Game,           // various commands
    SpritePred,     // 4 sprites, operator
    TilePred,       // 4 tiles, operator
    CreateInMotion,   // 4 sprites, 4 directions
    CreateAtRest,     // 4 sprites
    Last,
}

enum MoveArg {
    Left, Right, Up, Down, Stop, UTurn,
}

enum SpriteArg {
    Remove,         // self sprite eats the other sprite
}

enum GameArg {
    Lose, Win, Reset, ScoreUp, ScoreDown, NextLevel
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

namespace tileworld {

    export function makeNewRule(kind: number[], rt: RuleType, dir: MoveDirection): Rule {
        return new Rule(kind, rt, dir, []);
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
    export function flipRule(srcRule: Rule, fr: FlipRotate) {
        // TODO: convert this to using C-level API
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
        return tgtRule;
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
        if (shift + bits > 8) {
            // packing error - can't have value that spans byte boundary
            control.assert(false, 44);
        }
        let byte = buf.getUint8(byteIndex);
        let mask = 0;
        for(let i=0; i<bits; i++) { mask = 0x1 | (mask << 1); }
        mask = mask << shift;
        let writeMask = mask ^ 0xffffffff;

        if (write) {
            let newVal = (byte & writeMask) | (v << shift);
            buf.setUint8(byteIndex, newVal);
        }
        
        bitIndex += bits;

        byte = buf.getUint8(byteIndex);
        let ret = (byte & mask) >> shift
        if (write) {
            control.assert(ret == v, 42);
        }
        return ret;
    }

    function writeBuf(v: number, bits: number) {
        readWriteBuf(v, bits, true);
    }

    function readBuf(bits: number) {
        return readWriteBuf(0, bits, false);
    }

    function colRowToLRUD(col: number, row: number) {
        let dist = Math.abs(2 - col) + Math.abs(2 - row);
        if (dist == 0) {
            writeBuf(MoveDirection.Left, 2);
            writeBuf(MoveDirection.Right, 2);
            return;
        } else if (dist == 1) {
            // trick encoding here
            if (col == 2 && row == 1) {
                writeBuf(MoveDirection.Right, 2);
                writeBuf(MoveDirection.Up, 2);
            } else if (col == 2 && row == 3) {
                writeBuf(MoveDirection.Left, 2);
                writeBuf(MoveDirection.Down, 2);
            } else if (col == 1 && row == 2) {
                writeBuf(MoveDirection.Left, 2);
                writeBuf(MoveDirection.Up, 2);
            } else {
                writeBuf(MoveDirection.Right, 2);
                writeBuf(MoveDirection.Down, 2);   
            }
        } else {
            // important for row to go first, see dist == 1
            while (row < 2) { writeBuf(MoveDirection.Up, 2); row++; }
            while (row > 2) { writeBuf(MoveDirection.Down, 2); row--; }
            while (col < 2) { writeBuf(MoveDirection.Left, 2); col++; }
            while (col > 2) { writeBuf(MoveDirection.Right, 2); col--; }
        }
    }

    // pack things so that they'll be easy to read off
    function packRule(r: Rule) {
        bitIndex = 0;
        // compute length (at most 13 whenDo, at most 5 whenDo have commands)
        // so max = 3 + 39 + 20 = 62
        let len = 3 + r.whenDo.length * 3;
        for (let i = 0; i<r.whenDo.length; i++) {
            len += (r.whenDo[i].commands.length > 0 ? 4 : 0);
        }
        buf = control.createBuffer(len);

        r.kind.forEach(v => { writeBuf(v, 4); });   // 2 bytes
        // pad out the rest with 0xf
        for(let i = r.kind.length; i < 4; i++) { writeBuf(0xf, 4); }

        writeBuf(r.rt, 2);
        writeBuf(r.dir, 2);                         // 2.5 bytes
        // how many when dos do we have
        writeBuf(r.whenDo.length, 4);               // 3 bytes
        // should we establish an order??
        // TODO: optimization - remove whendo that are true have no command (waste of space and time)
        r.whenDo.forEach(wd => {
            colRowToLRUD(wd.col, wd.row);                       // + .5 byte
            wd.attrs.forEach(a => { writeBuf(a, 2);  });        // +2 bytes
            for(let cnt = wd.attrs.length; cnt < 8; cnt++) { writeBuf(0, 2); }
            writeBuf(wd.commands.length, 4);                    // +.5 byte
        });
        // now, write out the commands (at most 5 non-zero)
        r.whenDo.forEach(wd => {
            if (wd.commands.length > 0) {
                for(let i = 0; i < wd.commands.length; i++) {
                    writeBuf(wd.commands[i].inst, 4);
                    writeBuf(wd.commands[i].arg, 4);
                }
                for(let j = wd.commands.length; j < 4; j++) {
                    writeBuf(0xff, 8);
                }
            }
        });
    }

    export function storeRule(prefix: string, rid: number, rule: Rule) {
        packRule(rule);
        settings.writeBuffer(prefix + "RL" + rid.toString(), buf);
        return buf;
    }

    export function removeRule(prefix: string, rid: number) {
        settings.remove(prefix + "RL" + rid.toString());
    }

    // first, let's fully unpack
    function unPackRule() {
        bitIndex = 0;
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
            let col = 2;
            let row = 2;
            if (firstMove == MoveDirection.Left && secondMove == MoveDirection.Up) {
                col = 1;
            } else if (firstMove == MoveDirection.Right && secondMove == MoveDirection.Up) {
                row = 1;
            } else if (firstMove == MoveDirection.Left && secondMove == MoveDirection.Down) {
                row = 3;
            } else if (firstMove == MoveDirection.Right && secondMove == MoveDirection.Down) {
                col = 3;;
            } else {
                col += moveXdelta(firstMove) + moveXdelta(secondMove);
                row += moveYdelta(firstMove) + moveYdelta(secondMove);
            }
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

    export function retrieveRule(prefix: string, rid: number) {
        buf = settings.readBuffer(prefix + rid.toString());
        return unPackRule();
    }
}
