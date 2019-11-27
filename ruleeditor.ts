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
    export const arrows = [oneof, negate, check, leftArrow, rightArrow, upArrow, downArrow]
    export const arrowNames = ["OneOf", "Not", "Check", "Left", "Right", "Up", "Down"]
    export const arrowValues = [-3, -2, -1, TileDir.Left, TileDir.Right, TileDir.Up, TileDir.Down]

    export class RuleEditor {
        // the rule type and associated direction (if any)
        private ruleType: RuleType;
        private ruleDir: TileDir;

        private commands: Sprite[] = [];
        private toolBox: ToolboxMenu;
        private background: Image;
        private cursor: Sprite;
        private currentTileSprite: Sprite;
        private centerX: number;
        private centerY: number;

        // event menu

        // propositional menu
        private menuOn: boolean;
        private showSelected: Sprite;
        private selected: Sprite;
        private attrs: Sprite[];
        private menuItems: Sprite[];

        constructor(private manager: SpriteManager, private centerImage: Image) {
            this.ruleType = RuleType.Resting;
            this.ruleDir = TileDir.None;

            this.selected = null;
            this.attrs = [];
            this.menuItems = [];
            this.menuOn = false;
            this.background = image.create(160, 120)
            scene.setBackgroundImage(this.background)
            this.manager.setScene()
            // add the arrows
            arrows.forEach((img,i) => {
                let arrow = new Sprite(img);
                arrow.data = arrowNames[i]
                arrow.setKind(arrowValues[i])
                arrow.setFlag(SpriteFlag.Invisible, true)
                this.commands.push(arrow)
            })
            this.commands.push(mapSprite);
            this.centerX = 2 * 16 + 8
            this.centerY = 2 * 16 + 8

            this.showSelected = sprites.create(cursorOut)
            this.showSelected.setFlag(SpriteFlag.Invisible, true)

            this.cursor = sprites.create(cursorIn, SpriteKind.Player)
            this.cursor.setFlag(SpriteFlag.Invisible, false)
            this.cursor.x = 40
            this.cursor.y = 56
            this.cursor.z = 50;
            scene.cameraFollowSprite(this.cursor)
            this.doit();

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) > 0)
                    this.cursor.x -= 16
                this.update()
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) < 9)
                    this.cursor.x += 16
                this.update()
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) > 0)
                    this.cursor.y -= 16
                this.update()
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) < 7)
                    this.cursor.y += 16
                this.update()
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {

            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
            })
        }

        private eventsMenu() {

        }

        private propositionMenu() {
            /*
            if (!this.menuOn) {
                let x = -2
                this.manager.sprites().forEach((s, i) => {
                    if (i > 0) {
                        let spr = this.showInDiamond(x, 4, s.image)
                        this.menuItems.push(spr);
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
            */ 
        }

        private propositionUpdate() {
            if (this.menuOn) {
                this.attrs.forEach(m => {
                    if (this.cursor.overlapsWith(m)) {
                        this.selected = m;
                        this.showSelected.x = m.x
                        this.showSelected.y = m.y
                        this.showSelected.setFlag(SpriteFlag.Invisible, false)
                    }
                })
                this.menuItems.forEach(m => {
                    if (this.cursor.overlapsWith(m)) {
                        if (this.selected) {
                            if (this.selected.data != "erase") {
                                let index = arrowNames.indexOf(this.selected.data)
                                if (index >= 0) {
                                    let spr = sprites.create(arrows[index])
                                    spr.x = m.x; spr.y = m.y
                                }
                            } else {

                            }
                        }
                    }
                })
            }
            // this.showMenu()
        }

        private doit() {
            this.background.fill(11)
            this.background.fillRect(0, 0, 80, 120, 12)
            this.background.print("When", 0, 0)
            this.background.print("Do", 80, 0)

            this.makeContext(0, 0)
            this.showInDiamond(0, 0, this.centerImage)
            this.showRuleType(this.ruleType, this.ruleDir, 0, 0)
        }

        private showRuleType(rt: RuleType, rd: TileDir, x: number, y: number) {
            if (rt == RuleType.Moving) {
                let arrowSprite = this.commands.find(s => s.kind() == rd);
                this.showInDiamond(x, y, arrowSprite.image)
            } else if (rt == RuleType.Pushing) {
                let arrowSprite = this.commands.find(s => s.kind() == rd);
                let ax = rd == TileDir.Left ? 1 : (rd == TileDir.Right ? -1 : 0)
                let ay = rd == TileDir.Down ? -1 : (rd == TileDir.Up ? 1 : 0)
                // TODO: what should we do if user wants to put something in this tile?
                this.showInDiamond(x+ax, x+ay, arrowSprite.image)
            }
        }

        private update() {

        }

        private manhattanDistance2(dCol: number, dRow: number) {
            let row = this.cursor.y >> 4
            let col = this.cursor.x >> 4
            return (Math.abs(dCol - col) + Math.abs(dRow - row)) <= 2
        }
        private inDiamond() {
            return this.manhattanDistance2(2, 2) || this.manhattanDistance2(7, 2)
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
                if (s) {
                    this.currentTileSprite = s;
                } else if (command == "Map") {
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

        private showInDiamond(c: number, r: number, img: Image, z: number = 0) {
            let imgX = this.centerX + c * 16
            let imgY = this.centerY + r * 16
            this.background.drawImage(img, imgX - 8, imgY - 8)
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
    } 
}

