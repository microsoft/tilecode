namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        constructor(private bootstrap: Project) {
            super(null);
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ( (this.col() == 5 || this.col() == 7) && (this.row() == 2 || this.row() == 4) ) {
                    let prefix = this.col() == 5 ? (this.row() == 2 ? "TW1-" : "TW3-") : (this.row() == 2 ? "TW2-" : "TW4-");
                    this.p = loadProject(prefix);
                    this.update();
                    if (!this.p) {
                        this.p = emptyProject(prefix);
                        saveEntireProject(this.p);
                    }
                    this.lastDir = -1;
                    game.pushScene();
                    new MapEditor(this.p);
                }
            });
            this.update();
            if (this.bootstrap) {
                settings.clear();
                saveEntireProject(this.bootstrap);
            }
        }
        
        private lastDir: MoveDirection = -1;
        protected cursorMove(dir: MoveDirection, pressed: boolean) {
            this.lastDir = pressed ? dir : -1;
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
            for(let i = 0; i < 10; i++) {
                this.drawImage(i, 0, genericSprite);
                this.drawImage(i, 6, genericSprite);
                if (i > 6) continue;
                this.drawImage(0, i, genericSprite);
                this.drawImage(9, i, genericSprite);
            }
            for(let i = 0; i < 4; i++) {
                this.fillTile(i,0,12);
            }
            this.drawImage(1, 6, this.lastDir == MoveDirection.Down ? downHand : greyImage(downHand));
            this.drawImage(1, 4, this.lastDir == MoveDirection.Up ? upHand : greyImage(upHand));
            this.drawImage(0, 5, this.lastDir == MoveDirection.Left ? leftHand : greyImage(leftHand));
            this.drawImage(2, 5, this.lastDir == MoveDirection.Right ? rightHand : greyImage(rightHand));

            screen.print("TileWorld", 6, yoff + 4);
            this.fillTile(2,2,12); this.fillTile(3,2,12);
            screen.print("Load", (2 << 4) + 4, (2 << 4) + 4 + yoff);
            
            this.makeIt(5, 2, "1");
            this.makeIt(7, 2, "2");
            this.makeIt(5, 4, "3");
            this.makeIt(7, 4, "4");

            if (this.bootstrap) {
                screen.print("bootstrap", 100, 105);
            }
        }
    }
}