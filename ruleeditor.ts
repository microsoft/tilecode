namespace tileWorldEditor {

    // language sprites

    const genericSprite = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 1 1 1 1 1 1 . . . . .
        . . . . 1 5 5 5 5 5 5 5 . . . .
        . . . 1 5 5 5 5 5 5 5 5 5 . . .
        . . . 1 5 5 5 5 5 5 5 5 5 . . .
        . . . 1 5 5 5 5 5 5 5 5 5 . . .
        . . . 1 5 5 5 5 5 5 5 5 5 . . .
        . . . 1 5 5 5 5 5 5 5 5 5 . . .
        . . . 1 5 5 5 5 5 5 5 5 5 . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . . 5 5 5 5 5 5 . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    const negate = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . 2 2 2 2 . .
        . . . . . . . . . 2 2 . . 2 2 .
        . . . . . . . . 2 2 2 2 . . 2 2
        . . . . . . . . 2 . 2 2 2 . . 2
        . . . . . . . . 2 . . 2 2 2 . 2
        . . . . . . . . 2 2 . . 2 2 2 2
        . . . . . . . . . 2 2 . . 2 2 .
        . . . . . . . . . . 2 2 2 2 . .
    `
    const check = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . 7 . . . . . . .
        . . . . . . . 7 6 . . . . . . .
        . . . . . . 7 7 6 . . . . . . .
        . . . . . . 7 6 . . . . . . . .
        7 . . . . 7 7 6 . . . . . . . .
        7 7 . . . 7 6 . . . . . . . . .
        . 7 7 . 7 7 6 . . . . . . . . .
        . . 7 7 7 6 . . . . . . . . . .
        . . . 7 6 . . . . . . . . . . .
    `
    const oneof = img`
        . . . . . . . . . . . . . . . .
        . . 5 5 5 5 . . . . . . . . . .
        . 5 5 5 5 5 5 . . . . . . . . .
        . 5 5 5 5 5 5 . . . . . . . . .
        . 5 5 5 5 5 5 . . . . . . . . .
        . 5 5 5 5 5 5 . . . . . . . . .
        . . 5 5 5 5 . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    export const negateCenter = img`
        . . . . . . . . . . . . . . . .
        . d d d d d d d d d d d d d d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . 2 2 2 2 . . . . d .
        . d . . . 2 2 . . 2 2 . . . d .
        . d . . 2 2 2 2 . . 2 2 . . d .
        . d . . 2 . 2 2 2 . . 2 . . d .
        . d . . 2 . . 2 2 2 . 2 . . d .
        . d . . 2 2 . . 2 2 2 2 . . d .
        . d . . . 2 2 . . 2 2 . . . d .
        . d . . . . 2 2 2 2 . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d d d d d d d d d d d d d d .
        . . . . . . . . . . . . . . . .
    `
    export const checkCenter = img`
        . . . . . . . . . . . . . . . .
        . d d d d d d d d d d d d d d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . 7 . d .
        . d . . . . . . . . . 7 6 . d .
        . d . . . . . . . . 7 7 6 . d .
        . d . . . . . . . . 7 6 . . d .
        . d . . 7 . . . . 7 7 6 . . d .
        . d . . 7 7 . . . 7 6 . . . d .
        . d . . . 7 7 . 7 7 6 . . . d .
        . d . . . . 7 7 7 6 . . . . d .
        . d . . . . . 7 6 . . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d d d d d d d d d d d d d d .
        . . . . . . . . . . . . . . . .
    `
    export const oneofCenter = img`
        . . . . . . . . . . . . . . . .
        . d d d d d d d d d d d d d d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . 5 5 5 5 . . . . d .
        . d . . . 5 5 5 5 5 5 . . . d .
        . d . . . 5 5 5 5 5 5 . . . d .
        . d . . . 5 5 5 5 5 5 . . . d .
        . d . . . 5 5 5 5 5 5 . . . d .
        . d . . . . 5 5 5 5 . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d d d d d d d d d d d d d d .
        . . . . . . . . . . . . . . . .
    `
    export const eraseCenter = img`
        . . . . . . . . . . . . . . . .
        . d d d d d d d d d d d d d d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . 3 3 . . . . d .
        . d . . . . . 3 3 3 3 . . . d .
        . d . . . . 3 3 3 3 3 3 . . d .
        . d . . . 3 3 3 3 3 3 3 3 . d .
        . d . . 3 3 3 3 3 3 3 3 3 . d .
        . d . 3 3 3 3 3 3 3 3 3 . . d .
        . d . 3 3 3 3 3 3 3 3 . . . d .
        . d . . 3 3 3 3 3 3 . . . . d .
        . d . . . 3 3 3 3 . . . . . d .
        . d . . . . 3 3 . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d d d d d d d d d d d d d d .
        . . . . . . . . . . . . . . . .
    `
    const downArrow = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . 9 9 9 9 9 9 9 6 . . . .
        . . . . . 9 9 9 9 9 6 . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . . 9 6 . . . . . . .
    `
    const upArrow = img`
        . . . . . . . 9 6 . . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . 9 9 9 9 9 6 . . . . .
        . . . . 9 9 9 9 9 9 9 6 . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . 9 9 9 6 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    const rightArrow = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . 9 . . .
        . . . . . . . . . . . . 9 9 . .
        . . . . . . . 9 9 9 9 9 9 9 9 .
        . . . . . . . 9 9 9 9 9 9 9 9 9
        . . . . . . . 9 9 9 9 9 9 9 9 6
        . . . . . . . 6 6 6 6 6 9 9 6 .
        . . . . . . . . . . . . 9 6 . .
        . . . . . . . . . . . . 6 . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    const leftArrow = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . 9 . . . . . . . . . . . .
        . . 9 9 . . . . . . . . . . . .
        . 9 9 9 9 9 9 9 9 . . . . . . .
        9 9 9 9 9 9 9 9 9 . . . . . . .
        6 9 9 9 9 9 9 9 9 . . . . . . .
        . 6 9 9 6 6 6 6 6 . . . . . . .
        . . 6 9 . . . . . . . . . . . .
        . . . 6 . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    const explode = img`
        . . . . . . . . . . . . . . . .
        . . . . 4 4 5 . . . . . . . . .
        . . . . 4 4 5 5 4 4 . . 5 5 5 .
        . . . 4 5 4 4 5 4 4 . 5 5 5 . .
        . . 5 5 4 4 5 4 4 2 5 5 . . . .
        . 5 5 5 2 4 4 5 2 2 4 4 4 . . .
        . 5 5 5 2 2 2 2 4 4 4 4 4 . . .
        . . 4 4 4 2 2 4 4 2 4 5 5 5 . .
        . . 4 4 4 4 4 4 5 2 2 2 5 5 5 .
        . . 5 4 2 4 5 4 4 2 2 2 4 4 5 .
        . . 4 2 2 2 2 2 2 2 2 4 5 4 . .
        . . . 4 5 2 4 4 2 4 2 4 4 . . .
        . . 5 5 5 . 4 5 5 4 . . 4 . . .
        . . 5 . . . 4 . 5 5 . . . . . .
        . . . . . . . . . 5 . . . . . .
        . . . . . . . . . . . . . . . .
    `
    export const arrows = [oneof, negate, check, leftArrow, rightArrow, upArrow, downArrow]
    export const arrowNames = ["OneOf", "Not", "Check", "Left", "Right", "Up", "Down"]
    export const arrowValues = [0, 0, 0, TileDir.Left, TileDir.Right, TileDir.Up, TileDir.Down]

    enum RuleEditorMenus { RuleTypeMenu, PropositionMenu, None };

    // TODO: selected rule type...
    // TODO: change selected rule type
    // TODO: getting rid of menu?


    export class RuleEditor {
        // the rule type and associated direction (if any)
        private ruleType: RuleType;
        private ruleDir: TileDir;
        // the attribution
        private attrMap: AttrsAt[];

        private background: Image;
        private cursor: Sprite;
        private centerX: number;
        private centerY: number;

        private menu: RuleEditorMenus;
        private ruleTypeMap: Image;
        private dirMap: Image;

        // event menu

        // propositional menu
        private showSelected: Sprite;
        private selected: Sprite;
        private attrs: Sprite[];
        private menuItems: Sprite[];

        // toolbox menu
        private commands: Sprite[] = [];
        private toolBox: ToolboxMenu

        constructor(private manager: SpriteManager, private centerSprite: Sprite) {
            // the center of the diamond
            this.centerX = 2 * 16 + 8
            this.centerY = 2 * 16 + 8

            // rule Model
            this.ruleType = RuleType.Resting;
            this.ruleDir = TileDir.None;
            this.attrMap = [];
            // TODO: commands

            // rule menu view
            this.ruleTypeMap = image.create(10,7);
            this.dirMap = image.create(10,7);

            // attribute menu view
            this.selected = null;
            this.attrs = [];
            this.menuItems = [];
            this.showSelected = sprites.create(cursorOut)
            this.showSelected.setFlag(SpriteFlag.Invisible, true)

            this.background = image.create(160, 120)
            scene.setBackgroundImage(this.background)
            this.manager.setScene()            
            this.makeContext(0, 0);
            this.showInDiamond(0, 0, this.centerSprite.image, 10);
            this.showSprites = [];

            // Control
            this.commands.push(mapSprite);
            this.menu = RuleEditorMenus.None;
            this.cursor = sprites.create(cursorOut, SpriteKind.Player)
            this.cursor.setFlag(SpriteFlag.Invisible, false)
            this.cursor.x = 40
            this.cursor.y = 56
            this.cursor.z = 50;

            // refresh display
            this.doit();

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) > 0)
                    this.cursor.x -= 16
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) < 9)
                    this.cursor.x += 16
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) > 0)
                    this.cursor.y -= 16
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) < 6)
                    this.cursor.y += 16
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                // if we are on center sprite, bring up the ruletype menu
                if (this.manhattanDistance2(2,2) == 0) {
                    if (this.menu == RuleEditorMenus.RuleTypeMenu) {
                        // commit the result
                        this.menu = RuleEditorMenus.None;
                    } else {
                        this.menu = RuleEditorMenus.RuleTypeMenu
                    }
                    this.doit();
                } else if (this.manhattanDistance2(2,2) <=2) {
                    this.menu = RuleEditorMenus.PropositionMenu;
                    this.doit();
                } else if (this.menu == RuleEditorMenus.RuleTypeMenu) {
                    let col = this.cursor.x >> 4;
                    let row = this.cursor.y >> 4;
                    let rt = this.ruleTypeMap.getPixel(col, row) 
                    if (rt != 0xf) {
                        this.ruleType = rt;
                        this.ruleDir = this.dirMap.getPixel(col,row);
                        this.doit();
                    }
                } else if (this.menu == RuleEditorMenus.PropositionMenu) {
                    this.propositionUpdate();
                }
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
            })
        }

        private manhattanDistance2(dCol: number, dRow: number) {
            let row = this.cursor.y >> 4
            let col = this.cursor.x >> 4
            return (Math.abs(dCol - col) + Math.abs(dRow - row));
        }

        private doit() {
            this.showSprites.forEach(spr => { spr.destroy(); })
            this.showSprites = [];
            this.menuItems = [];
            this.attrs = [];

            this.background.fill(11);
            this.background.fillRect(0, 0, 80, 120, 12);
            this.background.print("When", 0, 0);
            this.background.print("Do", 80, 0);

            this.showRuleType(this.ruleType, this.ruleDir, 0, 0);
            if (this.menu == RuleEditorMenus.RuleTypeMenu) {
                this.ruleTypeMap.fill(0xf);
                this.dirMap.fill(0xf);
                this.showRuleMenu(-2, 3);
            } else if (this.menu == RuleEditorMenus.PropositionMenu) {
                this.propositionMenu()
            } 
        }

        private showRuleMenu(x: number, y: number) {
            this.showRuleType(RuleType.Resting, 0, x, y-1);
            this.showRuleType(RuleType.Moving, TileDir.Left, x, y);
            this.showRuleType(RuleType.Moving, TileDir.Right, x + 1, y);
            this.showRuleType(RuleType.Moving, TileDir.Up, x, y + 1);
            this.showRuleType(RuleType.Moving, TileDir.Down, x + 1, y + 1);
            this.showRuleType(RuleType.Pushing, TileDir.Right, x + 3, y);
            this.showRuleType(RuleType.Pushing, TileDir.Left, x + 2, y+1);
            this.showRuleType(RuleType.Pushing, TileDir.Down, x + 4, y+1);
            this.showRuleType(RuleType.Pushing, TileDir.Up, x + 5, y);
            this.showRuleType(RuleType.Colliding, TileDir.Right, x + 6, y);
            this.showRuleType(RuleType.Colliding, TileDir.Left, x + 7, y + 1);
            this.showRuleType(RuleType.Colliding, TileDir.Down, x + 9, y);
            this.showRuleType(RuleType.Colliding, TileDir.Up, x + 8, y+1);
        }

        private showRuleType(rt: RuleType, rd: TileDir, x: number, y: number) {
            let selected = rt == this.ruleType && (rt == RuleType.Resting || rd == this.ruleDir);
            let selCol = 13
            if (selected) {
                this.background.fillRect((x+2) << 4, (y+2) << 4, 16, 16, selCol)
            }
            this.showInDiamond(x, y, this.centerSprite.image);
            this.ruleTypeMap.setPixel(x+2, y+2, rt);
            this.dirMap.setPixel(x+2, y+2, rd);
            if (rt == RuleType.Moving || rt == RuleType.Colliding) {
                let indexOf = arrowValues.indexOf(rd);
                this.showInDiamond(x, y, arrows[indexOf], 10)
            }
            if (rt == RuleType.Pushing || rt == RuleType.Colliding) {
                let indexOf = arrowValues.indexOf(rd);
                let ax = rd == TileDir.Left ? 1 : (rd == TileDir.Right ? -1 : 0)
                let ay = rd == TileDir.Down ? -1 : (rd == TileDir.Up ? 1 : 0)
                // TODO: what should we do if user wants to put something in this tile?
                if (rt == RuleType.Pushing) {
                    this.showInDiamond(x+ax, y+ay, arrows[indexOf], 10)
                    this.ruleTypeMap.setPixel(x+ax+2, y+ay+2, rt);
                    this.dirMap.setPixel(x+ax+2, y+ay+2, rd);
                    if (selected) {
                        this.background.fillRect((x + ax + 2) << 4, (y + ay + 2) << 4, 16, 16, selCol)
                    }
                } else {
                    this.showInDiamond(x - ax, y - ay, explode, 10);
                    this.ruleTypeMap.setPixel(x - ax + 2, y - ay + 2, rt);
                    this.dirMap.setPixel(x - ax + 2, y - ay + 2, rd);
                    if (selected) {
                        this.background.fillRect((x - ax + 2) << 4, (y - ay + 2) << 4, 16, 16, selCol)
                    }
                }
            }
        }

        private showSprites: Sprite[] = [];
        private showInDiamond(c: number, r: number, img: Image, z: number = 0) {
            let spr = sprites.create(img);
            spr.z = z;
            spr.x = this.centerX + c * 16;
            spr.y = this.centerY + r * 16;
            this.showSprites.push(spr);
            return spr;
        }

        private makeContext(row: number, col: number) {
            let spaceImg = this.manager.findName("Empty").image
            for (let i = -2; i <= 2; i++) {
                this.showInDiamond(col + i, row, spaceImg);
                this.showInDiamond(col, row + i, spaceImg);
                if (i > -2 && i < 2) {
                    this.showInDiamond(col + i, row + i, spaceImg);
                    this.showInDiamond(col + i, row - i, spaceImg);
                }
            }
        }

        private propositionMenu() {
            let x = -2
            this.manager.sprites().forEach((s, i) => {
                if (i > 0) {
                    let spr = this.showInDiamond(x, 4, s.image)
                    this.menuItems.push(spr);
                    // TODO: which attribute is on for this sprite?
                    x++;
                }
            })
            let checkS = this.showInDiamond(-2, 3, checkCenter);
            checkS.data = "Check";
            this.attrs.push(checkS)
            let negateS = this.showInDiamond(-1, 3, negateCenter);
            negateS.data = "Not";
            this.attrs.push(negateS)
            let oneofS = this.showInDiamond(0, 3, oneofCenter);
            oneofS.data = "OneOf"
            this.attrs.push(oneofS)
            let eraseS = this.showInDiamond(1, 3, eraseCenter);
            eraseS.data = "erase"
            this.attrs.push(eraseS)
        }

        private propositionUpdate() {
            this.attrs.forEach(m => {
                if (this.cursor.overlapsWith(m)) {
                    this.selected = m;
                    this.showSelected.x = m.x
                    this.showSelected.y = m.y
                    this.showSelected.setFlag(SpriteFlag.Invisible, false)
                }
            })
            // each item has exactly one attribute
            this.menuItems.forEach(m => {
                if (this.cursor.overlapsWith(m)) {
                    if (this.selected) {
                        if (this.selected.data != "erase") {
                            let index = arrowNames.indexOf(this.selected.data)
                            if (index >= 0) {
                                let spr = sprites.create(arrows[index])
                                spr.x = m.x; spr.y = m.y
                                this.showSprites.push(spr)
                            }
                        } else {

                        }
                    }
                }
            })
        }

        private closeMenu(command: string) {
            if (this.toolBox) {
                this.toolBox.dispose();
                this.toolBox = undefined;
                controller._setUserEventsEnabled(true);
                game.popScene();
            }
            if (command) {
                // look up name of sprite and get code
                let s = this.manager.findName(command)
                if (command == "Map") {
                    game.popScene();
                }
            }
        }

        private showMenu() {
            if (this.toolBox) return;
            game.pushScene();
            this.toolBox = new ToolboxMenu(this.manager.sprites(), this.commands, (s: string) => { this.closeMenu(s) });
            this.toolBox.show();
        }

    } 
}

