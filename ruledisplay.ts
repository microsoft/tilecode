namespace tileworld {

    export const editorRow = 2;
    
    export class RuleDisplay extends RuleVisualsBase {
        protected all: AllExport;
        private otherCursor: Sprite;    // show correspondence between left and right

        constructor(p: Project, protected rule: RuleView) {
            super(p);
            this.all = new AllExport(p);
            
            // linked cursor
            this.otherCursor = sprites.create(cursorOut)
            this.otherCursor.setFlag(SpriteFlag.Invisible, true)
            this.otherCursor.x = 88
            this.otherCursor.y = yoff+40
            this.otherCursor.z = 50;
        }

        protected getDir() {
            return this.rule.getDirFromRule();
        }

        protected getType() {
            return this.rule.getRuleType();
        }

        protected getKind() {
            let kinds = this.rule.getSpriteKinds();
            if (kinds.length > 0)
                return kinds[0];
            return -1;
        }

        protected centerImage() {
            return ok;
        }

        protected getDirectionImage() {
            let dir = this.rule.getDirFromRule();
            return this.getType() == RuleType.ButtonPress ? buttonImages[dir] : moveImages[dir];
        }

        private otherCursorMove() {
            if (this.col() >= 5 && this.row() >= editorRow) {
                let row = this.row() - editorRow;
                this.otherCursor.setFlag(SpriteFlag.Invisible, false);
                // compute mapping from right to left hand side
                this.otherCursor.x = this.rowToColCoord(row) * 16 + 8;
                this.otherCursor.y = this.rowToRowCoord(row) * 16 + 8 + yoff + (editorRow *16);
            } else {
                this.otherCursor.setFlag(SpriteFlag.Invisible, true);
            }
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean) {
            this.otherCursorMove();
        }

        protected collideCol: number;
        protected collideRow: number;

        protected showCollision(col: number, row: number, dir: MoveDirection, arrowImg: Image, rt: RuleType) {
            super.showCollision(col, row, dir, arrowImg, rt);
            this.collideCol = col;
            this.collideRow = row - editorRow;
        }

        protected update() {
            this.collideCol = this.collideRow = -1;
            screen.fill(0);
            screen.print("When", 0, (editorRow << 4) + 8);
            if (this.p.debug)
                screen.print(this.rule.getRuleId().toString(), 30, 0);
            screen.print("Do", 70, (editorRow << 4) + 8);
            
            // sets collideCol and collideRow
            this.showRuleType(this.rule.getRuleType(), this.rule.getDirFromRule(), 2, 2 + editorRow);
            this.makeContext();
            if (this.getType() != RuleType.NegationCheck)
                this.showRuleType(this.rule.getRuleType(), this.rule.getDirFromRule(), 2, 2 + editorRow);
         
            this.showCommands();
            if (this.getType() == RuleType.ButtonPress) {
                let image = this.getDirectionImage();
                if (image)
                    this.drawImage(0, 3, image);
            } else if (this.getType() == RuleType.NegationCheck) {
                this.drawImage(0, 3, negate);
            }
        }

        private makeContext() {
            for (let i = 0; i <= 4; i++) {
                for (let j = 0; j <= 4; j++) {
                    let dist = Math.abs(2 - j) + Math.abs(2 - i);
                    if (dist <= 2 && this.active(i, j)) {
                        this.drawImage(i, j + editorRow, emptyTile);
                        this.showAttributes(i, j);
                    }
                }
            }
        }

        protected active(col: number, row: number) {
            if (this.collideCol != -1) {
                return col == 2 && row == 2 || col == this.collideCol && row == this.collideRow;
            }
            return true;
        }

        // map from row 0-4 to (col,row) in diamond
        protected rowToColCoord(lr: number) { return lr % 2 == 0 ? 2 : lr; }
        protected rowToRowCoord(lr: number) { return lr == 0 ? 1 : (lr == 4 ? 3 : 2); }
        // compute number of commands in each row, for editing
        protected commandLengths: number[];

        private showCommands() {
            this.commandLengths = [];
            for (let lr = 0; lr < 5; lr++) {
                let col = this.rowToColCoord(lr);
                let row = this.rowToRowCoord(lr);
                if (this.active(col, row)) {
                    let len = this.showCommandsAt(lr, col, row);
                    this.commandLengths.push(len);
                } else {
                    this.commandLengths.push(-1);
                }
            }
        }

        protected instToImage(inst: number, arg: number): Image {
            if (inst == 0xff || arg == 0xff)
                return emptyTile;
            switch (inst) {
                case CommandType.Move: return moveImages[arg];
                case CommandType.Paint: {
                    let ret = this.p.backgroundImages()[arg].clone();
                    ret.drawTransparentImage(smallPaint, 0, 0);
                    return ret;
                }
                case CommandType.Sprite: return spriteImages[arg];
                case CommandType.Game: return gameImages[arg];
                case CommandType.Spawn: 
                case CommandType.BlockSpriteRules:
                {
                    let ret = this.p.spriteImages()[arg].clone();
                    ret.drawTransparentImage(inst == CommandType.Spawn ? spawn : exclude, 0, 0);
                    return ret;
                }
                case CommandType.Teleport: {
                    let ret = this.p.backgroundImages()[arg].clone();
                    ret.drawTransparentImage(teleport, 0, 0);
                    return ret;
                }
            }
            return emptyTile;
        }

        protected tokens: number[];
        protected showCommandsAt(crow: number, wcol: number, wrow: number, draw: boolean = true) {
            if (draw) {
                // TODO: fix this up
                let kind = this.rule.findWitnessColRow(wcol, wrow);
                let img1 = this.collideCol == wcol && this.collideRow == wrow ? collisionSprite : genericSprite;
                let img2 = kind == -1 ? img1 : this.getWhenDoImage(wcol, wrow);
                this.drawImage(5, crow + editorRow, img2);
                if (kind != -1 && this.getType() != RuleType.Collision) {
                    let whendo = this.rule.getWhenDo(wcol, wrow);
                    this.drawImage(5, crow + editorRow, movedImages[this.rule.getWitnessDirection(whendo)])
                } 
                if (this.p.help) {
                    screen.print((crow +1).toString(), (5 << 4) + 10, ((editorRow + crow) << 4)+13);
                    // do it in the when-do as well
                    screen.print((crow + 1).toString(), (wcol << 4) + 10, ((editorRow + wrow) << 4) + 13);
                }
            }
            // show the existing commands
            let whendo = this.rule.getWhenDo(wcol, wrow);
            let col = 6;
            let tokens = this.startTokens(wcol, wrow);
            if (!draw) { 
                this.tokens = tokens; 
            }
            let cid = 0
            for (; whendo != -1 && cid < this.rule.getCmdsLen(whendo); cid++ , col++) {
                this.showCommand(col, crow, whendo, cid, tokens, draw);
            }
            if (whendo == -1 || cid < MaxCommands && tokens.length > 0) {
                this.showCommand(col, crow, whendo, cid, tokens, draw);
                return cid + 1;
            }
            return cid;
        }

        private showCommand(col: number, row: number,
            whendo: number, cid: number, tokens: number[],
            draw: boolean) {
            if (whendo == -1) {
                if (draw) this.drawImage(col, row + editorRow, emptyTile);
            } else {
                let inst = this.rule.getCmdInst(whendo, cid);
                let arg = this.rule.getCmdArg(whendo, cid);
                if (draw) this.drawImage(col, row + editorRow, this.instToImage(inst, arg));
                this.updateTokens(tokens, inst);
                col++;
            }
            return col;
        }

        // what instructions are possible, given rule type and witness
        // this defines the menu to present at the top-level
        private startTokens(col: number, row: number) {
            let tokens: number[] = [];
            if (this.rule.findWitnessColRow(col, row) != -1) {
                tokens.push(CommandType.Move);
                tokens.push(CommandType.Sprite);
            }
            tokens.push(CommandType.Paint);
            tokens.push(CommandType.Spawn);
            tokens.push(CommandType.BlockSpriteRules);
            tokens.push(CommandType.Teleport);
            tokens.push(CommandType.Game);
            return tokens;
        }

        private updateTokens(tokens: number[], inst: number) {
            if (inst == 0xff)
                return;
            // at-most-once: paint, spawn, destroy
            tokens.removeElement(inst);
            // always remove move and destroy
            tokens.removeElement(CommandType.Move);
            tokens.removeElement(CommandType.Sprite);
            if (inst == CommandType.Spawn) {
                tokens.insertAt(0, CommandType.Move);
            }
        }

        protected getWhenDoImage(col: number, row: number) {
            let whenDo = this.rule.getWhenDo(col, row);
            if (whenDo == -1)
                return ok;
            // if there is an include or single oneOf, show it.
            let include = this.attrIndex(whenDo, AttrType.Include);
            let include2 = include == -1 ? -1 : this.attrIndex(whenDo, AttrType.Include, include + 1);
            let exclude = this.attrIndex(whenDo, AttrType.Exclude);
            let exclude2 = exclude == -1 ? -1 : this.attrIndex(whenDo, AttrType.Exclude, exclude + 1);
            let index = include == -1 ? exclude : include;
            // and skip to the other (if it exists)
            if (include != -1 && include2 != -1)
                return splitImage(this.all.getImage(include), this.all.getImage(include2));
            else if (include == -1 && exclude != -1 && exclude2 != -1)
                return splitImage(this.all.getImage(exclude), this.all.getImage(exclude2));
            else if (index != -1)
                return this.all.getImage(index);
            else
                return ok;
        }

        protected showAttributes(col: number, row: number, show: boolean = true) {
            let whenDo = this.rule.getWhenDo(col, row);
            if (whenDo >= 0) {
                this.drawImage(col, row + editorRow, this.getWhenDoImage(col, row));
                // show attributes
                let begin = 0;
                let end = this.p.allCnt() - 1;
                let project = this.projectAttrs(whenDo, begin, end);
                let done: AttrType[] = [];
                project.forEach(a => {
                    let i = attrValues.indexOf(a);
                    screen.drawTransparentImage(attrImages[i], (col << 4) + 8, ((row + editorRow) << 4) + 8 + yoff);
                });
                // show direction 
                if (this.getType() != RuleType.Collision && this.rule.findWitnessColRow(col, row) != -1) {
                    this.drawImage(col, row + editorRow, movedImages[this.rule.getWitnessDirection(whenDo)])
                }
                // peek into attributions
                if (show && this.col() == col && this.row() - editorRow == row) {
                    let x = 0;
                    screen.fillRect(0, 16 + yoff, 160, 16, 0);
                    this.all.getImages().forEach((image, i) => {
                        let a = this.all.getSetAttr(this.rule, whenDo, i);
                        if (a != AttrType.OK) {
                            this.drawImage(x, 1, image);
                            this.drawImage(x, 1, attrImages[attrValues.indexOf(a)]);
                            x++;
                        }
                    });
                }
            }
        }

        private projectAttrs(whendo: number, begin: number, end: number): number[] {
            if (this.rule.whendoTrue(whendo))
                return [];
            let res: number[] = [];
            for (let i = begin; i <= end; i++) {
                let a = this.all.getSetAttr(this.rule, whendo, i);
                if (a != AttrType.OK && res.indexOf(a) == -1) res.push(a);
            }
            if (res.length > 0) {
                if (res.length == 1 && res.indexOf(AttrType.Exclude) != -1)
                    return [AttrType.Exclude];
                else
                    return [];
            }
            return res;
        }

        private attrIndex(whendo: number, a: AttrType, begin: number = 0) {
            for (let i = begin; i < this.p.allCnt(); i++) {
                if (this.all.getSetAttr(this.rule, whendo, i) == a)
                    return i;
            }
            return -1;
        }
    }
}