namespace tileworld {

    enum SpriteState { Alive, Dead, }

    // a TileSprite is centered on a 16x16 pixel tile
    class TileSprite extends Sprite {
        public debug: boolean;
        public state: SpriteState;
        public dir: MoveRest;  // the direction the sprite moved in the last round
        public lastDir: MoveRest;
        public inst: number;        // the one instruction history to apply to the sprite to 
        public arg: number;         // create the next sprite state
        // public changed: boolean;
        constructor(img: Image, kind: number, d: boolean = false) {
            super(img);
            const scene = game.currentScene();
            scene.physicsEngine.addSprite(this);
            this.setKind(kind);
            this.debug = d;
            this.dir = Resting;
            this.lastDir = Resting;
            this.inst = -1;
            this.state = SpriteState.Alive;
        }

        public col() { return this.x >> 4; }    // the position of sprite in tile world
        public row() { return this.y >> 4; }    // coordinates
        
        public update() {
            // update the state of the sprite base on instruction
            this.lastDir = this.dir;
            this.dir = (this.inst == CommandType.Move && this.arg < MoveArg.Stop)  ? this.arg : Resting;
            this.vx = this.dir == MoveDirection.Left ? -100 : this.dir == MoveDirection.Right ? 100 : 0;
            this.vy = this.dir == MoveDirection.Up ? -100 : this.dir == MoveDirection.Down ? 100 : 0;
        }
        
        isOutOfScreen(camera: scene.Camera): boolean {
            const ox = (this.flags & sprites.Flag.RelativeToCamera) ? 0 : camera.drawOffsetX;
            const oy = (this.flags & sprites.Flag.RelativeToCamera) ? 0 : camera.drawOffsetY;
            return this.right - ox < (this.debug ? 32 : 0) || this.bottom - oy < 0 || 
                   this.left - ox > screen.width - (this.debug ? 32 : 0) || this.top - oy > screen.height;
        }
        // still need to translate properly
        __drawCore(camera: scene.Camera) {
            if (this.isOutOfScreen(camera)) return;

            const ox = (this.flags & sprites.Flag.RelativeToCamera) ? 0 : camera.drawOffsetX;
            const oy = (this.flags & sprites.Flag.RelativeToCamera) ? 0 : camera.drawOffsetY;

            const l = this.left - ox + (this.debug ? 32 : 0);
            const t = this.top - oy;

            screen.drawTransparentImage(this.image(), l, t);
            // if (this.changed)
            //    screen.drawTransparentImage(include, l, t);
            // screen.drawTransparentImage(movedImages[this.dir], l, t);
        }
    }

    // used to record effect of paint tile commands in a small log
    class Tile {
        constructor(public col: number, public row: number, public kind: number) {
        }
    }

    enum GameState { InPlay, Won, Lost, };

    // the interpreter state
    class VMState {
        // core state
        public score: number; 
        public game: GameState;             // see type   
        public sprites: TileSprite[][];     // the sprites, sorted by kind
        public blockedSpriteKinds: number[];
        // during evaluating
        public phase: RuleType;
        public queued: TileSprite[];
        public buttonMatch: TileSprite[];   // which sprites had a button event rule (external influence)
        // affects of commands (before being committed)
        public paintTile: Tile[];           // log of paint commands
        public deadSprites: TileSprite[];   // the sprites removed this round
        public spawnedSprites: TileSprite[]; // the sprites spawned this round
        public nextBlockedSprites: number[];
        // 
        public changed: Image;              // what changed in last round
        constructor() {
            this.nextBlockedSprites = [];
        }
    }

    // rule (rid) plus binding of self and other sprite, in preparation
    // for the evalation of rule's commands 
    class RuleClosure {
        constructor(
            public rv: RuleView,
            public self: TileSprite,
            public witnesses: TileSprite[]
        ) {
        }
    }

    class TileWorldVM {
        private vm: VMState;
        private dpad: number[];
        // (temporary) state for global commands
        private globalInsts: number[];
        private globalArgs: number[];
        private ruleIndex: RuleView[][] = [];     // lookup of rules by phase
        
