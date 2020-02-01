namespace tileworld {
    
    enum RuleEditorMenus { MainMenu, AttrTypeMenu, CommandMenu };
    enum CommandTokens { Last=CommandType.Last, SpaceTile, Delete };

    const editorRow = 2;
    const menuHelpString = "30delete rule,80add rule,90next rule,70previous rule,";
    const attrHelpString = "00include,10exclude,20allow,30one of,90allow all,";

    export class RuleEditor extends RuleVisualsBase {
        private otherCursor: Sprite;    // show correspondence between left and right

        // in-world menus
        private menu: RuleEditorMenus;  // which menu is active?
        // whendo state
        private attrSelected: number;
        // for editing commands
        private commandLengths: number[];

        private rule: number;           // the current rule
        private whenDo: number;         // which WhenDo is being edited
        private currentCommand: number; // the current command (potentially null)
        private askDeleteRule: boolean;
        
        constructor(p: Project, 
                    private kind: number, private rt: RuleType, private dir: MoveDirection) {
            super(p);
            this.setCol(0); this.setRow(0);

            let rules = this.currentRules();
            if (rules.length == 0) {
                rules.push(p.makeRule(kind, rt, dir));
            }
            this.rule = rules[0];
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
                if (this.askDeleteRule) {
                    let index = this.currentRules().indexOf(this.rule);
                    this.p.removeRule(this.rule);
                    let rules = this.currentRules();
                    if (rules.length == 0) {
                        game.popScene();
                        return;
                    } else {
                        this.rule = index < rules.length ? rules[index] : rules[index-1];
                    }
                    this.askDeleteRule = false;
                } else if (this.menu == RuleEditorMenus.AttrTypeMenu && this.row() < 2) {
                    this.attrUpdate();
                } else if (this.menu >= RuleEditorMenus.CommandMenu) {
                    this.commandUpdate();
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
                            } else if (this.col() == 8 && this.rt != -1) {
                                this.changeRule(p.makeRule(this.kind, this.rt, this.dir));
                            }
                        } else if (this.col() == 3) {
                            this.askDeleteRule = true;                     
                        }
                    } else if (this.col() > 5 && this.row() >= editorRow) {
                        this.tryEditCommand();
                    } else if (this.manhattanDistance2() <= 2 &&
                        (this.col() != 2 || this.row() != (2 + editorRow) && 
                        this.active(this.col(), this.row() - editorRow))) {
                        this.menu = RuleEditorMenus.AttrTypeMenu;
                        this.setTileSaved()
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
                // check for an incomplete command
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

        private getType() {
            return this.p.getType(this.rule);
        }

        private changeRule(rid: number) {
            this.p.saveRule(this.rule);
            this.rule = rid;
        }

        private saveAndPop() {
            this.p.saveRule(this.rule);
            game.popScene();
        }

        protected currentRules() {
            // TODO: sort rules by id
            let rules = this.p.getRulesForKind(this.kind);
            return this.rt == -1 ? rules : this.getRulesForTypeDir(rules, this.rt, this.dir);
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean) {
            if (this.menu == RuleEditorMenus.MainMenu) {
                this.otherCursorMove();
            } 
            if (this.p.help) {
                this.helpCursor.x = this.col() < 7 ? this.cursor.x + 16 : this.cursor.x - 16;
                this.helpCursor.y = this.row() < 6 ? this.cursor.y + 32 : this.cursor.y;
                this.helpCursor.say(null);
                if (this.menu == RuleEditorMenus.MainMenu) {
                    if (this.row() == 0) {
                        this.helpCursor.say(getHelp(menuHelpString, this.col(), this.row()));
                    } else if (this.manhattanDistance2() <= 2 && (this.col() != 2 || this.row() != 2 + editorRow)) {
                        this.helpCursor.say("A: attributes");
                    } 
                } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                    if (this.row() == 0) {
                        this.helpCursor.say(getHelp(attrHelpString, this.col(), this.row()));
                    } else if (this.row() == 1 && this.col() < 8) {
                        this.helpCursor.say("A: set attribute");
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

        private collideCol: number;
        private collideRow: number;
        protected update() {
            this.collideCol = this.collideRow = -1;
            screen.fill(0);
            screen.print("When", 0, (editorRow << 4) + 8);
            if (this.p.debug)
                screen.print(this.rule.toString(), 30, 0);
            screen.print("Do", 70, (editorRow << 4) + 8);
            // sets collideCol and collideRow
            this.showRuleType(this.p.getType(this.rule), this.p.getDir(this.rule), 2, 2+editorRow);
            this.makeContext();
            this.showRuleType(this.p.getType(this.rule), this.p.getDir(this.rule), 2, 2+editorRow);
            this.showCommands();
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
                screen.fillRect(0, yoff, 160, 32, 0);
                this.attrMenu(this.col(false), this.row(false)-editorRow);
            } else if (this.menu == RuleEditorMenus.CommandMenu) {
                screen.fillRect(0, yoff, 160, 32, 0);
                this.modifyCommandMenu();
            }
            if (this.askDeleteRule) {
                this.cursor.setFlag(SpriteFlag.Invisible, true)
                game.showDialog("OK to delete rule?", "", "A = OK, B = CANCEL");
            } else {
                this.cursor.setFlag(SpriteFlag.Invisible, false);
            }
        }

        protected showCollision(col: number, row: number, dir: MoveDirection, arrowImg: Image, rt: RuleType) {
            super.showCollision(col, row, dir, arrowImg, rt);
            this.collideCol = col;
            this.collideRow = row - editorRow;
        }

        centerImage() {
            return this.p.getImage(this.kind);
        }

        private showMainMenu() {
            screen.fillRect(0, yoff, 160, 19, 0);
            this.fillTile(0, 0, 11);
            this.drawImage(0, 0, code);
            //this.drawImage(1, 0, play);
            //this.drawImage(2, 0, debug);
            this.drawImage(3, 0, garbageCan);
            let rules = this.currentRules();
            let index = rules.indexOf(this.rule);
            this.drawImage(9, 0, index < rules.length -1 ? rightArrow : greyImage(rightArrow));
            this.drawImage(8, 0, this.rt != -1 ? addRule : greyImage(addRule));
            this.drawImage(7, 0, index > 0 ? leftArrow : greyImage(leftArrow));
        }

        private active(col: number, row: number) {
            if (this.collideCol != -1) {
                return col == 2 && row == 2 || col == this.collideCol && row == this.collideRow;
            }
            return true;
        }

        private makeContext() {
            for (let i = 0; i <= 4; i++) {
                for (let j = 0; j <= 4; j++) {
                    let dist = Math.abs(2-j) + Math.abs(2-i);
                    if (dist <= 2 && this.active(i,j)) {
                        this.drawImage(i, j+editorRow, emptyTile);
                        if (i != 2 || j != 2)
                            this.showAttributes(this.rule, i, j);
                    }
                }
            }
        }

        // map from row 0-4 to (col,row) in diamond
        private rowToColCoord(lr: number) { return lr % 2 == 0 ? 2 : lr; }
        private rowToRowCoord(lr: number) { return lr == 0 ? 1 : (lr == 4 ? 3 : 2); }

        private showCommands() {
            this.commandLengths = [];
            for(let lr = 0; lr < 5; lr++) {
                let col = this.rowToColCoord(lr);
                let row = this.rowToRowCoord(lr);
                if (this.active(col,row)) {
                    let len = this.showCommandsAt(lr, col, row); 
                    this.commandLengths.push(len);
                } else {
                    this.commandLengths.push(-1);
                }
            }
        }

        private tokens: number[];
        private showCommandsAt(crow: number, wcol: number, wrow: number, draw: boolean = true) {
            let whendo = this.getWhenDo(wcol, wrow);
            if (draw) {
                let index = this.findWitnessColRow(wcol, wrow);
                let img1 = this.collideCol == wcol && this.collideRow == wrow ? collisionRestingSprite : genericSprite;
                let img2 = index == -1 || index == 100 ? img1 : this.p.getImage(index);
                this.drawImage(5, crow + editorRow, img2);
                if (img1 == collisionRestingSprite)
                    this.drawImage(5, crow + editorRow, img1);
            }
            // show the existing commands
            let col = 6;
            let tokens = this.getTokens(wcol, wrow);
            if (!draw) { this.tokens = tokens; }
            let cid = 0
            for(; cid < 4; cid++, col++) {
                let inst = this.p.getInst(this.rule, whendo, cid);
                let arg = this.p.getArg(this.rule, whendo, cid);
                if (inst != -1 && arg != -1) {
                    this.showCommand(col, crow, whendo, cid, tokens, draw);
                } else {
                    if (tokens.length > 0) {
                        this.showCommand(col, crow, whendo, cid, tokens, draw);
                    }
                    break;
                }
            }
            return cid+1;
        }

        private showCommand(col: number, row: number, 
                            whendo: number, cid: number, tokens: number[],
                            draw: boolean) {
            let inst = this.p.getInst(this.rule, whendo, cid);
            let arg = this.p.getArg(this.rule, whendo, cid);
            if (inst == -1) {
                if (draw) this.drawImage(col, row + editorRow, emptyTile);
            } else {
                if (draw) this.drawImage(col, row + editorRow, this.instToImage(inst,arg));
                tokens.removeElement(inst);
                col++;
            }
            return col;
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
            this.whenDo = this.getWhenDo(newCol, newRow);
            this.setTileSaved();
            this.currentCommand = col;
            if (this.p.getInst(this.rule, this.whenDo, col) == -1) {
                this.showCommandsAt(row, newCol, newRow, false);
                this.makeCommandMenu(-1,-1);
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
            if (inst != -1) {
                this.makeArgMenu(inst, arg);
            }
        }

        // inst must be -1, arg might be -1;
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
            let inst = this.p.getInst(this.rule, this.whenDo, this.currentCommand);
            let arg = this.p.getArg(this.rule, this.whenDo, this.currentCommand);
            if (this.tokens.length > 0) {
                this.makeCommandMenu(inst, arg);
            } else if (inst != -1) {
                this.tokens = [inst, CommandTokens.Delete];
                this.makeCommandMenu(inst, arg);
            }
        }

        // what instructions are possible, given rule type and witness
        // this defines the menu to present at the top-level
        private getTokens(col: number, row: number) {
            let tokens: number[] = [];
            if (this.findWitnessColRow(col, row) != -1) {
                if ((col == 2 && row == 2) || this.getType() != RuleType.CollidingResting)
                    tokens.push(CommandType.Move);
            }
            if (this.getType() < RuleType.CollidingResting) {
                tokens.push(CommandType.Paint);
            }
            if (this.findWitnessColRow(col, row) != -1) {
                tokens.push(CommandType.Sprite);
            }
            tokens.push(CommandType.SpritePred);
            tokens.push(CommandType.Game);
            return tokens;
        }

        // argument range for command
        private instToStartArg(inst: number) {
            switch (inst) {
                case CommandType.Move: return this.getType() < RuleType.CollidingResting ? 0 : 4;
                case CommandType.Paint: 
                case CommandType.Sprite:
                case CommandType.Game:
                case CommandType.SpritePred:
            }
            return 0;            
        }

        private instToNumArgs(inst: number) {
            switch (inst) {
                case CommandType.Move: return this.getType() < RuleType.CollidingResting ? 4:  2;
                case CommandType.Paint: return 3;  // TODO: goto 4
                case CommandType.Sprite: return 1;
                case CommandType.Game: return 2;
                case CommandType.SpritePred: return 4;
            }
            return 0;
        }

        private instToImage(inst: number, arg: number): Image {
            if (inst == -1 || arg == -1)
                return emptyTile;
            switch (inst) {
                case CommandType.Move: return moveImages[arg];
                case CommandType.Paint: return this.p.fixed()[arg];
                case CommandType.Sprite: return spriteImages[arg];
                case CommandType.Game: return gameImages[arg];
                case CommandType.SpritePred: {
                    let img = this.p.movable()[arg].clone();
                    img.drawTransparentImage(equalZero, 0, 0);
                    return img;
                }
            }
            return emptyTile;
        }

        private commandUpdate(hover: boolean = false) {
            let tok = this.ruleTypeMap.getPixel(this.col(), this.row());
            let arg = this.dirMap.getPixel(this.col(), this.row());
            if (tok == CommandTokens.Delete) {
                if (hover) {
                    if (this.p.help) this.helpCursor.say("delete command");
                } else {
                    this.p.removeCommand(this.rule, this.whenDo, this.currentCommand);
                    this.noMenu();
                }
            } else if (this.row() == 0 && tok != 0xf) {
                if (hover) {
                    if (this.p.help) this.helpCursor.say(categoryText[tok]);
                } else {
                    let inst = this.p.getInst(this.rule, this.whenDo, this.currentCommand);
                    if (tok != inst) {
                        this.setCommand(tok, -1); // this.instToStartArg(tok));
                        // move cursor...
                    }
                }
            } else if (this.row() == 1 && arg != 0xf) {
                if (hover) {
                } else {
                    this.p.setArg(this.rule, this.whenDo, this.currentCommand, arg);
                }
            } else if (!hover && this.row() > 1) {
                this.noMenu();
            }
        }

        private setCommand(inst: number, arg: number) {
            this.p.setInst(this.rule, this.whenDo, this.currentCommand, inst);
            this.p.setArg(this.rule, this.whenDo, this.currentCommand, arg);
        }

        private posSpritePosition(whendo: number, begin: number) {
            let index = this.attrIndex(this.rule, whendo, AttrType.Include, begin);
            return (index == -1) ? this.attrIndex(this.rule, whendo, AttrType.OneOf, begin) : index;
        }

        private findWitnessWhenDo(whendo: number) {
            if (whendo == -1)
                return -1;
            return this.posSpritePosition(whendo, this.p.fixed().length);
        }

        // what is ordering of sprites?
        // (0,0) always first
        private findWitnessColRow(col: number, row: number): number {
            if (col == 2 && row == 2) return this.kind;
            let whendo = this.getWhenDo(col, row);
            let wit = this.findWitnessWhenDo(whendo);
            if (wit != -1) return wit;
            return this.collideCol == col && this.collideRow == row ? 100 : -1;
        }

        private attrMenu(col: number, row: number) {
            // which tile in the diamond are we attributing?
            let whenDo = this.getWhenDo(col, row);
            // for all user-defined sprites
            attrImages.forEach((img, i) => {
                // draw 8x8 sprites centered
                screen.drawTransparentImage(img, (i << 4) + 4, yoff + 4);
                this.drawOutline(i, 0);
            });
            this.p.all().forEach((image, i ) => {
                if (i < this.p.fixed().length && this.getType() >= RuleType.CollidingResting)
                    return;
                let a = this.p.getAttr(this.rule, whenDo, i);
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
                for(let i = 0; i< this.p.all().length; i++) {
                    this.setAttr(i, AttrType.OK);
                }
                return;
            }
            if (a != -1 && a < attrValues.length) { 
                this.selectAttr(a); return; 
            }
            let m = this.row() == 1 ? this.col() : -1; 
            if (m != -1 && m < this.p.all().length) { 
                if (m < this.p.fixed().length && this.getType() >= RuleType.CollidingResting)
                    return;
                let val = attrValues[this.attrSelected];
                if (val == AttrType.Include) { 
                    if (m < this.p.fixed().length) {
                        this.setFixedOther(m, -1, AttrType.Exclude);
                        this.setMovableOther(m, -1, AttrType.Exclude);
                    } else {
                        this.setMovableOther(m, -1, AttrType.Exclude);
                        this.setFixedOther(m, -1, AttrType.OK);
                    }
                } else if (val == AttrType.OneOf) {
                    this.setFixedOther(m, AttrType.Include, AttrType.OneOf);
                    this.setMovableOther(m, AttrType.Include, AttrType.OneOf);
                } else if (m < this.p.fixed().length) {
                    // not allowed to set all to exclude
                    let cnt = 0;
                    let i = 0;
                    for(;i<this.p.fixed().length;i++) {
                        if (this.dirMap.getPixel(6,i) == AttrType.Exclude) {
                            cnt++; if (cnt == 2) break;
                        }
                    }
                    if (cnt == 2) {
                        let whenDo = this.getWhenDo(this.col(false), this.row(false)-editorRow);
                        this.setAttr(i, this.p.getAttr(this.rule, whenDo, m));
                    }
                }
                this.setAttr(m, val);
            }
        }

        // TODO: move this out to project.ts
        private getWhenDo(col: number, row: number) {
            let whendo = this.p.getWhenDo(this.rule, col, row);
            if (whendo == -1) {
                whendo = this.p.makeWhenDo(this.rule, col, row);
                // default mapping::everything is possible
                this.p.all().forEach((img,i) => { 
                    this.p.setAttr(this.rule, whendo, i, AttrType.OK);
                });
            }
            return whendo;
        }
        
        private setFixedOther(m: number, src: number, val: number) {
            let whenDo = this.getWhenDo(this.col(false), this.row(false)-editorRow);
            for(let o =0; o<this.p.fixed().length; o++) {
                if (o != m) {
                    if (src == -1 || this.p.getAttr(this.rule, whenDo, o) == src)
                        this.setAttr(o, val);
                }
            }
        }
        private setMovableOther(m: number, src: number, val: number) {
            let whenDo = this.getWhenDo(this.col(false), this.row(false)-editorRow);
            for (let o = this.p.fixed().length; o< this.p.all().length; o++) {
                if (o != m) {
                    if (src == -1 || this.p.getAttr(this.rule, whenDo, o) == src)
                        this.setAttr(o, val);
                }
            }
        }

        private setAttr(m: number, val: AttrType) {
            let whenDo = this.getWhenDo(this.col(false), this.row(false)-editorRow);
            this.p.setAttr(this.rule, whenDo, m, val)
        }

        protected attrIndex(rid: number, whendo: number, a: AttrType, begin: number = 0) {
            for (let i = begin; i < this.p.all().length; i++) {
                if (this.p.getAttr(rid, whendo, i) == a)
                    return i;
            }
            return -1;
        }

        private showAttributes(rid: number, col: number, row: number) {
            let whendo = this.p.getWhenDo(rid, col, row);
            if (whendo >= 0) {
                // if there is an include or single oneOf, show it.
                let index = this.attrIndex(rid, whendo, AttrType.Include);
                if (index == -1) {
                    index = this.attrIndex(rid, whendo, AttrType.OneOf);
                    if (index != -1) {
                        let index2 = this.attrIndex(rid, whendo, AttrType.OneOf, index + 1);
                        if (index2 != -1)
                            index = -1;
                    }
                }
                // and skip to the other (if it exists)
                let begin = 0;
                let end = this.p.all().length - 1;
                if (index != -1) {
                    this.drawImage(col, row + editorRow, this.p.getImage(index));
                    if (index < this.p.fixed().length) {
                        begin = this.p.fixed().length;
                    } else {
                        end = this.p.fixed().length - 1;
                    }
                }
                let project = this.projectAttrs(rid, whendo, begin, end);
                let done: AttrType[] = [];
                project.forEach(index => {
                    let val = this.p.getAttr(rid, whendo, index);
                    // eliminate duplicates
                    if (done.indexOf(val) == -1) {
                        done.push(val);
                        // TODO: draw each one, without overlap, four quadrants
                        this.drawImage(col, row + editorRow, attrImages[attrValues.indexOf(val)]);
                    }
                });
            }
        }

        private projectAttrs(rid: number, whendo: number, begin: number, end: number): number[] {
            let attrCnt = (a: AttrType) => {
                let cnt = 0;
                for (let i = begin; i <= end; i++) {
                    if (this.p.getAttr(rid, whendo, i) == a) cnt++;
                }
                return cnt;
            }
            let res: number[] = [];
            let excludeCnt = attrCnt(AttrType.Exclude);
            let okCnt = attrCnt(AttrType.OK);
            let cnt = end - begin + 1;
            if (okCnt == this.p.all().length || excludeCnt == cnt || (begin == 0 && okCnt == cnt))
                return res;
            let remove = (okCnt != 0 && excludeCnt != 0) ?
                ((excludeCnt < okCnt) ? AttrType.OK : AttrType.Exclude) : -1;
            for (let i = begin; i <= end; i++) {
                if (this.p.getAttr(rid, whendo, i) != remove) res.push(i);
            }
            return res;
        }
    } 
}