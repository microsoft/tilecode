// the VM takes a program and a map and executes the program
// this VM is independent of the underlying game engine, which
// is abstracted by an interface. 

// - debugging API
//    - which rules are ready to run? showing match in world?
//    - which ones get to run?

const signalImage = img`
    . . . . . . . . . . . . . . . .
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
    . 1 1 . . . . . . . . . . 1 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . 1 1 . . . . . 1 .
    . 1 . . . . . 1 1 . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 1 . . . . . . . . . . 1 1 .
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
    . . . . . . . . . . . . . . . .
`;

namespace tileworld {

    // TODO: dpad
    // TODO: game mechanics
    // TODO: generalization

    //    createSprite: (col: number, row: number, kind: number, dir: TileDir) => T;
    //    moveSprite: (sprite: T, dir:TileDir) => void;
    //    reverseSprite: (sprite: T, dir: TileDir) => void;
    //    stopSprite: (sprite: T) => void;
    //    destroySprite: (sprite: T) => void;
    //    update(): () => void;
    
    class TileSprite extends Sprite {
        // the direction the sprite is currently moving
        public dir: MoveDirection;
        // the one instruction history to apply to the sprite to 
        // create the next sprite state
        public inst: number;
        public arg: number;
        constructor(img: Image, kind: number) {
            super(img);
            const scene = game.currentScene();
            scene.physicsEngine.addSprite(this);
            this.setKind(kind);
            this.dir = MoveDirection.None
            this.inst = -1; 
        }
        public col() { return this.x >> 4; }
        public row() { return this.y >> 4; }
        public update() {
            this.dir = this.inst == CommandType.Move ? this.arg : MoveDirection.None;
            this.vx = this.dir == MoveDirection.Left ? -100 : this.dir == MoveDirection.Right ? 100 : 0;
            this.vy = this.dir == MoveDirection.Up ? -100 : this.dir == MoveDirection.Down ? 100 : 0;
        }
    }

    class RuleClosure {
        constructor(
            public rid: number,
            public self: TileSprite,
            public witnesses: TileSprite[]) {
        }
    }

    enum Phase { Moving, Resting, Colliding};

    export class TileWorldVM {
        private world: Image;
        private nextWorld: Image;
        private sprites: TileSprite[][];
        private signal: TileSprite;

        constructor(private manager: ImageManager, private rules: number[]) {
            // not running yet
        }

        public setWorld(w: Image) {
            game.consoleOverlay.setVisible(true);
            this.signal = null;
            this.sprites = [];
            this.world = w.clone();
            this.nextWorld = w.clone();
            scene.setTileMap(this.world);
            // set art for fixed sprites
            for(let code = 0; code < this.manager.fixed().length; code++) {
                let art = this.manager.getImage(code);
                scene.setTile(code, art);
            }
            // initialize movable sprites
            for(let kind = this.manager.fixed().length; 
                    kind < this.manager.all().length; kind++) {
                this.sprites[kind] = [];
                let tiles = scene.getTilesByType(kind);
                let art = this.manager.getImage(kind);
                // now, put a space where every movable sprite was
                scene.setTile(kind, this.manager.getImage(this.manager.defaultTile));
                for (let value of tiles) {
                    let tileSprite = new TileSprite(art, kind);
                    this.sprites[kind].push(tileSprite);
                    value.place(tileSprite);
                }
            }
        }

