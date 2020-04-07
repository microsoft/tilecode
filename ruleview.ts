namespace tileworld {
    
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

        public removeCommand(wdid: number, cid: number) {
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
}