        constructor(private p: Project, private rules: RuleView[]) {
            this.vm = null;
            for(let rt = RuleType.FirstRule; rt <= RuleType.LastRule; rt++) {
                this.ruleIndex[rt] = [];
            }       
            // populate indices for more efficient lookup over
            // rules (and derived rules)
            this.rules.forEach(rv => {
                let derivedRules = rv.getDerivedRules();
                derivedRules.push(rv);
                derivedRules.forEach(rv => {
                    let rt = rv.getRuleType();
                    this.ruleIndex[rt].push(rv);
                });
            });
        }

        public setState(v: VMState) {
            this.vm = v;
        }

        public startRound(currDir: number[]) {
            if (!this.vm)
                return;
            this.dpad = currDir;
            this.globalInsts = [];
            this.globalArgs = [];
            this.vm.blockedSpriteKinds = this.vm.nextBlockedSprites;
            this.vm.deadSprites = [];
            this.vm.spawnedSprites = [];
            this.vm.paintTile = [];
            this.vm.buttonMatch = [];
            this.vm.nextBlockedSprites = [];
            this.vm.queued = [];
            this.vm.phase = RuleType.NegationCheck;

            this.allSprites(ts => {
                ts.x = ((ts.x >> 4) << 4) + 8;      // make sure sprite is centered
                ts.y = ((ts.y >> 4) << 4) + 8;      // on its tile
                ts.inst = -1;                       // reset instruction
                this.vm.queued.push(ts);
            });
        }

        processClosure(rc: RuleClosure) {
            this.evaluateRuleClosure(rc);
            if (rc.rv.getRuleType() == RuleType.ButtonPress) {
                if (this.vm.buttonMatch.indexOf(rc.self) == -1)
                    this.vm.buttonMatch.push(rc.self);
            }
        }

        continueRound() {
            if (this.vm.phase == RuleType.NegationCheck) {
                let ruleClosures: RuleClosure[] = [];
                // negation rules currently only inspect (2,2)
                this.ruleIndex[RuleType.NegationCheck].forEach(rv => {
                    // for now, we will deal only with rules that have witness in (2,2)
                    // TODO: generalize this rule
                    let kind = rv.findWitnessColRow(2, 2);
                    if (kind == -1)
                        return;
                    let witnesses = this.vm.sprites[kind];
                    if (!witnesses || witnesses.length == 0) {
                        // SUCCESS!
                        ruleClosures.push(new RuleClosure(rv, null, []));
                    } else {

                    }
                });
                this.vm.phase = RuleType.ButtonPress;
                return ruleClosures;
            }
            // external events
            if (this.vm.phase == RuleType.ButtonPress) {
                if (this.vm.queued.length > 0) {
                    let ts = this.vm.queued.pop();
                    return this.applyRules(RuleType.ButtonPress, ts);
                } else {
                    this.vm.phase = RuleType.ContextChange;
                    this.allSprites(ts => { 
                        if (this.vm.buttonMatch.indexOf(ts) == -1) 
                            this.vm.queued.push(ts);
                    });
                }
            }
            // context change
            if (this.vm.phase == RuleType.ContextChange) {
                if (this.vm.queued.length > 0) {
                    let ts = this.vm.queued.pop();
                    if (this.contextChanged(ts)) {
                        return this.applyRules(RuleType.ContextChange,  ts);
                    }
                } else {
                    this.vm.phase = RuleType.Collision;
                    this.allSprites(ts => { this.vm.queued.push(ts) });
                }
            }
            // collisions
            if (this.vm.phase == RuleType.Collision) {
                if (this.vm.queued.length > 0) {
                    let ts = this.vm.queued.pop();                           
                    // now, look for collisions
                    // TODO: need a fix point around this, as new collisions may occur
                    // TODO: as moving sprites transition to resting sprites
                    // a collision can only take place between two sprites if one of
                    // them is going to move in the next round, against is initially
                    // all sprites and will dimish over time 
                    return this.collisionDetection( ts );
                } else {
                    this.vm.phase = -1;
                }
            }
            // finally, update the rules
            if (this.vm.phase == -1) {
                 this.updateWorld();
            }
            return null;
         }

