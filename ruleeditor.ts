namespace tileworld {
    
    enum RuleEditorMenus { MainMenu, AttrTypeMenu, CommandMenu };
    enum CommandTokens { MoveArrow, PaintTile, SpaceTile, Delete };

    // TODO: grey out tiles base on rule type
    export class RuleEditor extends RuleVisualsBase {
        private otherCursor: Sprite;      // show correspondence between left and right

        // in-world menus
        private menu: RuleEditorMenus;  // which menu is active?
        // whendo state
        private attrSelected: number;
        // for editing commands
        private commandLengths: number[];
        private rule: number;             // the current rule
        private whenDo: number;           // which WhenDo is being edited
        private currentCommand: number;   // the current command (potentially null)

        constructor(manager: ImageManager, private rules: number[]) {
            super(manager);
            this.rule = rules[0];

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
                if (this.manhattanDistance2() <=2 && (this.col() != 2 || this.row() != 2)) {
                     // otherwise if we are in the diamond, bring up attr menu
                    if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                        this.noMenu();
                    } else {
                        this.menu = RuleEditorMenus.AttrTypeMenu;
                        this.setTileSaved()
                    }
                } else if (this.cursor.x >= 96 && (this.cursor.y -yoff) < 80) {
                    if (this.menu == RuleEditorMenus.CommandMenu) {
                        this.noMenu();
                    } else {
                        let yes = this.tryEditCommand();
                        if (!yes) this.noMenu();
                    }
                } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                    let yes = this.attrUpdate();
                    if (!yes) this.noMenu();
                } else if (this.menu == RuleEditorMenus.CommandMenu) {
                    // look for deletion
                    this.exitCommandMenu();
                } else if (this.menu == RuleEditorMenus.MainMenu) {
                    if (this.row() == 6) {
                        if (this.col() == 0) game.popScene();
                        else if (this.col() == 2) {
                            let flip = flipRule(this.rule, FlipRotate.Horizontal);
                            game.pushScene();
                            // TODO: copy/paste??? rule inventory
                            let flipRuleEditor = new RuleEditor(this.manager, [flip]);
                        } else if (this.col() == 7 || this.col() == 9) {
                            // move backward/forward in rule space
                            let index = this.rules.indexOf(this.rule);
                            if (this.col() == 7 && index > 0) {
                                this.rule = this.rules[index-1];
                            } else if (this.col() == 9 && index < this.rules.length-1) {
                                this.rule = this.rules[index+1];
                            }
                        }
                    } 
                }
                this.update();
            })

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.menu != RuleEditorMenus.MainMenu) {
                    this.menu = RuleEditorMenus.MainMenu;
                    this.update();
                } else {
                    game.popScene();
                }
            });
        }

        protected cursorMove() {
            if (this.menu == RuleEditorMenus.MainMenu) {
                this.otherCursorMove();
            } else {
                if (this.menu == RuleEditorMenus.CommandMenu) {
                    this.commandUpdate();
                    this.update();
                }
            }
        }

        private otherCursorMove() {
            if (this.cursor.x >= 80 && (this.cursor.y - yoff) < 80) {
                let col = this.col();
                let row = this.row();
                this.otherCursor.setFlag(SpriteFlag.Invisible, false);
                // compute mapping from right to left hand side
                if (row == 0 || row == 2 || row == 4)
                    this.otherCursor.x = 40;
                else
                    this.otherCursor.x = (row == 1) ? 24 : 56;
                if (1 <= row && row <= 3)
                    this.otherCursor.y = yoff+40;
                else
                    this.otherCursor.y = yoff + ((row == 0) ? 24 : 56);
            } else {
                this.otherCursor.setFlag(SpriteFlag.Invisible, true);
            }
        }

        private setTileSaved() {
            this.tileSaved.x = this.cursor.x;
            this.tileSaved.y = this.cursor.y;
            this.tileSaved.z = 100;
            this.tileSaved.setFlag(SpriteFlag.Invisible, false);
        }

        private noMenu() {
            this.whenDo = -1;
            this.currentCommand = -1;
            this.attrSelected = -1;
            this.menu = RuleEditorMenus.MainMenu;
            this.tileSaved.setFlag(SpriteFlag.Invisible, true);
        }
        
        private manhattanDistance2() {
            return (Math.abs(2 - this.col()) + Math.abs(2 - this.row()));
        }

        private update() {
            this.background.fill(11);
            this.background.fillRect(0, 0, 80, 120, 12);
            this.background.print("When", 0, 0);
            this.background.print("Do", 80, 0);

            this.makeContext();
            this.showCommands(); 

            if (this.menu == RuleEditorMenus.MainMenu) {
                this.showMainMenu();
            } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                this.dirMap.fill(0xf);
                this.background.fillRect(0, yoff + 80, 160, 36, 0);
                this.attrMenu()
            } else if (this.menu == RuleEditorMenus.CommandMenu) {
                this.background.fillRect(0, yoff + 80, 160, 36, 0);
                this.modifyCommandMenu();
                this.commandUpdate();
            }
            this.showRuleType(getType(this.rule), getDir(this.rule), 2, 2);
        }

        centerImage() {
            return this.manager.getImage(getKinds(this.rule)[0]);
        }

        private showMainMenu() {
            this.background.fillRect(0, yoff + (6 << 4), 160, 19, 0);
            this.drawImage(0, 6, map);
            this.fillTile(1, 6, 11);
            this.drawImage(1, 6, pencil);
            this.drawImage(2, 6,flipHoriz)
            this.drawImage(3, 6, play)
            let index = this.rules.indexOf(this.rule);
            this.drawImage(9, 6, index < this.rules.length -1 ? rightArrow : greyImage(rightArrow));
            this.drawImage(8, 6, this.centerImage());
            this.drawImage(7, 6, index > 0 ? leftArrow : greyImage(leftArrow));
        }

        private makeContext() {
            let spaceImg = this.manager.empty();
            for (let i = 0; i <= 4; i++) {
                for (let j = 0; j <= 4; j++) {
                    let dist = Math.abs(2-j) + Math.abs(2-i);
                    if (dist <= 2) {
                        // TODO: limit the context base on the rule type
                        this.drawImage(i, j, spaceImg);
                        if (i != 2 || j != 2)
                            this.showAttributes(this.rule, i, j);
                    }
                }
            }
        }

        // - jump cursor to selected on start of menu ???
        private rowToCoord = [ 
            { lr: 0, col: 2, row: 1}, 
            { lr: 1, col: 1, row: 2 },
            { lr: 2, col: 2, row: 2 }, 
            { lr: 3, col: 3, row: 2 },
            { lr: 4, col: 2, row: 3 } ];
        
        private showCommands() {
            this.commandLengths = [];
            this.rowToCoord.forEach(r => {
                let len = this.showCommandsAt(r.lr, r.col, r.row); 
                this.commandLengths.push(len);
            })
        }

        private tokens: CommandTokens[];
        private showCommandsAt(crow: number, wcol: number, wrow: number, draw: boolean = true) {
            let whendo = this.getWhenDo(wcol, wrow);
            if (draw) {
                let index = this.findWitness(wcol, wrow);
                let img2 = index == -1 ? genericSprite : this.manager.getImage(index);
                this.drawImage(5, crow, img2);
            }
            // show the existing commands
            let col = 6;
            let tokens = this.getTokens(whendo);
            if (!draw) { this.tokens = tokens; }
            let cid = 0
            for(; cid < 4; cid++, col++) {
                let inst = getInst(this.rule, whendo, cid);
                if (inst != -1) {
                    this.showCommand(col, crow, whendo, cid, tokens, draw);
                } else {
                    if (tokens.length > 0) {
                        this.showCommand(col, crow, whendo, cid, tokens, draw);
                        return -(cid+1);
                    }
                    break;
                }
            }
            return cid+1;
        }

        private showCommand(col: number, row: number, 
                            whendo: number, cid: number, tokens: CommandTokens[],
                            draw: boolean) {
            let inst = getInst(this.rule, whendo, cid);
            let arg = getArg(this.rule, whendo, cid);
            if (inst == -1) {
                if (draw) this.drawImage(col, row, this.manager.empty());
            } else if (inst == CommandType.Move) {
                if (draw) this.drawImage(col, row, arrowImages[arrowValues.indexOf(arg)]);
                tokens.removeElement(CommandTokens.MoveArrow);
                col++
            } else if (inst == CommandType.Paint) {
                if (draw) this.drawImage(col, row, this.manager.fixed()[arg]);
                tokens.removeElement(CommandTokens.PaintTile);
                col++;
            }
            return col;
        }

        private getTokens(whendo: number) {
            let tokens = [CommandTokens.PaintTile];
            if (this.findWitness(this.rule, whendo) != -1)
                tokens.insertAt(0, CommandTokens.MoveArrow);
            return tokens;
        }

        private tryEditCommand() {
            let row = this.row();
            if (row > 4) return false;
            let col = this.col() - 5;  // 1 based
            if (col > Math.abs(this.commandLengths[row])) return false;
            // set up the state
            this.menu = RuleEditorMenus.CommandMenu;
            this.ruleTypeMap.fill(0xf);
            this.dirMap.fill(0xf);
            let r = this.rowToCoord.find(r => r.lr == row);
            this.whenDo = this.getWhenDo(r.col, r.row);
            this.setTileSaved();
            this.currentCommand = col - 1;
            if (getInst(this.rule, this.whenDo, col -1) == -1) {
                this.showCommandsAt(row, r.col, r.row, false)
                this.makeCommandMenu();
            } else {
                this.tokens = [];
                this.modifyCommandMenu();
            }
            return true;
        }

        private makeCommandMenu() {
            let col = 5;
            let row = 5;
            let worker = (img: Image, tok: CommandTokens, arg: number) => {
                this.drawImage(col, row, img);
                this.drawOutline(col, row);
                this.ruleTypeMap.setPixel(col, row, tok);
                this.dirMap.setPixel(col, row, arg);
                col++;
            };
            // show the commands
            this.tokens.forEach(ct => {
                if (ct == CommandTokens.MoveArrow && this.findWitnessWhenDo(this.whenDo) != -1) {
                    arrowValues.forEach(v => {
                        worker(arrowImages[arrowValues.indexOf(v)], ct, v);
                    })
                } else if (ct == CommandTokens.PaintTile) {
                    col = 5; row = 6;
                    this.manager.fixed().forEach((image, i) => {
                        worker(image, CommandTokens.PaintTile, i);
                    })
                } else if (ct == CommandTokens.Delete) {
                    worker(deleteIcon, ct, 0);
                }
            });
        }

        private modifyCommandMenu() {
            if (this.menu != RuleEditorMenus.CommandMenu)
                return;
            let inst = getInst(this.rule, this.whenDo, this.currentCommand)
            if (this.tokens.length > 0) {
                this.makeCommandMenu();
            } else if (inst == CommandType.Move) {
                this.tokens = [CommandTokens.MoveArrow, CommandTokens.Delete];
                this.makeCommandMenu();
            } else if (inst == CommandType.Paint) { 
                this.tokens = [CommandTokens.PaintTile, CommandTokens.Delete];
                this.makeCommandMenu();
            } else {
                this.noMenu();
            }
        }

        private exitCommandMenu() {
            this.commandUpdate(true);
            this.noMenu();
        }

        private commandUpdate(exit: boolean = false) {
            if (this.menu != RuleEditorMenus.CommandMenu)
                return;
            let tok = this.ruleTypeMap.getPixel(this.col(), this.row());
            let arg = this.dirMap.getPixel(this.col(), this.row());
            // find coordinate and look up.
            if (tok == CommandTokens.MoveArrow) {
                this.setCommand(CommandType.Move, arg);
            } else if (tok == CommandTokens.PaintTile) {
                this.setCommand(CommandType.Paint, arg);
            } else if (tok == CommandTokens.Delete && exit) {
                removeCommand(this.rule, this.whenDo, this.currentCommand);
            }
        }

        private setCommand(inst: number, arg: number) {
            setInst(this.rule, this.whenDo, this.currentCommand, inst);
            setArg(this.rule, this.whenDo, this.currentCommand, arg);
        }

        private posSpritePosition(whendo: number, begin: number) {
            let index = this.attrIndex(this.rule, whendo, AttrType.Include, begin);
            return (index == -1) ? this.attrIndex(this.rule, whendo, AttrType.OneOf, begin) : index;
        }

        private findWitnessWhenDo(whendo: number) {
            if (whendo == -1)
                return -1;
            return this.posSpritePosition(whendo, this.manager.fixed().length);
        }

        // what is ordering of sprites?
        // (0,0) always first
        private findWitness(col: number, row: number) {
            let whendo = this.getWhenDo(col, row);
            return (col != 2 || row != 2) ? this.findWitnessWhenDo(whendo) : getKinds(this.rule)[0];
        }

        private attrMenu() {
            // which tile in the diamond are we attributing?
            let whenDo = this.getWhenDo(this.col(false), this.row(false));
            // for all user-defined sprites
            attrsCentered.forEach((img, i) => {
                this.drawImage(i, 5, img);
            });
            this.manager.all().forEach((image, i ) => {
                let a = getAttr(this.rule, whenDo, i);
                this.drawImage(i, 6, image);
                this.drawImage(i, 6, attrImages[attrValues.indexOf(a)]);
                this.dirMap.setPixel(i,6,a);
            });
            if (this.attrSelected == -1)
                this.selectAttr(0);
            this.drawImage(this.attrSelected, 5, cursorOut);
        }

        private selectAttr(a: number) {
            this.attrSelected = a;
        }

        private attrUpdate() {
            let a = this.row() == 5 ? this.col() : -1
            if (a != -1 && a < attrValues.length) { 
                this.selectAttr(a); return true; 
            }
            let m = this.row() == 6 ? this.col() : -1; 
            if (m != -1 && m < this.manager.all().length) { 
                let val = attrValues[this.attrSelected];
                if (val == AttrType.Include) { 
                    if (m < this.manager.fixed().length) {
                        this.setFixedOther(m, -1, AttrType.Exclude);
                        this.setMovableOther(m, -1, AttrType.Exclude);
                    } else {
                        this.setMovableOther(m, -1, AttrType.Exclude);
                        this.setFixedOther(m, -1, AttrType.OK);
                    }
                } else if (val == AttrType.OneOf) {
                    this.setFixedOther(m, AttrType.Include, AttrType.OneOf);
                    this.setMovableOther(m, AttrType.Include, AttrType.OneOf);
                } else if (m < this.manager.fixed().length) {
                    // not allowed to set all to exclude
                    let cnt = 0;
                    let i = 0;
                    for(;i<this.manager.fixed().length;i++) {
                        if (this.dirMap.getPixel(6,i) == AttrType.Exclude) {
                            cnt++; if (cnt == 2) break;
                        }
                    }
                    if (cnt == 2) {
                        let whenDo = this.getWhenDo(this.col(false), this.row(false));
                        this.setAttr(i, getAttr(this.rule, whenDo, m));
                    }
                }
                this.setAttr(m, val);
                return true;
            }
            return false;
        }

        // TODO: move this out to rule.ts
        private getWhenDo(col: number, row: number) {
            let whendo = getWhenDo(this.rule, col, row);
            if (whendo == -1) {
                whendo = makeWhenDo(this.rule, col, row);
                // default mapping::everything is possible
                this.manager.all().forEach((img,i) => { 
                    setAttr(this.rule, whendo, i, AttrType.OK);
                });
            }
            return whendo;
        }
        
        private setFixedOther(m: number, src: number, val: number) {
            let whenDo = this.getWhenDo(this.col(false), this.row(false));
            for(let o =0; o<this.manager.fixed().length; o++) {
                if (o != m) {
                    if (src == -1 || getAttr(this.rule, whenDo, o) == src)
                        this.setAttr(o, val);
                }
            }
        }
        private setMovableOther(m: number, src: number, val: number) {
            let whenDo = this.getWhenDo(this.col(false), this.row(false));
            for (let o = this.manager.fixed().length; o< this.manager.all().length; o++) {
                if (o != m) {
                    if (src == -1 || getAttr(this.rule, whenDo, o) == src)
                        this.setAttr(o, val);
                }
            }
        }

        private setAttr(m: number, val: AttrType) {
            let whenDo = this.getWhenDo(this.col(false), this.row(false));
            setAttr(this.rule, whenDo, m, val)
        }
    } 
}

