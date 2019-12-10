// the VM takes a program and a map and executes the program
// this VM is independent of the underlying game engine, which
// is abstracted by an interface. 

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
        public dir: MoveDirection;
        public inst: number;
        public arg: number;
        constructor(img: Image, kind: number) {
            super(img);
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

    enum Phase { Moving, Resting, Colliding};

    export class TileWorldVM {
        private world: Image;
        private nextWorld: Image;
        private sprites: TileSprite[][];
        
        constructor(private manager: ImageManager, private rules: number[]) {
            // not running yet
        }

        public setWorld(w: Image) {
            this.sprites = [];
            this.world = w.clone();
            this.nextWorld = w.clone();
            scene.setTileMap(this.world);
            // set art for fixed sprites
            for(let code=0; code < this.manager.fixed().length; code++) {
                let art = this.manager.getImage(code);
                scene.setTile(code, art);
            }
            // initialize movable sprites
            for(let kind=this.manager.fixed().length; kind < this.manager.all().length; kind++) {
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
        
        public round() {
            this.applyRules(Phase.Moving);
            this.applyRules(Phase.Resting);
            // now, look for collisions
            this.collisionDetection();
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
            this.sprites.forEach(ls => ls.forEach(ts => handler(ts)));
        }

        private applyRules(phase: Phase) {
            // clear the state
            if (phase == Phase.Moving) {
                this.nextWorld.fill(0xf);
                this.allSprites(ts => {  ts.inst = -1; });
            }
            // apply rules
            this.allSprites(ts => { 
                if (phase == Phase.Moving && ts.dir != MoveDirection.None ||
                    (phase == Phase.Resting && (ts.dir == MoveDirection.None ||
                         ts.inst != CommandType.Move))) {
                    let rules = this.matchingRules(phase, ts);
                    rules.forEach(rid => { this.evaluateRule(ts, rid); });
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
            // apply the move command
            this.allSprites(ts => ts.update() );
        }

        // store the sprite witnesses identified by guards
        private witnesses: TileSprite[];
        // track the (col,row) where there are instructions to execute 
        private cols: number[];
        private rows: number[];
        private evaluateRule(ts: TileSprite, rid: number) {
            this.witnesses = [];
            this.cols = [];
            this.rows = [];
            for(let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    if (Math.abs(2-col) + Math.abs(2-row) > 2 ||
                        col == 2 && row == 2)
                        continue;
                    if (!this.evaluateWhenDo(rid, col, row))
                        return;
                    let wid = getWhenDo(rid, col, row)
                    if (wid != -1 && getInst(rid, wid, 0) != -1) {
                        this.cols.push(col);
                        this.rows.push(row);
                    }
                }
            }
            this.evaluateAllCommands(ts, rid);
        }

        private getWitness(kind: number, col: number, row: number) {
            if (kind < this.manager.fixed().length) {
                return this.world.getPixel(col, row) == kind;
            } else 
                return this.sprites[kind].find(ts => ts.col() == col && ts.row() == row);
        }

        private evaluateWhenDo(rid: number, col: number, row: number) {
            let whendo = getWhenDo(rid, col, row);
            if (whendo == -1)
                return true;
            let oneOf: boolean = false;
            let oneOfPassed: boolean = false;
            let captureWitness = null;
            for(let kind=0; kind<this.manager.all().length; kind++) {
                let attr = getAttr(rid, whendo, kind);
                let witness = this.getWitness(kind, col, row);
                if (attr == AttrType.Exclude && witness) {
                    return false;
                } else if (attr == AttrType.Include) {
                    if (!witness) return false;
                    if (!captureWitness && witness instanceof TileSprite)
                        captureWitness = witness;
                } else if (attr == AttrType.OneOf) {
                    oneOf = true;
                    if (witness) oneOfPassed = true;
                    if (!captureWitness && witness instanceof TileSprite)
                        captureWitness = witness;
                }
            }
            let ret = !oneOf || oneOfPassed;
            if (ret && Math.abs(2 - col) + Math.abs(2 - row) <= 1) {
                if (captureWitness)
                    this.witnesses.push(captureWitness);
            }
            return ret;
        }
    
        private evaluateAllCommands(ts: TileSprite, rid: number) {
            this.evaluateWhenDoCommands(ts, rid, 2, 2); 
            this.cols.forEach((col,i) => {
                this.evaluateWhenDoCommands(null, rid, col, this.rows[i]);
            });
        }

        private evaluateWhenDoCommands(ts: TileSprite, rid: number, col: number, row: number) {
            let wid = getWhenDo(rid, col, row);
            if (wid == -1) return;
            for (let cid = 0; cid < 4; cid++) {
                let inst = getInst(rid, wid, cid);
                if (inst == -1) break;
                if (inst == CommandType.Paint) {
                    if (this.nextWorld.getPixel(col,row) == 0xf) {
                        this.nextWorld.setPixel(col,row,getArg(rid, wid, cid));
                    }
                } else if (inst == CommandType.Move) {
                    let witness = ts ? ts : this.witnesses.find(ts => ts.col() == col && ts.row() == row);
                    if (witness && witness.inst == -1) {
                        witness.inst = inst;
                        witness.arg = getArg(rid, wid, cid);
                    }
                }
            }
        }
    }

    // interfacing the VM with the game engine
    // - have all sprites move by one tile
    // - get control back
    // - debugging API
    //    - which rules are ready to run? showing match in world?
    //    - which ones get to run?

    // use an invisible "signal" sprite for moving one tile
    let signal = new TileSprite(play,0);
    signal.setFlag(SpriteFlag.Invisible, true);
    signal.x = signal.y = 8;
    signal.dir = MoveDirection.Right;

    game.onUpdate(() => {

    });
}