        public allSprites(handler: (ts:TileSprite) => void) {
            this.vm.sprites.forEach(ls => { 
                if (ls) ls.forEach(ts => handler(ts));
            });
        }

        // optimization:
        // use the changed map to determine if a resting sprite
        // needs to have its resting rules applied. If no space
        // in the neighborhood around the tile changed in the last
        // round, then there is no need to apply the resting rules.
        private contextChanged(ts: TileSprite) {
            // check neighborhood
            for(let i = -2; i <= 2; i++) {
                for (let j = -2; j <= 2; j++) {
                    if (Math.abs(i) + Math.abs(j) <= 2) {
                        let x = ts.col() + i;
                        let y = ts.row() + j;
                        if (this.inBounds(x,y) && this.vm.changed.getPixel(x,y))
                            return true;
                    }
                }
            }
            return false;
        }

        private ruleMatchesSprite(rv: RuleView, ts: TileSprite) {
            return rv.hasSpriteKind(ts.kind()) && this.vm.blockedSpriteKinds.indexOf(ts.kind()) == -1;
        }

        private exprMatchesDirection(dirExpr: MoveExpr, dir: MoveRest) {
            return (dirExpr == AnyDir) || (dirExpr == Moving && dir != Resting) || (dirExpr == dir);
        }

        private ruleMatchesDirection(rv: RuleView, dir: MoveRest) {
            return this.exprMatchesDirection(rv.getDirFromRule(), dir);
        }

        private applyRules(phase: RuleType, ts: TileSprite) {
            let ruleClosures: RuleClosure[] = [];
            this.ruleIndex[phase].forEach(rv => {
                if (this.ruleMatchesSprite(rv, ts) &&
                    (phase == RuleType.ContextChange && this.ruleMatchesDirection(rv, ts.dir)
                  || phase == RuleType.ButtonPress && this.dpad.indexOf(rv.getRuleArg()) != -1)) {
                    let closure = this.evaluateRule(ts, rv);
                    if (closure)
                        ruleClosures.push(closure);
                }
            });
            return ruleClosures;
        }

        // precondition: moving(ts)
        private collidingRules(ts: TileSprite, handler: (rv: RuleView) => void) {
            this.ruleIndex[RuleType.Collision].forEach(rv => {
                if (this.ruleMatchesSprite(rv, ts) && this.ruleMatchesDirection(rv, ts.arg)) {
                    handler(rv);
                }
            });
        }

        // a tile sprite will move if it has been issued an appropriate move command
        private moving(ts: TileSprite) {
            return ts.inst == CommandType.Move && ts.arg < MoveArg.Stop;
        }

        // for each sprite ts that is will move (into T):
        // - look for colliding sprite os != ts, as defined
        //   (a) os in square T, resting or moving towards ts, or
        //   (b) os moving into T
        private collisionDetection(ts: TileSprite) {
            let rcs: RuleClosure[] = [];
            if (!this.moving(ts)) return rcs;
            let wcol = ts.col() + moveXdelta(ts.arg);
            let wrow = ts.row() + moveYdelta(ts.arg);
            this.collidingRules(ts, (rv) => {
                // T = (wcol, wrow)
                this.allSprites(os => {
                    if (os == ts) return;
                    // (a) os in square T, resting or moving towards ts, or
                    if (os.col() == wcol && os.row() == wrow) {
                        if (!this.moving(os) || oppDir(ts.arg,os.arg)) {
                            this.collide(rv, ts, os, rcs);
                        }
                    } else if (this.moving(os)) {
                        let leftRotate = flipRotateDir(ts.arg, RuleTransforms.LeftRotate);
                        let osCol = wcol + moveXdelta(leftRotate);
                        let osRow = wrow + moveYdelta(leftRotate);
                        if (os.col() == osCol && os.row() == osRow && oppDir(leftRotate,os.arg)) {
                            this.collide(rv, ts, os, rcs);
                            return;
                        } 
                        let rightRotate = flipRotateDir(ts.arg, RuleTransforms.RightRotate);
                        osCol = wcol + moveXdelta(rightRotate);
                        osRow = wrow + moveYdelta(rightRotate);
                        if (os.col() == osCol && os.row() == osRow && oppDir(rightRotate, os.arg)) {
                            this.collide(rv, ts, os, rcs);
                            return;
                        }
                        osCol = wcol + moveXdelta(ts.arg);
                        osRow = wrow + moveYdelta(ts.arg);
                        if (os.col() == osCol && os.row() == osRow && oppDir(ts.arg, os.arg)) {
                            this.collide(rv, ts, os, rcs);
                            return;
                        }
                    }
                });
            });
            return rcs;
        }

