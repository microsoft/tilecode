namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        constructor(private bootstrap: Project) {
            super(null);
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ( (this.col() == 5 || this.col() == 7) && (this.row() == 2 || this.row() == 4) ) {
                    let prefix = this.col() == 5 ? (this.row() == 2 ? "TW1-" : "TW3-") : (this.row() == 2 ? "TW2-" : "TW4-");
                    // TODO: which projects have content? which are empty?
                    // TODO: how to populate empty projects?
                    this.p = loadProject(prefix);
                    this.update();
                    if (this.p) {
                        this.lastDir = -1;
                        game.pushScene();
                        new MapEditor(this.p);
                    }
                }
            });
            this.update();
            if (this.bootstrap) {
                saveEntireProject(this.bootstrap);
            }
        }
        
        private lastDir: MoveDirection = -1;
        protected cursorMove(dir: MoveDirection) {
            this.lastDir = dir;
        }

        private makeIt(col: number, row: number, id: string) {
            this.drawImage(col-1, row, rightArrow);
            this.fillTile(col, row, this.col() == col && this.row() == row ? 7 : 11);
            screen.print(id, (col << 4) + 6, (row << 4) + 4 + yoff);
        }

        public update() {
            for(let col = 0; col < 10; col ++) {
                for (let row = 0; row < 7; row++) {
                    this.drawImage(col, row, emptyTile)
                }
            }
            for(let i = 0; i < 4; i++) {
                this.fillTile(i,0,12);
            }
            for (let i = 1; i < 7; i++) {
                this.drawImage(9, i, this.lastDir == MoveDirection.Down ? downHand : genericSprite);
                if (i != 6) this.drawImage(0, i, this.lastDir == MoveDirection.Up ? upHand : genericSprite);
            }
            for (let i = 0; i < 9; i++) {
                this.drawImage(i, 6, this.lastDir == MoveDirection.Left ? leftHand : genericSprite);
                if (i > 2 && i < 9) this.drawImage(i + 1, 0, this.lastDir == MoveDirection.Right ? rightHand : genericSprite);
            }
            screen.print("TileWorld", 6, yoff + 4);
            this.fillTile(2,2,12); this.fillTile(3,2,12);
            screen.print("Load", (2 << 4) + 4, (2 << 4) + 4 + yoff);
            
            this.makeIt(5, 2, "1");
            this.makeIt(7, 2, "2");
            this.makeIt(5, 4, "3");
            this.makeIt(7, 4, "4");

            if (this.bootstrap) {
                screen.print("bootstrap", 10, 100);
            }
        }
    }

}