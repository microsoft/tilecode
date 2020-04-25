namespace tileworld {
    
    // a rule view encapsulates a rule and allows editing of the rule
    // as well as creating views of the underlying rule, where the
    // views are mirrors or rotates of the underlying rule
    export class RuleView {
        private view: RuleTransforms = RuleTransforms.None;
        constructor(private p: Project, private rid: number, private r: Rule) {
        }

        public getBaseRule() {
            return this.r;
        }

        public getDerivedRules() {
            let ret: RuleView[] = [];
            switch(this.r.transforms){
                case RuleTransforms.HorzMirror:
                case RuleTransforms.VertMirror: 
                case RuleTransforms.LeftRotate: 
                case RuleTransforms.RightRotate:        
                {
                    let rv = new RuleView(this.p, -1, this.r);
                    rv.view = this.r.transforms;
                    ret.push(rv);
                    break;
                }
                case RuleTransforms.Rotate3Way: {
                    for (let t = RuleTransforms.LeftRotate; t != RuleTransforms.Rotate3Way; t++) {
                        let rv = new RuleView(this.p, -1, this.r);
                        rv.view = t;
                        ret.push(rv)
                    }
                    break;
                }
            }
            return ret;
        }

        public getViewTransform() {
            if (this.rid == -1)
                return this.view;
            return -1;
        }

        public getTransforms() {
            return this.r.transforms;
        }

        public setTransforms(n:number) {
            this.r.transforms = n;
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
            return this.rid != -1 ? this.r.ruleArg : 
                this.r.ruleType == RuleType.ButtonPress ? flipRotateDir(this.r.ruleArg, this.view) : this.r.ruleArg;
        }

        public setRuleArg(ra: RuleArg) {
            this.r.ruleArg = ra;
        }

        public getDirFromRule() {
            let rt = this.getRuleType();
            if (rt == RuleType.Collision || rt == RuleType.ContextChange) {
                let wd = this.getWhenDo(2, 2);
                return wd == -1 ? AnyDir : this.getWitnessDirection(wd);
            } else if (rt == RuleType.ButtonPress) {
                return this.getRuleArg();
            }
            return AnyDir;
        }
        
        private rawView() {
             return this.view == RuleTransforms.LeftRotate ? RuleTransforms.RightRotate : 
                   (this.view == RuleTransforms.RightRotate ? RuleTransforms.LeftRotate: this.view);
        }

        public getWhenDo(col: number, row: number) {
            if (this.rid == -1) {
                let ncol = transformCol(col, row, this.rawView());
                let nrow = transformRow(row, col, this.rawView());
                col = ncol;
                row = nrow;
            }
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

        private attrBgIndex(whendo: number, a: AttrType) {
            for (let i = 0; i < this.p.backCnt(); i++) {
                if (this.getSetBgAttr(whendo, i) == a)
                    return i;
            }
            return -1;
        }

        private attrSpIndex(whendo: number, a: AttrType) {
            for (let i = 0; i < this.p.spriteCnt(); i++) {
                if (this.getSetSpAttr(whendo, i) == a)
                    return i;
            }
            return -1;
        }

        public findWitnessColRow(col: number, row: number): number {
            if (this.getRuleType() == RuleType.NegationCheck)
                return -1;
            let whendo = this.getWhenDo(col, row);
            if (whendo == -1)
                return -1;
            if (this.attrBgIndex(whendo, AttrType.Include) != -1)
                return -1;
            return this.attrSpIndex(whendo, AttrType.Include);
        }

        public getWitnessDirection(wdid: number) {
            let dir = this.r.whenDo[wdid].dir;
            return (this.rid != -1 || dir >= Resting) ? dir : flipRotateDir(dir, this.view);
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
            let arg = wd.commands.getUint8((cid << 1)+1);
            if (this.rid == -1 && this.getCmdInst(wdid, cid) == CommandType.Move) {
                arg = flipRotateDir(arg, this.view);
            }
            return arg;        
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

        public removeCommand(wdid: number, cid: number) {
            let wd = this.r.whenDo[wdid];
            if (wd.commandsLen == 0 || cid >= wd.commandsLen)
                return wd.commandsLen;
            for(let i=(cid << 1); i <= ((MaxCommands-1)<<1)-1; i++) {
                wd.commands.setUint8(i, wd.commands.getUint8(i+2));
            }
            wd.commandsLen--;
            return wd.commandsLen;
        }

        // predicates/misc info

        public getSpriteKinds() {
            let wd = this.getWhenDo(2, 2);
            let ret: number[] = [];
            for(let i=0; i < this.p.spriteCnt(); i++) {
                let at = this.getSetSpAttr(wd, i);
                // TODO: Include vs. Include2?
                if (at == AttrType.Include || at == AttrType.Include2)
                    ret.push(i);
            }
            return ret;
        }

        public hasSpriteKind(kind: number) {
            let wd = this.getWhenDo(2, 2);
            // TODO: Include vs. Include2?
            return wd == -1 ?  false : this.getSetSpAttr(wd, kind) == AttrType.Include
        }

        public whendoTrue(whendo: number) {
            let wd = this.r.whenDo[whendo];
            return isWhenDoTrue(wd);
        }

        public isRuleTrue() {
            return isRuleTrue(this.r);
        }
    }
}