        private collide(rv: RuleView, ts: TileSprite, os: TileSprite, rcs: RuleClosure[]) {
            let wcol = ts.col() + moveXdelta(ts.arg);
            let wrow = ts.row() + moveYdelta(ts.arg);
            // we already have the witness
            let witnesses: TileSprite[] = [ os ];
            if (this.evaluateWhenDo(ts, rv, 2+moveXdelta(ts.arg), 2+moveYdelta(ts.arg), witnesses)) {
                rcs.push(new RuleClosure(rv, ts, witnesses));
            }
        }

        // ---------------------------------------------------------------------
        // update the world and compute change map

        private updateWorld() {
            this.vm.changed.fill(0);
            // new sprites
            this.vm.spawnedSprites.forEach(ts => {
                this.vm.sprites[ts.kind()].push(ts);
                this.vm.changed.setPixel(ts.col(), ts.row(), 1);
                ts.setFlag(SpriteFlag.Invisible, false);
            });
            this.vm.spawnedSprites = [];
            // sprites that will die before next round
            this.vm.deadSprites.forEach(ts => {
                this.vm.changed.setPixel(ts.col(), ts.row(), 1);
            });
            // update the state of each sprite, based on instructions
            this.allSprites(ts => {
                ts.update();
                if (ts.dir != Resting || ts.dir != ts.lastDir) {
                    // if sprite is moving then dirty its current
                    // location and next location
                    this.vm.changed.setPixel(ts.col(), ts.row(), 1);
                    this.vm.changed.setPixel(ts.col() + moveXdelta(ts.dir),
                                             ts.row() + moveYdelta(ts.dir), 1);
                } 
            });
            // update the tile map and set dirty bits in changed map
            this.vm.paintTile.forEach(pt => {
                const tm = game.currentScene().tileMap;
                let old = tm.getTileIndex(pt.col, pt.row);
                if (old != pt.kind) {
                    tm.setTileAt(pt.col, pt.row, pt.kind);
                    this.vm.changed.setPixel(pt.col, pt.row, 1);
                }
            });
            // now, execute the global instructions
            for (let i = 0; i < this.globalInsts.length; i++) {
                let inst = this.globalInsts[i];
                let arg = this.globalArgs[i];
                switch (inst) {
                    case CommandType.Game: {
                        if (arg == GameArg.Win || arg == GameArg.Lose) {
                            this.vm.game = arg == GameArg.Win ? GameState.Won : GameState.Lost;
                        } else if (arg == GameArg.ScoreUp10) {
                            this.vm.score += 10;
                        }
                        break;
                    }
                }
            }
            // set bit on sprite
            // this.allSprites(ts => {
            //     ts.changed = this.contextChanged(ts);
            // });
        }

        // ---------------------------------------------------------------------

        // store the sprite witnesses identified by guards
        private evaluateRule(ts: TileSprite, rv: RuleView) {
            // console.logValue("rid", rv.getRuleId());
            let witnesses: TileSprite[] = [];
            for(let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    if (this.manhattan(col, row) > 2)
                        continue;
                    if (!this.evaluateWhenDo(ts, rv, col, row, witnesses)) {
                        // console.log("failed");
                        return null;
                    }
                }
            }
            // console.log("passed");
            // all the whendos passed and we've collected witnesses (other sprites)
            // so, we will execute the rule on the self sprite ts
            return new RuleClosure(rv, ts, witnesses);
        }

