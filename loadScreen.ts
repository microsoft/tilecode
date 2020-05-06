namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        constructor() {
            super(null);
            controller.setRepeatDefault(500, 80);
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                let first = this.col() >= 4 && this.col() <= 5;
                let second = this.col() >= 6 && this.col() <= 7;
                if ( ( first || second) && (this.row() == 2 || this.row() == 4) ) {
                    let prefix = first ? (this.row() == 2 ? "TW1-" : "TW3-") : (this.row() == 2 ? "TW2-" : "TW4-");
                    this.p = loadProject(prefix);
                    this.update();
                    if (!this.p) {
                        this.p = emptyProject(prefix);
                        this.p.saveProject();
                    }
                    this.lastDir = -1;
                    this.lastDir = -1;
                    game.pushScene();
                    new GameHome(this.p);
                } else if (this.col() == 9 && this.row() == 0) {
                    game.pushScene();
                    new ProjectSettings(null);
                }
            });
            this.update();
        }
        
        private lastDir: MoveDirection = -1;
        protected cursorMove(dir: MoveDirection, pressed: boolean) {
            this.lastDir = pressed ? dir : -1;
        }

        private makeIt(col: number, row: number, id: string) {
            let prefix = "TW" + id + "-";
            let projectAvailable = settings.list(prefix).length > 0;
            this.drawImage(col-1, row, diskIcon);
            this.fillTile(col, row, (this.col() == col || this.col() == col -1) && this.row() == row ? 7 : 
                    (projectAvailable ? 6 : 12));
            screen.print(id, (col << 4) + 6, (row << 4) + 4 + yoff);
        }

        protected update() {
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
            this.drawImage(1, 6, this.lastDir == MoveDirection.Down ? downButton : greyImage(downButton));
            this.drawImage(1, 4, this.lastDir == MoveDirection.Up ? upButton : greyImage(upButton));
            this.drawImage(0, 5, this.lastDir == MoveDirection.Left ? leftButton : greyImage(leftButton));
            this.drawImage(2, 5, this.lastDir == MoveDirection.Right ? rightButton : greyImage(rightButton));

            screen.print("TileWorld", 6, yoff + 4);
            this.fillTile(2,2,12); this.fillTile(3,2,12);
            screen.print("Load", (2 << 4) + 4, (2 << 4) + 4 + yoff);
            this.fillTile(2, 3, 12); this.fillTile(3, 3, 12);
            screen.print("Game", (2 << 4) + 4, (3 << 4) + 4 + yoff);

            this.makeIt(5, 2, "1");
            this.makeIt(7, 2, "2");
            this.makeIt(5, 4, "3");
            this.makeIt(7, 4, "4");

            this.drawImage(9, 0, settingsIcon);
        }
    }
}