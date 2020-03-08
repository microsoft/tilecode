namespace tileworld {

    export let TileWorldVersion = "1.0.0";

    export class Project {
        private lastRule: IdRule = null;
        private allImages: Image[] = null;
        private _player: number = -1;
        private _world: Image = null;
        private _sprites: Image = null;
        public debug: boolean = false;
        public help: boolean = true;
        public version: string;

        constructor(
            public prefix: string,
            private fixedImages: Image[],      // the number of fixed sprites
            private movableImages: Image[],    // the number of movable sprites
            private rules: IdRule[]     // the rules
        ) {

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

        public setSprites(img: Image) { 
            this._sprites = img;
        }

        public getSprites() { 
            return this._sprites;
        }

        // images

        public fixed() { return this.fixedImages; }
        public movable() { return this.movableImages; }
        public all() { 
            if (!this.allImages) {
                this.allImages = [];
                this.fixedImages.forEach(s => { this.allImages.push(s) });
                this.movableImages.forEach(s => { this.allImages.push(s) });
            }
            return this.allImages; 
        }

        public getImage(kind: number) {
            return 0 <= kind && kind < this.all().length ? this.all()[kind] : null;
        }

        public getKind(img: Image) {
            return this.all().indexOf(img);
        }

        public saveImage(kind: number) {
            let fixed = true;
            let index = kind;
            if (kind >= this.fixedImages.length()) { 
                fixed = false; 
                index -= this.fixedImages.length(); 
            }
            let buf = saveImage(this.prefix, index, this.getImage(kind), fixed);
        }

        public saveRule(rid: number) {
            storeRule(this.prefix, rid, this.getRule(rid));
        }

        public makeRule(kind: number, rt: RuleType, dir: MoveDirection): number {
            let rid = this.wrapRule(makeNewRule([kind], rt, dir));
            this.saveRule(rid);
            return rid;
        }

        public removeRule(rid: number) {
            let r = this.rules.find(r => r.id == rid);
            if (r) {
                this.rules.removeElement(r);
                settings.remove(this.prefix + "RL" + rid.toString());
            }
        }

        public saveWorldSprites() {
            let worldBuf = imageToBuffer(this._world);
            settings.writeBuffer(this.prefix + "TM", worldBuf);
            let spritesBuf = imageToBuffer(this._sprites);
            settings.writeBuffer(this.prefix + "TS", spritesBuf);
        }

        public saveHelp() {
            settings.writeNumber(this.prefix+"HM", this.help ? 1 : 0);
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
            // find a new id that is not in rule list
            let rids = this.rules.map(r => r.id).sort((a,b) => a - b );
            let rid = 0;
            for(let i = 0; i< rids.length; i++) {
                if (rid != rids[i])
                    break;
                rid = rids[i]+1;
            }
            let newRule = new IdRule(rid, r);
            this.rules.push(newRule);
            return newRule.id;
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
            let whenDo = new WhenDo(col, row, [], 0, []);
            this.getRule(rid).whenDo.push(whenDo);
            return this.getRule(rid).whenDo.length - 1;
        }

        public getAttr(rid: number, wdid: number, aid: number): AttrType {
            return this.getRule(rid).whenDo[wdid].predicate[aid];
        }

        public setAttr(rid: number, wdid: number, aid: number, attr: AttrType) {
            this.getRule(rid).whenDo[wdid].predicate[aid] = attr;
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

        // predicates

        public whendoTrue(rid: number, whendo: number) {
            for (let kind = 0; kind < this.all().length; kind++) {
                if (this.getAttr(rid, whendo, kind) != AttrType.OK)
                    return false;
            }
            return true;
        }

        public allTrue(rid: number) {
            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    if (Math.abs(2 - col) + Math.abs(2 - row) > 2) {
                        let whendo = this.getWhenDo(rid, col, row);
                        if (whendo != -1 && !this.whendoTrue(rid, whendo))
                            return false;
                    }
                }
            }
            return true;
        }

        // transformations

        public flipRule(rid: number, fr: FlipRotate) {
            let tgtRule = this.makeRule(this.getKinds(rid)[0], this.getType(rid), 
                                        flipRotateDir(this.getDir(rid), fr));
            for (let row = 0; row < 5; row++) {
                for (let col = 0; col < 5; col++) {
                    if (Math.abs(2 - col) + Math.abs(2 - row) > 2)
                        continue;
                    let whendo = this.getWhenDo(rid,col,row);
                    if (whendo == -1)
                        continue;
                    let tgtWhenDo = this.makeWhenDo(tgtRule, transformCol(col, row, fr), 
                                                             transformRow(row, col, fr));
                    // copy the predicate
                    for (let kind = 0; kind < this.all().length; kind++) {
                        this.setAttr(tgtRule, tgtWhenDo, kind, this.getAttr(rid, whendo, kind));
                    }
                    // flip the commands using flipCommands
                    for (let c = 0; c < 4; c++) {
                        let inst = this.getInst(rid,whendo,c);
                        if (inst == -1)
                            break;
                        let arg = this.getArg(rid,whendo,c);
                        this.setInst(tgtRule, tgtWhenDo, c, inst);
                        this.setArg(tgtRule, tgtWhenDo, c, inst == CommandType.Move ? flipRotateDir(arg,fr): arg);
                    }
                }
            }
            return tgtRule;
        }
    }

    const toHex = "0123456789abcdef";

    function outputKeyBuffer(key: string, val: Buffer) {
        // create hex literal from buffer
        console.log("// buffer length = "+val.length.toString());
        console.log("settings.writeBuffer(\""+key+"\", hex`");
        let chunk = 40;
        let str = "";
        for(let i=0;i<val.length;i++) {
            let byte = val.getUint8(i);
            str += toHex[(byte & 0xf0) >> 4] + toHex[byte & 0x0f];
            chunk--;
            if (chunk == 0) { console.log(str); chunk = 40; str = ""; }
        }
        console.log(str+"`);")
    }

    function settingsReadNumber(key: string, output: boolean) {
        let val = settings.readNumber(key);
        if (output) console.log("settings.writeNumber(\""+key+"\","+val.toString()+");");
        return val;
    }

    function settingsReadString(key: string, output: boolean) {
        let val = settings.readString(key);
        if (output) console.log("settings.writeString(\"" + key + "\",\"" + val + "\");");
        return val;
    }

    function settingsReadBuffer(key: string, output: boolean) {
        let buf = settings.readBuffer(key);
        if (output) outputKeyBuffer(key, buf);
        return buf;
    }

    export function loadProject(prefix: string, output: boolean = false) {
        let names = settings.list(prefix);
        if (names.length == 0)
            return null;
        if (output) console.log("function create"+prefix.slice(0,-1)+"() {");
        let version = settingsReadString(prefix + "VS", output);
        // get the tile map, handling errors
        let buf = settingsReadBuffer(prefix + "TM", output);
        let world = buf && buf.length > 0 ? bufferToImage(buf) : null;
        world = world ? world : image.create(32, 24);
        // sprite map
        buf = settingsReadBuffer(prefix + "TS", output);
        let sprites = buf && buf.length > 0 ? bufferToImage(buf) : null;
        // sprite images
        sprites = sprites ? sprites : image.create(32, 24);
        let fixedImages: Image[] = [];
        if (names.indexOf(prefix + "FL") != -1) {
            let fixed = settingsReadNumber(prefix + "FL", output);
            for (let i = 0; i < fixed; i++) {
                let key = prefix + "FS" + i.toString();
                let buf = settingsReadBuffer(key, output);
                let img = buf && buf.length > 0 ? bufferToImage(buf) : null;
                if (!img) { img = image.create(16, 16); img.fill(1 + i); }
                fixedImages.push(img);
            }
        }
        let movableImages: Image[] = [];
        if (names.indexOf(prefix + "ML") != -1) {
            let movable = settingsReadNumber(prefix + "ML", output);
            for (let i = 0; i < movable; i++) {
                let key = prefix + "MS" + i.toString();
                let buf = settingsReadBuffer(key, output);
                let img = buf && buf.length > 0 ? bufferToImage(buf) : null;
                if (!img) { img = image.create(16, 16); img.fill(1 + i); }
                movableImages.push(img);
            }
        }
        let help = false;
        if (names.indexOf(prefix + "HM") != -1) {
            let helpNum = settingsReadNumber(prefix + "HM", output);
            help = helpNum ? true: false;
        }
        // get the rules, at least
        let ruleName = prefix + "RL";
        let ruleids = names.filter(s => s.indexOf(ruleName) == 0).map(s => parseInt(s.substr(ruleName.length())));
        let rules: IdRule[] = [];
        ruleids.forEach(rid => {
            let key = ruleName+rid.toString();
            let buf = settingsReadBuffer(key, output);
            let rule = unPackRule(buf);
            rules.push(new IdRule(rid, rule));
        });
        let player = settingsReadNumber(prefix + "PL", output);
        if (output) console.log("}");
        let p = new Project(prefix, fixedImages, movableImages, rules);
        p.setWorld(world);
        p.setSprites(sprites);
        p.setPlayer(player);
        p.help = help;
        p.version = version;
        return p;
    }

    function saveImage(prefix: string, kind: number, img: Image, fixed: boolean) {
        let buf = imageToBuffer(img);
        settings.writeBuffer(prefix + (fixed ? "FS" : "MS") + kind.toString(), buf);
        return buf;
    }

    export function storeRule(prefix: string, rid: number, rule: Rule) {
        let buf = packRule(rule);
        settings.writeBuffer(prefix + "RL" + rid.toString(), buf);
        return buf;
    }

    export function saveEntireProject(p: Project){
        if (p == null)
            return;
        let prefix = p.prefix;
        let length = 8;
        settings.writeString(prefix + "VS", p.version);
        settings.writeNumber(prefix + "HM", p.help ? 1 : 0);
        settings.writeNumber(prefix + "FL", p.fixed().length);
        settings.writeNumber(prefix + "ML", p.movable().length);
        settings.writeNumber(prefix + "PL", p.getPlayer());
        p.fixed().forEach((img, i) => {
            let buf = saveImage(prefix, i, img, true);
            length += buf.length;
        });
        p.movable().forEach((img, i) => {
            let buf = saveImage(prefix, i, img, false);
            length += buf.length;
        });
        let worldBuf = imageToBuffer(p.getWorld());
        length += worldBuf.length;
        settings.writeBuffer(prefix + "TM", worldBuf);
        let spritesBuf = imageToBuffer(p.getSprites());
        length += spritesBuf.length;
        settings.writeBuffer(prefix + "TS", spritesBuf);        
        p.getRules().forEach(r => { 
            let buf = storeRule(prefix, r.id, r.rule); 
            length += buf.length;
        });
    }

    function wall () {
        return tileworld.fillAttr(AttrType.OK, 8, 0, AttrType.Exclude);
    }

    function ok() {
        return tileworld.fillAttr(AttrType.OK, 8, 0, AttrType.OK);
    }

    function makePushRule(dir: MoveDirection) {
        return new Rule([4], RuleType.Pushing, dir, 
        [new WhenDo(2+moveXdelta(dir), 2+moveYdelta(dir), wall(), 0, []), new WhenDo(2, 2, ok(), 0, [new Command(CommandType.Move, dir)])]);
    }

    const player = img`
        . . . . . . f f f f . . . . . .
        . . . . f f f 2 2 f f f . . . .
        . . . f f f 2 3 2 2 f f f . . .
        . . f f f e e e e e e f f f . .
        . . f f e 2 2 2 2 2 2 e e f . .
        . . f e 2 f f f f f f 2 e f . .
        . . f f f f e e e e f f f f . .
        . f f e f b f 4 4 f b f e f f .
        . f e e 4 1 f d d f 1 4 e e f .
        . . f e e d d d d d d e e f . .
        . . . f e e 4 4 4 4 e e f . . .
        . . e 4 f 2 2 2 2 2 2 f 4 e . .
        . . 4 d f 2 2 2 2 2 2 f d 4 . .
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
        . . . . . f f f f f f . . . . .
        . . . . . f f . . f f . . . . .
    `;

    export function emptyProject(prefix: string) {
        let fixed: Image[] = []; 
        let movable: Image[] = [];
        for(let f=0;f<4;f++) {
            fixed.push(galleryTiles[f].clone());
        }
        movable.push(player.clone());
        for (let f = 0; f < 3; f++) {
            movable.push(gallerySprites[f].clone());
        }
        let rules: Rule[] = [];
        for(let dir = 0; dir < 4; dir++) { rules.push(makePushRule(dir)); }
        let p = new Project(prefix, fixed, movable, makeIds(rules));
        let world = image.create(32, 24);
        helpers.imageFillRect(world, 1, 1, 30, 22, 1);
        let sprites = image.create(32, 24);
        sprites.fill(0xf);
        sprites.setPixel(5, 5, 4);
        p.setWorld(world);
        p.setSprites(sprites);
        p.setPlayer(4);
        p.version = TileWorldVersion;
        return p;
    }
} 
