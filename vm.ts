// - debugging API
//    - which rules are ready to run? showing match in world?
//    - which ones get to run?

//    createSprite: (col: number, row: number, kind: number, dir) => T;
//    moveSprite: (sprite: T, dir) => void;
//    reverseSprite: (sprite: T, dir) => void;
//    stopSprite: (sprite: T) => void;
//    destroySprite: (sprite: T) => void;
//    update(): () => void;

// TODO: checking for no more diamonds? how to end game?

// bugs: 
// - boulder at rest falls through player

namespace tileworld {

    class TileSprite extends Sprite {
        // the direction the sprite is currently moving
        public dir: MoveDirection;
        // the one instruction history to apply to the sprite to 
        // create the next sprite state
        public inst: number;
        public arg: number;
        // collision instruction
        public collide: number;
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

    class VMState {
        public fixed: number;
        public all: number;
        public world: Image;
        public nextWorld: Image;
        public sprites: TileSprite[][];
        constructor() {}
    }

    class RuleClosure {
        constructor(
            public rid: number,
            public self: TileSprite,
            public witnesses: TileSprite[]) {
        }
    }

    enum Phase { Moving, Resting, Colliding};

    class TileWorldVM {
        private ruleClosures: RuleClosure[];
        private gs: VMState;
        private dpad: MoveDirection
        // special (temporary) state for collision detection
        private moving: TileSprite[];
        private other: TileSprite;

        constructor(private rules: number[]) {
            this.gs = null;
        }

        public setState(gs: VMState) {
            this.gs = gs;
        }

        public round(currDir: MoveDirection) {
            if (!this.gs)
                return;
            this.dpad = currDir;
            this.moving = [];
            // make sure everyone is centered
            this.allSprites(ts => {
                ts.x = ((ts.x >> 4) << 4) + 8;
                ts.y = ((ts.y >> 4) << 4) + 8;
            })
            this.other = null;
            // compute the "pre-effect" of the rules
            this.ruleClosures = [];
            this.applyRules(Phase.Moving);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            this.ruleClosures = [];
            this.applyRules(Phase.Resting);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            // now, look for collisions
            this.ruleClosures = [];
            //this.collisionDetection();
            //this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            // finally, update the rules
            this.updateWorld();
        }

        private matchingRules(phase: Phase, ts: TileSprite, handler: (ts: TileSprite, rid:number) => void) {
            this.rules.forEach(rid => {
                if (   getKinds(rid).indexOf(ts.kind()) != -1 && 
                    (  phase == Phase.Moving && getDir(rid) == ts.dir && getType(rid) == RuleType.Moving
                    || phase == Phase.Resting && getType(rid) == RuleType.Resting
                    || getDir(rid) == this.dpad && getType(rid) == RuleType.Pushing) ) 
                {
                    handler(ts,rid);
                }
            });
        }

        private allSprites(handler: (ts:TileSprite) => void) {
            this.gs.sprites.forEach(ls => { if (ls) ls.forEach(ts => handler(ts)); });
        }

        private applyRules(phase: Phase) {
            // clear the state
            if (phase == Phase.Moving) {
                this.gs.nextWorld.fill(0xf);
                this.allSprites(ts => {  ts.inst = -1; });
            }
            // apply rules
            this.allSprites(ts => { 
                if ( (phase == Phase.Moving && ts.dir != MoveDirection.None) ||
                     (phase == Phase.Resting && (ts.dir == MoveDirection.None ||
                         ts.inst != CommandType.Move)) ) {
                    let witnesses: TileSprite[] = [];
                    this.matchingRules(phase, ts, (ts,rid) => {
                        let closure = this.evaluateRule(ts, rid);
                        if (closure)
                            this.ruleClosures.push(closure);
                    });
                }
            });
        }

        private collidingRules(ts: TileSprite, handler: (ts: TileSprite, rid: number) => void) {
            this.rules.forEach(rid => {
                if (getKinds(rid).indexOf(ts.kind()) != -1 && 
                    getType(rid) == RuleType.Colliding &&
                    getDir(rid) == ts.dir) {
                        handler(ts, rid);
                }
            });
        }

