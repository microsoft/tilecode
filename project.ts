namespace tileworld {

    export class Project {
        private lastRule: IdRule = null;
        public defaultTile: number = 0;
        private allImages: Image[] = null;
        private _player: number = -1;
        private _world: Image = null;
        public debug: boolean = false;
        public help: boolean = true;

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

        // public setSprites(img: Image) { }
        // public getSprites() { }

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
                removeRule(this.prefix, rid);
            }
        }

        public saveWorld() {
            let worldBuf = imageToBuffer(this._world);
            settings.writeBuffer(this.prefix + "TM", worldBuf);
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

    export function loadProject(prefix: string) {
        let names = settings.list(prefix);
        if (names.length == 0)
            return null;
        // get the tile map, handling errors
        let buf = settings.readBuffer(prefix + "TM");
        let world = buf && buf.length > 0 ? bufferToImage(buf) : null;
        world = world ? world : image.create(30, 30);
        // get sprites
        let fixedImages: Image[] = [];
        if (names.indexOf(prefix + "FL") != -1) {
            let fixed = settings.readNumber(prefix + "FL");
            for (let i = 0; i < fixed; i++) {
                let buf = settings.readBuffer(prefix + "FS" + i.toString());
                let img = buf && buf.length > 0 ? bufferToImage(buf) : null;
                if (!img) { img = image.create(16, 16); img.fill(1 + i); }
                fixedImages.push(img);
            }
        }
        let movableImages: Image[] = [];
        if (names.indexOf(prefix + "ML") != -1) {
            let movable = settings.readNumber(prefix + "ML");
            for (let i = 0; i < movable; i++) {
                let buf = settings.readBuffer(prefix + "MS" + i.toString());
                let img = buf && buf.length > 0 ? bufferToImage(buf) : null;
                if (!img) { img = image.create(16, 16); img.fill(1 + i); }
                movableImages.push(img);
            }
        }
        // get the rules, at least
        let ruleName = prefix + "RL";
        let ruleids = names.filter(s => s.indexOf(ruleName) == 0).map(s => parseInt(s.substr(ruleName.length())));
        let rules: IdRule[] = [];
        ruleids.forEach(rid => {
            let rule = retrieveRule(ruleName, rid);
            rules.push(new IdRule(rid, rule));
        });
        let p = new Project(prefix, fixedImages, movableImages, rules);
        p.setWorld(world);
        p.setPlayer(settings.readNumber(prefix + "PL"));
        p.defaultTile = settings.readNumber(prefix + "DT");
        return p;
    }

    function saveImage(prefix: string, kind: number, img: Image, fixed: boolean) {
        let buf = imageToBuffer(img);
        settings.writeBuffer(prefix + (fixed ? "FS" : "MS") + kind.toString(), buf);
        return buf;
    }

    export function saveEntireProject(p: Project){
        if (p == null)
            return;
        let prefix = p.prefix;
        let length = 8;
        settings.writeNumber(prefix + "FL", p.fixed().length);
        settings.writeNumber(prefix + "ML", p.movable().length);
        settings.writeNumber(prefix + "PL", p.getPlayer());
        settings.writeNumber(prefix + "DT", p.defaultTile);
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
        p.getRules().forEach(r => { 
            let buf = storeRule(prefix, r.id, r.rule); 
            length += buf.length;
        });
    }

    let wall = tileworld.fillAttr(AttrType.OK, 8, 0, AttrType.Exclude);

    function makePushRule(dir: MoveDirection) {
        return new Rule([4], RuleType.Pushing, dir, 
        [new WhenDo(2+moveXdelta(dir), 2+moveYdelta(dir), wall,[]), new WhenDo(2, 2, [], [new Command(CommandType.Move, dir)])]);
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
            fixed.push(galleryTiles[f]);
        }
        movable.push(player);
        for (let f = 0; f < 3; f++) {
            movable.push(gallerySprites[f]);
        }
        let rules: Rule[] = [];
        for(let dir = 0; dir < 4; dir++) { rules.push(makePushRule(dir)); }
        let p = new Project(prefix, fixed, movable, makeIds(rules));
        let world = image.create(32, 24);
        helpers.imageFillRect(world, 1, 1, 30, 22, 1);
        world.setPixel(5, 5, 4);
        p.setWorld(world);
        p.setPlayer(4);
        p.defaultTile = 1;
        return p;
    }
} 
