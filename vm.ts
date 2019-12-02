// the VM takes a program and a map and executes the program
// this VM is independent of the underlying game engine, which
// is abstracted by an interface. 

namespace tileWorldEditor {

    // TODO: animation???
    export interface GameEngine<T> {
        createSprite: (col: number, row: number, kind: number, dir: TileDir) => T;
        moveSprite: (sprite: T, dir:TileDir) => void;
        reverseSprite: (sprite: T, dir: TileDir) => void;
        stopSprite: (sprite: T) => void;
        destroySprite: (sprite: T) => void;
        update(): () => void;
    }

    // controller interface

    // debugger interface

    export class TileWorldVM<T> {

        constructor(private world: Image, 
                    private prog: Program,
                    private engine: GameEngine<T>) {
            // initialize movable sprites and replace with default tile
        }

        public run() {
            
        }
    }    


}