        private getWitness(kind: number, col: number, row: number) {
            return this.vm.sprites[kind] && 
                   this.vm.sprites[kind].find(ts => ts.col() == col && ts.row() == row);
        }

        private inBounds(col: number, row: number) {
            return 0 <= col && col < this.vm.changed.width &&
                   0 <= row && row < this.vm.changed.height;
        }

        // Include and OneOf are equivalent now
        private evaluateWhenDo(ts: TileSprite, rv: RuleView, 
                col: number, row: number, witnesses: TileSprite[]) {
            // whendo
            let whendo = rv.getWhenDo(col, row);
            if (whendo == -1 || rv.whendoTrue(whendo))
                return true;
            
            // world coordinates
            let wcol = ts.col() + (col - 2);
            let wrow = ts.row() + (row - 2);
            if (!this.inBounds(wcol, wrow))
                return false;

            let hasInclude: boolean = false;
            let includePassed: boolean = false;
            let includeWitness: TileSprite = null;
            // check backgrounds
            for(let kind = 0; kind < this.p.backCnt(); kind++) {
                const tm = game.currentScene().tileMap;
                let hasKind = tm.getTileIndex(wcol, wrow) == kind;
                let attr = rv.getSetBgAttr(whendo, kind);
                if (attr == AttrType.Exclude && hasKind) {
                    return false;
                } else if (attr == AttrType.Include) {
                    hasInclude = true;
                    if (hasKind) includePassed = true;
                }
            }
            // check sprites
            let adjacent = this.manhattan(col, row) <= 1;
            for(let kind = 0; kind < this.p.spriteCnt(); kind++) {
                let attr = rv.getSetSpAttr(whendo, kind);
                // TODO: there could be multiple matching witnesses (cross product)
                let witness = this.getWitness(kind, wcol, wrow);
                // special case for collisions
                if (rv.getRuleType() == RuleType.Collision) {
                    witness = (witnesses[0].kind() == kind) ? witnesses[0] : null;
                }
                if (attr == AttrType.Exclude && witness) {
                    return false;
                } else if (attr == AttrType.Include) {
                    hasInclude = true;
                    if (witness)  {
                        includePassed = true;
                        // we only make witnesses available to the runtime
                        // if they are in the center or adjacent to the center
                        if (adjacent && !includeWitness)
                            includeWitness = witness;
                    }
                }
            }
            let ret = !hasInclude || includePassed;
            if (ret && includeWitness && rv.getRuleType() != RuleType.Collision) {
                // need to check direction of sprite against witness.dir
                if (!this.exprMatchesDirection(rv.getWitnessDirection(whendo), includeWitness.dir))
                    return false;
                witnesses.push(includeWitness);
            }
            return ret;
        }

        private manhattan(col: number, row: number) {
            return Math.abs(2 - col) + Math.abs(2 - row);
        }
    
