// two slots for games
// load 
// save
 
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
                if (this.col() == 4 && this.row() == 2) {
                    this.loadProgram(1);
                } else if (this.col() == 6 && this.row() == 2) {
                    this.loadProgram(2);
                } else if (this.col() == 4 && this.row() == 4) {
                    this.saveProgram(1);
                } else if (this.col() == 6 && this.row() == 4) {
                    this.saveProgram(2);
                } 
            });
        }
        
        private loadProgram(slot: number)  {
            // check for overwrite of current (modified) program
            // push scene and load editor
        }

        private saveProgram(slot: number) {
            if (program == null)
                return;
        }

        private update() {
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