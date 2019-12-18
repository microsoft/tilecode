namespace tileworld {

    // add world and sprites for complete description
    export class Project {
        private lastRule: IdRule;
        public defaultTile: number;
        private allImages: Image[];
        private _player: number;
        private _world: Image;

        constructor(
            private fixedImages: Image[],      // the number of fixed sprites
            private movableImages: Image[],    // the number of movable sprites
            private rules: IdRule[]     // the rules
        ) { 
            this.defaultTile = 0;
            this.lastRule = null;
            this.allImages = [];
            this._player = -1;
            this._world = null;
            this.fixedImages.forEach(s => { this.allImages.push(s) });
            this.movableImages.forEach(s => { this.allImages.push(s) });
        }

        public setPlayer(kind: number) {
            this._player = kind;
        }
        
        public getPlayer() {
            return this._player;
        }

        public setWorld(img: Image) {
            this._world = img;
        }

        public getWorld() {
            return this._world;
        }
        
        // images

        public fixed() { return this.fixedImages; }
        public movable() { return this.movableImages; }
        public all() { return this.allImages; }

        getImage(kind: number) {
            return 0 <= kind && kind < this.allImages.length ? this.allImages[kind] : null;
        }

        getKind(img: Image) {
            return this.allImages.indexOf(img);
        }

        // rules 

        public getRules() { return this.rules; }

        public getRule(rid: number) {
            if (this.lastRule == null || this.lastRule.id != rid) {
                this.lastRule = this.rules.find(r => r.id == rid);
            }
            return this.lastRule.rule;
        }

        private wrapRule(r: Rule) {
            let newRule = new IdRule(this.rules.length, r);
            this.rules.push(newRule);
            return newRule.id;
        }

        public makeRule(kind: number, rt: RuleType, dir: MoveDirection): number {
            return this.wrapRule(makeNewRule([kind], rt, dir));
        }

        public removeRule(rid: number) {
            // TODO
        }

        public getRuleIds(): number[] {
            return this.rules.map(r => r.id);
        }

        public getRulesForKind(kind: number): number[] {
            return this.rules.filter(r => r.rule.kind.indexOf(kind) != -1).map(r => r.id)
        }

        public getKinds(rid: number): number[] {
            return this.getRule(rid).kind;
        }

        public setKinds(rid: number, kind: number[]) {
            this.getRule(rid).kind = kind;
        }

        public getType(rid: number) {
            return this.getRule(rid).rt;
        }

        public setType(rid: number, rt: RuleType) {
            this.getRule(rid).rt = rt;
        }

        public getDir(rid: number): MoveDirection {
            return this.getRule(rid).dir;
        }

        public setDir(rid: number, dir: MoveDirection) {
            this.getRule(rid).dir = dir;
        }

        public getWhenDo(rid: number, col: number, row: number) {
            let whendo = this.getRule(rid).whenDo.find(wd => wd.col == col && wd.row == row);
            if (whendo == null)
                return -1;
            else
                return this.getRule(rid).whenDo.indexOf(whendo);
        }

        public makeWhenDo(rid: number, col: number, row: number) {
            let whenDo = new WhenDo(col, row, [], []);
            this.getRule(rid).whenDo.push(whenDo);
            return this.getRule(rid).whenDo.length - 1;
        }

        public getAttr(rid: number, wdid: number, aid: number): AttrType {
            return this.getRule(rid).whenDo[wdid].attrs[aid];
        }

        public setAttr(rid: number, wdid: number, aid: number, attr: AttrType) {
            this.getRule(rid).whenDo[wdid].attrs[aid] = attr;
        }

        public getInst(rid: number, wdid: number, cid: number) {
            let c = this.getRule(rid).whenDo[wdid].commands[cid];
            return (c == null) ? -1 : c.inst;
        }

        public getArg(rid: number, wdid: number, cid: number) {
            let c = this.getRule(rid).whenDo[wdid].commands[cid];
            return (c == null) ? -1 : c.arg;
        }

        public setInst(rid: number, wdid: number, cid: number, n: number) {
            let commands = this.getRule(rid).whenDo[wdid].commands;
            while (cid >= commands.length && cid < 4) {
                commands.push(new Command(-1, -1));
            }
            commands[cid].inst = n;
        }

        public setArg(rid: number, wdid: number, cid: number, n: number) {
            let commands = this.getRule(rid).whenDo[wdid].commands;
            while (cid >= commands.length && cid < 4) {
                commands.push(new Command(-1, -1));
            }
            commands[cid].arg = n;
        }

        public removeCommand(rid: number, wdid: number, cid: number) {
            let commands = this.getRule(rid).whenDo[wdid].commands;
            if (cid < commands.length) {
                commands.removeAt(cid);
            }
        }
    }

    export class LoadScreen extends RuleVisualsBase {
        private fromSlot: string;
        constructor(private bootstrap: Project) {
            super(null);
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
            let names = settings.list(prefix);
            if (names.length == 0)
                return;
            // get the tile map, handling errors
            let buf = settings.readBuffer(prefix + "TM");
            let world = buf && buf.length > 0 ? bufferToImage(buf) : null;
            world = world ? world : image.create(30, 30);
            // get sprites
            let fixedList: Image[] = [];
            if (names.indexOf(prefix+"FL") != -1) {
                let fixed = settings.readNumber(prefix + "FL");
                for(let i=0; i<fixed;i++) { 
                    let buf = settings.readBuffer(prefix+"FS"+i.toString());
                    let img = buf && buf.length > 0 ? bufferToImage(buf): null;
                    if (!img) { img = image.create(16, 16); img.fill(1+i); }
                    fixedList.push(img);
                }
            }
            let movableList: Image[] = [];
            if (names.indexOf(prefix + "ML") != -1) {
                let movable = settings.readNumber(prefix + "ML");
                for (let i = 0; i < movable; i++) {
                    let buf = settings.readBuffer(prefix + "MS" + i.toString());
                    let img = buf && buf.length > 0 ? bufferToImage(buf) : null;
                    if (!img) { img = image.create(16, 16); img.fill(1 + i); }
                    movableList.push(img);
                }
            }
            this.p = new Project(fixedList, movableList, []);
            this.p.setWorld(world);
            // rules as needed?
            this.setTileSaved();
            // push scene and load editor
            this.update();
        }

        private saveBootstrap(prefix: string){
            if (this.bootstrap == null)
                return;
            settings.writeNumber(prefix + "FL", this.bootstrap.fixed().length);
            settings.writeNumber(prefix + "ML", this.bootstrap.movable().length);
            this.bootstrap.fixed().forEach((img,i) => {
                settings.writeBuffer(prefix + "FS" + i.toString(), imageToBuffer(img));
            });
            this.bootstrap.movable().forEach((img, i) => {
                settings.writeBuffer(prefix + "MS" + i.toString() , imageToBuffer(img));
            });
            settings.writeBuffer(prefix + "TM", imageToBuffer(this.bootstrap.getWorld()));
            this.p.getRules().forEach(r => { storeRule(prefix, r); });
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
            if (this.bootstrap) {
                
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