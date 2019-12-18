namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        private fromSlot: string;
        constructor(private bootstrap: Project) {
            super(null);
            this.fromSlot = null;
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ( (this.col() == 4 || this.col() == 6) && this.row() == 2) {
                    let prefix = this.col() == 4 ? "TW1-" : "TW2-";
                    this.p = loadProject(prefix);
                    this.update();
                } else if (this.p && this.col() == 9 && this.row() ==6) {
                    game.pushScene();
                    let mapEditor = new MapEditor(this.p);
                }
            });
            this.update();
            if (this.bootstrap) {
                saveEntireProject(this.bootstrap);
            }
        }
        
        private update() {
            this.background.fill(15);
            this.drawImage(9, 6, this.p ? map : greyImage(map));
            this.background.print("TileWorld", 0, yoff);
            this.background.print("Load", 2 << 4, (2 << 4) + 4 + yoff);
            this.fillTile(4, 2, 11);
            this.background.print("1", (4 << 4) + 6, (2 << 4) + 4 + yoff);
            this.fillTile(6, 2, 11);
            this.background.print("2", (6 << 4) + 6, (2 << 4) + 4 + yoff);
            if (this.p) {
                for(let x=0; x<9; x++) {
                    this.drawImage(x,6,rightHand);
                }
                for(let y=0;y<6;y++) {
                    this.drawImage(9,y,downHand);
                }
            }
        }
    }

}