const toHex = "0123456789abcdef";

function outputKeyBuffer(prefix:string, key: string, val: Buffer) {
    // create hex literal from buffer
    console.log("// buffer length = "+val.length.toString());
    console.log("settings.writeBuffer(prefix+\""+key+"\", hex`");
    let chunk = 40;
    let str = "";
    for(let i=0;i<val.length;i++) {
        const byte = val.getUint8(i);
        str += toHex[(byte & 0xf0) >> 4] + toHex[byte & 0x0f];
        chunk--;
        if (chunk == 0) { console.log(str); chunk = 40; str = ""; }
    }
    console.log(str+"`);")
}

function settingsReadNumber(prefix: string, key: string, output: boolean) {
    const val = settings.readNumber(prefix+key);
    if (output) console.log("settings.writeNumber(prefix+\""+key+"\","+val.toString()+");");
    return val;
}

function settingsReadString(prefix:string, key: string, output: boolean) {
    const val = settings.readString(prefix+key);
    if (output) console.log("settings.writeString(prefix+\"" + key + "\",\"" + val + "\");");
    return val;
}

function settingsReadBuffer(prefix: string, key: string, output: boolean) {
    const buf = settings.readBuffer(prefix+key);
    if (output) outputKeyBuffer(prefix, key, buf);
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

function readImages(cnt: number, prefix: string, key: string, output: boolean) {
    const images: Image[] = []
    for (let i = 0; i < cnt; i++) {
        const buf = settingsReadBuffer(prefix, key+i.toString(), output);
        let img = buf && buf.length > 0 ? utilities.bufferToImage(buf) : null;
        if (!img) { img = image.create(16, 16); img.fill(1 + i); }
        images.push(img);
    }
    return images;
}

function saveImage(prefix: string, kind: number, img: Image, background: boolean) {
    const buf = utilities.imageToBuffer(img);
    settings.writeBuffer(prefix + (background ? BackImageKey : SpriteImageKey) + kind.toString(), buf);
    return buf;
}

module tileworld {

    export const TileWorldVersion = "4.0.0";

    export class SwitchExport {
        constructor(private p: Project, private backgrounds: boolean = true) {
        }
        public getImages(): Image[] {
            return this.backgrounds ? this.p.backgroundImages() : this.p.spriteImages();
        }
        public getImage(kind: number): Image {
            return this.backgrounds ? this.p.getBackgroundImage(kind) : this.p.getSpriteImage(kind);
        }
        public saveImage(kind: number): void {
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
        public getImages(): Image[] {
            return this.allImages;
        }
        public getImage(index: number): Image {
            return this.allImages[index];
        }
        public saveImage(index: number): void {
            index < this.p.backCnt() ? this.p.saveBackgroundImage(index) : this.p.saveSpriteImage(index - this.p.backCnt());
        }
        public getSetAttr(rv: RuleView, whendo: number, aid: number, val = 0xffff): number {
            return aid < this.p.backCnt() ? rv.getSetBgAttr(whendo, aid, val) : rv.getSetSpAttr(whendo, aid - this.p.backCnt(), val);
        }
    }

    export class Project {
        private lastRule: RuleView = null;
        private _player = -1;
        private _backgrounds: Image = null;
        private _sprites: Image = null;
        public highScore = 0;           // TODO
        public debug = false;
        public help = true;
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

        public setRules(rvl: RuleView[]): void {
            this.rules = rvl;
        }

        public getRules(): RuleView[] {
            return this.rules;
        }

        public setPlayer(kind: number): void {
            this._player = kind;
        }

        public getPlayer(): number {
            return this._player;
        }

        // a world consists of two images
        // - tile backgrounds (values 0-14)
        // - tile sprites (values 0-14)

        public setWorldBackgrounds(img: Image): void {
            this._backgrounds = img;
        }

        public getWorldBackgrounds(): Image {
            return this._backgrounds;
        }

        public setWorldSprites(img: Image): void { 
            this._sprites = img;
        }

        public getWorldSprites(): Image {
            return this._sprites;
        }

        // images
        public backCnt(): number { return this._backgroundsI.length; }
        public spriteCnt(): number { return this._spritesI.length; }
        public allCnt(): number { return this.backCnt() + this.spriteCnt(); }
        public backgroundImages(): Image[] { return this._backgroundsI; }
        public spriteImages(): Image[] { return this._spritesI; }

        public getBackgroundImage(kind: number): Image {
            return 0 <= kind && kind < this.backCnt() ? this._backgroundsI[kind] : null;
        }

        public getSpriteImage(kind: number): Image {
            return 0 <= kind && kind < this.spriteCnt() ? this._spritesI[kind] : null;
        }

        public saveBackgroundImage(kind: number): void {
            saveImage(this.prefix, kind, this.getBackgroundImage(kind), true);
        }
        
        public saveSpriteImage(kind: number): void {
            saveImage(this.prefix, kind, this.getSpriteImage(kind), false);
        }

        public saveRule(rv: RuleView): void {
            if (rv.getRuleId() == -1)
                return;
            this.storeRule(this.prefix, rv.getRuleId(), rv.getBaseRule());
        }

        public makeRule(rt: RuleType, ra: RuleArg | MoveDirection, kind = 0xffff): RuleView {
            const rv = this.wrapRule(makeNewRule(rt, ra));
            if (kind != 0xffff) {
                // this is a bit of a mess
                const wd = rv.makeWhenDo(2, 2);
                rv.getSetSpAttr(wd, kind, AttrType.Include);
                if (rt == RuleType.ContextChange || rt == RuleType.Collision) {
                    rv.setWitnessDirection(wd, ra);
                }
                if (kind == 0) {
                    // default to 4 way
                    rv.setTransforms(RuleTransforms.Rotate3Way)
                }
            }
            this.saveRule(rv);
            return rv;
        }

        public removeRule(rid: number): void {
            const r = this.rules.find(r => r.getRuleId() == rid);
            if (r) {
                this.rules.removeElement(r);
                settings.remove(this.prefix + RuleKey + rid.toString());
            }
        }

        public saveWorld(): void {
            const worldBuf = utilities.imageToBuffer(this._backgrounds);
            settings.writeBuffer(this.prefix + WorldBackgroundsKey, worldBuf);
            const spritesBuf = utilities.imageToBuffer(this._sprites);
            settings.writeBuffer(this.prefix + WorldSpritesKey, spritesBuf);
        }

        public saveHelp(): void {
            settings.writeNumber(this.prefix+HelpKey, this.help ? 1 : 0);
        }

        public newHighScore(newScore: number): void {
            this.highScore = newScore;
            settings.writeNumber(this.prefix+HighScoreKey, newScore);
        }

        private storeRule(prefix: string, rid: number, rule: Rule): Buffer {
            const buf = packRule(rule, this.backCnt(), this.spriteCnt());
            settings.writeBuffer(prefix + RuleKey + rid.toString(), buf);
            return buf;
        }

        public saveProject(): void {
            const prefix = this.prefix;
            settings.writeString(prefix + VersionKey, this.version);
            settings.writeNumber(prefix + HelpKey, this.help ? 1 : 0);
            settings.writeNumber(prefix + BackImgCntKey, this.backCnt());
            settings.writeNumber(prefix + SpriteImgCntKey, this.spriteCnt());
            settings.writeNumber(prefix + PlayerIndexKey, this.getPlayer());
            this.backgroundImages().forEach((img, i) => {
                saveImage(prefix, i, img, true);
            });
            this.spriteImages().forEach((img, i) => {
                saveImage(prefix, i, img, false);
            });
            const worldBuf = utilities.imageToBuffer(this.getWorldBackgrounds());
            settings.writeBuffer(prefix + WorldBackgroundsKey, worldBuf);
            const spritesBuf = utilities.imageToBuffer(this.getWorldSprites());
            settings.writeBuffer(prefix + WorldSpritesKey, spritesBuf);
            this.getRules().forEach(r => {
                this.storeRule(prefix, r.getRuleId(), r.getBaseRule());
            });
        }

        public printRules(): void {
            this.getRules().forEach(rv => {
                rv.printRule();
            });
        }

        private wrapRule(r: Rule): RuleView {
            // find a new id that is not in rule list
            const rids = this.rules.map(r => r.getRuleId()).sort((a,b) => a - b );
            let rid = 0;
            for(let i = 0; i< rids.length; i++) {
                if (rid != rids[i])
                    break;
                rid = rids[i]+1;
            }
            const newRule = new RuleView(this, rid, r);
            this.rules.push(newRule);
            return newRule;
        }
    
        public getRulesForSpriteKind(kind: number): RuleView[] {
            return this.rules.filter(rv => rv.hasSpriteKind(kind));
        }
    }

    // overloaded to also print out the game as a JavaScript
    // function and compute metrics
    export function loadProject(prefix: string, output = false): Project {
        const names = settings.list(prefix);
        if (names.length == 0)
            return null;
        if (output) console.log("function createNAME(prefix: string) {");
        if (output) console.log("if (settings.exists(prefix+\"VersionS\")) return;");
        const version = settingsReadString(prefix, VersionKey, output);
        // get the tile map, handling errors
        let buf = settingsReadBuffer(prefix, WorldBackgroundsKey, output);
        let world = buf && buf.length > 0 ? utilities.bufferToImage(buf) : null;
        world = world ? world : image.create(32, 24);
        // sprite map
        buf = settingsReadBuffer(prefix, WorldSpritesKey, output);
        let sprites = buf && buf.length > 0 ? utilities.bufferToImage(buf) : null;
        sprites = sprites ? sprites : image.create(32, 24);
        // background images and sprite images
        const backCnt = settingsReadNumber(prefix, BackImgCntKey, output);
        const backImages = readImages(backCnt, prefix, BackImageKey, output);
        const spriteCnt = settingsReadNumber(prefix, SpriteImgCntKey, output);
        const spriteImages = readImages(spriteCnt, prefix, SpriteImageKey, output);
        const helpNum = settingsReadNumber(prefix, HelpKey, output);
        const help = helpNum ? true: false;
        let highScore = settingsReadNumber(prefix, HighScoreKey, output);
        highScore = highScore == undefined ? 0 : highScore;
        // start project
        const p = new Project(prefix, backImages, spriteImages);
        // get the rules, at least
        const ruleName = prefix + RuleKey;
        const ruleids = names.filter(s => s.indexOf(ruleName) == 0).map(s => parseInt(s.substr(ruleName.length)));
        const rules: RuleView[] = [];
        let derivedRules = 0;
        let whenDoCount = 0;
        let commandCount = 0;
        let attrCount = 0;
        ruleids.forEach(rid => {
            const buf = settingsReadBuffer(prefix, RuleKey + rid.toString(), output);
            if (buf) {
                const rule = unPackRule(buf, backCnt, spriteCnt);
                const rv = new RuleView(p, rid, rule)
                rules.push(rv);
                if (output) {
                    derivedRules += rv.getDerivedRules().length;
                    const [wdCnt, cmdCnt, attrCnt] = ruleStats(rv);
                    whenDoCount += wdCnt;
                    commandCount += cmdCnt;
                    attrCount += attrCnt;
                }
            } else {
                screen.print("Read ("+rid.toString()+") failed", 10, 10);
                control.assert(false, 42);
            }
        });
        const player = settingsReadNumber(prefix, PlayerIndexKey, output);
        if (output) console.log("}");
        if (output) {
            console.log("// base rules: "+ruleids.length);
            console.log("// derived rules: "+derivedRules + " (" + (derivedRules/ruleids.length) + ")");
            console.log("// whendos: "+whenDoCount + " (" + (whenDoCount/ruleids.length) + ")");
            console.log("// commands: "+commandCount + " (" + (commandCount/ruleids.length) + ")");
            console.log("// attrs: "+attrCount + " (" + (attrCount/whenDoCount) + ")");
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

    export function emptyProject(prefix: string): Project {
        const fixed: Image[] = []; 
        const movable: Image[] = [];
        for(let f=0;f<4;f++) {
            fixed.push(galleryTiles[f].clone());
        }
        for (let f = 0; f < 4; f++) {
            movable.push(gallerySprites[f].clone());
        }
        const p = new Project(prefix, fixed, movable);
        const world = image.create(32, 24);
        helpers.imageFillRect(world, 1, 1, 30, 22, 1);
        const sprites = image.create(32, 24);
        sprites.fill(0xf);
        p.setWorldBackgrounds(world);
        p.setWorldSprites(sprites);
        p.setPlayer(0);
        p.version = TileWorldVersion;
        return p;
    }
} 