        // for each sprite ts that is NOW moving (into T):
        // - look for colliding sprite os != ts, as defined
        //   (a) os in square T, resting or moving towards ts, or
        //   (b) os moving into T
        // TODO: this can be optimized, a lot
        private collisionDetection() {
            this.allSprites(ts => { if (ts.inst == CommandType.Move) this.moving.push(ts) }); 
            this.moving.forEach(ts => {
                if (ts.inst != CommandType.Move) return;
                this.collidingRules(ts, (ts,rid) => {
                    let wcol = ts.col() + moveXdelta(ts.arg);
                    let wrow = ts.row() + moveYdelta(ts.arg);
                    this.other = null;
                    // T = (wcol, wrow)
                    this.allSprites(os => {
                        if (os == ts) return;
                        // (a) os in square T, resting or moving towards ts, or
                        if (os.col() == wcol && os.row() == wrow) {
                            if (os.inst != CommandType.Move || oppDir(ts.arg,os.arg))
                                this.collide(rid, ts, os, wcol, wrow);
                        } else {
                            let leftRotate = flipRotateDir(ts.arg, FlipRotate.Left);
                            let osCol = wcol + moveXdelta(leftRotate);
                            let osRow = wrow + moveYdelta(leftRotate);
                            if (os.col() == osCol && os.row() == osRow && 
                                os.inst == CommandType.Move && oppDir(leftRotate,os.arg)) {
                                this.collide(rid, ts, os, wcol, wrow);
                            }
                            let rightRotate = flipRotateDir(ts.arg, FlipRotate.Right);
                            osCol = wcol + moveXdelta(rightRotate);
                            osRow = wrow + moveYdelta(rightRotate);
                            if (os.col() == osCol && os.row() == osRow &&
                                os.inst == CommandType.Move && oppDir(rightRotate, os.arg)) {
                                this.collide(rid, ts, os, wcol, wrow);
                            }
                        }
                    });
                });
            });
        }

        private collide(rid: number, ts: TileSprite, os: TileSprite, ocol: number, orow: number) {
            let witnesses: TileSprite[] = [];
            let ret = this.evaluateWhenDo(ts, rid, ocol, orow, witnesses);
            if (ret) {
                this.ruleClosures.push(new RuleClosure(rid, ts, witnesses));
            }
        }

        private updateWorld() {
            this.allSprites(ts => ts.update() );
            // change tiles (can be done with less memory and time assuming few
            // tiles are changed).
            for(let x = 0; x < this.gs.nextWorld.width(); x++) {
                for (let y = 0; y < this.gs.nextWorld.height(); y++) {
                    let pixel = this.gs.nextWorld.getPixel(x, y);
                    if (pixel != 0xf)
                        this.gs.world.setPixel(x, y, pixel);
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
                        return null;
                }
            }
            return new RuleClosure(rid, ts, witnesses);
        }

        private getWitness(kind: number, col: number, row: number) {
            return this.gs.sprites[kind] && this.gs.sprites[kind].find(ts => ts.col() == col && ts.row() == row);
        }

        private inBounds(col: number, row: number) {
            return 0 <= col && col < this.gs.world.width() &&
                   0 <= row && row < this.gs.world.height();
        }

