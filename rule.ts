// in memory program representation

// enums must fit in 4 bits (16 values maximum)

enum RuleType {
    ButtonPress,    // user button press
    ContextChange,  // neighborhood changed
    Collision,      // sprite collision
    NegationCheck,  // check spec
};

// directions are 0-3 and move clockwise
enum MoveDirection {
    Left, Up, Right, Down,
    Resting,         // sprite is at rest
    Moving,          // this is wildcard for Left-Down
    Any              // this is wildcard for Left-Resting
}

enum ButtonArg {
    Left, Up, Right, Down, A, B
}

type RuleArg = number | ButtonArg;

// TODO: need a way to address a whole class of sprite, possibly to select a single sprite

enum CommandType {
    Move,           // sprite move in (MoveDirection) + Stop, UTurn
    Paint,          // paint a tile with a background
    Spawn,          // spawn a sprite at a tile going in a direction (requires 4-bits for sprite and 4-bits for direction)
    Sprite,         // various commands for sprites
    Game,           // various top-level game commands
    Last,
}

// arguments to Move command (the last two are only used in Colliding rules)
enum MoveArg {
    Left, Up, Right, Down,
    Stop, UTurn,
}

// arguments to affect the state of the sprite (other than movement)
enum SpriteArg {
    Remove,         // self sprite eats the other sprite
}

// only Win, Lose implemented so far
enum GameArg {
    Win, Lose, 
    ScoreUp,
    NextLevel
}

enum AttrType {
    OK,        // don't care
    Include,   // tile must contain one from kind
    Exclude,   // tile cannot contain this kind
    Pinned     // for pinned sprite at center (2,2)
}

class Command {
    constructor(
        public inst: CommandType,                           // one byte
        public arg: MoveArg | SpriteArg | GameArg | number  // one byte
    ) { }
}

// this represents a predicate in the neighborhood centered at (2,2), at most two steps from center
// in Manhattan distance. 
class WhenDo {
    constructor(
        public col: number,            // the guards and commands associated with a tile in the neighborhood
        public row: number,            // (2,2) is the center of neighborhood, graphics coordinate system
        public backgrounds: AttrType[],     // predicate on background
        public sprites: AttrType[],         // predicate on sprites
        public dir: MoveDirection,     // direction to match against (for movable sprite)
        public commands: Command[]     // the commands that execute if the guard succeeds
    ) { }
}

class Rule {
    constructor( 
        public ruleType: RuleType,  // the type of rule
        public ruleArg: number,     // rule argument
        public whenDo: WhenDo[]     // guarded commands
    ) { }
}

// how to represent mirrored, rotated rules??

class IdRule {
    constructor(
        public id: number,
        public rule: Rule,
        public locked: boolean,     // prevent the user from editing this rule, 
                                    // which may be a mirror or fourway rule
        public mirror: number,      // the rules that are views on this rule
        public fourway: number[]
    ) { }
}
// transform: FlipRotate of rule with different id

enum FlipRotate { Horizontal, Vertical, Left, Right };

namespace tileworld {

    export function makeNewRule(rt: RuleType, ra: RuleArg, kind: number[], dir: MoveDirection): Rule {
        // TODO: need to initialize based on kind and dir for center sprite
        return new Rule(rt, ra, []);
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

    export function transformCol(col: number, row: number, fr: FlipRotate) {
        if (fr == FlipRotate.Horizontal || fr == FlipRotate.Vertical)
            return fr == FlipRotate.Horizontal ? 4 - col : col;
        else {
            // make (0,0) center for rotation
            row = 2 - row;
            return fr == FlipRotate.Left ? (-row) + 2 : row + 2;
        }
    }

    export function transformRow(row: number, col: number, fr: FlipRotate) {
        if (fr == FlipRotate.Horizontal || fr == FlipRotate.Vertical)
            return fr == FlipRotate.Horizontal ? row : 4 - row;
        else {
            col = col - 2;
            return fr == FlipRotate.Left ? (-col) + 2 : col + 2;
        }
    }

    let ruleBuf: Buffer = null
    let bitIndex = 0;

    function readWriteBuf(v: number, bits: number, write: boolean) {
        let byteIndex = bitIndex >> 3;
        if (byteIndex >= ruleBuf.length) {
            // shouldn't get here
            control.assert(false, 43);
        }
        let shift = bitIndex - (byteIndex << 3);
        if (shift + bits > 8) {
            // packing error - can't have value that spans byte boundary
            console.logValue("shift", shift);
            console.logValue("bits", bits);
            control.assert(false, 44);
        }
        let byte = ruleBuf.getUint8(byteIndex);
        let mask = 0;
        for(let i=0; i<bits; i++) { mask = 0x1 | (mask << 1); }
        // make sure we only keep the proper number of bits from v
        v = v & mask;
        mask = mask << shift;
        let writeMask = mask ^ 0xffffffff;

        if (write) {
            let newVal = (byte & writeMask) | (v << shift);
            ruleBuf.setUint8(byteIndex, newVal);
        }
        
        bitIndex += bits;

        byte = ruleBuf.getUint8(byteIndex);
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
    export function packRule(r: Rule) {
        bitIndex = 0;
        // compute length (at most 13 whenDo, at most 5 whenDo have commands)
        // so max = 3 + 39 + 20 = 62
        let len = 4 + r.whenDo.length * 3;
        for (let i = 0; i<r.whenDo.length; i++) {
            len += (r.whenDo[i].commands.length > 0 ? 4 : 0);
        }
        ruleBuf = control.createBuffer(len);

        r.kind.forEach(v => { writeBuf(v, 4); });   // 2 bytes
        // pad out the rest with 0xf
        for(let i = r.kind.length; i < 4; i++) { writeBuf(0xf, 4); }

        writeBuf(r.rt, 4);
        writeBuf(r.dir, 4);                         // 3 bytes
        // how many when dos do we have
        writeBuf(r.whenDo.length, 4);               // 3.5 bytes
        // should we establish an order??
        // TODO: optimization - remove whendo that are true have no command (waste of space and time)
        r.whenDo.forEach(wd => {
            colRowToLRUD(wd.col, wd.row);                       // + .5 byte
            wd.predicate.forEach(a => { writeBuf(a, 2);  });        // +2 bytes
            for (let cnt = wd.predicate.length; cnt < 8; cnt++) { writeBuf(0, 2); }
            writeBuf(wd.commands.length, 4);                    // +.5 byte
        });
        // align to byte
        writeBuf(0,4);
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
        return ruleBuf;
    }

    // first, let's fully unpack
    export function unPackRule(buf: Buffer) {
        ruleBuf = buf;
        bitIndex = 0;
        let kinds = [];
        for(let i = 0; i<4; i++) {
          let kind = readBuf(4);
          if (kind != 0xf) kinds.push(kind);
        }
        let rt = readBuf(4);
        let dir = readBuf(4);
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
            let whenDo = new WhenDo(col, row, [], 0, []);
            for(let a = 0; a < 8; a++) {
                let attr = readBuf(2);
                whenDo.predicate.push(attr);
            }
            let cmdLen = readBuf(4);
            if (cmdLen > 0) hasCommands.push(whenDo);
            rule.whenDo.push(whenDo);
        }
        readBuf(4);
        hasCommands.forEach(wd => {
            for(let i = 0; i < 4; i++) {
                let inst = readBuf(4);
                let arg = readBuf(4);
                if (inst != 0xf) {
                    wd.commands.push(new Command(inst, arg));
                }
            }
        })
        return rule;
    }
}
