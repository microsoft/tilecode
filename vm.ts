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
            for(let code=this.manager.fixed().length; code < this.manager.all().length; code++) {
                let tiles = scene.getTilesByType(code);
                let art = this.manager.getImage(code);
                scene.setTile(code, this.manager.getImage(this.manager.defaultTile));
                this.sprites[code] = [];
                for (let value of tiles) {
                    let tileSprite = new TileSprite(art,code);
                    this.sprites[code].push(tileSprite);
                    value.place(tileSprite);
                }
            }
        }
        
        // TODO: generalization
        private matchingRules(ts: TileSprite) {
            return this.rules.filter(rid => getKinds(rid).indexOf(ts.kind()) != -1 && getDir(rid) == ts.dir);
        }


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

        private evaluateWhenDo(ts: TileSprite, rid: number, col: number, row: number) {
            // TODO: where to accumulate witnesses?
            let whendo = getWhenDo(rid, col, row);
            if (whendo == -1)
                return true;
            
            return true;
        }

        private evaluateCommands(ts: TileSprite, rid: number) {

        }
    }    
}
