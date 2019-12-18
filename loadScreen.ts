namespace tileworld {

    export class LoadScreen extends RuleVisualsBase {
        private fromSlot: string;
        private program: Program;
        constructor(private bootstrap: Program) {
            super(null);
            this.program = null;
            this.fromSlot = null;
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if ( (this.col() == 4 || this.col() == 6) && this.row() == 2) {
                    let prefix = this.col() == 4 ? "TW1-" : "TW2-";
                    this.loadProgram(prefix);
                }
            });
            this.update();
        }

        private loadProgram(prefix: string)  {
            this.fromSlot = prefix;
            // check for overwrite of current (modified) program
            this.program = new Program([],[],null,[]);
            let names = settings.list(prefix);
            if (names.length == 0)
                return;
            // get the tile map, handling errors
            let buf = settings.readBuffer(prefix + "TM");
            let world = buf && buf.length > 0 ? bufferToImage(buf) : null;
            this.program.world = world ? world : image.create(30, 30);
            // get sprites
            if (names.indexOf(prefix+"FL") != -1) {
                let fixed = settings.readNumber(prefix + "FL");
                for(let i=0; i<fixed;i++) { 
                    let buf = settings.readBuffer(prefix+"FS"+i.toString());
                    let img = buf && buf.length > 0 ? bufferToImage(buf): null;
                    if (!img) { img = image.create(16, 16); img.fill(1+i); }
                    this.program.fixed.push(img);
                }
            }
            if (names.indexOf(prefix + "ML") != -1) {
                let movable = settings.readNumber(prefix + "ML");
                for (let i = 0; i < movable; i++) {
                    let buf = settings.readBuffer(prefix + "MS" + i.toString());
                    let img = buf && buf.length > 0 ? bufferToImage(buf) : null;
                    if (!img) { img = image.create(16, 16); img.fill(1 + i); }
                    this.program.movable.push(img);
                }
            }
            // rules as needed?
            this.setTileSaved();
            // push scene and load editor
            this.update();
        }

        private saveBootstrap(prefix: string){
            if (this.bootstrap == null)
                return;
            settings.writeNumber(prefix + "FL", this.bootstrap.fixed.length);
            settings.writeNumber(prefix + "ML", this.bootstrap.movable.length);
            this.bootstrap.fixed.forEach((img,i) => {
                settings.writeBuffer(prefix + "FS" + i.toString(), imageToBuffer(img));
            });
            this.bootstrap.movable.forEach((img, i) => {
                settings.writeBuffer(prefix + "MS" + i.toString() , imageToBuffer(img));
            });
            settings.writeBuffer(prefix + "TM", imageToBuffer(this.bootstrap.world));
            this.program.rules.forEach(r => { storeRule(prefix, r); });
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
            if (this.bootstrap) {
                
            }
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