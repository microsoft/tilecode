namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        constructor(private bootstrap: Project) {
            super(null);
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ( (this.col() == 4 || this.col() == 6) && this.row() == 2) {
                    let prefix = this.col() == 4 ? "TW1-" : "TW2-";
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
            screen.fill(15);
            this.drawImage(9, 6, this.p ? map : greyImage(map));
            screen.print("TileWorld", 0, yoff);
            screen.print("Load", 2 << 4, (2 << 4) + 4 + yoff);
            this.fillTile(4, 2, 11);
            screen.print("1", (4 << 4) + 6, (2 << 4) + 4 + yoff);
            this.fillTile(6, 2, 11);
            screen.print("2", (6 << 4) + 6, (2 << 4) + 4 + yoff);
            if (this.bootstrap) {
                screen.print("bootstrap", 10, 100);
            }
        }
    }

}