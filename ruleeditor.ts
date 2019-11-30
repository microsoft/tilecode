namespace tileWorldEditor {

    const genericSprite = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . c c c . . . . . .
        . . . . . . c c c c c . . . . .
        . . . . . . c c c c c . . . . .
        . . . . . . c c c c c . . . . .
        . . . . . . . c c c . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    const exclude = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . f 2 2 2 2 f .
        . . . . . . . . f 2 2 f f 2 2 f
        . . . . . . . . 2 2 2 2 f f 2 2
        . . . . . . . . 2 f 2 2 2 f f 2
        . . . . . . . . 2 f f 2 2 2 f 2
        . . . . . . . . 2 2 f f 2 2 2 2
        . . . . . . . . f 2 2 f f 2 2 f
        . . . . . . . . . f 2 2 2 2 f .
    `;
    const include = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . f f 7 . . . . . . .
        . . . . . f f 7 6 . . . . . . .
        . . . . . f 7 7 6 . . . . . . .
        f f . . f f 7 6 f . . . . . . .
        7 f f . f 7 7 6 f . . . . . . .
        7 7 f f f 7 6 f . . . . . . . .
        f 7 7 f 7 7 6 f . . . . . . . .
        f f 7 7 7 6 f . . . . . . . . .
        . f f 7 6 f . . . . . . . . . .
    `;
    const oneof = img`
        . f f f f f f . . . . . . . . .
        f f 5 5 5 5 f f . . . . . . . .
        f 5 5 5 5 5 5 f . . . . . . . .
        f 5 5 5 5 5 5 f . . . . . . . .
        f 5 5 5 5 5 5 f . . . . . . . .
        f 5 5 5 5 5 5 f . . . . . . . .
        f f 5 5 5 5 f f . . . . . . . .
        . f f f f f f . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    const ok = img`
        . . . . . . . . . f 7 7 7 7 f .
        . . . . . . . . f 7 7 f f 7 7 f
        . . . . . . . . 7 7 f f f f 7 7
        . . . . . . . . 7 f f f f f f 7
        . . . . . . . . 7 f f f f f f 7
        . . . . . . . . 7 7 f f f f 7 7
        . . . . . . . . f 7 7 f f 7 7 f
        . . . . . . . . . f 7 7 7 7 f 1
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    const excludeCenter = img`
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
    `;
    const includeCenter = img`
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
    `;
    const oneofCenter = img`
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
    `;
    const okCenter = img`
        . . . . . . . . . . . . . . . .
        . d d d d d d d d d d d d d d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . 7 7 7 7 . . . . d .
        . d . . . 7 7 . . 7 7 . . . d .
        . d . . 7 7 . . . . 7 7 . . d .
        . d . . 7 . . . . . . 7 . . d .
        . d . . 7 . . . . . . 7 . . d .
        . d . . 7 7 . . . . 7 7 . . d .
        . d . . . 7 7 . . 7 7 . . . d .
        . d . . . . 7 7 7 7 . . . . d .
        . d . . . . . . . . . . . . d .
        . d . . . . . . . . . . . . d .
        . d d d d d d d d d d d d d d .
        . . . . . . . . . . . . . . . .
    `;
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
    `;
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
    `;
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
    `;
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
    `;
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
    `;
    const arrowImages = [leftArrow, rightArrow, upArrow, downArrow];
    const arrowValues = [TileDir.Left, TileDir.Right, TileDir.Up, TileDir.Down];
    const attrsCentered = [okCenter, oneofCenter, excludeCenter, includeCenter];
    const attrImages = [ok, oneof, exclude, include];
    const attrValues = [AttrType.OK, AttrType.OneOf, AttrType.Exclude, AttrType.Include];

    export function makeRestingRule(m: tileWorldEditor.SpriteManager, name: string): Rule {
        let index = m.findName(name).kind();
        return {
            kind: [index],
            rt: RuleType.Resting,
            dir: TileDir.None,
            whenDo: [{ col: 2, row: 2, attrs: [], witness: index, commands: [] }]
        }
    }

    enum RuleEditorMenus { RuleTypeMenu, AttrTypeMenu, None };

    function projectAttrs(a: AttrType[], begin: number, end: number): number[] {
        let res: number[] = [];
        let excludeCnt = a.filter((v,i) => v == AttrType.Exclude && begin <= i && i <=end).length;
        let okCnt = a.filter((v,i) => v == AttrType.OK && begin <= i && i <=end).length;
        let cnt = end - begin + 1;
        if (okCnt == a.length || excludeCnt == cnt)
            return res;
        let remove =
            (okCnt != 0 && excludeCnt !=0) ? 
               ((okCnt < excludeCnt) ? AttrType.Exclude : AttrType.OK) : -1; 
        a.forEach((v,i) => { 
            if (remove != v && begin <=i && i <=end) res.push(i); 
        })
        return res;
    }

    export class RuleEditor {
        private background: Image;
        private cursor: Sprite;
        private otherCursor: Sprite;

        // in-world menus
        private menu: RuleEditorMenus;
        // rule type menu
        private ruleTypeMap: Image;
        private dirMap: Image;
        // attribute menu
        private tileSaved: Sprite;
        private showSelected: Sprite;
        private attrSelected: Sprite;
        private attrs: Sprite[];
        private menuItems: Sprite[];

        // toolbox menu
        private commands: Sprite[] = [];
        private toolBox: ToolboxMenu

        constructor(private manager: SpriteManager, private rule: Rule) {
            this.ruleTypeMap = image.create(10,7);
            this.dirMap = image.create(10,7);

            // attribute menu view
            this.attrSelected = null;
            this.attrs = [];
            this.menuItems = [];
            this.tileSaved = sprites.create(cursorOut)
            this.tileSaved.setFlag(SpriteFlag.Invisible, true)
            this.tileSaved.z = 10;
            this.showSelected = sprites.create(cursorOut)
            this.showSelected.setFlag(SpriteFlag.Invisible, true)

            this.background = image.create(160, 120)
            scene.setBackgroundImage(this.background)
            this.manager.setScene()            

            // Control
            this.commands.push(mapSprite);
            this.menu = RuleEditorMenus.None;
            this.cursor = sprites.create(cursorIn)
            this.cursor.setFlag(SpriteFlag.Invisible, false)
            this.cursor.x = 40
            this.cursor.y = 40
            this.cursor.z = 50;
            this.otherCursor = sprites.create(cursorOut)
            this.otherCursor.setFlag(SpriteFlag.Invisible, true)
            this.otherCursor.x = 88
            this.otherCursor.y = 40
            this.otherCursor.z = 50;

            // refresh display
            this.update();

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) > 0)
                    this.cursor.x -= 16
                this.cursorMove();
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) < 9)
                    this.cursor.x += 16
                this.cursorMove();
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) > 0)
                    this.cursor.y -= 16;
                this.cursorMove();
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) < 6)
                    this.cursor.y += 16;
                this.cursorMove();
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.manhattanDistance2() == 0) {
                     // if we are on center sprite, bring up the ruletype menu
                    if (this.menu == RuleEditorMenus.RuleTypeMenu) {
                        this.noMenu();
                    } else {
                        this.noMenu();
                        this.menu = RuleEditorMenus.RuleTypeMenu;
                        this.setTileSaved();
                    }
                } else if (this.manhattanDistance2() <=2) {
                     // otherwise if we are in the diamond, bring up attr menu
                    if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                        this.noMenu();
                    } else {
                        this.menu = RuleEditorMenus.AttrTypeMenu;
                        this.setTileSaved()
                    }
                } else if (this.menu == RuleEditorMenus.RuleTypeMenu) {
                    let col = this.cursor.x >> 4;
                    let row = this.cursor.y >> 4;
                    let rt = this.ruleTypeMap.getPixel(col, row); 
                    if (rt != 0xf) {
                        this.rule.rt = rt;
                        this.rule.dir = this.dirMap.getPixel(col,row);
                    }
                } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                    this.attrUpdate();
                    return;
                }
                this.update();
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                // TODO: toolbox menu
            })
        }

        private cursorMove() {
            if (this.menu == RuleEditorMenus.None) {
                if (this.manhattanDistance2() <= 1) {
                    // compute mapping from left to right hand side
                    this.otherCursor.setFlag(SpriteFlag.Invisible, false);
                    let col = this.cursor.x >> 4;
                    let row = this.cursor.y >> 4;
                    this.otherCursor.x = 88;
                    if (col == 1) this.otherCursor.y = 24;
                    else if (col == 3) this.otherCursor.y = 56;
                    else if (row == 1) this.otherCursor.y = 8;
                    else if (row == 3) this.otherCursor.y = 72;
                    else this.otherCursor.y = 40;   
                } else if (this.cursor.x >= 80 && this.cursor.y < 80) {
                    // compute mapping from right to left hand side
                    this.otherCursor.setFlag(SpriteFlag.Invisible, false);
                    let row = this.cursor.y >> 4;
                    if (row == 0 || row == 2 || row == 4)
                        this.otherCursor.x = 40;
                    else
                        this.otherCursor.x = (row == 1) ? 24 : 56;
                    if (1 <= row && row <=3)
                        this.otherCursor.y = 40;
                    else
                        this.otherCursor.y = (row == 0) ? 24 : 56;
                } else {
                    this.otherCursor.setFlag(SpriteFlag.Invisible, true);
                }
            } else {

            }
        }

        private setTileSaved() {
            this.tileSaved.x = this.cursor.x;
            this.tileSaved.y = this.cursor.y;
            this.tileSaved.z = 100;
            this.tileSaved.setFlag(SpriteFlag.Invisible, false);
        }

        private noMenu() {
            this.menu = RuleEditorMenus.None;
            this.tileSaved.setFlag(SpriteFlag.Invisible, true);
            this.showSelected.setFlag(SpriteFlag.Invisible, true);
        }
        
        private manhattanDistance2() {
            let row = this.cursor.y >> 4
            let col = this.cursor.x >> 4
            return (Math.abs(2 - col) + Math.abs(2 - row));
        }

        private update() {
            this.menuItems.forEach(m => {
                let s:Sprite = m.data;   // issue filed
                s.destroy();             // 
            })
            this.showSprites.forEach(spr => { spr.destroy(); })
            this.showSprites = [];
            this.attrs = [];
            this.menuItems = [];

            this.background.fill(11);
            this.background.fillRect(0, 0, 80, 120, 12);
            this.background.print("When", 0, 0);
            this.background.print("Do", 65, 0);

            this.makeContext();
            this.showInDiamond(0, 0, this.centerImage(), 10);

            this.showRuleType(this.rule.rt, this.rule.dir, 0, 0);
            if (this.menu == RuleEditorMenus.RuleTypeMenu) {
                this.ruleTypeMap.fill(0xf);
                this.dirMap.fill(0xf);
                this.showRuleMenu(-2, 3);
            } else if (this.menu == RuleEditorMenus.AttrTypeMenu) {
                this.attrMenu()
            } 
        }

        private centerImage() {
            return this.manager.all()[this.rule.kind[0]].image;
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
            let selected = rt == this.rule.rt && (rt == RuleType.Resting || rd == this.rule.dir);
            let selCol = 13
            if (selected) {
                this.background.fillRect((x+2) << 4, (y+2) << 4, 16, 16, selCol)
            }
            this.showInDiamond(x, y, this.centerImage());
            this.ruleTypeMap.setPixel(x+2, y+2, rt);
            this.dirMap.setPixel(x+2, y+2, rd);
            if (rt == RuleType.Moving || rt == RuleType.Colliding) {
                let indexOf = arrowValues.indexOf(rd);
                this.showInDiamond(x, y, arrowImages[indexOf], 10)
            }
            if (rt == RuleType.Pushing || rt == RuleType.Colliding) {
                let indexOf = arrowValues.indexOf(rd);
                let ax = rd == TileDir.Left ? 1 : (rd == TileDir.Right ? -1 : 0)
                let ay = rd == TileDir.Down ? -1 : (rd == TileDir.Up ? 1 : 0)
                if (rt == RuleType.Pushing) {
                    this.showInDiamond(x+ax, y+ay, arrowImages[indexOf], 10)
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
            // the center of the diamond
            let centerX = 2 * 16 + 8
            let centerY = 2 * 16 + 8
            let spr = sprites.create(img);
            spr.z = z;
            spr.x = centerX + c * 16;
            spr.y = centerY + r * 16;
            this.showSprites.push(spr);
            return spr;
        }

        private makeContext() {
            let spaceImg = this.manager.empty().image
            for (let i = -2; i <= 2; i++) {
                for (let j = -2; j <= 2; j++) {
                    let dist = Math.abs(j) + Math.abs(i);
                    if (dist <= 2) {
                        this.showInDiamond(i,j, spaceImg);
                        if (i!=0 || j!=0)
                            this.showAttributes(i,j);
                        if (dist <= 1)
                            this.findWitness(i,j);
                    }
                }
            }
            this.showCommands();
        }

        private showCommands() {
            this.showCommandsAt(-1, this.getWhenDo(2, 1), upArrow);
            this.showCommandsAt(0, this.getWhenDo(1, 2), leftArrow);
            this.showCommandsAt(1, this.getWhenDo(2, 2), null);
            this.showCommandsAt(2, this.getWhenDo(3, 2), rightArrow);
            this.showCommandsAt(3, this.getWhenDo(2, 3), downArrow);
        }

        private showCommandsAt(row: number, whendo: WhenDo, img: Image) {
            let spaceImg = this.manager.empty().image;
            let img2 = whendo.witness == -1 ? genericSprite : 
                this.manager.all()[whendo.witness].image;
            this.showInDiamond(3, row-1, img2);
            // show the existing commands
            whendo.commands.forEach((c, j) => this.showCommand(c));
            // space for next command
            this.showInDiamond(4, row-1, spaceImg);
        }

        // TODO: editing model for commands
        // - selecting first column - does it do anything?
        // - selecting space shows menu options for the space
        // - selecting existing command (...)
        // - how to delete a command (or reset a row?)
        private showCommand(c: Command) {

        }

        private posSpritePosition(attrs: AttrType[], begin: number) {
            let index = attrs.indexOf(AttrType.Include,begin);
            return (index == -1) ? attrs.indexOf(AttrType.OneOf,begin) : index;
        }

        // what is ordering of sprites?
        // (0,0) always first
        private findWitness(col: number, row: number) {
            let item = this.getWhenDo(2+col, 2+row)
            if (col != 0 || row != 0) {
                let witness = this.posSpritePosition(item.attrs, this.manager.fixed().length);
                item.witness = witness;
            }
        }

        private showAttributes(col: number, row: number) {
            let item = this.rule.whenDo.find(a => a.col == col +2 && a.row == row +2);
            if (item) {
                // if there are includes, show the first one
                let index = item.attrs.indexOf(AttrType.Include);
                // and skip to the other (if it exists)
                let begin = 0;
                let end = item.attrs.length-1;
                if (index != -1) {
                    this.showInDiamond(col, row, this.manager.all()[index].image);
                    if (index < this.manager.fixed().length) {
                        begin = this.manager.fixed().length;
                    } else {
                        end = this.manager.fixed().length-1;
                    }
                }
                let project = projectAttrs(item.attrs, begin, end);
                let done: AttrType[] = [];
                project.forEach(index => {
                    let val = item.attrs[index];
                    // eliminate duplicates
                    if (done.indexOf(val) == -1) {
                        done.push(val);
                        this.showInDiamond(col, row, attrImages[attrValues.indexOf(val)]);
                    }
                });
            }
        }

        private attrMenu() {
            // which tile in the diamond are we attributing?
            let whenDo = this.getWhenDo(this.tileSaved.x >> 4, this.tileSaved.y >> 4);
            // for all user-defined sprites
            let x = -2;
            this.manager.all().forEach((s, i) => {
                let spr = this.showInDiamond(x, 4, s.image);
                this.menuItems.push(spr);
                let sprAttr = sprites.create(attrImages[attrValues.indexOf(whenDo.attrs[i])]);
                spr.data = sprAttr;
                spr.setKind(i);
                sprAttr.x = spr.x; sprAttr.y = spr.y;
                x++;
            });
            x = -2;
            attrsCentered.forEach((img,i) => {
                let attrSpr = this.showInDiamond(x, 3, img);
                attrSpr.setKind(attrValues[i]);
                this.attrs.push(attrSpr);
                x++;
            });
            this.selectAttr(this.attrs[0]);
        }

        private selectAttr(a: Sprite) {
            this.attrSelected = a;
            this.showSelected.x = a.x
            this.showSelected.y = a.y
            this.showSelected.setFlag(SpriteFlag.Invisible, false)
        }

        private attrUpdate() {
            let a = this.attrs.find(a => this.cursor.overlapsWith(a));
            if (a)  this.selectAttr(a);
            let m = this.menuItems.find(m => this.cursor.overlapsWith(m));
            if (m) {
                let val = this.attrSelected.kind();
                if (m.kind() < this.manager.fixed().length) {
                    if (val == AttrType.Include) 
                       // all other fixed must be exclude
                       this.setFixedOther(m, AttrType.Exclude);
                    else if (val == AttrType.OK || val == AttrType.OneOf)
                       // all other non-exclude fixed transition to only
                       this.setFixedOther(m, val,true);
                    else {
                       // not allowed to set all to exclude
                       let cnt = 0;
                       let i = 0;
                       for(;i<this.manager.fixed().length;i++) {
                           if (this.menuItems[i].data.image == exclude) {
                               cnt++; if (cnt == 2) break;
                           }
                       }
                       if (cnt == 2) {
                           let whenDo = this.getWhenDo(this.tileSaved.x >> 4, this.tileSaved.y >> 4);
                           this.setAttr(this.menuItems[i], whenDo.attrs[m.kind()]);
                       }
                    }
                } else {
                    if (val == AttrType.Include)
                        // all other fixed must be exclude
                        this.setMovableOther(m, AttrType.Exclude);
                    else if (val == AttrType.OK || val == AttrType.OneOf)
                        // all other non-exclude fixed transition to only
                        this.setMovableOther(m, val, true);
                }
                this.setAttr(m, val);
            }
        }

        private getWhenDo(col: number, row: number) {
            let item = this.rule.whenDo.find(a => a.col == col && a.row == row)
            if (item == undefined) {
                let attrs: AttrType[] = [];
                // default mapping::everything is possible
                this.manager.all().forEach(s => { attrs.push(AttrType.OK) });
                item = { col: col, row: row, attrs: attrs, witness: -1, commands:[] }
                this.rule.whenDo.push(item)
            }
            return item;
        }
        
        private setFixedOther(m: Sprite, val: AttrType, nonExclude: boolean = false) {
            for(let i =0; i<this.manager.fixed().length; i++) {
                let o = this.menuItems[i];
                if (o != m) {
                    if (!nonExclude || o.data.image != exclude)
                        this.setAttr(o, val);
                }
            }
        }
        private setMovableOther(m: Sprite, val: AttrType, nonExclude: boolean = false) {
            for (let i = this.manager.fixed().length; i< this.manager.all().length; i++) {
                let o = this.menuItems[i];
                if (o != m) {
                    if (!nonExclude || o.data.image != exclude)
                        this.setAttr(o, val);
                }
            }
        }
        private setAttr(m: Sprite, val: AttrType) {
            let i = attrValues.indexOf(val);
            let whenDo = this.getWhenDo(this.tileSaved.x >> 4, this.tileSaved.y >> 4);
            whenDo.attrs[m.kind()] = val;
            (<Sprite>(m.data)).setImage(attrImages[i]);
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
            this.toolBox = new ToolboxMenu(this.manager.all(), this.commands, (s: string) => { this.closeMenu(s) });
            this.toolBox.show();
        }
    } 
}

