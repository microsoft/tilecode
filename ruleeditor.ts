namespace tileworld {


    // ------------------------------------------------------------------------------------
    // a simple (but not complete) way to change the transforms on a rule

    const transformMap = [ RuleTransforms.None, RuleTransforms.HorzMirror, RuleTransforms.VertMirror, RuleTransforms.Rotate3Way];
    const transformCol = [ 1, 3, 5, 7];

    export class RuleViewDisplay extends RuleDisplay {
        private ruleViews: RuleView[];
        constructor(p: Project, private baseRule: RuleView) {
            super(p, baseRule);
            this.setCol(0); this.setRow(0);
            this.ruleViews = this.baseRule.getDerivedRules();
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() == 0 && this.col() >=1 && this.col() <= 7) {
                    let index = (this.col()-1) >> 1;
                    this.baseRule.setTransforms(transformMap[index]);
                    this.ruleViews = this.baseRule.getDerivedRules();
                }
            });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                this.p.saveRule(this.baseRule);
                game.popScene();
                return;
            });
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean) {
            this.cursorToView()
            this.update();
        }

        private cursorToView() {
            let t = this.baseRule.getTransforms();
            this.rule = this.baseRule;
            if (this.row() == 1 && t != RuleTransforms.None && this.ruleViews.length > 0) {
                let index = transformMap.indexOf(t);
                let col = transformCol[index];
                if (this.col() == col) {
                    this.rule = this.ruleViews[0];
                } else if (this.col() >= 7) {
                    this.rule = this.ruleViews[this.col()-7];
                }
            }
            this.update();
        }

        protected update() {
            super.update();
            // menu options
            this.drawImage(1, 0, yellowSprite);
            this.drawImage(3, 0, flipHoriz);
            this.drawImage(5, 0, flipVert);
            this.drawImage(7, 0, rotate3way);
            // which one selected
            let index = transformMap.indexOf(this.baseRule.getTransforms());
            this.drawImage(1 + (index << 1), 0, cursorOut);
            // resulting rules
            let col = transformCol[index];        
            this.ruleViews.forEach((rv, index) => {
                this.drawImage(col+index, 1, yellowSprite);
            });
        }
    }

    // ------------------------------------------------------------------------------------
    // the rule editor

    enum RuleEditorMenus { MainMenu, AttrTypeMenu, DirExprMenu, CommandMenu };
    enum CommandTokens { Last=CommandType.Last, SpaceTile, Delete };

    const menuHelpString = "10map,20play,30debug,50generalize rule,60delete rule,80add rule,90next rule,70previous rule,";
    const attrHelpString = "00include,10exclude,90reset,";

    export class RuleEditor extends RuleDisplay {
        private otherCursor: Sprite;    // show correspondence between left and right

        // in-world menus
        private menu: RuleEditorMenus;  // which menu is active?
        // whendo state
        private attrSelected: number;

        private whenDo: number;         // which WhenDo is being edited
        private currentCommand: number; // the current command (potentially null)
        private askDeleteRule: boolean;
        
        constructor(p: Project, rule: RuleView, private kind: number) {
            super(p, rule);

            this.setCol(0); this.setRow(0);

            this.askDeleteRule = false;

            // attribute menu view
            this.attrSelected = -1;

            // Control
            this.menu = RuleEditorMenus.MainMenu;

            // linked cursor
            this.otherCursor = sprites.create(cursorOut)
            this.otherCursor.setFlag(SpriteFlag.Invisible, true)
            this.otherCursor.x = 88
            this.otherCursor.y = yoff+40
            this.otherCursor.z = 50;

            // refresh display
            this.update();

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                this.helpCursor.say(null);
                if (this.askDeleteRule) {
                    let index = this.currentRules().indexOf(this.rule);
                    this.p.removeRule(this.rule.getRuleId());
                    let rules = this.currentRules();
                    if (rules.length == 0) {
                        game.popScene();
                        return;
                    } else {
                        this.rule = index < rules.length ? rules[index] : rules[index-1];
                    }
                    this.askDeleteRule = false;
                } else if (this.manhattanDistance2() <= 2) {
                    if (this.active(this.col(), this.row() - editorRow)) {
                        if (this.menu == RuleEditorMenus.MainMenu) {
                            this.menu = RuleEditorMenus.AttrTypeMenu;
                            this.setTileSaved();
                        } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                            this.noMenu();
                        }
                    }
                } else if (this.menu == RuleEditorMenus.AttrTypeMenu && this.row() < 2) {
                    this.attrUpdate();
                } else if (this.menu == RuleEditorMenus.CommandMenu) {
                    this.commandUpdate();
                } else if (this.menu == RuleEditorMenus.DirExprMenu) {
                    this.dirExprUpdate();
                } else if (this.menu == RuleEditorMenus.MainMenu) {
                    if (this.row() == 0) {
                        if (7 <= this.col() && this.col() <= 9) {
                            // move backward/forward in rule space
                            let rules = this.currentRules();
                            let index = rules.indexOf(this.rule);
                            if (this.col() == 7 && index > 0) {
                                this.changeRule(rules[index-1]);
                            } else if (this.col() == 9 && index < rules.length-1) {
                                this.changeRule(rules[index+1]);
                            } else if (this.col() == 8 && this.getType() != -1) {
                                this.changeRule(p.makeRule(this.getType(), this.getDir(), this.getKind()));
                            }
                        } else if (this.col() == 1) {
                            game.pushScene();
                            new MapEditor(this.p);
                            return; 
                        } else if (this.col() == 2 || this.col() == 3) {
                            let rules = this.p.getRules();
                            game.pushScene();
                            let g = new RunGame(this.p, rules, this.col() == 3);
                            g.setWorld(this.p.getWorldBackgrounds(), this.p.getWorldSprites());
                            g.start();
                            return;
                        } else if (this.col() == 6) {
                            this.askDeleteRule = true;                     
                        } else if (this.col() == 5) {
                            game.pushScene();
                            new RuleViewDisplay(this.p, this.rule);
                            return;
                        }
                    } else if (this.row() >= editorRow) {
                        if (this.col() > 5) {
                            this.tryEditCommand();
                        } else if (this.col() == 5 && this.row() < editorRow + 5) {
                            let col = this.rowToColCoord(this.row() - editorRow);
                            let row = this.rowToRowCoord(this.row() - editorRow);
                            if (this.findWitnessColRow(col, row) != -1) {
                                this.menu = RuleEditorMenus.DirExprMenu;
                                this.whenDo = this.rule.getWhenDo(col, row);
                                this.setTileSaved();
                            }
                        }
                    }
                }
                this.update();
            })

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.askDeleteRule) {
                    this.askDeleteRule = false;
                } else if (this.menu != RuleEditorMenus.MainMenu) {
                    this.noMenu();
                } else {
                    this.saveAndPop();
                    return;
                }
                this.update();
            });
        }

        private noMenu() {
            if (this.menu == RuleEditorMenus.CommandMenu) {
                this.checkCommand();
            }
            this.whenDo = -1;
            this.currentCommand = -1;
            this.attrSelected = -1;
            this.menu = RuleEditorMenus.MainMenu;
            this.tileSaved.setFlag(SpriteFlag.Invisible, true);
        }

        protected okToMove() {
            return !this.askDeleteRule;
        }

        private changeRule(rv: RuleView) {
            this.p.saveRule(this.rule);
            this.rule = rv;
        }

        private saveAndPop() {
            this.p.saveRule(this.rule);
            game.popScene();
        }

        protected currentRules() {
            // we should sort this by ruletype and direction
            return this.p.getRulesForSpriteKind(this.kind);
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean) {
            if (this.menu == RuleEditorMenus.MainMenu) {
                this.otherCursorMove();
            } 
            if (this.p.help) {
                this.helpCursor.x = this.col() < 6 ? this.cursor.x + 16 : this.cursor.x - 16;
                this.helpCursor.y = this.row() < 6 ? this.cursor.y + 32 : this.cursor.y;
                this.helpCursor.say(null);
                if (this.menu == RuleEditorMenus.MainMenu) {
                    if (this.row() == 0 || this.row() == 6) {
                        this.helpCursor.say(getHelp(menuHelpString, this.col(), this.row()));
                    } else if (this.manhattanDistance2() <= 2) {
                        this.helpCursor.say("A: predicate");
                    } 
                } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                    if (this.row() == 0) {
                        this.helpCursor.say(getHelp(attrHelpString, this.col(), this.row()));
                    } else if (this.row() == 1 && this.col() < 8) {
                        this.helpCursor.say("A: set flag");
                    }
                } else if (this.menu == RuleEditorMenus.CommandMenu) {
                    this.commandUpdate(true);
                }
            }
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

        private manhattanDistance2() {
            return (Math.abs(2 - this.col()) + Math.abs(2 - (this.row() - editorRow)));
        }

        protected update() {
            super.update();
            
            if (this.p.help && this.menu == RuleEditorMenus.MainMenu && this.col() > 5 && this.row() >= editorRow) {
                let len = this.commandLengths[this.row() - editorRow];
                if (len != -1 && this.col()-6 < len) {
                    this.helpCursor.say(this.col() - 6 == len - 1 ? "A: add command" : "E: edit command");
                }
            }
            if (this.menu == RuleEditorMenus.MainMenu) {
                this.showMainMenu();
            } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                this.dirMap.fill(0xf);
                this.attrMenu(this.col(false), this.row(false)-editorRow);
            } else if (this.menu == RuleEditorMenus.CommandMenu) {
                this.modifyCommandMenu();
            } else if (this.menu == RuleEditorMenus.DirExprMenu) {
                this.dirExprMenu();
            }
            if (this.askDeleteRule) {
                this.cursor.setFlag(SpriteFlag.Invisible, true);
                game.showDialog("OK to delete rule?", "", "A = OK, B = CANCEL");
            } else {
                this.cursor.setFlag(SpriteFlag.Invisible, false);
            }
        }
        
        private showMainMenu() {
            this.fillTile(0, 0, 11);
            this.drawImage(0, 0, code);
            this.drawImage(1, 0, map);
            this.drawImage(2, 0, play);
            this.drawImage(3, 0, debug);
            this.drawImage(5, 0, flipHoriz);
            this.drawImage(6, 0, garbageCan);
            let rules = this.currentRules();
            let index = rules.indexOf(this.rule);
            this.drawImage(9, 0, index < rules.length -1 ? rightArrow : greyImage(rightArrow));
            this.drawImage(8, 0, this.getType() != -1 ? addRule : greyImage(addRule));
            this.drawImage(7, 0, index > 0 ? leftArrow : greyImage(leftArrow));
        }

        private tryEditCommand() {
            let row = this.row()-editorRow;
            if (row > 4) return false;
            let col = this.col() - 6;
            if (col >= Math.abs(this.commandLengths[row])) return false;
            // set up the state
            this.menu = RuleEditorMenus.CommandMenu;
            this.ruleTypeMap.fill(0xf);
            this.dirMap.fill(0xf);
            let newCol = this.rowToColCoord(row);
            let newRow = this.rowToRowCoord(row);
            if (!this.active(newCol, newRow))
                return false;
            this.whenDo = this.rule.getWhenDo(newCol, newRow);
            if (this.whenDo == -1)
                this.whenDo = this.rule.makeWhenDo(newCol, newRow);
            this.setTileSaved();
            this.currentCommand = col;
            if (this.rule.getCmdInst(this.whenDo, col) == 0xff) {
                this.showCommandsAt(row, newCol, newRow, false);
                this.makeCommandMenu(0xff,0xff);
            } else {
                this.tokens = [];
                this.modifyCommandMenu();
            }
            return true;
        }

        private makeCommandMenu(inst: number, arg: number) {
            let col = 5;
            let row = 0;
            // show the categories
            // which one is currently selected?
            this.tokens.forEach(ct => {
                this.drawImage(col, row, ct < CommandType.Last ? categoryImages[ct] : garbageCan);
                this.drawOutline(col, row);
                if (inst == ct) this.drawImage(col, row, cursorOut);
                this.ruleTypeMap.setPixel(col, row, ct);
                col++;
            });
            if (inst != 0xff) {
                this.makeArgMenu(inst, arg);
            }
        }

        // argument range for command
        private instToStartArg(inst: number) {
            switch (inst) {
                case CommandType.Move: return this.getType() != RuleType.Collision ? 0 : 4;
                case CommandType.Paint:
                case CommandType.Sprite:
                case CommandType.Game:
            }
            return 0;
        }

        private instToArgText(inst: number): string[] {
            switch (inst) {
                case CommandType.Move: return moveText;
                case CommandType.Paint: return [];
                case CommandType.Sprite: return spriteText;
                case CommandType.Game: return gameText;
            }
            return [];
        }

        private instToNumArgs(inst: number) {
            switch (inst) {
                case CommandType.Move: return this.getType() != RuleType.Collision ? 4 : 2;
                case CommandType.Paint: return 4;
                case CommandType.Sprite: return 1;
                case CommandType.Game: return 2;
            }
            return 0;
        }

        private makeArgMenu(inst: number, arg: number) {
            let col = 4;
            let row = 1;
            this.dirMap.fill(0xf);
            let last = this.instToStartArg(inst) + this.instToNumArgs(inst);
            for (let i = this.instToStartArg(inst); i < last; i++) {
                this.drawImage(col, row, this.instToImage(inst, i));
                this.drawOutline(col, row);
                if (arg == i) this.drawImage(col, row, cursorOut);
                this.dirMap.setPixel(col, row, i);
                col++;
            }
        }

        private modifyCommandMenu() {
            let inst = this.rule.getCmdInst(this.whenDo, this.currentCommand);
            let arg = this.rule.getCmdArg(this.whenDo, this.currentCommand);
            if (this.tokens.length > 0) {
                this.makeCommandMenu(inst, arg);
            } else if (inst != 0xff) {
                this.tokens = [inst, CommandTokens.Delete];
                this.makeCommandMenu(inst, arg);
            }
        }

        private checkCommand() {
            // don't allow incomplete commands 
            let arg = this.rule.getCmdArg(this.whenDo, this.currentCommand);
            if (arg == 0xff) {
                this.setCommand(0xff, 0xff);
            }
        }

        private commandUpdate(hover: boolean = false) {
            let tok = this.ruleTypeMap.getPixel(this.col(), this.row());
            let arg = this.dirMap.getPixel(this.col(), this.row());
            let inst = this.rule.getCmdInst(this.whenDo, this.currentCommand);
            if (tok == CommandTokens.Delete) {
                if (hover) {
                    if (this.p.help) this.helpCursor.say("delete command");
                } else {
                    this.rule.removeCommand(this.whenDo, this.currentCommand);
                    this.noMenu();
                }
            } else if (this.row() == 0 && tok != 0xf) {
                if (hover) {
                    if (this.p.help) this.helpCursor.say(categoryText[tok]);
                } else {
                    if (tok != inst) {
                        this.setCommand(tok, 0xff); // this.instToStartArg(tok));
                        this.cursor.y += 16;
                        this.helpCursor.say(null);
                    }
                }
            } else if (this.row() == 1 && arg != 0xf) {
                if (hover) {
                    this.helpCursor.say(this.instToArgText(inst)[arg]);
                } else {
                    this.rule.setCmdArg(this.whenDo, this.currentCommand, arg);
                }
            } else if (!hover && this.row() > 1) {
                this.noMenu();
            }
        }

        private setCommand(inst: number, arg: number) {
            this.rule.setCmdInst(this.whenDo, this.currentCommand, inst);
            this.rule.setCmdArg(this.whenDo, this.currentCommand, arg);
        }

        protected showAttributes(col: number, row: number, show: boolean) {
            super.showAttributes(col, row, this.menu == RuleEditorMenus.MainMenu);
        }

        private attrMenu(col: number, row: number) {
            // which tile in the diamond are we attributing?
            let whenDo = this.rule.getWhenDo(col, row);
            if (whenDo == -1)
                whenDo = this.rule.makeWhenDo(col, row);
            // for all user-defined sprites
            attrImages.forEach((img, i) => {
                if (i >= 2) return;  // no oneof
                // draw 8x8 sprites centered
                screen.drawTransparentImage(img, (i << 4) + 4, yoff + 4);
                this.drawOutline(i, 0);
            });
            this.all.getImages().forEach((image, i ) => {
                if (i < this.p.backCnt() && this.getType() == RuleType.Collision)
                    return;
                let a = this.all.getSetAttr(this.rule, whenDo, i);
                this.drawImage(i, 1, image);
                this.drawImage(i, 1, attrImages[attrValues.indexOf(a)]);
                this.dirMap.setPixel(i, 1, a);
            });
            if (this.attrSelected == -1)
                this.selectAttr(0);
            this.drawImage(this.attrSelected, 0, cursorOut);
            this.drawImage(9, 0, reset);
        }

        private selectAttr(a: number) {
            this.attrSelected = a;
        }

        private attrUpdate() {
            let a = this.row() == 0 ? this.col() : -1
            if (a == 9) {
                // reset attributes
                for(let i = 0; i< this.p.allCnt(); i++) {
                    this.setAttr(i, AttrType.OK);
                }
                return;
            }
            if (a != -1 && a < 2) { 
                this.selectAttr(a); return; 
            }
            let m = this.row() == 1 ? this.col() : -1; 
            if (m != -1 && m < this.p.allCnt()) { 
                if (m < this.p.backCnt() && this.getType() == RuleType.Collision)
                    return;
                let val = attrValues[this.attrSelected];
                this.setAttr(m, val, true);
            }
        }

        private setAttr(m: number, val: AttrType, toggle: boolean = false) {
            let whenDo = this.rule.getWhenDo(this.col(false), this.row(false)-editorRow);
            if (toggle && this.all.getSetAttr(this.rule,whenDo,m) == val)
                val = AttrType.OK;
            this.all.getSetAttr(this.rule, whenDo, m, val)
        }

        private dirExprMenu() {
            movedImages.forEach((img, i) => {
                this.drawImage(i, 0, img);
            });
            screen.print("*", (6 << 4) + 6, 4 + yoff);
            this.drawImage(this.rule.getWitnessDirection(this.whenDo), 0, cursorOut);
        }

        private dirExprUpdate() {
            if (this.row() != 0 || this.col() > 6)
                return;
            this.rule.setWitnessDirection(this.whenDo, this.col());
        }

    }
}