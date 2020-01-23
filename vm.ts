// - debugging API
//    - which rules are ready to run? showing match in world?
//    - which ones get to run?

namespace tileworld {

    enum SpriteState { Alive, Dead, }

    class TileSprite extends Sprite {
        public state: SpriteState;
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
            this.dir = -1;
            this.inst = -1;
            this.state = SpriteState.Alive;
        }
        public col() { return this.x >> 4; }
        public row() { return this.y >> 4; }
        public update() {
            this.dir = this.inst == CommandType.Move ? this.arg : -1;
            this.vx = this.dir == MoveDirection.Left ? -100 : this.dir == MoveDirection.Right ? 100 : 0;
            this.vy = this.dir == MoveDirection.Up ? -100 : this.dir == MoveDirection.Down ? 100 : 0;
        }
    }

    enum GameState { InPlay, Won, Lost, };

    class VMState {
        public game: GameState;
        public fixed: number;
        public all: number;
        public nextWorld: Image;
        public sprites: TileSprite[][];
        public deadSprites: TileSprite[];
        constructor() {}
    }

    class RuleClosure {
        constructor(
            public rid: number,
            public self: TileSprite,
            public witnesses: TileSprite[]) {
        }
    }

    enum Phase { Moving, Resting, Colliding };

    class TileWorldVM {
        private ruleClosures: RuleClosure[];
        private gs: VMState;
        private dpad: MoveDirection
        // (temporary) state for global commands
        private globalInsts: number[];
        private globalArgs: number[];

        constructor(private p: Project, private rules: number[]) {
            this.gs = null;
        }

        public setState(gs: VMState) {
            this.gs = gs;
        }

        public round(currDir: MoveDirection) {
            if (!this.gs)
                return;
            this.dpad = currDir;
            this.globalInsts = [];
            this.globalArgs = [];
            this.gs.deadSprites = [];
            // make sure everyone is centered
            this.allSprites(ts => {
                ts.x = ((ts.x >> 4) << 4) + 8;
                ts.y = ((ts.y >> 4) << 4) + 8;
            })
            this.gs.nextWorld.fill(0xf);
            this.allSprites(ts => { ts.inst = -1; });
            // compute the "pre-effect" of the rules
            this.ruleClosures = [];
            this.applyRules(Phase.Moving);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            this.ruleClosures = [];
            this.applyRules(Phase.Resting);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            // now, look for collisions
            this.ruleClosures = [];
            // TODO: need a fix point around this, as new collisions may occur
            // TODO: as moving sprites transition to resting sprites
            let moving: TileSprite[] = []
            this.allSprites(ts => { if (ts.inst == CommandType.Move) moving.push(ts) }); 
            this.collisionDetection(moving);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            // finally, update the rules
            this.updateWorld();
        }

        private matchingRules(phase: Phase, ts: TileSprite, handler: (ts: TileSprite, rid:number) => void) {
            this.rules.forEach(rid => {
                if (   this.p.getKinds(rid).indexOf(ts.kind()) != -1 && 
                    (  phase == Phase.Moving && this.p.getDir(rid) == ts.dir && this.p.getType(rid) == RuleType.Moving
                    || phase == Phase.Resting && this.p.getType(rid) == RuleType.Resting
                    || this.p.getDir(rid) == this.dpad && this.p.getType(rid) == RuleType.Pushing) ) 
                {
                    handler(ts,rid);
                }
            });
        }

        public allSprites(handler: (ts:TileSprite) => void) {
            this.gs.sprites.forEach(ls => { if (ls) ls.forEach(ts => handler(ts)); });
        }

        private applyRules(phase: Phase) {
            this.allSprites(ts => { 
                if ( (phase == Phase.Moving && ts.dir != -1) ||
                     (phase == Phase.Resting && (ts.dir == -1 ||
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
                if (this.p.getKinds(rid).indexOf(ts.kind()) != -1 && 
                    this.p.getType(rid) >= RuleType.CollidingResting &&
                    this.p.getDir(rid) == ts.dir) {
                        handler(ts, rid);
                }
            });
        }

        // for each sprite ts that is NOW moving (into T):
        // - look for colliding sprite os != ts, as defined
        //   (a) os in square T, resting or moving towards ts, or
        //   (b) os moving into T
        // TODO: this can be optimized, a lot
        private collisionDetection(against: TileSprite[]) {
            against.forEach(ts => {
                if (ts.inst != CommandType.Move) return;
                this.collidingRules(ts, (ts,rid) => {
                    let wcol = ts.col() + moveXdelta(ts.arg);
                    let wrow = ts.row() + moveYdelta(ts.arg);
                    // T = (wcol, wrow)
                    this.allSprites(os => {
                        if (os == ts) return;
                        // (a) os in square T, resting or moving towards ts, or
                        if (os.col() == wcol && os.row() == wrow) {
                            if (os.inst != CommandType.Move || oppDir(ts.arg,os.arg))
                                this.collide(rid, ts, os);
                        } else {
                            let leftRotate = flipRotateDir(ts.arg, FlipRotate.Left);
                            let osCol = wcol + moveXdelta(leftRotate);
                            let osRow = wrow + moveYdelta(leftRotate);
                            if (os.col() == osCol && os.row() == osRow && 
                                os.inst == CommandType.Move && oppDir(leftRotate,os.arg)) {
                                this.collide(rid, ts, os);
                            }
                            let rightRotate = flipRotateDir(ts.arg, FlipRotate.Right);
                            osCol = wcol + moveXdelta(rightRotate);
                            osRow = wrow + moveYdelta(rightRotate);
                            if (os.col() == osCol && os.row() == osRow &&
                                os.inst == CommandType.Move && oppDir(rightRotate, os.arg)) {
                                this.collide(rid, ts, os);
                            }
                            osCol = wcol + moveXdelta(ts.arg);
                            osRow = wrow + moveYdelta(ts.arg);
                            if (os.col() == osCol && os.row() == osRow &&
                                os.inst == CommandType.Move && oppDir(ts.arg, os.arg)) {
                                this.collide(rid, ts, os);
                            }
                        }
                    });
                });
            });
        }

        private collide(rid: number, ts: TileSprite, os: TileSprite) {
            let wcol = ts.col() + moveXdelta(ts.arg);
            let wrow = ts.row() + moveYdelta(ts.arg);
            // we already have the witness
            let witnesses: TileSprite[] = [ os ];
            let ret = this.evaluateWhenDo(ts, rid, wcol, wrow, witnesses);
            if (ret) {
                this.ruleClosures.push(new RuleClosure(rid, ts, witnesses));
            }
        }

        private updateWorld() {
            this.allSprites(ts => ts.update() );
            // change tiles (can be done with less memory and time assuming few
            // tiles are changed).
            for(let x = 0; x < this.gs.nextWorld.width; x++) {
                for (let y = 0; y < this.gs.nextWorld.height; y++) {
                    let pixel = this.gs.nextWorld.getPixel(x, y);
                    if (pixel != 0xf) {
                        //this.gs.world.setPixel(x, y, pixel);
                        const tm = game.currentScene().tileMap;
                        tm.setTileAt(x, y, pixel);
                    }
                }                
            }
            for(let i = 0; i<this.globalInsts.length; i++) {
                let inst = this.globalInsts[i];
                let arg = this.globalArgs[i];
                switch (inst) {
                    case CommandType.Game: {
                        if (arg == GameArg.Win || arg == GameArg.Lose) {
                            this.gs.game = arg == GameArg.Win ? GameState.Won : GameState.Lost;
                        }
                        break;
                    }
                    case CommandType.SpritePred: {
                        let cc: TileSprite[] = this.gs.sprites[this.gs.fixed+arg];
                        if (cc && cc.length > 0) {
                            let liveCount = cc.filter(ts => ts.state == SpriteState.Alive);
                            // skip next instruction if predicate = 0 doesn't hold
                            if (liveCount.length > 0)
                                i = i + 1;
                        }
                        break;
                    }
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
            // all the whendos passed and we've collected witnesses (other sprites)
            // so, we will execute the rule on the self sprite ts
            return new RuleClosure(rid, ts, witnesses);
        }

        private getWitness(kind: number, col: number, row: number) {
            return this.gs.sprites[kind] && this.gs.sprites[kind].find(ts => ts.col() == col && ts.row() == row);
        }

        private inBounds(col: number, row: number) {
            return 0 <= col && col < this.gs.nextWorld.width &&
                0 <= row && row < this.gs.nextWorld.height;
        }

        private allTrue(rid: number, whendo: number) {
            for(let kind = 0; kind < this.gs.all; kind++) {
                if (this.p.getAttr(rid, whendo, kind) != AttrType.OK)
                    return false;
            }
            return true;
        }

        private evaluateWhenDo(ts: TileSprite, rid: number, 
                col: number, row: number, witnesses: TileSprite[]) {
            let whendo = this.p.getWhenDo(rid, col, row);
            if (whendo == -1 || this.allTrue(rid, whendo))
                return true;
            let wcol = ts.col() + (col - 2);
            let wrow = ts.row() + (row - 2);
            if (!this.inBounds(wcol, wrow))
                return false;
            let oneOf: boolean = false;
            let oneOfPassed: boolean = false;
            let captureWitness: TileSprite = null;
            for(let kind = 0; kind < this.gs.fixed; kind++) {
                // let hasKind = this.gs.world.getPixel(wcol, wrow) == kind;
                const tm = game.currentScene().tileMap;
                let hasKind = tm.getTile(wcol, wrow).tileSet == kind;
                let attr = this.p.getAttr(rid, whendo, kind);
                if (attr == AttrType.Exclude && hasKind ||
                    attr == AttrType.Include && !hasKind) {
                    return false;
                } else if (attr == AttrType.OneOf) {
                    oneOf = true;
                    if (hasKind) oneOfPassed = true;
                }
            }
            for(let kind = this.gs.fixed; kind<this.gs.all; kind++) {
                let attr = this.p.getAttr(rid, whendo, kind);
                let witness = this.getWitness(kind, wcol, wrow);
                // special case for collisions
                if (this.p.getType(rid) >= RuleType.CollidingResting) {
                    witness = witnesses[0].kind() == kind ? witnesses[0] : null;
                }
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
                if (captureWitness && this.p.getType(rid) < RuleType.CollidingResting)
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
            let wid = this.p.getWhenDo(rc.rid, col, row);
            if (wid == -1 || this.p.getInst(rc.rid, wid, 0) == -1)
                return;
            let wcol = rc.self.col() + (col - 2);
            let wrow = rc.self.row() + (row - 2);
            let self = col == 2 && row == 2;
            for (let cid = 0; cid < 4; cid++) {
                let inst = this.p.getInst(rc.rid, wid, cid);
                if (inst == -1) break;
                let arg = this.p.getArg(rc.rid, wid, cid);
                switch(inst) {
                    case CommandType.Paint: {
                        if (this.gs.nextWorld.getPixel(wcol, wrow) == 0xf) {
                            this.gs.nextWorld.setPixel(wcol, wrow, arg);
                        }
                        break;
                    }
                    case CommandType.Move: {
                        let witness = self ? rc.self : rc.witnesses.find(ts => ts.col() == wcol && ts.row() == wrow);
                        if (witness) {
                            if (witness.inst == -1 || (witness.inst == CommandType.Move && arg == MoveArg.Stop)) {
                                witness.inst = inst;
                                witness.arg = arg;
                            }
                        }
                        break;
                    }
                    case CommandType.Sprite: {
                        // the witness is found where expected
                        let witness = rc.witnesses.find(ts => ts.col() == wcol && ts.row() == wrow);
                        // except in the case of collisions with moving sprites
                        if (this.p.getType(rc.rid) == RuleType.CollidingMoving) {
                            witness = rc.witnesses[0];
                        }
                        if (arg == SpriteArg.Remove && witness) {
                            witness.state = SpriteState.Dead;
                            this.gs.deadSprites.push(witness);
                        }
                        break;
                    }
                    case CommandType.Game:
                        // all game commands are global
                    case CommandType.SpritePred: {
                        // TODO: if the next instruction is a local instruction, then we need to evaluate the 
                        // TODO: sprite predicate now, otherwise it is global
                        this.globalInsts.push(inst);
                        this.globalArgs.push(arg);
                        break;
                    }
                }
            }
        }
    }

    export class RunGame extends BackgroundBase {
        private vm: TileWorldVM;
        private signal: TileSprite;
        private state: VMState;
        constructor(private p: Project, rules: number[]) {
            super();
            this.vm = new TileWorldVM(p, rules)
        }
        
        public setWorld(w: Image) {
            this.dirQueue = [];
            this.signal = null;
            this.state = new VMState();
            this.state.game = GameState.InPlay;
            this.state.fixed = this.p.fixed().length;
            this.state.all = this.p.all().length;
            this.state.sprites = [];
            scene.setTileMap(w.clone());
            this.state.nextWorld = w.clone();

            // initialize fixed and movable sprites
            for (let kind = 0;kind < this.p.all().length; kind++) {
                let art = this.p.getImage(kind);
                if (kind < this.p.fixed().length) {
                    scene.setTile(kind, art);
                } else {
                    this.state.sprites[kind] = [];
                    let tiles = scene.getTilesByType(kind);
                    let tm = game.currentScene().tileMap;
                    for (let t of tiles) {
                        let tileSprite = new TileSprite(art, kind);
                        this.state.sprites[kind].push(tileSprite);
                        t.place(tileSprite);
                        scene.setTileAt(t, this.p.defaultTile);
                    } 
                }
            }
        }

        public start() {
            let signal = new TileSprite(cursorIn, 0);
            signal.setFlag(SpriteFlag.Invisible, true);
            signal.x = signal.y = 8;
            signal.dir = MoveDirection.Right;
            signal.inst = -1;
            this.signal = signal;
            let halfway = false;

            // get the game started
 
            let playerId = this.p.getPlayer();
            if (playerId != -1 && this.state.sprites[playerId]) {
                scene.cameraFollowSprite(this.state.sprites[playerId][0]);
            }

            this.vm.setState(this.state);
            this.vm.round(-1);

            game.onUpdate(() => {
                // has signal sprite moved to new tile
                // then do a worldUpdate and reset the signal sprite
                if (this.signal.x >= 23) {
                    this.signal.x = 8;
                    let currentDirection = this.dirQueue.length > 0 ? this.dirQueue[0] : -1;
                    this.vm.round(currentDirection);
                    if (currentDirection != -1) {
                        if (!this.keyDowns[currentDirection])
                            this.dirQueue.removeElement(currentDirection);
                    }
                    halfway = false;
                } else if (!halfway && this.signal.x >= 16) {
                    if (this.state.game != GameState.InPlay) {
                        gameover(this.state.game == GameState.Won);
                        game.popScene();
                    } else {
                        this.state.deadSprites.forEach(ts => {
                            this.state.sprites[ts.kind()].removeElement(ts);
                            ts.destroy();
                        });
                    }
                    halfway = true;
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

    function gameover(win: boolean = false, effect?: effects.BackgroundEffect) {
        /*
            if (!effect) {
                effect = win ? winEffect : loseEffect;
            }
*/
            // collect the scores before poping the scenes
            const scoreInfo = info.player1.getState();
            const highScore = info.highScore();
            if (scoreInfo.score > highScore)
                info.saveHighScore();

            game.pushScene();
            scene.setBackgroundImage(screen.clone());

            /*
            if (win)
                winSound.play();
            else
                loseSound.play();

            effect.startScreenEffect();
            */

            pause(400);

            const overDialog = new game.GameOverDialog(win, scoreInfo.score, highScore);
            scene.createRenderable(scene.HUD_Z, target => {
                overDialog.update();
                target.drawTransparentImage(
                    overDialog.image,
                    0,
                    (screen.height - overDialog.image.height()) >> 1
                );
            });

            pause(500); // wait for users to stop pressing keys
            overDialog.displayCursor();
            game.waitAnyButton();
            game.popScene();
        }
}
