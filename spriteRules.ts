namespace tileworld {

    const yoff = 6;
    const helpStringTop = "31resting,21moved left,41moved right,30moved up,32moved down,61dpad left,81dpad right,70dpad up,72dpad down,";
    const helpStringBot = "25collide left,34collide up,36collide down,45collide right,65collide left,74collide up,76collide down,85collide right,";

    export class RuleRoom extends RuleVisualsBase {
        private kind: number;
        private moreHelp: Sprite;
        constructor(p: Project) {
            super(p);
            this.kind = this.p.fixed().length();
            // set cursor
            this.setCol(0);
            this.setRow(this.kind - this.p.fixed().length + 1);
            this.setTileSaved();
            this.setRow(0);
            this.moreHelp = sprites.create(cursorIn);
            this.moreHelp.setFlag(SpriteFlag.Invisible, true);
            this.moreHelp.x = 84;
            this.moreHelp.y = yoff + 64 + 7;

            this.update();
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.col() == 0) {
                    if (this.row() == 0 && this.p.getRulesForKind(this.kind).length > 0) {
                        game.pushScene();
                        new RuleEditor(this.p, this.kind, -1, -1);
                    } else if (this.row() >= 1 && this.row() <= this.p.movable().length) {
                        this.kind = this.p.fixed().length + this.row() - 1;
                        this.setTileSaved();
                    }
                    this.update();
                } else {
                    let rt = this.ruleTypeMap.getPixel(this.col(), this.row());
                    let dir = this.dirMap.getPixel(this.col(), this.row());
                    if (rt != 0xf) {
                        game.pushScene();
                        new RuleEditor(this.p, this.kind, rt, dir);
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
                    if (this.row() >= 4 && message) {
                        // resting vs moving collision
                        if (this.col() < 5) {
                            this.moreHelp.say("into resting");
                        } else {
                            this.moreHelp.say("into moving");
                        }
                    } else {
                        this.moreHelp.say(null);
                    }
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
            this.p.movable().forEach((img,i) => {
                this.drawImage(0, i+1, img);
            })
            this.showRuleMenu(1, 0);
        }

        protected centerImage() {
            return this.p.getImage(this.kind);
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

        private rules: number[];
        private doBoth(rt: RuleType, rd: MoveDirection, col: number, row: number, center: boolean = true) {
            let scol = 13;
            let rules = this.getRulesForTypeDir(this.rules, rt, rd);
            if (rt >= RuleType.CollidingResting) {
                let tcol = col + moveXdelta(rd);
                let trow = row + moveYdelta(rd);
                this.setRuleType(rt, rd, tcol, trow);
                if (rules.length > 0) { this.fillTile(tcol, trow, scol); this.drawOutline(tcol,trow, 1); }
            } else if (rt == RuleType.Pushing) {
                let tcol = col - moveXdelta(rd);
                let trow = row - moveYdelta(rd);
                this.setRuleType(rt, rd, tcol, trow);
                if (rules.length > 0) { this.fillTile(tcol, trow, scol); this.drawOutline(tcol, trow, 1); }
            } else {
                this.setRuleType(rt, rd, col, row);
                if (rules.length > 0) { this.fillTile(col, row, scol); this.drawOutline(col, row, 1); }
            }
            this.showRuleType(rt, rd, col, row, center);
        }

        private showRuleMenu(x: number, y: number) {
            this.rules = this.p.getRulesForKind(this.kind);
            this.makeContext(x + 2, y + 1)
            this.doBoth(RuleType.Resting, 0, x + 2, y + 1);

            // if (this.kind < this.p.fixed().length)
            //    return;

            //this.makeContext(x + 6, y + 1)
            this.doBoth(RuleType.Moving, MoveDirection.Right, x + 3, y + 1);
            this.doBoth(RuleType.Moving, MoveDirection.Left, x + 1, y + 1);
            this.doBoth(RuleType.Moving, MoveDirection.Up, x + 2, y);
            this.doBoth(RuleType.Moving, MoveDirection.Down, x+2, y+2);

            this.makeContext(x + 6, y + 1)
            this.doBoth(RuleType.Pushing, MoveDirection.Right, x + 8, y + 1, false);
            this.doBoth(RuleType.Pushing, MoveDirection.Left, x + 4, y + 1, false);
            this.doBoth(RuleType.Pushing, MoveDirection.Down, x + 6, y + 3, false);
            this.doBoth(RuleType.Pushing, MoveDirection.Up, x + 6, y - 1, false);

            this.makeContext(x + 2, y + 5);
            this.doBoth(RuleType.CollidingResting, MoveDirection.Right, x + 2, y + 5, false);
            this.doBoth(RuleType.CollidingResting, MoveDirection.Left, x + 2, y + 5, false);
            this.doBoth(RuleType.CollidingResting, MoveDirection.Up, x + 2, y + 5, false);
            this.doBoth(RuleType.CollidingResting, MoveDirection.Down, x + 2, y + 5, false);
            this.showRuleType(RuleType.Resting, 0, x + 2, y + 5);

            this.makeContext(x + 6, y + 5);
            this.doBoth(RuleType.CollidingMoving, MoveDirection.Right, x + 6, y + 5, false);
            this.doBoth(RuleType.CollidingMoving, MoveDirection.Left, x + 6, y + 5, false);
            this.doBoth(RuleType.CollidingMoving, MoveDirection.Up, x + 6, y + 5, false);
            this.doBoth(RuleType.CollidingMoving, MoveDirection.Down, x + 6, y + 5, false);
            this.showRuleType(RuleType.Resting, 0, x + 6, y + 5);
        }
    }
}