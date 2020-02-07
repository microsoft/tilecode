// - debugging API
//    - which rules are ready to run? showing match in world?
//    - which ones get to run?

namespace tileworld {

    enum SpriteState { Alive, Dead, }

    let spriteCount = 0;
    class TileSprite extends Sprite {
        public state: SpriteState;
        // the direction the sprite is currently moving
        public dir: MoveDirection;
        // the one instruction history to apply to the sprite to 
        // create the next sprite state
        public inst: number;
        public arg: number;
        public cnt: number;
        constructor(img: Image, kind: number) {
            super(img);
            this.cnt = spriteCount++;
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
            // TODO: implement U-turn
            this.dir = this.inst == CommandType.Move && this.arg < MoveArg.Stop  ? this.arg : -1;
            this.vx = this.dir == MoveDirection.Left ? -100 : this.dir == MoveDirection.Right ? 100 : 0;
            this.vy = this.dir == MoveDirection.Up ? -100 : this.dir == MoveDirection.Down ? 100 : 0;
        }
    }

    enum GameState { InPlay, Won, Lost, };

    class PaintTile {
        constructor(public col: number, public row: number, public tile: number) {
        }
    }

    class VMState {
        public game: GameState;
        public fixed: number;
        public all: number;
        public paintTile: PaintTile[];
        public nextWorld: Image;
        public changed: Image;
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

    enum Phase { Moving, Pushing, Resting, Colliding };

    class TileWorldVM {
        private ruleClosures: RuleClosure[];
        private vm: VMState;
        private dpad: MoveDirection
        // (temporary) state for global commands
        private globalInsts: number[];
        private globalArgs: number[];
        private allTrueResting: number[] = [];
        
        constructor(private p: Project, private rules: number[]) {
            this.vm = null;
        }

        public setState(v: VMState) {
            this.vm = v;
            this.rules.forEach(rid => {
                if (this.p.getType(rid) == RuleType.Resting && this.allTrue(rid)) 
                    this.allTrueResting.push(rid);
            });
            this.allTrueResting.forEach(rid => this.rules.removeElement(rid));
        }

        public round(currDir: MoveDirection) {
            if (!this.vm)
                return;
            this.dpad = currDir;
            this.globalInsts = [];
            this.globalArgs = [];
            this.vm.deadSprites = [];
            this.vm.paintTile = [];
            // make sure everyone is centered
            this.allSprites(ts => {
                ts.x = ((ts.x >> 4) << 4) + 8;
                ts.y = ((ts.y >> 4) << 4) + 8;
            })
            this.vm.nextWorld.fill(0xf);
            this.allSprites(ts => { ts.inst = -1; });

            let rcCount = 0;
            this.ruleClosures = [];
            this.applyRules(Phase.Moving);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            rcCount += this.ruleClosures.length;

            this.ruleClosures = [];
            this.applyRules(Phase.Resting);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            rcCount += this.ruleClosures.length;
            
            this.ruleClosures = [];
            this.applyRules(Phase.Pushing);
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            rcCount += this.ruleClosures.length;

            // now, look for collisions
            this.ruleClosures = [];
            // TODO: need a fix point around this, as new collisions may occur
            // TODO: as moving sprites transition to resting sprites
            // a collision can only take place between two sprites if one of
            // them is going to move in the next round, against is initially
            // all sprites and will dimish over time 
            let against: TileSprite[] = []
            this.allSprites(ts => { against.push(ts) }); 
            this.collisionDetection( against );
            this.ruleClosures.forEach(rc => this.evaluateRuleClosure(rc));
            rcCount += this.ruleClosures.length;
            // finally, update the rules
            this.updateWorld();
            // console.logValue("count", rcCount);
        }