        private evaluateRuleClosure(rc: RuleClosure) {
            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    if (this.manhattan(col, row) > 2)
                        continue;
                    this.evaluateWhenDoCommands(rc, col, row);
                }
            }
        }

        private evaluateWhenDoCommands(rc: RuleClosure, col: number, row: number) {
            let wid = rc.rv.getWhenDo(col, row);
            if (wid == -1 || rc.rv.getCmdInst(wid, 0) == -1)
                return;
            let wcol = rc.self ? rc.self.col() + (col - 2) : -1;
            let wrow = rc.self ? rc.self.row() + (row - 2) : -1;
            let spawned: TileSprite = null;
            let teleport: Tile = null;
            let ok = true;
            for (let cid = 0; cid < rc.rv.getCmdsLen(wid); cid++) {
                if (!ok)
                    break;
                if (teleport) {
                    wcol = teleport.col;
                    wrow = teleport.row;
                }
                let inst = rc.rv.getCmdInst(wid, cid);
                if (inst == -1) break;
                let arg = rc.rv.getCmdArg(wid, cid);
                switch(inst) {
                    case CommandType.Paint: {
                        if (!rc.self)
                            break;
                        this.vm.paintTile.push(new Tile(wcol, wrow, arg));
                        break;
                    }
                    case CommandType.Move: {
                        if (!rc.self)
                            break;
                        let colliding = rc.rv.getRuleType() == RuleType.Collision;
                        let button = rc.rv.getRuleType() == RuleType.ButtonPress;
                        let self = col == 2 && row == 2;
                        let witness =
                            spawned ? spawned : 
                            self ? rc.self : 
                            (colliding ? rc.witnesses[0]
                                       : rc.witnesses.find(ts => ts.col() == wcol && ts.row() == wrow));
                        if (witness && (witness.inst == -1 || Math.randomRange(0,1) < 0.5 || colliding || button)) {
                            witness.inst = inst;
                            witness.arg = arg;
                        }
                        break;
                    }
                    case CommandType.Sprite: {
                        if (!rc.self)
                            break;
                        // the witness is found where expected
                        let witness = rc.witnesses.find(ts => ts.col() == wcol && ts.row() == wrow);
                        // except in the case of collisions with moving sprites
                        if (rc.rv.getRuleType() == RuleType.Collision) {
                            witness = rc.witnesses[0];
                        }
                        if (arg == SpriteArg.Remove && witness) {
                            witness.state = SpriteState.Dead;
                            if (this.vm.deadSprites.indexOf(witness) == -1)
                                this.vm.deadSprites.push(witness);
                        }
                        break;
                    }
                    case CommandType.Spawn: {
                        if (!rc.self)
                            break;
                        spawned = new TileSprite(this.p.spriteImages()[arg], arg);
                        this.vm.spawnedSprites.push(spawned);
                        spawned.x = (wcol << 4) + 8;
                        spawned.y = (wrow << 4) + 8;
                        spawned.setFlag(SpriteFlag.Invisible, true);
                        break;
                    }
                    case CommandType.BlockSpriteRules: {
                        if (this.vm.nextBlockedSprites.indexOf(arg) == -1)
                            this.vm.nextBlockedSprites.push(arg);
                        break;
                    }
                    case CommandType.Teleport: {
                        // find a tile in the map with given background kind
                        // that has no sprite on it.
                        let tm = game.currentScene().tileMap;
                        let copy = this.vm.changed.clone();
                        copy.fill(0);
                        // don't consider tiles with sprites on them
                        this.allSprites(ts => {
                            copy.setPixel(ts.col(), ts.row(), 1);
                        });
                        this.vm.spawnedSprites.forEach(ts => {
                             copy.setPixel(ts.col(), ts.row(), 1);
                        });
                        // how many candidates to teleport to are there?
                        let kindCnt = 0;
                        let x = 0, y = 0;
                        for(; x<copy.width(); x++) {
                            y = 0;
                            for(; y<copy.height(); y++) {
                                if (copy.getPixel(x,y) == 0 && tm.getTileIndex(x,y) == arg)
                                    kindCnt++;
                            }                            
                        }
                        if (kindCnt > 0) {
                            // select one
                            let index = Math.randomRange(0,kindCnt-1);
                            kindCnt = 0;
                            x = 0;
                            for(; x<copy.width(); x++) {
                                y = 0;
                                for(; y<copy.height(); y++) {
                                    if (copy.getPixel(x,y) == 0 && tm.getTileIndex(x,y) == arg) {
                                        if (kindCnt == index) {
                                            teleport = new Tile(x, y, 0);
                                            break;
                                        }
                                        kindCnt++;
                                    }
                                }
                                if (teleport)
                                    break;                 
                            }
                        } else {
                            // teleport failed, so stop execution
                            ok = false;
                        }

                        break;
                    }
                    case CommandType.Game: {
                        // all game commands are global
                        this.globalInsts.push(inst);
                        this.globalArgs.push(arg);
                        break;
                    }
                }
            }
        }
    }

    export class RunGame extends BackgroundBase {
        private running: boolean;
        private vm: TileWorldVM;
        private signal: TileSprite;
        private state: VMState;
        constructor(private p: Project, rules: RuleView[], private debug: boolean = false) {
            super();
            this.vm = new TileWorldVM(p, rules);
        }
        
        public setWorld(w: Image, sprites: Image) {
            this.signal = null;
            this.state = new VMState();
            this.state.game = GameState.InPlay;
            this.state.score = 0;
            this.state.sprites = [];
            const currScene = game.currentScene();
            currScene.tileMap = new tiles.legacy.LegacyTilemap(TileScale.Sixteen, this.debug ? 2 : 0);
            scene.setTileMap(w.clone());
            this.state.changed = w.clone();
            this.state.changed.fill(0xf);
            
            // initialize backgrounds
            this.p.backgroundImages().forEach((img,kind) => {
                scene.setTile(kind, img);
            });
            // initialize sprites
            for(let kind=0; kind<this.p.spriteCnt(); kind++) {
                this.state.sprites[kind] = [];
            }
            for(let x = 0; x<sprites.width; x++) {
                for (let y = 0; y < sprites.height; y++) {
                    let kind = sprites.getPixel(x,y);
                    if (kind == 0xf) continue;
                    let art = this.p.getSpriteImage(kind);
                    let ts = new TileSprite(art, kind, this.debug);
                    this.state.sprites[kind].push(ts);
                    ts.x = (x << 4) + 8;
                    ts.y = (y << 4) + 8;
                }   
            }
        }

        private roundToCompletion(dirs: number[]) {
            this.vm.startRound(dirs);
            while (this.state.phase != -1) {
                let rcs = this.vm.continueRound();
                while (rcs && rcs.length > 0) {
                    let rc = rcs.pop();
                    this.vm.processClosure(rc);
                }
            }
        }

        private currentDirection: MoveDirection[];
        public start() {
            this.currentDirection = [];
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
            this.roundToCompletion([]);
            this.running = true;

            game.onUpdate(() => {
                if (!this.running)
                    return;
                // has signal sprite moved to new tile
                // then do a worldUpdate and reset the signal sprite
                if (this.signal.x >= 23) {
                    if (this.state.game != GameState.InPlay) {
                        this.running = false;
                        let win = this.state.game == GameState.Won;
                        game.showDialog("Game Over", " you " + (win ? "won" : "lost"));
                        pause(500);
                        game.waitAnyButton();
                        return;
                    } 
                    this.signal.x = 8;
                    this.roundToCompletion(this.currentDirection);
                    halfway = false;
                    this.currentDirection = [];
                } else if (!halfway && this.signal.x >= 16) {
                    if (this.state.game == GameState.InPlay) {
                        this.state.deadSprites.forEach(ts => {
                            this.state.sprites[ts.kind()].removeElement(ts);
                            ts.destroy();
                        });
                    }
                    halfway = true;
                }
            });
            
            game.onShade(() => {
                screen.print("Score: "+this.state.score.toString(), 0, 0);
            })

            game.onPaint(() => {
                
                // debugger here
                if (this.debug) {
                    screen.drawImage(debug, 0, 0)
                }
            });

            this.registerController();
            signal.vx = 100;
        }

        private debuggerUI() {
            // play
            // step
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
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(MoveDirection.Down);
            });
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(ButtonArg.A);
            });
            controller.A.onEvent(ControllerButtonEvent.Repeated, () => {
                this.requestMove(ButtonArg.A);
            });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                // TODO: debugger
                controller.setRepeatDefault(500, 80);
                game.popScene();
            })
        }

        private requestMove(dir: number) {
            // TODO: debuggger
            if (!this.running) {
                controller.setRepeatDefault(500, 80);
                game.popScene();
            } else if (this.currentDirection.indexOf(dir) == -1)
                this.currentDirection.push(dir);
        }
    }
}
