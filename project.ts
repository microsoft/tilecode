namespace tileworld {

    export let TileWorldVersion = "1.0.0";

    export class SwitchExport {
        constructor(private p: Project, private backgrounds: boolean = true) {

        }
        public getImages() {
            return this.backgrounds ? this.p.backgroundImages() : this.p.spriteImages();
        }
        public getImage(kind: number) {
            return this.backgrounds ? this.p.getBackgroundImage(kind) : this.p.getSpriteImage(kind);
        }
        public saveImage(kind: number){
            this.backgrounds ? this.p.saveBackgroundImage(kind) : this.p.saveSpriteImage(kind);
        }
    }

    export class AllExport {
        private allImages: Image[];
        constructor(private p: Project) {
            this.allImages = [];
            this.p.backgroundImages().forEach(img => this.allImages.push(img));
            this.p.spriteImages().forEach(img => this.allImages.push(img));
        }
        public getImages() {
            return this.allImages;
        }
        public getImage(index: number) {
            return this.allImages[index];
        }
        public saveImage(index: number) {
            index < this.p.backCnt() ? this.p.saveBackgroundImage(index) : this.p.saveSpriteImage(index - this.p.backCnt());
        }
        public getSetAttr(rid: number, whendo: number, aid: number, val:number = 0xffff) {
            return aid < this.p.backCnt() ? this.p.getSetBgAttr(rid, whendo, aid, val) : this.p.getSetSpAttr(rid, whendo, aid - this.p.backCnt(), val);
        }
    }

    export class Project {
        private lastRule: IdRule = null;
        private _player: number = -1;
        private _backgrounds: Image = null;
        private _sprites: Image = null;
        public debug: boolean = false;
        public help: boolean = true;
        public version: string;
    
        constructor(
            public prefix: string,
            private _backgroundsI: Image[], // the user-defined backgrounds 
            private _spritesI: Image[],     // the user-defined sprites
            private rules: IdRule[]         // the rules
        ) {
            // TODO: enforce that backgroundI and spriteI lengths are from the set { 4, 8, 12, }
            // TODO: leaving us room for 4 runtime backgrounds and sprites
        }

        public setPlayer(kind: number) {
            this._player = kind;
        }

        public getPlayer() {
            return this._player;
        }

        // a world consists of two images
        // - tile backgrounds (values 0-14)
        // - tile sprites (values 0-14)

        public setWorldBackgrounds(img: Image) {
            this._backgrounds = img;
        }

        public getWorldBackgrounds() {
            return this._backgrounds;
        }

        public setWorldSprites(img: Image) { 
            this._sprites = img;
        }

        public getWorldSprites() {
            return this._sprites;
        }

        // images
        public backCnt() { return this._backgroundsI.length; }
        public spriteCnt() { return this._spritesI.length; }
        public allCnt() { return this.backCnt() + this.spriteCnt(); }
        public backgroundImages() { return this._backgroundsI; }
        public spriteImages() { return this._spritesI; }

        public getBackgroundImage(kind: number) {
            return 0 <= kind && kind < this.backCnt() ? this._backgroundsI[kind] : null;
        }

        public getSpriteImage(kind: number) {
            return 0 <= kind && kind < this.spriteCnt() ? this._spritesI[kind] : null;
        }

        public saveBackgroundImage(kind: number) {
            let buf = saveImage(this.prefix, kind, this.getBackgroundImage(kind), true);
        }
        
        public saveSpriteImage(kind: number) {
            let buf = saveImage(this.prefix, kind, this.getSpriteImage(kind), false);
        }

        public saveRule(rid: number) {
            this.storeRule(this.prefix, rid, this.getRule(rid));
        }

        public makeRule(rt: RuleType, ra: RuleArg, kind: number = 0xffff): number {
            let rid = this.wrapRule(makeNewRule(rt, ra));
            this.saveRule(rid);
            return rid;
        }

        public removeRule(rid: number) {
            let r = this.rules.find(r => r.id == rid);
            if (r) {
                this.rules.removeElement(r);
                settings.remove(this.prefix + RuleKey + rid.toString());
            }
        }

        public saveWorld() {
            let worldBuf = imageToBuffer(this._backgrounds);
            settings.writeBuffer(this.prefix + WorldBackgroundsKey, worldBuf);
            let spritesBuf = imageToBuffer(this._sprites);
            settings.writeBuffer(this.prefix + WorldSpritesKey, spritesBuf);
        }

        public saveHelp() {
            settings.writeNumber(this.prefix+HelpKey, this.help ? 1 : 0);
        }

        private storeRule(prefix: string, rid: number, rule: Rule) {
            let buf = packRule(rule, this.backCnt(), this.spriteCnt());
            settings.writeBuffer(prefix + RuleKey + rid.toString(), buf);
            return buf;
        }

        public saveProject() {
            let prefix = this.prefix;
            settings.writeString(prefix + VersionKey, this.version);
            settings.writeNumber(prefix + HelpKey, this.help ? 1 : 0);
            settings.writeNumber(prefix + BackImgCntKey, this.backCnt());
            settings.writeNumber(prefix + SpriteImgCntKey, this.spriteCnt());
            settings.writeNumber(prefix + PlayerIndexKey, this.getPlayer());
            this.backgroundImages().forEach((img, i) => {
                let buf = saveImage(prefix, i, img, true);
            });
            this.spriteImages().forEach((img, i) => {
                let buf = saveImage(prefix, i, img, false);
            });
            let worldBuf = imageToBuffer(this.getWorldBackgrounds());
            settings.writeBuffer(prefix + WorldBackgroundsKey, worldBuf);
            let spritesBuf = imageToBuffer(this.getWorldSprites());
            settings.writeBuffer(prefix + WorldSpritesKey, spritesBuf);
            this.getRules().forEach(r => {
                let buf = this.storeRule(prefix, r.id, r.rule);
            });
        }

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

        public getRuleType(rid: number) {
            return this.getRule(rid).ruleType;
        }

        public setRuleType(rid: number, rt: RuleType) {
            this.getRule(rid).ruleType = rt;
        }

        public getRuleArg(rid: number) {
            return this.getRule(rid).ruleArg;
        }

        public setRuleArg(rid: number, ra: RuleArg) {
            this.getRule(rid).ruleArg = ra;
        }

        public getWhenDo(rid: number, col: number, row: number) {
            let whendo = this.getRule(rid).whenDo.find(wd => wd.col == col && wd.row == row);
            if (whendo == null)
                return -1;
            else
                return this.getRule(rid).whenDo.indexOf(whendo);
        }

        public makeWhenDo(rid: number, col: number, row: number) {
            let wd = new WhenDo(col, row);
            wd.bgPred = control.createBuffer(this.backCnt());
            wd.spPred = control.createBuffer(this.spriteCnt()); 
            wd.commandsLen = 0;
            wd.commands = control.createBuffer(MaxCommands << 1);
            this.getRule(rid).whenDo.push(wd);
            return this.getRule(rid).whenDo.length - 1;
        }

        private getSetBuffAttr(buf: Buffer, index: number, val: number) {
            let byteIndex = index >> 2;
            let byte = buf.getUint8(byteIndex);
            let remainder = index - (byteIndex << 2);
            if (val != -1) {
                let mask = (0x3 << (remainder << 1)) ^ 0xff;
                let newByte = (byte & mask) | ((val & 0x3) << (remainder << 1));
                buf.setUint8(byteIndex, newByte)
            }
            return (byte >> (remainder << 1)) & 0x3;
        }

        public getSetBgAttr(rid: number, wdid: number, index: number, val: number = 0xffff): AttrType {
            return this.getSetBuffAttr(this.getRule(rid).whenDo[wdid].bgPred, index, val);
        }

        public getSetSpAttr(rid: number, wdid: number, index: number, val: number = 0xffff): AttrType {
            return this.getSetBuffAttr(this.getRule(rid).whenDo[wdid].spPred, index, val);
        }

        public getWitnessDirection(rid: number, wdid: number) {
            return this.getRule(rid).whenDo[wdid].dir;
        }

        public setWitnessDirection(rid: number, wdid: number, val:number) {
            this.getRule(rid).whenDo[wdid].dir = val;
        }

        public getCmdInst(rid: number, wdid: number, cid: number) {
            return this.getRule(rid).whenDo[wdid].commands.getUint8(cid << 1);
        }

        public getCmdArg(rid: number, wdid: number, cid: number) {
            return this.getRule(rid).whenDo[wdid].commands.getUint8((cid << 1)+1);
        }

        public setCmdInst(rid: number, wdid: number, cid: number, n: number) {
            let wd = this.getRule(rid).whenDo[wdid];
            if (cid == wd.commandsLen)
                wd.commandsLen++;
            wd.commands.setUint8(cid << 1, n & 0xff);
        }

        public setCmdArg(rid: number, wdid: number, cid: number, n: number) {
            this.getRule(rid).whenDo[wdid].commands.setUint8((cid << 1)+1, n & 0xff);
        }

        public removeCommand(rid: number, wdid: number, cid: number) {
            let wd = this.getRule(rid).whenDo[wdid];
            for(let i=(cid << 1); i <= ((MaxCommands-1)<<1)-1; i++) {
                wd.commands.setUint8(i, wd.commands.getUint8(i+2));
            }
            wd.commandsLen--;
        }

        // the following accessors depend on the rule type
        
        public getRulesForSpriteKind(kind: number): number[] {
            return this.getRuleIds().filter(rid => {
                let wd = this.getWhenDo(rid, 2, 2);
                let at = this.getSetSpAttr(rid, wd, kind);
                return (wd == -1) ? false : (at == AttrType.Include || at == AttrType.Include2);
            });
        }
        
        public getSpriteKinds(rid: number) {
            let wd = this.getWhenDo(rid, 2, 2);
            let ret: number[] = [];
            for(let i=0; i < this.spriteCnt(); i++) {
                let at = this.getSetSpAttr(rid, wd, i);
                if (at == AttrType.Include || at == AttrType.Include2)
                    ret.push(i);
            }
            return ret;
        }

        public getDirFromRule(rid: number) {
            let rt = this.getRuleType(rid);
            let wd = this.getWhenDo(rid, 2, 2);
            if (rt == RuleType.Collision || rt == RuleType.ContextChange) {
                return wd == -1 ? -1 : this.getWitnessDirection(rid, wd);
            } else if (rt == RuleType.ButtonPress) {
                return this.getRuleArg(rid);
            }
            return -1;
        }

        public isRestingRule(rid: number) {
            if (this.getRuleType(rid) == RuleType.ContextChange) {
                return this.getDirFromRule(rid) == Resting;
            }
            return false;
        }

        public isCollidingResting(rid: number) {
            if (this.getRuleType(rid) == RuleType.Collision) {
                let wd = this.getWhenDo(rid, 2, 3);
                return this.getDirFromRule(rid) == Resting || this.getDirFromRule(rid) == AnyDir
            }
            return false;  
        }

        // predicates

        public whendoTrue(rid: number, whendo: number) {
            let wd = this.getRule(rid).whenDo[whendo];
            for(let i = 0; i< wd.bgPred.length; i++) {
                if (wd.bgPred.getUint8(i)) return false;
            }
            for (let i = 0; i < wd.spPred.length; i++) {
                if (wd.spPred.getUint8(i)) return false;
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
            /* 
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
            */
            return -1;
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

    const VersionKey = "VersionS";
    const HelpKey = "HelpN";
    const BackImgCntKey = "BackN";
    const SpriteImgCntKey = "SpriteN";
    const PlayerIndexKey = "PlayerN";
    const WorldBackgroundsKey = "WBackM";
    const WorldSpritesKey = "WSpriteM";
    const BackImageKey = "BackI";
    const SpriteImageKey = "SpriteI";
    const RuleKey = "RuleB";

    function readImages(cnt: number, prefix: string, output: boolean) {
        let images: Image[] = []
        for (let i = 0; i < cnt; i++) {
            let key = prefix + i.toString();
            let buf = settingsReadBuffer(key, output);
            let img = buf && buf.length > 0 ? bufferToImage(buf) : null;
            if (!img) { img = image.create(16, 16); img.fill(1 + i); }
            images.push(img);
        }
        return images;
    }

    export function loadProject(prefix: string, output: boolean = false) {
        let names = settings.list(prefix);
        if (names.length == 0)
            return null;
        if (output) console.log("function create"+prefix.slice(0,-1)+"() {");
        let version = settingsReadString(prefix + VersionKey, output);
        // get the tile map, handling errors
        let buf = settingsReadBuffer(prefix + WorldBackgroundsKey, output);
        let world = buf && buf.length > 0 ? bufferToImage(buf) : null;
        world = world ? world : image.create(32, 24);
        // sprite map
        buf = settingsReadBuffer(prefix + WorldSpritesKey, output);
        let sprites = buf && buf.length > 0 ? bufferToImage(buf) : null;
        sprites = sprites ? sprites : image.create(32, 24);
        // background images and sprite images
        let backCnt = settingsReadNumber(prefix + BackImgCntKey, output);
        let backImages = readImages(backCnt, prefix+BackImageKey, output);
        let spriteCnt = settingsReadNumber(prefix + SpriteImgCntKey, output);
        let spriteImages = readImages(spriteCnt, prefix + SpriteImageKey, output);
        let helpNum = settingsReadNumber(prefix + HelpKey, output);
        let help = helpNum ? true: false;
        // get the rules, at least
        let ruleName = prefix + RuleKey;
        let ruleids = names.filter(s => s.indexOf(ruleName) == 0).map(s => parseInt(s.substr(ruleName.length())));
        let rules: IdRule[] = [];
        ruleids.forEach(rid => {
            let key = ruleName+rid.toString();
            let buf = settingsReadBuffer(key, output);
            let rule = unPackRule(buf, backCnt, spriteCnt);
            rules.push(new IdRule(rid, rule));
        });
        let player = settingsReadNumber(prefix + PlayerIndexKey, output);
        if (output) console.log("}");
        let p = new Project(prefix, backImages, spriteImages, rules);
        p.setWorldBackgrounds(world);
        p.setWorldSprites(sprites);
        p.setPlayer(player);
        p.help = help;
        p.version = version;
        return p;
    }

    function saveImage(prefix: string, kind: number, img: Image, background: boolean) {
        let buf = imageToBuffer(img);
        settings.writeBuffer(prefix + (background ? BackImageKey : SpriteImageKey) + kind.toString(), buf);
        return buf;
    }

/* TODO: reimplement using new APIs
    function fillAttr(f: number, n: number, i: number, g: number) {
        // TODO: redo this using buffer
        let res: AttrType[] = [];
        for (let j = 0; j < n; j++) {
            res.push(j == i ? g : f);
        }
        return res;
    }

    function wall () {
        return fillAttr(AttrType.OK, 8, 0, AttrType.Exclude);
    }

    function ok() {
        return fillAttr(AttrType.OK, 8, 0, AttrType.OK);
    }

    function makePushRule(dir: MoveDirection) {
        return new Rule(RuleType.ButtonPress, dir, []);
        // TODO: finish this off
        // [new WhenDo(2+moveXdelta(dir), 2+moveYdelta(dir), wall(), 0, []), new WhenDo(2, 2, ok(), 0, [new Command(CommandType.Move, dir)])]);
    }
*/

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
        //for(let dir = 0; dir < 4; dir++) { rules.push(makePushRule(dir)); }
        let p = new Project(prefix, fixed, movable, []); // makeIds(rules));
        let world = image.create(32, 24);
        helpers.imageFillRect(world, 1, 1, 30, 22, 1);
        let sprites = image.create(32, 24);
        sprites.fill(0xf);
        p.setWorldBackgrounds(world);
        p.setWorldSprites(sprites);
        p.setPlayer(0);
        p.version = TileWorldVersion;
        return p;
    }
} 
