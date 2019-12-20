namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        constructor(private bootstrap: Project) {
            super(null);
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ( (this.col() == 5 || this.col() == 7) && this.row() == 2) {
                    let prefix = this.col() == 5 ? "TW1-" : "TW2-";
                    this.p = loadProject(prefix);
                    this.update();
                    if (this.p) {
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
        
        public update() {
            for(let col = 0; col < 10; col ++) {
                for (let row = 0; row < 7; row++) {
                    this.drawImage(col, row, emptyTile)
                }
            }
            for(let i = 0; i < 4; i++) {
                this.fillTile(i,0,12);
            }
            for (let i = 4; i < 10; i++) {
                this.drawImage(i, 0, rightHand);
            }
            for (let i = 1; i < 7; i++) {
                this.drawImage(9, i, downHand);
            }
            for (let i = 0; i < 9; i++) {
                this.drawImage(i, 6, leftHand);
            }
            for (let i = 1; i < 6; i++) {
                this.drawImage(0, i, upHand);
            }
            screen.print("TileWorld", 6, yoff + 4);
            this.fillTile(2,2,12); this.fillTile(3,2,12);
            screen.print("Load", (2 << 4) + 4, (2 << 4) + 4 + yoff);
            this.fillTile(5, 2, 11);
            screen.print("1", (5 << 4) + 6, (2 << 4) + 4 + yoff);
            this.fillTile(7, 2, 11);
            screen.print("2", (7 << 4) + 6, (2 << 4) + 4 + yoff);
            if (this.bootstrap) {
                screen.print("bootstrap", 10, 100);
            }
        }
    }

}