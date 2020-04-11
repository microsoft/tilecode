namespace tileworld {

    const yoff = 6;
    const helpStringTop = "31resting,21moved left,41moved right,30moved up,32moved down,61dpad left,81dpad right,70dpad up,72dpad down,71A button,";
    const helpStringBot = "25collide left,34collide up,36collide down,45collide right,65collide left,74collide up,76collide down,85collide right,";

    export class RuleRoom extends RuleVisualsBase {
        private kind: number;
        private moreHelp: Sprite;
        constructor(p: Project) {
            super(p);
            this.kind = 0;
            // set cursor
            this.setCol(0);
            this.setRow(this.kind + 1);
            this.setTileSaved();
            this.setRow(0);
            this.moreHelp = sprites.create(cursorIn);
            this.moreHelp.setFlag(SpriteFlag.Invisible, true);
            this.moreHelp.x = 84;
            this.moreHelp.y = yoff + 64 + 7;

            this.update();
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.col() == 0 && this.row() >= 1 && this.row() <= this.p.spriteCnt()) {
                    this.kind = this.row() - 1;
                    this.setTileSaved();
                    this.update();
                } else {
                    let rt = this.ruleTypeMap.getPixel(this.col(), this.row());
                    let dir = this.dirMap.getPixel(this.col(), this.row());
                    if (rt != 0xf) {
                        let rules = this.p.getRulesForSpriteKind(this.kind);
                        let filteredRules = this.getRulesForTypeDir(rules, rt, dir);
                        if (filteredRules.length == 0) {
                            filteredRules.push(this.p.makeRule(rt, dir, this.kind));
                        }
                        game.pushScene();
                        new RuleEditor(this.p, filteredRules[0], this.kind);
                    }
                }
            });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            });
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean = true) {
            if (this.p.help) {
                this.helpCursor.x = this.col() < 7 ? this.cursor.x + 8 : this.cursor.x - 16;
                this.helpCursor.y = this.row() < 6 ? this.cursor.y + 32 : this.cursor.y;
                let index = this.dirMap.getPixel(this.col(), this.row())
                if (this.col() > 0) {
                    let message = getHelp(this.row() < 4 ? helpStringTop : helpStringBot, this.col(), this.row());
                    this.helpCursor.say(message);
                } else {
                    this.helpCursor.say(null);
                    this.moreHelp.say(null);
                }
            }
        }

        public update() {
            screen.fill(15);
            screen.fillRect(0, yoff, 16, 16, 11);
            screen.drawTransparentImage(code, 0, yoff)
            this.p.spriteImages().forEach((img,i) => {
                this.drawImage(0, i+1, img);
            })
            this.showRuleMenu(1, 0);
        }

        protected centerImage() {
            return this.p.getSpriteImage(this.kind);
        }

        private makeContext(col: number, row: number) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    this.drawImage(col+i, row+j, emptyTile);
                }
            }
        }

        private setRuleType(rt: RuleType, rd: MoveDirection, col: number, row: number) {
            this.ruleTypeMap.setPixel(col, row, rt);
            this.dirMap.setPixel(col, row, rd);
        }

        private rules: RuleView[];
        private doBoth(rt: RuleType, rd: number, col: number, row: number, center: boolean = true) {
            let scol = 13;
            let rules = this.getRulesForTypeDir(this.rules, rt, rd);
            if (rt == RuleType.Collision && rd != Resting) {
                let tcol = col + moveXdelta(rd);
                let trow = row + moveYdelta(rd);
                this.setRuleType(rt, rd, tcol, trow);
                if (rules.length > 0) { this.fillTile(tcol, trow, scol); this.drawOutline(tcol,trow, 1); }
            } else if (rt == RuleType.ButtonPress) {
                let tcol = rd < ButtonArg.A ? col - moveXdelta(rd) : col;
                let trow = rd < ButtonArg.A ? row - moveYdelta(rd) : row;
                this.setRuleType(rt, rd, tcol, trow);
                if (rules.length > 0) { this.fillTile(tcol, trow, scol); this.drawOutline(tcol, trow, 1); }
                this.drawImage(tcol, trow, buttonImages[rd]);
            } else if (rt == RuleType.ContextChange || rt == RuleType.NegationCheck) {
                this.setRuleType(rt, rd, col, row);
                if (rules.length > 0) { this.fillTile(col, row, scol); this.drawOutline(col, row, 1); }
            }
            if (rt != RuleType.ButtonPress)
                this.showRuleType(rt, rd, col, row, center);
        }

        private showRuleMenu(x: number, y: number) {
            this.rules = this.p.getRulesForSpriteKind(this.kind);
            
            this.makeContext(x + 2, y + 1)
            this.doBoth(RuleType.ContextChange, Resting, x + 2, y + 1);
            this.doBoth(RuleType.ContextChange, MoveDirection.Right, x + 3, y + 1);
            this.doBoth(RuleType.ContextChange, MoveDirection.Left, x + 1, y + 1);
            this.doBoth(RuleType.ContextChange, MoveDirection.Up, x + 2, y);
            this.doBoth(RuleType.ContextChange, MoveDirection.Down, x+2, y+2);

            this.makeContext(x + 6, y + 1)
            this.doBoth(RuleType.ButtonPress, ButtonArg.Right, x + 8, y + 1, false);
            this.doBoth(RuleType.ButtonPress, ButtonArg.Left, x + 4, y + 1, false);
            this.doBoth(RuleType.ButtonPress, ButtonArg.Down, x + 6, y + 3, false);
            this.doBoth(RuleType.ButtonPress, ButtonArg.Up, x + 6, y - 1, false);
            this.doBoth(RuleType.ButtonPress, ButtonArg.A, x + 6, y + 1, false); 

            this.makeContext(x + 2, y + 5);
            this.doBoth(RuleType.Collision, MoveDirection.Right, x + 2, y + 5, false);
            this.doBoth(RuleType.Collision, MoveDirection.Left, x + 2, y + 5, false);
            this.doBoth(RuleType.Collision, MoveDirection.Up, x + 2, y + 5, false);
            this.doBoth(RuleType.Collision, MoveDirection.Down, x + 2, y + 5, false);
            this.drawImage(x + 2, y + 5, this.centerImage());

            this.makeContext(x + 6, y + 5);
            this.doBoth(RuleType.NegationCheck, AnyDir, x + 5, y + 4, false);
        }
    }
}