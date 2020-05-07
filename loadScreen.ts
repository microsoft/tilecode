namespace tileworld {

    const loadLeft = 3;
    const loadTop = 1;
    const numRows = 4;

    export class LoadScreen extends RuleVisualsBase {
        constructor() {
            super(null);
            controller.setRepeatDefault(500, 80);
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                let first = this.col() >= loadLeft && this.col() <= loadLeft+1;
                let second = this.col() >= loadLeft+2 && this.col() <= loadLeft+3;
                if ( ( first || second) && (this.row() > loadTop && this.row() <= loadTop+numRows) ) {
                    let slot = (this.row()-loadTop) + (first ? 0 : numRows);
                    let prefix = "TW"+slot.toString()+"-";
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
            this.drawImage(col, row, diskIcon);
            this.fillTile(col+1, row, (this.col() == col || this.col() == col + 1) && this.row() == row ? 7 : 
                    (projectAvailable ? 6 : 12));
            screen.print(id, ((col+1) << 4) + 6, (row << 4) + 4 + yoff);
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
            this.fillTile(loadLeft,loadTop,12); this.fillTile(loadLeft+1,loadTop,12);
            screen.print("Load", (loadLeft << 4) + 4, (loadTop << 4) + 4 + yoff);
            this.fillTile(loadLeft+2, loadTop, 12); this.fillTile(loadLeft+3, loadTop, 12);
            screen.print("Game", ((loadLeft +2) << 4) + 4, (loadTop << 4) + 4 + yoff);

            for(let r = 0; r<numRows; r++) {
                this.makeIt(loadLeft, 2+r, (r + loadTop).toString());
                this.makeIt(loadLeft+2, 2+r, (r + loadTop + numRows).toString());
            }

            this.drawImage(8, 4, player);
            this.drawImage(8, 6, dog);
            this.drawImage(7, 5, snakeHead);
            this.drawImage(9, 5, enemy);

            this.drawImage(9, 0, settingsIcon);
        }
    }
}