        private evaluateWhenDo(ts: TileSprite, rid: number, 
                col: number, row: number, witnesses: TileSprite[]) {
            let whendo = getWhenDo(rid, col, row);
            if (whendo == -1)
                return true;
            let wcol = ts.col() + (col - 2);
            let wrow = ts.row() + (row - 2);
            if (!this.inBounds(wcol, wrow))
                return false;
            let oneOf: boolean = false;
            let oneOfPassed: boolean = false;
            let captureWitness: TileSprite = null;
            for(let kind = 0; kind < this.gs.fixed; kind++) {
                let hasKind = this.gs.world.getPixel(wcol, wrow) == kind;
                let attr = getAttr(rid, whendo, kind);
                if (attr == AttrType.Exclude && hasKind ||
                    attr == AttrType.Include && !hasKind) {
                    return false;
                } else if (attr == AttrType.OneOf) {
                    oneOf = true;
                    if (hasKind) oneOfPassed = true;
                }
            }
            for(let kind = this.gs.fixed; kind<this.gs.all; kind++) {
                let attr = getAttr(rid, whendo, kind);
                let witness = this.getWitness(kind, wcol, wrow);
                if (this.other && this.other.kind() == kind)
                    witness = this.other;
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
            let wcol = rc.self.col() + (col - 2);
            let wrow = rc.self.row() + (row - 2);
            let self = col == 2 && row == 2;
            for (let cid = 0; cid < 4; cid++) {
                let inst = getInst(rc.rid, wid, cid);
                if (inst == -1) break;
                if (inst == CommandType.Paint) {
                    if (this.gs.nextWorld.getPixel(wcol, wrow) == 0xf) {
                        this.gs.nextWorld.setPixel(wcol, wrow, getArg(rc.rid, wid, cid));
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

    export class RunGame {
        private vm: TileWorldVM;
        private signal: TileSprite;
        private state: VMState;
        constructor(private manager: ImageManager, rules: number[]) {
            this.vm = new TileWorldVM(rules)
            //game.consoleOverlay.setVisible(true);
        }
        
        public setWorld(w: Image) {
            this.dirQueue = [];
            this.signal = null;
            this.state = new VMState();
            this.state.fixed = this.manager.fixed().length;
            this.state.all = this.manager.all().length;
            this.state.sprites = [];
            this.state.world = w.clone();
            this.state.nextWorld = w.clone();
            scene.setTileMap(this.state.world);
            // set art for fixed sprites
            for (let code = 0; code < this.manager.fixed().length; code++) {
                let art = this.manager.getImage(code);
                scene.setTile(code, art);
            }
            // initialize movable sprites
            for (let kind = this.manager.fixed().length;
                kind < this.manager.all().length; kind++) {
                this.state.sprites[kind] = [];
                let tiles = scene.getTilesByType(kind);
                let art = this.manager.getImage(kind);
                // now, put a space where every movable sprite was
                scene.setTile(kind, this.manager.getImage(this.manager.defaultTile));
                for (let value of tiles) {
                    let tileSprite = new TileSprite(art, kind);
                    this.state.sprites[kind].push(tileSprite);
                    value.place(tileSprite);
                }
            }
        }

        public start() {
            let signal = new TileSprite(cursorIn, 0);
            signal.setFlag(SpriteFlag.Invisible, true);
            signal.x = signal.y = 8;
            signal.dir = MoveDirection.Right;
            signal.inst = -1
            this.signal = signal;

            // get the game started
 
            let playerId = this.manager.getPlayer();
            if (playerId != -1 && this.state.sprites[playerId]) {
                scene.cameraFollowSprite(this.state.sprites[playerId][0]);
            }

            this.vm.setState(this.state);
            this.vm.round(MoveDirection.None);
            game.onUpdate(() => {
                // has signal sprite moved to new tile
                // then do a worldUpdate and reset the signal sprite
                if (this.signal.x >= 23) {
                    this.signal.x = 8;
                    let currentDirection = this.dirQueue.length > 0 ? this.dirQueue[0] : MoveDirection.None;
                    this.vm.round(currentDirection);
                    if (currentDirection != MoveDirection.None) {
                        if (!this.keyDowns[currentDirection])
                            this.dirQueue.removeElement(currentDirection);
                    }
                }
            });

            this.keyDowns = [false, false, false, false, false];
            this.registerController();
            signal.vx = 100;
        }

        private registerController() {
            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Left)
            })
            controller.left.onEvent(ControllerButtonEvent.Released, () => {
                this.requestStop(MoveDirection.Left)
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Right)
            })
            controller.right.onEvent(ControllerButtonEvent.Released, () => {
                this.requestStop(MoveDirection.Right)
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Up)
            })
            controller.up.onEvent(ControllerButtonEvent.Released, () => {
                this.requestStop(MoveDirection.Up)
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Down)
            })
            controller.down.onEvent(ControllerButtonEvent.Released, () => {
                this.requestStop(MoveDirection.Down)
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            })
        }
        private dirQueue: MoveDirection[];
        private keyDowns: boolean[];
        private requestMove(dir: MoveDirection) {
            this.keyDowns[dir] = true;
            if (this.dirQueue.length == 0 || this.dirQueue.length == 1 && dir != this.dirQueue[0])
                this.dirQueue.insertAt(0,dir);
        }

        private requestStop(dir: MoveDirection) {
            this.keyDowns[dir] = false;
            let index = this.keyDowns.indexOf(true);
            if (index != -1 && this.dirQueue.length == 0)
                this.dirQueue.push(index);
        }
    }
}
