namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        private program: Program;
        private fromSlot: number;
        constructor() {
            super(null);
            this.update();
            this.program = null;
            this.fromSlot = -1;
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.col() == 4 || this.col() == 6) && (this.row() == 2 || this.row() == 4)) {
                    let prefix = this.col() == 4 ? "TW1-" : "TW2-";
                    if (this.row() == 2)
                        this.loadProgram(prefix);
                    else 
                        this.saveProgram(prefix);
                }
            });
        }
        
        private loadProgram(prefix: string)  {
            // check for overwrite of current (modified) program
            this.program = new Program();
            // things to load
            // - the meta data
            // - the sprites
            // - all the rules

            // push scene and load editor
            this.update();
        }

        private saveProgram(prefix: string) {
            if (program == null)
                return;
        }

        private update() {
            this.background.fill(15);
            this.drawImage(9, 6, this.program ? map : greyImage(map));
            this.background.print("TileWorld", 0, yoff);
            this.background.print("Load", 2 << 4, (2 << 4) + 4 + yoff);
            this.fillTile(4, 2, 11);
            this.background.print("1", (4 << 4) + 6, (2 << 4) + 4 + yoff);
            this.fillTile(6, 2, 11);
            this.background.print("2", (6 << 4) + 6, (2 << 4) + 4 + yoff);
            if (this.program) {
                this.background.print("Save", 2 << 4, (4 << 4) + 4 + yoff);
                this.fillTile(4, 4, 12);
                this.background.print("1", (4 << 4) + 6, (4 << 4) + 4 + yoff);
                this.fillTile(6, 4, 12);
                this.background.print("2", (6 << 4) + 6, (4 << 4) + 4 + yoff);
            }
        }
    }

}