        private updateWorld() {
            this.vm.changed.fill(0);
            this.allSprites(ts => { 
                ts.update();
                if (ts.dir != -1) {
                    this.vm.changed.setPixel(ts.col(), ts.row(), 1);
                    this.vm.changed.setPixel(ts.col() + moveXdelta(ts.dir), ts.row() + moveYdelta(ts.dir), 1);
                }
            });
            if (this.vm.paintTile == null) {
                // general backup
                for (let x = 0; x < this.vm.nextWorld.width; x++) {
                    for (let y = 0; y < this.vm.nextWorld.height; y++) {
                        let pixel = this.vm.nextWorld.getPixel(x, y);
                        if (pixel != 0xf) {
                            //this.vm.world.setPixel(x, y, pixel);
                            const tm = game.currentScene().tileMap;
                            tm.setTileAt(x, y, pixel);
                            this.vm.changed.setPixel(x,y,1);
                        }
                    }
                }
            } else {
                // fast path
                this.vm.paintTile.forEach(pt => {
                    const tm = game.currentScene().tileMap;
                    tm.setTileAt(pt.col, pt.row, pt.tile);
                    this.vm.changed.setPixel(pt.col, pt.row, 1);
                })
            }
            for (let i = 0; i < this.globalInsts.length; i++) {
                let inst = this.globalInsts[i];
                let arg = this.globalArgs[i];
                switch (inst) {
                    case CommandType.Game: {
                        if (arg == GameArg.Win || arg == GameArg.Lose) {
                            this.vm.game = arg == GameArg.Win ? GameState.Won : GameState.Lost;
                        }
                        break;
                    }
                    case CommandType.SpritePred: {
                        let cc: TileSprite[] = this.vm.sprites[this.vm.fixed + arg];
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

        private moving(ts: TileSprite) {
            return ts.inst == CommandType.Move && ts.arg < MoveArg.Stop;
        }

        public allSprites(handler: (ts:TileSprite) => void) {
            this.vm.sprites.forEach(ls => { 
                if (ls) ls.forEach(ts => handler(ts));
            });
        }

        private restingWithChange(ts: TileSprite) {
            // resting rules will apply to sprites that were previously moving 
            // but have not issued a moving command (in the Moving phase)
            if (ts.dir == -1 || !this.moving(ts)) {
                let col = ts.col();
                let row = ts.row();
                // check neighborhood
                for(let i = -2; i <= 2; i++) {
                    for (let j = -2; j <= 2; j++) {
                        if (Math.abs(i) + Math.abs(j) <= 2) {
                            let x = col + i;
                            let y = row + j;
                            if (this.inBounds(x,y) && this.vm.changed.getPixel(x,y))
                                return true;
                        }
                    }
                }
            }
            return false;
        }

        private matchingRules(rules: number[], phase: Phase, ts: TileSprite, handler: (rid: number) => void) {
            rules.forEach(rid => {
                if (this.p.getKinds(rid).indexOf(ts.kind()) != -1 &&
                    (phase == Phase.Moving && this.p.getDir(rid) == ts.dir && this.p.getType(rid) == RuleType.Moving
                        || phase == Phase.Resting && this.p.getType(rid) == RuleType.Resting
                        || phase == Phase.Pushing && this.p.getDir(rid) == this.dpad && this.p.getType(rid) == RuleType.Pushing)) {
                    handler(rid);
                }
            });
        }

        private applyRules(phase: Phase) {
            this.allSprites(ts => {
                if ( phase == Phase.Moving && ts.dir != -1 || 
                    (phase == Phase.Resting || phase == Phase.Pushing) && this.restingWithChange(ts)) {
                    this.matchingRules(this.rules, phase, ts, (rid) => {
                        let closure = this.evaluateRule(ts, rid);
                        if (closure)
                            this.ruleClosures.push(closure);
                    });
                }
            });
            if (phase != Phase.Resting)
                return;
            // now deal with pesky resting rules that have precondition == true
            // this is need because of change optimization
            this.allSprites(ts => {
                if ((ts.dir == -1 || !this.moving(ts))) {
                    this.matchingRules(this.allTrueResting, phase, ts, (rid) => {
                        let closure = this.evaluateRule(ts, rid);
                        if (closure)
                            this.ruleClosures.push(closure);
                    });
                }
            });
        }

        // precondition: moving(ts)
        private collidingRules(ts: TileSprite, handler: (rid: number) => void) {
            this.rules.forEach(rid => {
                if (this.p.getKinds(rid).indexOf(ts.kind()) != -1 && 
                    this.p.getType(rid) >= RuleType.CollidingResting &&
                    this.p.getDir(rid) == ts.arg) {
                        handler(rid);
                }
            });
        }

        // for each sprite ts that is NOW moving (into T):
        // - look for colliding sprite os != ts, as defined
        //   (a) os in square T, resting or moving towards ts, or
        //   (b) os moving into T
        // TODO: this can be optimized, a lot
        private collisionDetection(against: TileSprite[]) {
            this.allSprites(ts => {
                if (!this.moving(ts)) return;
                let wcol = ts.col() + moveXdelta(ts.arg);
                let wrow = ts.row() + moveYdelta(ts.arg);
                this.collidingRules(ts, (rid) => {
                    // T = (wcol, wrow)
                    let moving = this.p.getType(rid) == RuleType.CollidingMoving;
                    against.forEach(os => {
                        if (os == ts) return;
                        // (a) os in square T, resting or moving towards ts, or
                        if (os.col() == wcol && os.row() == wrow) {
                            if (!moving && !this.moving(os) || 
                                 moving && this.moving(os) && oppDir(ts.arg,os.arg)) {
                                this.collide(rid, ts, os);
                                return;
                            }
                        } else if (moving && this.moving(os)) {
                            let leftRotate = flipRotateDir(ts.arg, FlipRotate.Left);
                            let osCol = wcol + moveXdelta(leftRotate);
                            let osRow = wrow + moveYdelta(leftRotate);
                            if (os.col() == osCol && os.row() == osRow && oppDir(leftRotate,os.arg)) {
                                this.collide(rid, ts, os);
                                return;
                            } 
                            let rightRotate = flipRotateDir(ts.arg, FlipRotate.Right);
                            osCol = wcol + moveXdelta(rightRotate);
                            osRow = wrow + moveYdelta(rightRotate);
                            if (os.col() == osCol && os.row() == osRow && oppDir(rightRotate, os.arg)) {
                                this.collide(rid, ts, os);
                                return;
                            }
                            osCol = wcol + moveXdelta(ts.arg);
                            osRow = wrow + moveYdelta(ts.arg);
                            if (os.col() == osCol && os.row() == osRow && oppDir(ts.arg, os.arg)) {
                                this.collide(rid, ts, os);
                                return;
                            }
                        }
                    });
                });
            });
        }

        private collide(rid: number, ts: TileSprite, os: TileSprite) {
            let wcol = ts.col() + moveXdelta(ts.arg);
            let wrow = ts.row() + moveYdelta(ts.arg);
            if (this.p.debug) {
                console.logValue("rid", rid);
                console.logValue("ts.cnt", ts.cnt);
                console.logValue("os.cnt", os.cnt);
                console.logValue("col", wcol);
                console.logValue("row", wrow);
            }
            // we already have the witness
            let witnesses: TileSprite[] = [ os ];
            if (this.evaluateWhenDo(ts, rid, 2+moveXdelta(ts.arg), 2+moveYdelta(ts.arg), witnesses)) {
                this.ruleClosures.push(new RuleClosure(rid, ts, witnesses));
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
            return this.vm.sprites[kind] && this.vm.sprites[kind].find(ts => ts.col() == col && ts.row() == row);
        }

        private inBounds(col: number, row: number) {
            return 0 <= col && col < this.vm.nextWorld.width &&
                0 <= row && row < this.vm.nextWorld.height;
        }

        private allTrue(rid: number) {
            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    if (Math.abs(2 - col) + Math.abs(2 - row) > 2 ||
                        col == 2 && row == 2) {
                        let whendo = this.p.getWhenDo(rid, col, row);
                        if (whendo != -1 && !this.whendoTrue(rid, whendo))
                            return false;
                    }
                }
            }
            return true;
        }

        private whendoTrue(rid: number, whendo: number) {
            for(let kind = 0; kind < this.vm.all; kind++) {
                if (this.p.getAttr(rid, whendo, kind) != AttrType.OK)
                    return false;
            }
            return true;
        }

        private evaluateWhenDo(ts: TileSprite, rid: number, 
                col: number, row: number, witnesses: TileSprite[]) {
            let whendo = this.p.getWhenDo(rid, col, row);
            if (whendo == -1 || this.whendoTrue(rid, whendo))
                return true;
            let wcol = ts.col() + (col - 2);
            let wrow = ts.row() + (row - 2);
            if (!this.inBounds(wcol, wrow))
                return false;
            let oneOf: boolean = false;
            let oneOfPassed: boolean = false;
            let captureWitness: TileSprite = null;
            for(let kind = 0; kind < this.vm.fixed; kind++) {
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
            let adjacent = Math.abs(2 - col) + Math.abs(2 - row) <= 1;
            for(let kind = this.vm.fixed; kind<this.vm.all; kind++) {
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
                    if (adjacent && !captureWitness)
                        captureWitness = witness;
                } else if (attr == AttrType.OneOf) {
                    oneOf = true;
                    if (witness) oneOfPassed = true;
                    if (adjacent && !captureWitness)
                        captureWitness = witness;
                }
            }
            // collision case: if we made it through here then 
            // we have witness and oneOf is false, as expected
            let ret = !oneOf || oneOfPassed;
            if (ret && captureWitness && this.p.getType(rid) < RuleType.CollidingResting) {
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
                        if (this.vm.nextWorld.getPixel(wcol, wrow) == 0xf) {
                            this.vm.nextWorld.setPixel(wcol, wrow, arg);
                            if (this.vm.paintTile && this.vm.paintTile.length < 5) {
                                this.vm.paintTile.push(new PaintTile(wcol, wrow, arg));
                            } else 
                                this.vm.paintTile = null;
                        }
                        break;
                    }
                    case CommandType.Move: {
                        let colliding = this.p.getType(rc.rid) >= RuleType.CollidingResting;
                        let witness = self ? rc.self : 
                                (colliding ? rc.witnesses[0]
                                    : rc.witnesses.find(ts => ts.col() == wcol && ts.row() == wrow));
                        if (witness && (witness.inst == -1 || Math.randomRange(0,1) < 0.5 || colliding)) {
                            witness.inst = inst;
                            witness.arg = arg;
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
                            this.vm.deadSprites.push(witness);
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
        
        public setWorld(w: Image, sprites: Image) {
            this.signal = null;
            this.state = new VMState();
            this.state.game = GameState.InPlay;
            this.state.fixed = this.p.fixed().length;
            this.state.all = this.p.all().length;
            this.state.sprites = [];
            scene.setTileMap(w.clone());
            this.state.nextWorld = w.clone();
            this.state.changed = w.clone();

            // initialize fixed and movable sprites
            for (let kind = 0;kind < this.p.all().length; kind++) {
                if (kind < this.p.fixed().length) {
                    let art = this.p.getImage(kind);
                    scene.setTile(kind, art);
                } else {
                    this.state.sprites[kind] = [];
                }
            }
        
            for(let x = 0; x<sprites.width; x++) {
                for (let y = 0; y < sprites.height; y++) {
                    let kind = sprites.getPixel(x,y);
                    if (kind == 0xf) continue;
                    let art = this.p.getImage(kind);
                    let ts = new TileSprite(art, kind);
                    this.state.sprites[kind].push(ts);
                    ts.x = (x << 4) + 8;
                    ts.y = (y << 4) + 8;
                }   
            }
        }

        private currentDirection: MoveDirection;
        public start() {
            this.currentDirection = -1;
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
                    this.vm.round(this.currentDirection);
                    halfway = false;
                    this.currentDirection = -1;
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

            this.registerController();
            signal.vx = 100;
        }

        private registerController() {
            controller.setRepeatDefault(200, 80);
            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Left)
            })
            controller.left.onEvent(ControllerButtonEvent.Repeated, () => {
                this.requestMove(MoveDirection.Left)
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Right)
            })
            controller.right.onEvent(ControllerButtonEvent.Repeated, () => {
                this.requestMove(MoveDirection.Right)
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Up)
            })
            controller.up.onEvent(ControllerButtonEvent.Repeated, () => {
                this.requestMove(MoveDirection.Up)
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Down)
            })
            controller.down.onEvent(ControllerButtonEvent.Repeated, () => {
                this.requestMove(MoveDirection.Down)
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                controller.setRepeatDefault(500, 80);
                game.popScene();
            })
        }

        private requestMove(dir: MoveDirection) {
            this.currentDirection = dir;
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
