namespace tileworld {

    export let TileWorldVersion = "4.0.0";

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

    export class Project {
        private lastRule: RuleView = null;
        private _player: number = -1;
        private _backgrounds: Image = null;
        private _sprites: Image = null;
        public highScore: number = 0;           // TODO
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
            if (rv.getRuleId() == -1)
                return;
            this.storeRule(this.prefix, rv.getRuleId(), rv.getBaseRule());
        }

        public makeRule(rt: RuleType, ra: RuleArg | MoveDirection, kind: number = 0xffff) {
            let rv = this.wrapRule(makeNewRule(rt, ra));
            if (kind != 0xffff) {
                // this is a bit of a mess
                let wd = rv.makeWhenDo(2, 2);
                rv.getSetSpAttr(wd, kind, AttrType.Include);
                if (rt == RuleType.ContextChange || rt == RuleType.Collision) {
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

        public newHighScore(newScore: number) {
            this.highScore = newScore;
            settings.writeNumber(this.prefix+HighScoreKey, newScore);
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
    
        public getRulesForSpriteKind(kind: number) {
            return this.rules.filter(rv => rv.hasSpriteKind(kind));
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
    const HighScoreKey = "HighN";

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


    // overloaded to also print out the game as a JavaScript
    // function and compute metrics
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
        let highScore = settingsReadNumber(prefix + HighScoreKey, output);
        highScore = highScore == undefined ? 0 : highScore;
        // start project
        let p = new Project(prefix, backImages, spriteImages);
        // get the rules, at least
        let ruleName = prefix + RuleKey;
        let ruleids = names.filter(s => s.indexOf(ruleName) == 0).map(s => parseInt(s.substr(ruleName.length())));
        let rules: RuleView[] = [];
        let derivedRules = 0;
        let whenDoCount = 0;
        let commandCount = 0;
        let attrCount = 0;
        ruleids.forEach(rid => {
            let key = ruleName+rid.toString();
            let buf = settingsReadBuffer(key, output);
            if (buf) {
                let rule = unPackRule(buf, backCnt, spriteCnt);
                let rv = new RuleView(p, rid, rule)
                rules.push(rv);
                if (output) {
                    derivedRules += rv.getDerivedRules().length;
                    let [wdCnt, cmdCnt, attrCnt] = ruleStats(rv);
                    whenDoCount += wdCnt;
                    commandCount += cmdCnt;
                    attrCount += attrCnt;
                }
            } else {
                screen.print("Read ("+rid.toString()+") failed", 10, 10);
                control.assert(false, 42);
            }
        });
        let player = settingsReadNumber(prefix + PlayerIndexKey, output);
        if (output) console.log("}");
        if (output) {
            console.log("// base rules: "+ruleids.length);
            console.log("// derived rules: "+derivedRules);
            console.log("// whendos: "+whenDoCount);
            console.log("// attrs: "+attrCount);
            console.log("// commands: "+commandCount);
        }
        p.setRules(rules);
        p.setWorldBackgrounds(world);
        p.setWorldSprites(sprites);
        p.setPlayer(player);
        p.help = help;
        p.version = version;
        p.highScore = highScore;
        return p;
    }

    function saveImage(prefix: string, kind: number, img: Image, background: boolean) {
        let buf = imageToBuffer(img);
        settings.writeBuffer(prefix + (background ? BackImageKey : SpriteImageKey) + kind.toString(), buf);
        return buf;
    }

    export function emptyProject(prefix: string) {
        let fixed: Image[] = []; 
        let movable: Image[] = [];
        for(let f=0;f<4;f++) {
            fixed.push(galleryTiles[f].clone());
        }
        for (let f = 0; f < 4; f++) {
            movable.push(gallerySprites[f].clone());
        }
        let rules: Rule[] = [];
        let p = new Project(prefix, fixed, movable);
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
