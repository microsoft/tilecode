module tileworld {

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
        constructor(img: Image, kind: number, d = false) {
            super(img);
            const scene = game.currentScene();
            scene.physicsEngine.addSprite(this);
            this.setKind(kind);
            this.debug = d;
            this.dir = Resting;
            this.lastDir = Resting;
            this.inst = -1;
            this.state = SpriteState.Alive;
            // keep Zs below 80 because of screen.print in shader
            this.z = 70 - kind;
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

            screen.drawTransparentImage(this.image, l, t);
            //if (this.changed)
            //    screen.drawTransparentImage(include, l, t);
            // screen.drawTransparentImage(ruleediting.movedImages[this.dir], l, t);
        }
    }

    // used to record effect of paint tile commands in a small log
    class Tile {
        constructor(public col: number, public row: number, public kind: number) {
        }
    }

    enum GameState { InPlay, Won, Lost, }

    // the interpreter state
    class VMState {
        // core state
        public highScore: number;
        public score: number; 
        public game: GameState;             // see type   
        public sprites: TileSprite[][];     // the sprites, sorted by kind
        public blockedSpriteKinds: number[];// rules won't get applied to these sprites in this round
        // during evaluating
        public phase: RuleType;
        public queued: TileSprite[];
        public buttonMatch: TileSprite[];       // which sprites had a button event rule (external influence)
        public moving: TileSprite[];
        public moving2resting: TileSprite[];   // sprites that transitioned to resting due to collision
        public newresting: TileSprite[]; 
        public captureSpawned: TileSprite[];
        // affects of commands (before being committed)
        public paintTile: Tile[];            // log of paint commands
        public deadSprites: TileSprite[];    // the sprites removed this round
        public spawnedSprites: TileSprite[]; // the sprites spawned this round
        public nextBlockedSprites: number[]; // the sprites that will not have rules applied in next round
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
        // static program information
        private ruleIndex: RuleView[][] = [];     // lookup of rules by phase
        private ruleKinds: number[][] = [];       // lookup of kinds having rules by phase
        
        constructor(private p: Project, private rules: RuleView[]) {
            this.vm = null;
            for(let rt = RuleType.FirstRule; rt <= RuleType.LastRule; rt++) {
                this.ruleIndex[rt] = [];
                this.ruleKinds[rt] = [];
            }
            // populate indices for more efficient lookup over
            // rules (and derived rules)
            this.rules.forEach(rv => {
                const derivedRules = rv.getDerivedRules();
                derivedRules.push(rv);
                const rt = rv.getRuleType();
                derivedRules.forEach(rv => {
                    this.ruleIndex[rt].push(rv);
                });
                rv.getSpriteKinds().forEach(k => { 
                    if (this.ruleKinds[rt].indexOf(k) == -1)
                      this.ruleKinds[rt].push(k); 
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
            this.vm.nextBlockedSprites = [];
            
            this.vm.deadSprites = [];
            this.vm.spawnedSprites = [];
            this.vm.paintTile = [];
            this.vm.buttonMatch = [];
            this.vm.moving = [];
            this.vm.moving2resting = [];
            this.vm.newresting = [];
            this.vm.captureSpawned = [];
            this.vm.queued = [];

            this.vm.phase = RuleType.NegationCheck;

            // can this be optimized?
            this.allSprites(ts => {
                ts.x = ((ts.x >> 4) << 4) + 8;      // make sure sprite is centered
                ts.y = ((ts.y >> 4) << 4) + 8;      // on its tile
                ts.inst = -1;                       // reset instruction
            });
        }

        nextPhase(phase: RuleType) {
            this.vm.phase = phase;
            this.vm.queued = [];
            this.ruleKinds[phase].forEach(k => {
                if (this.vm.sprites[k]) 
                    this.vm.sprites[k].forEach(ts => { 
                        if (phase != RuleType.ContextChange || this.vm.buttonMatch.indexOf(ts) == -1) 
                            this.vm.queued.push(ts); 
                    });
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
                const ruleClosures: RuleClosure[] = [];
                // negation rules currently only inspect (2,2)
                this.ruleIndex[RuleType.NegationCheck].forEach(rv => {
                    // for now, we will deal only with rules that have witness in (2,2)
                    // TODO: generalize this rule
                    const kind = rv.findWitnessColRow(2, 2, false);
                    if (kind == -1)
                        return;
                    const witnesses = this.vm.sprites[kind];
                    if (!witnesses || witnesses.length == 0) {
                        // SUCCESS!
                        ruleClosures.push(new RuleClosure(rv, null, []));
                    } else {
                        // check predicate for each witness
                    }
                });
                this.nextPhase(RuleType.ButtonPress);
                return ruleClosures;
            }
            // external events
            if (this.vm.phase == RuleType.ButtonPress) {
                if (this.vm.queued.length > 0) {
                    const ts = this.vm.queued.pop();
                    return this.applyRules(RuleType.ButtonPress, ts);
                } else {
                    this.nextPhase(RuleType.ContextChange);
                    return null;
                }
            }
            // context change
            if (this.vm.phase == RuleType.ContextChange) {
                if (this.vm.queued.length > 0) {
                    const ts = this.vm.queued.pop();
                    if (this.contextChanged(ts)) {
                        return this.applyRules(RuleType.ContextChange,  ts);
                    }
                } else {
                    this.vm.phase = RuleType.Collision;
                    this.vm.moving.forEach(ts => { this.vm.queued.push(ts) });
                    this.vm.captureSpawned = this.vm.spawnedSprites;
                    this.vm.spawnedSprites= [];
                }
            }
            // collisions
            if (this.vm.phase == RuleType.Collision) {
                if (this.vm.queued.length > 0) {
                    const ts = this.vm.queued.pop();                           
                    return this.collisionDetection( ts );
                } else {
                    if (this.vm.moving2resting.length > 0) {
                        // fixpoint!
                        // as long as moving sprites are transitioning to resting
                        // then we need to checking moving sprites against new resting sprites
                        this.vm.newresting = this.vm.moving2resting;
                        this.vm.moving2resting = [];
                        this.vm.moving.forEach(ts => { this.vm.queued.push(ts) });
                    } else
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

        // use the changed map to determine if a sprite's context has changed
        private contextChanged(ts: TileSprite) {
            // check neighborhood
            for(let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const x = ts.col() + i;
                    const y = ts.row() + j;
                    if (this.inBounds(x,y) && this.vm.changed.getPixel(x,y))
                        return true;
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
            const ruleClosures: RuleClosure[] = [];
            this.ruleIndex[phase].forEach(rv => {
                if (this.ruleMatchesSprite(rv, ts) &&
                    (phase == RuleType.ContextChange && this.ruleMatchesDirection(rv, ts.dir)
                  || phase == RuleType.ButtonPress && this.dpad.indexOf(rv.getRuleArg()) != -1)) {
                    const closure = this.evaluateRule(ts, rv);
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
            const rcs: RuleClosure[] = [];
            const wcol = ts.col() + moveXdelta(ts.arg);
            const wrow = ts.row() + moveYdelta(ts.arg);
            if (!this.inBounds(wcol, wrow))
                return rcs;
            const tm = game.currentScene().tileMap;
            this.collidingRules(ts, (rv) => {
                const wd = rv.getWhenDo(2+moveXdelta(ts.arg), 2+moveYdelta(ts.arg));
                if (wd == -1)
                    return;

                // fixpoint handling - moving against new resting sprites
                if (this.vm.newresting.length > 0) {
                    this.vm.newresting.forEach(os =>  {
                        if (os.col() == wcol && os.row() == wrow && rv.getSetSpAttr(wd, os.kind()) == AttrType.Include) {
                            this.collide(rv, ts, os, rcs);
                        }
                    });
                    return;
                }

                // special case here because just one cell to check
                // background on and only for Include
                for(let kind = 0; kind < this.p.backCnt(); kind++) {
                    if (rv.getSetBgAttr(wd, kind) == AttrType.Include) {
                        if (tm.getTileIndex(wcol, wrow) == kind) {
                            rcs.push(new RuleClosure(rv, ts, [ ]));  
                            return;
                        }
                    }
                }

                // check for include on sprite
                let hasInclude = false;
                for(let kind = 0; kind < this.p.spriteCnt(); kind++) {
                    if (rv.getSetSpAttr(wd, kind) == AttrType.Include)
                        hasInclude = true;
                }

                if (!hasInclude)
                    return;

                // function for processing the "other" sprite
                const process = (os:TileSprite) => {
                    if (os == ts || rv.getSetSpAttr(wd, os.kind()) != AttrType.Include)
                        return;
                    // (a) os in square T, resting or moving towards ts, or
                    if (os.col() == wcol && os.row() == wrow) {
                        if (!this.moving(os) || oppDir(ts.arg,os.arg)) {
                            this.collide(rv, ts, os, rcs);
                        }
                    }
                    // (b) os moving into T
                    if (this.moving(os)) {
                        const leftRotate = flipRotateDir(ts.arg, RuleTransforms.LeftRotate);
                        let osCol = wcol + moveXdelta(leftRotate);
                        let osRow = wrow + moveYdelta(leftRotate);
                        if (os.col() == osCol && os.row() == osRow && oppDir(leftRotate,os.arg)) {
                            this.collide(rv, ts, os, rcs);
                        } 
                        const rightRotate = flipRotateDir(ts.arg, RuleTransforms.RightRotate);
                        osCol = wcol + moveXdelta(rightRotate);
                        osRow = wrow + moveYdelta(rightRotate);
                        if (os.col() == osCol && os.row() == osRow && oppDir(rightRotate, os.arg)) {
                            this.collide(rv, ts, os, rcs);
                        }
                        osCol = wcol + moveXdelta(ts.arg);
                        osRow = wrow + moveYdelta(ts.arg);
                        if (os.col() == osCol && os.row() == osRow && oppDir(ts.arg, os.arg)) {
                            this.collide(rv, ts, os, rcs);
                        }
                    }
                };

                // TODO: this is super inefficient when there are a lot of sprites
                // TODO: what we really need is a way to look
                // TODO: up sprites in the 3x3 area around a sprite.
                this.allSprites(process);
                this.vm.captureSpawned.forEach(process);
            });
            return rcs;
        }

        private collide(rv: RuleView, ts: TileSprite, os: TileSprite, rcs: RuleClosure[]) {
            rcs.push(new RuleClosure(rv, ts, [ os ]));  
        }

        // ---------------------------------------------------------------------
        // update the world and compute change map

        private updateWorld() {
            this.vm.changed.fill(0);
            // new sprites
            this.vm.spawnedSprites = this.vm.spawnedSprites.concat(this.vm.captureSpawned);
            this.vm.spawnedSprites.forEach(ts => {
                this.vm.sprites[ts.kind()].push(ts);
                this.vm.changed.setPixel(ts.col(), ts.row(), 1);
                ts.setFlag(SpriteFlag.Invisible, false);
                if (ts.kind() == 0)
                    scene.cameraFollowSprite(ts);
            });
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
                const old = tm.getTileIndex(pt.col, pt.row);
                if (old != pt.kind) {
                    tm.setTileAt(pt.col, pt.row, pt.kind);
                    this.vm.changed.setPixel(pt.col, pt.row, 1);
                }
            });
            // now, execute the global instructions
            for (let i = 0; i < this.globalInsts.length; i++) {
                const inst = this.globalInsts[i];
                const arg = this.globalArgs[i];
                switch (inst) {
                    case CommandType.Game: {
                        if (arg == GameArg.Win || arg == GameArg.Lose) {
                            this.vm.game = arg == GameArg.Win ? GameState.Won : GameState.Lost;
                        } else if (arg == GameArg.ScoreUp10) {
                            this.vm.score += 10;
                            if (this.vm.score > this.vm.highScore)
                                this.vm.highScore = this.vm.score;
                        }
                        break;
                    }
                }
            }
            // set bit on sprite
            //this.allSprites(ts => {
            //    ts.changed = this.contextChanged(ts);
            //});
        }

        // ---------------------------------------------------------------------

        // store the sprite witnesses identified by guards
        private evaluateRule(ts: TileSprite, rv: RuleView) {
            const witnesses: TileSprite[] = [];
            for(let col = 1; col <= 3; col++) {
                for (let row = 1; row <= 3; row++) {
                    if (!this.evaluateWhenDo(ts, rv, col, row, witnesses)) {
                        return null;
                    }
                }
            }
            // all the whendos passed and we've collected witnesses (other sprites)
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
            const whendo = rv.getWhenDo(col, row);
            if (whendo == -1 || rv.whendoTrue(whendo))
                return true;
            
            // world coordinates
            const wcol = ts.col() + (col - 2);
            const wrow = ts.row() + (row - 2);
            if (!this.inBounds(wcol, wrow))
                return false;                   // TODO: or should this be true???

            let hasInclude = false;
            let includePassed = false;
            let includeWitness: TileSprite = null;
            let hasInclude2 = false;
            let include2Passed = false;
            const tm = game.currentScene().tileMap;
            // check backgrounds
            for(let kind = 0; kind < this.p.backCnt(); kind++) {
                const hasKind = tm.getTileIndex(wcol, wrow) == kind;
                const attr = rv.getSetBgAttr(whendo, kind);
                if (attr == AttrType.Exclude && hasKind) {
                    return false;
                } else if (attr == AttrType.Include) {
                    hasInclude = true;
                    if (hasKind) includePassed = true;
                } else if (attr == AttrType.Include2) {
                    hasInclude2 = true;
                    if (hasKind) include2Passed = true;
                }
            }
            // check sprites
            const adjacent = this.manhattan(col, row) <= 1;
            for(let kind = 0; kind < this.p.spriteCnt(); kind++) {
                const attr = rv.getSetSpAttr(whendo, kind);
                // TODO: there could be multiple matching witnesses (cross product)
                const witness = this.getWitness(kind, wcol, wrow);
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
                } else if (attr == AttrType.Include2) {
                    hasInclude2 = true;
                    if (witness) {
                        include2Passed = true;
                    }
                }
            }
            const ret = !hasInclude || includePassed;
            if (ret && includeWitness) {
                // need to check direction of sprite against witness.dir
                if (!this.exprMatchesDirection(rv.getWitnessDirection(whendo), includeWitness.dir))
                    return false;
                witnesses.push(includeWitness);
            }
            return ret && (!hasInclude2 || include2Passed);
        }

        private manhattan(col: number, row: number) {
            return Math.abs(2 - col) + Math.abs(2 - row);
        }
    
        private evaluateRuleClosure(rc: RuleClosure) {
            for (let col = 1; col <= 3; col++) {
                for (let row = 1; row <= 3; row++) {
                    this.evaluateWhenDoCommands(rc, col, row);
                }
            }
        }

        private evaluateWhenDoCommands(rc: RuleClosure, col: number, row: number) {
            const wid = rc.rv.getWhenDo(col, row);
            if (wid == -1 || rc.rv.getCmdInst(wid, 0) == -1)
                return;
            let wcol = rc.self ? rc.self.col() + (col - 2) : -1;
            let wrow = rc.self ? rc.self.row() + (row - 2) : -1;
            let spawned: TileSprite = null;
            let portal: Tile = null;
            let ok = true;
            for (let cid = 0; cid < rc.rv.getCmdsLen(wid); cid++) {
                if (!ok)
                    break;
                if (portal) {
                    wcol = portal.col;
                    wrow = portal.row;
                }
                const inst = rc.rv.getCmdInst(wid, cid);
                if (inst == -1) break;
                const arg = rc.rv.getCmdArg(wid, cid);
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
                        const colliding = rc.rv.getRuleType() == RuleType.Collision;
                        const button = rc.rv.getRuleType() == RuleType.ButtonPress;
                        const self = col == 2 && row == 2;
                        const witness =
                            spawned ? spawned : 
                            self ? rc.self : 
                            (colliding ? rc.witnesses[0]
                                       : rc.witnesses.find(ts => ts.col() == wcol && ts.row() == wrow));
                        if (witness && (witness.inst == -1 || Math.randomRange(0,1) < 0.5 || colliding || button)) {
                            if (witness.inst == -1 && arg < MoveArg.Stop) {
                                this.vm.moving.push(witness);
                            }
                            if (colliding && witness.inst == CommandType.Move && witness.arg < MoveArg.Stop && arg >= MoveArg.Stop) {
                                // we are sending a stop command to a moving sprite involved in a collision
                                this.vm.moving2resting.push(witness);
                                this.vm.moving.removeElement(witness);
                            }
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
                            witness = (col == 2 && row == 2) ? rc.self : rc.witnesses[0];
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
                        // TODO: what phase of rule execution are we in?
                        // TODO: 
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
                    case CommandType.Portal: {
                        // find a tile in the map with given background kind
                        // that has no sprite on it.
                        const tm = game.currentScene().tileMap;
                        const copy = this.vm.changed.clone();
                        copy.fill(0);
                        // don't consider tiles with sprites on them
                        this.allSprites(ts => {
                            copy.setPixel(ts.col(), ts.row(), 1);
                        });
                        this.vm.spawnedSprites.forEach(ts => {
                             copy.setPixel(ts.col(), ts.row(), 1);
                        });
                        this.vm.captureSpawned.forEach(ts => {
                            copy.setPixel(ts.col(), ts.row(), 1);
                        });
                        // how many candidates to portal to are there?
                        let kindCnt = 0;
                        let x = 0, y = 0;
                        for(; x<copy.width; x++) {
                            y = 0;
                            for(; y<copy.height; y++) {
                                if (copy.getPixel(x,y) == 0 && tm.getTileIndex(x,y) == arg)
                                    kindCnt++;
                            }                            
                        }
                        if (kindCnt > 0) {
                            // select one
                            const index = Math.randomRange(0,kindCnt-1);
                            kindCnt = 0;
                            x = 0;
                            for(; x<copy.width; x++) {
                                y = 0;
                                for(; y<copy.height; y++) {
                                    if (copy.getPixel(x,y) == 0 && tm.getTileIndex(x,y) == arg) {
                                        if (kindCnt == index) {
                                            portal = new Tile(x, y, 0);
                                            break;
                                        }
                                        kindCnt++;
                                    }
                                }
                                if (portal)
                                    break;                 
                            }
                        } else {
                            // portal failed, so stop execution
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
        
        public setWorld(w: Image, sprites: Image): void {
            this.signal = null;
            this.state = new VMState();
            this.state.game = GameState.InPlay;
            this.state.score = 0;
            this.state.highScore = this.p.highScore;
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
                    const kind = sprites.getPixel(x,y);
                    if (kind == 0xf) continue;
                    const art = this.p.getSpriteImage(kind);
                    const ts = new TileSprite(art, kind, this.debug);
                    this.state.sprites[kind].push(ts);
                    ts.x = (x << 4) + 8;
                    ts.y = (y << 4) + 8;
                }
            }
        }

        private roundToCompletion(dirs: number[]) {
            this.vm.startRound(dirs);
            while (this.state.phase != -1) {
                const rcs = this.vm.continueRound();
                while (rcs && rcs.length > 0) {
                    const rc = rcs.pop();
                    this.vm.processClosure(rc);
                }
            }
        }

        private currentDirection: MoveDirection[];
        public start(): void {
            this.currentDirection = [];
            const signal = new TileSprite(cursorIn, 0);
            signal.setFlag(SpriteFlag.Invisible, true);
            signal.x = signal.y = 8;
            signal.dir = MoveDirection.Right;
            signal.inst = -1;
            this.signal = signal;
            let halfway = false;

            // get the game started
 
            const playerId = this.p.getPlayer();
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
                        let message = this.state.game == GameState.Won ? "You won!" : "";
                        if (this.state.highScore > this.p.highScore) {
                            this.p.newHighScore(this.state.highScore);
                            message += " New High = "+this.state.highScore.toString();
                        }
                        game.showDialog("Game Over", message);
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
                screen.print("High:"+this.state.highScore.toString(), 80, 0);
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
                if (this.state.highScore > this.p.highScore) {
                    this.p.newHighScore(this.state.highScore);
                }
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
