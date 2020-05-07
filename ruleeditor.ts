namespace tileworld.ruleediting {

    // ------------------------------------------------------------------------------------
    // the rule editor

    enum RuleEditorMenus { MainMenu, AttrTypeMenu, DirExprMenu, CommandMenu };
    enum CommandTokens { Delete = 100 };

    // top-level command categories (instructions)
    const categoryImages = [allFour, paint, spawn, eat, gameIcon, portal, exclude ];
    const categoryText = ["move", "paint", "spawn", "destroy",  "game", "portal", "block"];

    const menuHelpString = "10map,20play,30debug,50generalize rule,60delete rule,80add rule,90next rule,70previous rule,";
    const attrHelpString = "00include,10exclude,90reset,";

    export class RuleEditor extends RuleDisplay {
        // in-world menus
        private menu: RuleEditorMenus;  // which menu is active?
        // whendo state
        private attrSelected: number;
        // command editing
        private whenDo: number;         // which WhenDo is being edited
        private currentCommand: number; // the current command (potentially null)
        // hack: modal for deletion
        private askDeleteRule: boolean;
        
        constructor(p: Project, rule: RuleView, private kind: number) {
            // kind optimization
            // - don't allow the kind to be removed from (2,2)
            // - make sure the kind is shown as witness for (2,2)
            super(p, rule);
            this.setCol(0); this.setRow(0);
            this.askDeleteRule = false;
            this.mainMenu();

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
                        this.resetRule(index < rules.length ? rules[index] : rules[index-1]);
                    }
                    this.askDeleteRule = false;
                } else if (this.manhattanDistance2() <= 2) {
                    if (this.active(this.col(), this.row() - editorRow)) {
                        if (this.menu == RuleEditorMenus.MainMenu) {
                            this.menu = RuleEditorMenus.AttrTypeMenu;
                            this.setTileSaved();
                            // move cursor up to row of backgrounds/tiles
                            this.setCol(0);
                            this.setRow(1);
                        } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                            this.mainMenu();
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
                            this.p.saveRule(this.rule);
                            game.pushScene();
                            new MapEditor(this.p);
                            return; 
                        } else if (this.col() == 2 || this.col() == 3) {
                            this.p.saveRule(this.rule);
                            game.pushScene();
                            let rules = this.p.getRules();
                            let g = new RunGame(this.p, rules, this.col() == 3);
                            g.setWorld(this.p.getWorldBackgrounds(), this.p.getWorldSprites());
                            g.start();
                            return;
                        } else if (this.col() == 6) {
                            this.askDeleteRule = true;                     
                        } else if (this.col() == 5) {
                            this.p.saveRule(this.rule);
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
                            if (this.rule.findWitnessColRow(col, row) != -1 &&
                                // don't allow direction change on central sprite in collision rule
                                (this.rule.getRuleType() != RuleType.Collision || col != 2 || row != 2 )) { 
                                this.menu = RuleEditorMenus.DirExprMenu;
                                this.whenDo = this.rule.getWhenDo(col, row);
                                this.setTileSaved();
                                // move cursor to currently selected direction expression
                                this.setCol(this.rule.getWitnessDirection(this.whenDo));
                                this.setRow(0);
                            }
                        }
                    }
                }
            })

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.askDeleteRule) {
                    this.askDeleteRule = false;
                } else if (this.menu != RuleEditorMenus.MainMenu) {
                    this.mainMenu();
                } else if (this.row() >= 2) {
                    // save cursor position and
                    this.setTileSaved();
                    // go to play button of main menu
                    this.setCol(2);
                    this.setRow(0);
                } else {
                    this.saveAndPop();
                    return;
                }
                this.update();
            });
        }

        private mainMenu() {
            if (this.menu == RuleEditorMenus.CommandMenu) {
                // this should be encapsulated elsewhere
                if (this.currentCommand < this.rule.getCmdsLen(this.whenDo) &&
                    (this.rule.getCmdInst(this.whenDo, this.currentCommand) == 0xff ||
                     this.rule.getCmdArg(this.whenDo, this.currentCommand) == 0xff )) {
                        this.rule.removeCommand(this.whenDo, this.currentCommand)
                }
            }
            // reset state 
            this.whenDo = -1;
            this.currentCommand = -1;
            this.attrSelected = -1;
            this.menu = RuleEditorMenus.MainMenu;
            // move the cursor back to the saved position
            this.restoreCursor();
        }
        
        protected okToMove() {
            return !this.askDeleteRule;
        }

        private restoreCursor() {
            if (this.isTileSaved()) {
                this.setCol(this.tileSaved.x >> 4);
                this.setRow(this.tileSaved.y >> 4);
                this.tileSaved.setFlag(SpriteFlag.Invisible, true);
            }
        }

        private changeRule(rv: RuleView) {
            this.p.saveRule(this.rule);
            this.resetRule(rv);
        }

        private resetRule(rv: RuleView) {
            this.rule = rv;       
        }

        private saveAndPop() {
            this.p.saveRule(this.rule);
            game.popScene();
        }

        protected currentRules() {
            // TODO: we should sort this by ruletype and direction
            return this.p.getRulesForSpriteKind(this.kind);
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean) {
            if (this.menu == RuleEditorMenus.MainMenu) {
                super.cursorMove(dir, pressed);
                if (this.row() >= 2) {
                    this.restoreCursor();
                }
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
            // no debugger for paper
            // this.drawImage(3, 0, debug);
            this.drawImage(5, 0, flipHoriz);
            if (this.rule.getTransforms() != RuleTransforms.None) {
                this.drawImage(5, 0, include2);
            }
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
            let cmd = this.col() - 6;
            let len = this.commandLengths[row];
            if (len == -1 || cmd >= len) return false;
            // set up the state
            this.menu = RuleEditorMenus.CommandMenu;
            this.ruleTypeMap.fill(0xf);
            this.dirMap.fill(0xf);
            // map the command row back to when context coordinates
            let newCol = this.rowToColCoord(row);
            let newRow = this.rowToRowCoord(row);
            // no editing if coordinate not active
            if (!this.active(newCol, newRow))
                return false;
            // get the when do (lazy creation)
            this.whenDo = this.rule.getWhenDo(newCol, newRow);
            if (this.whenDo == -1)
                this.whenDo = this.rule.makeWhenDo(newCol, newRow);
            // remember where we are
            this.setTileSaved();
            this.currentCommand = cmd;
            // create the menu
            if (this.rule.getCmdInst(this.whenDo, cmd) == 0xff) {
                this.showCommandsAt(row, newCol, newRow, false);
                this.makeCommandMenu(this.tokens.length > 0 ? this.tokens[0] : 0xff,0xff,true);
            } else {
                this.tokens = [];
                this.modifyCommandMenu(true);
            }
            return true;
        }

        private makeCommandMenu(inst: number, arg: number, inEdit: boolean = false) {
            let col = 3;
            let row = 0;
            // show the categories
            // which one is currently selected?
            this.tokens.forEach(ct => {
                this.drawImage(col, row, ct < CommandType.Last ? categoryImages[ct] : garbageCan);
                this.drawOutline(col, row);
                if (inst == ct) { 
                    this.drawImage(col, row, cursorOut);
                    if (inEdit) {
                        this.setCol(col);
                        this.setRow(row);
                    }
                }
                this.ruleTypeMap.setPixel(col, row, ct);
                col++;
            });
            if (inst != 0xff) {
                this.makeArgMenu(inst, arg, inEdit);
            }
        }

        private modifyCommandMenu(inEdit: boolean = false) {
            let inst = this.rule.getCmdInst(this.whenDo, this.currentCommand);
            let arg = this.rule.getCmdArg(this.whenDo, this.currentCommand);
            if (this.tokens.length > 0) {
                this.makeCommandMenu(inst, arg, inEdit);
            } else if (inst != 0xff) {
                this.tokens = [inst, CommandTokens.Delete ];
                this.makeCommandMenu(inst, arg, inEdit);
            }
        }

        // argument range for command
        private instToStartArg(inst: number) {
            switch (inst) {
                case CommandType.Move: return this.getType() != RuleType.Collision ? 0 : 4;
                default: break;
            }
            return 0;
        }

        private instToArgText(inst: number): string[] {
            switch (inst) {
                case CommandType.Move: return moveText;
                case CommandType.Game: return gameText;
                default: break;
            }
            return [];
        }

        private instToNumArgs(inst: number) {
            switch (inst) {
                case CommandType.Move: return this.getType() != RuleType.Collision ? 4 : 2;
                case CommandType.Paint: return 4;
                case CommandType.Sprite: return 0;
                case CommandType.Game: return 3;
                case CommandType.Spawn:
                case CommandType.BlockSpriteRules: return this.p.spriteCnt();
                case CommandType.Portal: return this.p.backCnt();
            }
            return 0;
        }

        private makeArgMenu(inst: number, arg: number, inEdit: boolean) {
            let col = 4;
            let row = 1;
            this.dirMap.fill(0xf);
            let last = this.instToStartArg(inst) + this.instToNumArgs(inst);
            for (let i = this.instToStartArg(inst); i < last; i++) {
                this.drawImage(col, row, this.instToImage(inst, i));
                this.drawOutline(col, row);
                if (arg == i) { 
                    this.drawImage(col, row, cursorOut);
                    if (inEdit) {
                        this.setCol(col);
                        this.setRow(row);
                    }
                }
                this.dirMap.setPixel(col, row, i);
                col++;
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
                    let len = this.rule.removeCommand(this.whenDo, this.currentCommand);
                    this.mainMenu();
                }
            } else if (this.row() == 0 && tok != 0xf) {
                if (hover) {
                    if (this.p.help) this.helpCursor.say(categoryText[tok]);
                } else {
                    if (tok != inst) {
                        this.setCommand(tok, this.instToStartArg(tok));
                        this.setCol(4);
                        this.setRow(1);
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
                this.mainMenu();
            }
        }

        private setCommand(inst: number, arg: number) {
            this.rule.setCmdInst(this.whenDo, this.currentCommand, inst);
            this.rule.setCmdArg(this.whenDo, this.currentCommand, arg);
        }

        // -----------------------------------------------------------------

        // TODO:
        // - for collision rule, only Include

        protected showAttributes(col: number, row: number, show: boolean) {
            super.showAttributes(col, row, this.menu == RuleEditorMenus.MainMenu);
        }

        private attrMenu(col: number, row: number) {
            // which tile in the diamond are we attributing?
            let whenDo = this.rule.getWhenDo(col, row);
            if (whenDo == -1)
                whenDo = this.rule.makeWhenDo(col, row);
            this.whenDo = whenDo;
            let collision22 = this.rule.getRuleType() == RuleType.Collision && col == 2 && row == 2;
            // for all user-defined sprites
            attrImages.forEach((img, i) => {
                if (this.rule.getRuleType() == RuleType.Collision && i > 0)
                    return;
                if (i >= 3) 
                    return;  // no OK sprite
                // draw 8x8 sprites centered
                screen.drawTransparentImage(img, (i << 4) + 4, yoff + 4);
                this.drawOutline(i, 0);
            });
            let aCol = 0;
            this.all.getImages().forEach((image, i ) => {
                if (collision22 && i<this.p.backCnt())
                    return;
                let a = this.all.getSetAttr(this.rule, whenDo, i);
                this.drawImage(aCol, 1, image);
                this.drawImage(aCol, 1, attrImages[attrValues.indexOf(a)]);
                aCol++;
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
            let collision22 = this.rule.getRuleType() == RuleType.Collision 
                && this.rule.getWhenDoCol(this.whenDo) == 2
                && this.rule.getWhenDoRow(this.whenDo) == 2;
            let a = this.row() == 0 ? this.col() : -1
            if (a == 9) {
                // reset attributes
                for(let i = 0; i< this.p.allCnt(); i++) {
                    this.setAttr(i, AttrType.OK);
                }
                return;
            }
            if (a != -1 && a < 3 && this.rule.getRuleType() != RuleType.Collision) { 
                this.selectAttr(a); return; 
            }
            let m = this.row() == 1 ? this.col() : -1; 
            if (m != -1 && (!collision22 && m< this.p.allCnt() || collision22 && m<this.p.backCnt())) { 
                let val = attrValues[this.attrSelected];
                this.setAttr(!collision22 ? m : m+this.p.backCnt(), val, true);
            }
        }

        private setAttr(m: number, val: AttrType, toggle: boolean = false) {
            let whenDo = this.rule.getWhenDo(this.col(false), this.row(false)-editorRow);
            if (toggle && this.all.getSetAttr(this.rule,whenDo,m) == val)
                val = AttrType.OK;
            this.all.getSetAttr(this.rule, whenDo, m, val)
        }

        // -------------------------------------------------------------------

        private dirExprMenu() {
            movedImages.forEach((img, i) => {
                if (this.rule.getRuleType() == RuleType.Collision && i<4)
                    return;
                this.drawImage(i, 0, img);
            });
            this.drawImage(this.rule.getWitnessDirection(this.whenDo), 0, cursorOut);
        }

        private dirExprUpdate() {
            if (this.row() != 0 || this.col() > 6)
                return;
            if (this.rule.getRuleType() == RuleType.Collision && this.col()<4)
                return;            
            this.rule.setWitnessDirection(this.whenDo, this.col());
        }

    }
}