        public start() {
            let signal = new TileSprite(signalImage, 0);
            signal.setFlag(SpriteFlag.Invisible, true);
            signal.x = signal.y = 8;
            signal.dir = MoveDirection.Right;
            signal.inst = -1
            this.signal = signal;

            this.round();
            
            game.onUpdate(() => {
                // has signal sprite moved to new tile
                // then do a worldUpdate and reset the signal sprite
                // console.logValue("x", this.signal.x)
                if (this.signal.x >= 23) {
                    this.signal.x = 8;
                    this.round();
                }
            });

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
            });
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
            });
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
            });
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
            });

            signal.vx = 100;
        } 

        private ruleClosures: RuleClosure[];
        private round() {
            // make sure everyone is centered
            this.allSprites(ts => {
                ts.x = ((ts.x >> 4) << 4) + 8;
                ts.y = ((ts.y >> 4) << 4) + 8;
            })
            // compute the "pre-effect" of the rules
            this.ruleClosures = [];
            this.applyRules(Phase.Moving);
            this.applyRules(Phase.Resting);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            // now, look for collisions
            this.collisionDetection();
            // finally, update the rules
            this.updateWorld();
        }

        private matchingRules(phase: Phase, ts: TileSprite) {
            return this.rules.filter(rid => {
                return getKinds(rid).indexOf(ts.kind()) != -1 && 
                    (  (phase == Phase.Moving && getDir(rid) == ts.dir &&
                        (getType(rid) == RuleType.Moving || getType(rid) == RuleType.Pushing) )
                    || (phase == Phase.Resting && getType(rid) == RuleType.Resting) 
                    );
            });
        }

        private allSprites(handler: (ts:TileSprite) => void) {
            this.sprites.forEach(ls => {
                if (ls) ls.forEach(ts => handler(ts));
            });
        }


        private applyRules(phase: Phase) {
            // clear the state
            if (phase == Phase.Moving) {
                this.nextWorld.fill(0xf);
                this.allSprites(ts => {  ts.inst = -1; });
            }
            // apply rules
            this.allSprites(ts => { 
                if ( (phase == Phase.Moving && ts.dir != MoveDirection.None) ||
                     (phase == Phase.Resting && (ts.dir == MoveDirection.None ||
                         ts.inst != CommandType.Move)) ) {
                    let rules = this.matchingRules(phase, ts);
                    rules.forEach(rid => this.evaluateRule(ts, rid) );
                }
            });
        }

        private collisionDetection() {
            // for each sprite ts that is NOW moving (into T):
            // - look for colliding sprite os != ts, as defined
            //   (a) os in square T, resting or moving towards ts, or
            //   (b) os moving into T
        }

        private updateWorld() {
            this.allSprites(ts => ts.update() );
            // change tiles (can be done with less memory and time assuming few
            // tiles are changed).
            for(let x=0;x<this.nextWorld.width();x++) {
                for (let y = 0; y < this.nextWorld.height(); y++) {
                    if (this.nextWorld.getPixel(x,y) != 0xf)
                        this.world.setPixel(x,y,this.nextWorld.getPixel(x,y));
                }                
            }
        }

        // store the sprite witnesses identified by guards
        private evaluateRule(ts: TileSprite, rid: number) {
            let witnesses: TileSprite[] = [];
            for(let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    if (Math.abs(2-col) + Math.abs(2-row) > 2 ||
                        col == 2 && row == 2)
                        continue;
                    if (!this.evaluateWhenDo(ts, rid, col, row, witnesses))
                        return;
                }
            }
            // this is all that is needed for closure
            this.ruleClosures.push(new RuleClosure(rid, ts, witnesses));
        }

        private getWitness(kind: number, col: number, row: number) {
            return this.sprites[kind] && this.sprites[kind].find(ts => ts.col() == col && ts.row() == row);
        }

        private evaluateWhenDo(ts: TileSprite, rid: number, 
                col: number, row: number, witnesses: TileSprite[]) {
            let whendo = getWhenDo(rid, col, row);
            if (whendo == -1)
                return true;
            let wcol = ts.col() + (col - 2);
            let wrow = ts.row() + (row - 2);
            let oneOf: boolean = false;
            let oneOfPassed: boolean = false;
            let captureWitness: TileSprite = null;
            let kind = 0
            for(;kind<this.manager.fixed().length;kind++) {
                let hasKind = this.world.getPixel(wcol, wrow) == kind;
                let attr = getAttr(rid, whendo, kind);
                if (attr == AttrType.Exclude && hasKind ||
                    attr == AttrType.Include && !hasKind) {
                    return false;
                } else if (attr == AttrType.OneOf) {
                    oneOf = true;
                    if (hasKind) oneOfPassed = true;
                }
            }
            for(;kind<this.manager.all().length; kind++) {
                let attr = getAttr(rid, whendo, kind);
                let witness = this.getWitness(kind, wcol, wrow);
                if (attr == AttrType.Exclude && witness) {
                    return false;
                } else if (attr == AttrType.Include) {
                    if (!witness) return false;
                    if (!captureWitness)
                        captureWitness = witness;
                } else if (attr == AttrType.OneOf) {
                    oneOf = true;
                    if (witness) oneOfPassed = true;
                    if (!captureWitness)
                        captureWitness = witness;
                }
            }
            let ret = !oneOf || oneOfPassed;
            if (ret && Math.abs(2 - col) + Math.abs(2 - row) <= 1) {
                if (captureWitness)
                    witnesses.push(captureWitness);
            }
            return ret;
        }
    
        private evaluateRuleClosure(rc: RuleClosure) {
            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    if (Math.abs(2 - col) + Math.abs(2 - row) > 2)
                        continue;
                    this.evaluateWhenDoCommands(rc, col, row);
                }
            }
        }

        private evaluateWhenDoCommands(rc: RuleClosure, col: number, row: number) {
            let wid = getWhenDo(rc.rid, col, row);
            if (wid == -1 || getInst(rc.rid, wid, 0) == -1)
                return;
            let wcol = rc.self.col() + (2 - col);
            let wrow = rc.self.row() + (2 - row);
            let self = col == 2 && row == 2;
            for (let cid = 0; cid < 4; cid++) {
                let inst = getInst(rc.rid, wid, cid);
                if (inst == -1) break;
                if (inst == CommandType.Paint) {
                    if (this.nextWorld.getPixel(wcol,wrow) == 0xf) {
                        this.nextWorld.setPixel(wcol, wrow, getArg(rc.rid, wid, cid));
                    }
                } else if (inst == CommandType.Move) {
                    let witness = self ? rc.self : rc.witnesses.find(ts => ts.col() == wcol && ts.row() == wrow);
                    if (witness && witness.inst == -1) {
                        witness.inst = inst;
                        witness.arg = getArg(rc.rid, wid, cid);
                    }
                }
            }
        }
    }
}
