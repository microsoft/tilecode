namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        private fromSlot: number;
        private program: Program;
        constructor(private bootstrap: Program) {
            super(null);
            this.program = null;
            this.fromSlot = -1;
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ( (this.col() == 4 || this.col() == 6) && this.row() == 2) {
                    let prefix = this.col() == 4 ? "TW1-" : "TW2-";
                    this.loadProgram(prefix);
                }
            });
            this.update();
        }

        private loadProgram(prefix: string)  {
            // check for overwrite of current (modified) program
            this.program = new Program([],[],null,[]);
            let names = settings.list(prefix);
            if (names.length == 0)
                return;
        
            // things to load
            // - the meta data (fixed, movable)
            // - the sprites
            // - all the rules
            this.setTileSaved();
            // push scene and load editor
            this.update();
        }

        private saveBootstrap(prefix: string){
            if (this.bootstrap == null)
                return;
            // TODO: sprites
            settings.writeNumber(prefix + "FL", this.program.fixed.length);
            settings.writeNumber(prefix + "ML", this.program.movable.length);
            this.program.fixed.forEach((img,i) => {
                settings.writeBuffer(prefix + "FS" + i.toString(), imageToBuffer(img));
            });
            this.program.movable.forEach((img, i) => {
                settings.writeBuffer(prefix + "MS" + i.toString() , imageToBuffer(img));
            });
            this.program.rules.forEach(r => {storeRule(prefix, r) });
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