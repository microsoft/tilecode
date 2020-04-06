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
        public getSetAttr(rv: RuleView, whendo: number, aid: number, val:number = 0xffff) {
            return aid < this.p.backCnt() ? rv.getSetBgAttr(whendo, aid, val) : rv.getSetSpAttr(whendo, aid - this.p.backCnt(), val);
        }
    }

    export class RuleView {
        constructor(private p: Project, private rid: number, private r: Rule) {
        }

        public getBaseRule() {
            return this.r;
        }

        public getRuleId() {
            return this.rid;
        }

        public getRuleType() {
            return this.r.ruleType;
        }

        public setRuleType(rt: RuleType) {
            this.r.ruleType = rt;
        }

        public getRuleArg() {
            return this.r.ruleArg;
        }

        public setRuleArg(ra: RuleArg) {
            this.r.ruleArg = ra;
        }

        public getWhenDo(col: number, row: number) {
            let whendo = this.r.whenDo.find(wd => wd.col == col && wd.row == row);
            if (whendo == null)
                return -1;
            else
                return this.r.whenDo.indexOf(whendo);
        }

        public makeWhenDo(col: number, row: number) {
            let wd = new WhenDo(col, row);
            wd.bgPred = control.createBuffer(this.p.backCnt());
            wd.spPred = control.createBuffer(this.p.spriteCnt()); 
            wd.commandsLen = 0;
            wd.commands = control.createBuffer(MaxCommands << 1);
            this.r.whenDo.push(wd);
            return this.r.whenDo.length - 1;
        }

        private getSetBuffAttr(buf: Buffer, index: number, val: number) {
            let byteIndex = index >> 2;
            let byte = buf.getUint8(byteIndex);
            let remainder = index - (byteIndex << 2);
            if (val != 0xffff) {
                let mask = (0x3 << (remainder << 1)) ^ 0xff;
                let newByte = (byte & mask) | ((val & 0x3) << (remainder << 1));
                buf.setUint8(byteIndex, newByte)
            }
            return (byte >> (remainder << 1)) & 0x3;
        }

        public getSetBgAttr(wdid: number, index: number, val: number = 0xffff): AttrType {
            return this.getSetBuffAttr(this.r.whenDo[wdid].bgPred, index, val);
        }

        public getSetSpAttr(wdid: number, index: number, val: number = 0xffff): AttrType {
            return this.getSetBuffAttr(this.r.whenDo[wdid].spPred, index, val);
        }

        public getWitnessDirection(wdid: number) {
            return this.r.whenDo[wdid].dir;
        }

        public setWitnessDirection(wdid: number, val:number) {
            this.r.whenDo[wdid].dir = val;
        }

        public getCmdsLen(wdid: number) {
            return this.r.whenDo[wdid].commandsLen;
        }

        public getCmdInst(wdid: number, cid: number) {
            let wd = this.r.whenDo[wdid];
            if (cid >= wd.commandsLen) return 0xff;
            return wd.commands.getUint8(cid << 1);
        }

        public getCmdArg(wdid: number, cid: number) {
            let wd = this.r.whenDo[wdid];
            if (cid >= wd.commandsLen) return 0xff;
            return wd.commands.getUint8((cid << 1)+1);
        }

        public setCmdInst(wdid: number, cid: number, n: number) {
            let wd = this.r.whenDo[wdid];
            if (cid > wd.commandsLen)
                return 0xff;
            if (cid == wd.commandsLen)
                wd.commandsLen++;
            wd.commands.setUint8(cid << 1, n & 0xff);
            return n & 0xff;
        }

        public setCmdArg(wdid: number, cid: number, n: number) {
            let wd = this.r.whenDo[wdid];
            if (cid > wd.commandsLen)
                return 0xff;
            if (cid == wd.commandsLen)
                wd.commandsLen++;
            wd.commands.setUint8((cid << 1)+1, n & 0xff);
            return n & 0xff;
        }

        public removeCommand(rid: number, wdid: number, cid: number) {
            let wd = this.r.whenDo[wdid];
            if (wd.commandsLen == 0 || cid >= wd.commandsLen)
                return 0xff;
            for(let i=(cid << 1); i <= ((MaxCommands-1)<<1)-1; i++) {
                wd.commands.setUint8(i, wd.commands.getUint8(i+2));
            }
            wd.commandsLen--;
            return wd.commandsLen;
        }

        public getSpriteKinds() {
            let wd = this.getWhenDo(2, 2);
            let ret: number[] = [];
            for(let i=0; i < this.p.spriteCnt(); i++) {
                let at = this.getSetSpAttr(wd, i);
                if (at == AttrType.Include || at == AttrType.Include2)
                    ret.push(i);
            }
            return ret;
        }

        public hasSpriteKind(kind: number) {
            let wd = this.getWhenDo(2, 2);
            return wd == -1 ?  false : this.getSetSpAttr(wd, kind) == AttrType.Include
        }

        public getDirFromRule() {
            let rt = this.getRuleType();
            if (rt == RuleType.Collision || rt == RuleType.ContextChange) {
                let wd = this.getWhenDo(2, 2);
                return wd == -1 ? -1 : this.getWitnessDirection(wd);
            } else if (rt == RuleType.ButtonPress) {
                return this.getRuleArg();
            }
            return -1;
        }

        public isRestingRule() {
            return this.getRuleType() == RuleType.ContextChange && this.getDirFromRule() == Resting;
        }

        public isCollidingResting() {
            if (this.getRuleType() == RuleType.Collision) {
                let wd = this.getWhenDo(2, 3);
                return this.getWitnessDirection(wd) == Resting;
            }
            return false;  
        }

        // predicates

        public whendoTrue(whendo: number) {
            let wd = this.r.whenDo[whendo];
            return isWhenDoTrue(wd);
        }

        public isRuleTrue() {
            return isRuleTrue(this.r);
        }

        // transformations
        // TODO: options:
        // 1. deeply imbed as as rule view via default parameter (so you can see in editor)
        // 2. new rule, but in memory only
        // 3. new rules, stored in flash, with lock/unlock
        public flipRule(fr: FlipRotate) {
            // transforms
            // - ButtonArg and Witness Dir: flipRotateDir(this.getDir(rid), fr));
            // - WhenDo coordinate: let tgtWhenDo = this.makeWhenDo(tgtRule, transformCol(col, row, fr), 
            //                                           transformRow(row, col, fr));
            // - argument  this.setArg(tgtRule, tgtWhenDo, c, inst == CommandType.Move ? flipRotateDir(arg,fr): arg);
        }
    }

    export class Project {
        private lastRule: RuleView = null;
        private _player: number = -1;
        private _backgrounds: Image = null;
        private _sprites: Image = null;
        public debug: boolean = false;
        public help: boolean = true;
        public version: string;
        private rules: RuleView[] = [];     // the rules

        constructor(
            public prefix: string,
            private _backgroundsI: Image[], // the user-defined backgrounds 
            private _spritesI: Image[]      // the user-defined sprites
        ) {
            // TODO: enforce that backgroundI and spriteI lengths are from the set { 4, 8, 12, }
            // TODO: leaving us room for 4 runtime backgrounds and sprites
        }

        public setRules(rvl: RuleView[]) {
            this.rules = rvl;
        }

        public getRules() {
            return this.rules;
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

        public saveRule(rv: RuleView) {
            this.storeRule(this.prefix, rv.getRuleId(), rv.getBaseRule());
        }

        public makeRule(rt: RuleType, ra: RuleArg | MoveDirection, kind: number = 0xffff) {
            let rv = this.wrapRule(makeNewRule(rt, ra));
            if (kind != 0xffff) {
                // this is a bit of a mess
                let wd = rv.makeWhenDo(2, 2);
                rv.getSetSpAttr(wd, kind, AttrType.Include);
                if (rt == RuleType.ContextChange) {
                    rv.setWitnessDirection(wd, ra);
                }
            }
            this.saveRule(rv);
            return rv;
        }

        public removeRule(rid: number) {
            let r = this.rules.find(r => r.getRuleId() == rid);
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
                let buf = this.storeRule(prefix, r.getRuleId(), r.getBaseRule());
            });
        }

        private wrapRule(r: Rule) {
            // find a new id that is not in rule list
            let rids = this.rules.map(r => r.getRuleId()).sort((a,b) => a - b );
            let rid = 0;
            for(let i = 0; i< rids.length; i++) {
                if (rid != rids[i])
                    break;
                rid = rids[i]+1;
            }
            let newRule = new RuleView(this, rid, r);
            this.rules.push(newRule);
            return newRule;
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
        // start project
        let p = new Project(prefix, backImages, spriteImages);
        // get the rules, at least
        let ruleName = prefix + RuleKey;
        let ruleids = names.filter(s => s.indexOf(ruleName) == 0).map(s => parseInt(s.substr(ruleName.length())));
        let rules: RuleView[] = [];
        ruleids.forEach(rid => {
            let key = ruleName+rid.toString();
            let buf = settingsReadBuffer(key, output);
            let rule = unPackRule(buf, backCnt, spriteCnt);
            rules.push(new RuleView(p, rid, rule));
        });
        let player = settingsReadNumber(prefix + PlayerIndexKey, output);
        if (output) console.log("}");
        p.setRules(rules);
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
        let p = new Project(prefix, fixed, movable); // makeIds(rules));
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
