// in memory program representation

// enums must fit in 4 bits (16 values maximum)

// the first three rule types should have a self (centered) witness sprite
// that is moving in a direction from MoveDirection

// the collision rule has two identified sprites (self, other)
// the self sprite has a direction in MoveDirection 
// other other sprite is either Resting, Moving, or AnyDir

enum RuleType {
    ButtonPress,    // user button press
    ContextChange,  // neighborhood changed
    Collision,      // sprite collision
    NegationCheck,  // check spec
    FirstRule = ButtonPress,
    LastRule = Collision
};

// directions are 0-3 and move clockwise
enum MoveDirection {
    Left, Up, Right, Down
}

const Resting = 4;
const Moving = 5;
const AnyDir = 6;

type Resting = 4;
type Moving = 5;
type AnyDir = 6;

type MoveRest = MoveDirection | Resting

type MoveExpr = MoveRest | Moving | AnyDir;

enum ButtonArg {
    Left, Up, Right, Down, A, B
}

type RuleArg = number | ButtonArg;

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
    Include,   // tile must contain one from this
    Include2,  // second include set
    Exclude,   // tile cannot contain this
}

class Command {
    constructor(
        public inst: CommandType,                           // one byte
        public arg: MoveArg | SpriteArg | GameArg | number  // one byte
    ) { }
}

const MaxCommands = 4;

// a tile "predicate" at (col,row), where (2,2) is center and associated commands
// ties together coordinate, predicate, and actions. It's useful to pair the first
// two since we don't expect many predicates 
class WhenDo {
    constructor(
        public col: number,             // the guards and commands associated with a tile in the neighborhood
        public row: number,             // (2,2) is the center of neighborhood, graphics coordinate system
        public bgPred: Buffer = null,   // predicate on background (2 bits per background)
        public spPred: Buffer = null,   // predicate on sprites (2 bits for sprite)
        public dir: MoveDirection = 0xffff, // direction to match against (for movable sprite)
        public commands: Buffer = null, // the commands that execute if the guard succeeds (2 bytes per command)
        public commandsLen: number = 0
    ) { }
}

enum RuleViews { Single, Mirrored, FourWay };

class Rule {
    constructor( 
        public ruleType: RuleType,  // the type of rule
        public ruleArg: number,     // rule argument
        public whenDo: WhenDo[],    // guarded commands
        public view: RuleViews = RuleViews.Single
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

    export function makeNewRule(rt: RuleType, ra: RuleArg): Rule {
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

    // must be byte-aligned when writing a raw buffer
    function writeBufRaw(b: Buffer, cnt: number) {
        for(let i=0;i<cnt;i++) {
            writeBuf(b.getUint8(i), 8);
        }
    }

    function readBuf(bits: number) {
        return readWriteBuf(0, bits, false);
    }

    // must be byte-aligned when reading a raw buffer
    function readBufRaw(bytes: number, cnt: number) {
        let b = control.createBuffer(bytes);
        for (let i = 0; i < cnt; i++) {
            b.setUint8(i,readBuf(8));
        }
        return b;
    }

    // pack things so that they'll be easy to read off
    export function packRule(r: Rule, bgLen: number, spLen: number) {
        bitIndex = 0;
        let bytes = 2 + r.whenDo.length + (2 + (bgLen >> 2) + (spLen >> 2));
        for (let i = 0; i<r.whenDo.length; i++) {
            bytes += (r.whenDo[i].commands.length > 0 ? 8 : 0);
        }
        ruleBuf = control.createBuffer(bytes);
        writeBuf(r.ruleType, 4);
        writeBuf(r.ruleArg, 4);
        writeBuf(r.whenDo.length, 4);
        writeBuf(0, 4);                         // 2 bytes
        r.whenDo.forEach(wd => {
            writeBuf(wd.col, 4);
            writeBuf(wd.row, 4);                // + 1 byte
            writeBufRaw(wd.bgPred, bgLen)       // + {1, 2, 3} byte  
            writeBufRaw(wd.spPred, spLen);      // + {1, 2, 3} byte  
            writeBuf(wd.commands.length, 4);                   
            writeBuf(0, 4);                     // + 1 byte
        });
        // now, write out the commands
        r.whenDo.forEach(wd => {
            if (wd.commands.length > 0) {
                writeBufRaw(wd.commands, wd.commandsLen << 1);
            }
        });
        return ruleBuf;
    }

    // first, let's fully unpack
    export function unPackRule(buf: Buffer, bgLen: number, spLen: number) {
        ruleBuf = buf;
        bitIndex = 0;
        let rt = readBuf(4);
        let ra = readBuf(4);
        let rule = new Rule(rt, ra, []);
        let whenDoLen = readBuf(4);
        readBuf(4);
        for(let i = 0; i<whenDoLen; i++) {
            let col = readBuf(4);
            let row = readBuf(4);
            let wd = new WhenDo(col, row,
                    readBufRaw(bgLen >> 2, bgLen >> 2),
                    readBufRaw(spLen >> 2, spLen >> 2), 
                    -1, 
                    null);
            rule.whenDo.push(wd);
            wd.commandsLen = readBuf(4);
            readBuf(4);
        }
        rule.whenDo.forEach(wd => {
            if (wd.commandsLen > 0) {
                wd.commands = readBufRaw(MaxCommands << 1, wd.commandsLen << 1);
            } else {
                wd.commands = control.createBuffer(MaxCommands << 1);
            }
        });
        return rule;
    }
}
