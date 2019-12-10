// the VM takes a program and a map and executes the program
// this VM is independent of the underlying game engine, which
// is abstracted by an interface. 

namespace tileworld {

    export interface GameEngine<T> {
        createSprite: (col: number, row: number, kind: number, dir: TileDir) => T;
        moveSprite: (sprite: T, dir:TileDir) => void;
        reverseSprite: (sprite: T, dir: TileDir) => void;
        stopSprite: (sprite: T) => void;
        destroySprite: (sprite: T) => void;
        update(): () => void;
    }

    interface Tile {
        col(): number;
        row(): number;
    }

    class TileSprite extends Sprite implements Tile {
        dir: MoveDirection; 
        constructor(img: Image, kind: number) {
            super(img);
            this.setKind(kind);
            this.dir = MoveDirection.None;      
        }
        public col() { return this.x >> 4; }
        public row() { return this.y >> 4; }
        // TODO: movement, animation, etc.
    }
    
    // controller interface

    // debugger interface

    export class TileWorldVM {
        private world: Image;
        private sprites: TileSprite[][];
        
        constructor(private manager: ImageManager, private rules: number[] ) {
        }

        public setWorld(w: Image) {
            this.sprites = [];
            this.world = w.clone();
            scene.setTileMap(this.world);
            // set art for fixed sprites
            for(let code=0; code < this.manager.fixed().length; code++) {
                let art = this.manager.getImage(code);
                scene.setTile(code, art);
            }
            // initialize movable sprites
            for(let kind=this.manager.fixed().length; kind < this.manager.all().length; kind++) {
                let tiles = scene.getTilesByType(kind);
                let art = this.manager.getImage(kind);
                scene.setTile(kind, this.manager.getImage(this.manager.defaultTile));
                this.sprites[kind] = [];
                for (let value of tiles) {
                    let tileSprite = new TileSprite(art,kind);
                    this.sprites[kind].push(tileSprite);
                    value.place(tileSprite);
                }
            }
        }
        
        // TODO: generalization
        private matchingRules(ts: TileSprite) {
            return this.rules.filter(rid => getKinds(rid).indexOf(ts.kind()) != -1 && getDir(rid) == ts.dir);
        }


        // TODO: phases
        // phase 1: moving sprites -> moving + resting  (pushing, moving rules)
        // phase 2: resting -> moving  (pushing, resting rules)
        // phase 3: collisions
        private evaluateRule(ts: TileSprite, rid: number) {
            for(let col =0; col<5; col++) {
                for (let row = 0; row < 5; row++) {
                    if (Math.abs(2-col) + Math.abs(2-row) <= 2) {
                        if (col != 2 || row != 2) {
                            if (!this.evaluateWhenDo(ts, rid, col, row)) {
                                return;
                            }
                        }
                    }
                }    
            }
            this.evaluateCommands(ts, rid);
        }

        private getWitness(kind: number, col: number, row: number) {
            return this.sprites[kind].find(ts => ts.col() == col && ts.row() == row);
        }

        private evaluateWhenDo(ts: TileSprite, rid: number, col: number, row: number) {
            let whendo = getWhenDo(rid, col, row);
            if (whendo == -1)
                return true;
            let oneOf: boolean = false;
            let oneOfPassed: boolean = false;
            // TODO: separate fixed from movable
            for(let kind=0; kind<this.manager.all().length; kind++) {
                let attr = getAttr(rid, whendo, kind);
                let witness = this.getWitness(kind, col, row);
                switch(attr) {
                    case AttrType.Exclude: {
                        if (witness) return false;
                        break;
                    }
                    case AttrType.Include: {
                        if (!witness) return false;
                        break; 
                    }
                    case AttrType.OneOf: {
                        oneOf = true;
                        if (witness) oneOfPassed = true;
                        break;
                    }
                }
            }
            let ret = !oneOf || oneOfPassed
            if (ret && Math.abs(2 - col) + Math.abs(2 - row) <= 1) {
                // TODO: store witness
            }
            return ret;
        }

        private evaluateCommands(ts: TileSprite, rid: number) {
            // create history

        }
    }    
}
