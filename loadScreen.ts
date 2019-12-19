namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        constructor(private bootstrap: Project) {
            super(null);
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ( (this.col() == 4 || this.col() == 6) && this.row() == 2) {
                    let prefix = this.col() == 4 ? "TW1-" : "TW2-";
                    this.p = loadProject(prefix);
                    this.update();
                } else if (this.p && this.col() == 9 && this.row() ==6) {
                    game.pushScene();
                    new MapEditor(this.p);
                    return;
                }
            });
            this.update();
            if (this.bootstrap) {
                saveEntireProject(this.bootstrap);
            }
        }
        
        public update() {
            background.fill(15);
            this.drawImage(9, 6, this.p ? map : greyImage(map));
            background.print("TileWorld", 0, yoff);
            background.print("Load", 2 << 4, (2 << 4) + 4 + yoff);
            this.fillTile(4, 2, 11);
            background.print("1", (4 << 4) + 6, (2 << 4) + 4 + yoff);
            this.fillTile(6, 2, 11);
            background.print("2", (6 << 4) + 6, (2 << 4) + 4 + yoff);
            if (this.bootstrap) {
                background.print("bootstrap", 10, 100);
            }
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