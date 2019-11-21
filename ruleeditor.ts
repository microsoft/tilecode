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
    let arrows = [negate, check, leftArrow, rightArrow, upArrow, downArrow]
    let arrowNames = ["Not", "Check", "Left", "Right", "Up", "Down"]
    let arrowValues = [-2, -1, TileDir.Left, TileDir.Right, TileDir.Up, TileDir.Down]

    // TODO:
    // - editing can only take place within context
    // - can't change the center sprite
    // - different sprites in toolbox for Before After context
    // language
    // - LRUD arrows
    //   - Before context: only one arrow, on center or pushing center
    //   - After context: no arrows
    // - no negation on center, or After context
    // - dealing with ORs and negation
    // - Before vs After editing
    // - symmetry: toggles on arrows?
    // - GUI: previous rule, next rule

    // data structure - 
    // list of sprites per diamond location - sparse structure
    // sprite list: 2 max, with/without NEG, NEG distributed 
    // arrows: at most one arrow, 
    // how to remove sprite? don't, just reset the list 

    // upon selecting a tool, show viable spaces

    // editing of Post context: same as Pre??? 

    export class RuleEditor {
        private commands: Sprite[] = [];
        private toolBox: ToolboxMenu;
        private tileMap: Image;
        private background: Image;
        private cursor: Sprite;
        private cursorAnim: animation.Animation;
        private currentTileSprite: Sprite;
        private centerX: number;
        private centerY: number;
        constructor(private manager: SpriteManager, private rule: Rule) {  // private centerSprite: Sprite) {
            this.background = image.create(160, 120)
            this.tileMap = image.create(10,7)
            this.background.fill(11)
            this.background.fillRect(0, 0, 80, 120, 12)
            this.background.print("When", 0, 0)
            this.background.print("Do", 80, 0)
            scene.setBackgroundImage(this.background)
            scene.setTileMap(this.tileMap)
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

            let centerSprite = manager.findName(rule.kinds[0]);
            this.makeContext(2,2, centerSprite)
            this.centerX = 2*16 + 8
            this.centerY = 2*16 + 8
            // this.makeContext(2,7)

            // the color code of selected tile/sprite
            this.currentTileSprite = undefined;
            // cursor
            this.cursor = sprites.create(cursorIn, SpriteKind.Player)
            this.cursor.x = 40
            this.cursor.y = 56
            scene.cameraFollowSprite(this.cursor)
            if (rule.event == RuleType.Moving) {
                let arrowSprite = this.commands.find(s => s.kind() == rule.dir);
                this.showInDiamond(0, 0, arrowSprite.image)
            } else if (rule.event == RuleType.Push) {
                let arrowSprite = this.commands.find(s => s.kind() == rule.dir);
                let ax = rule.dir == TileDir.Left ? 1 : (rule.dir == TileDir.Right ? -1 : 0)
                let ay = rule.dir == TileDir.Down ? -1 : (rule.dir == TileDir.Up ? 1 : 0)
                this.showInDiamond(ax, ay, arrowSprite.image)
            }
            if (rule.guards) {
                rule.guards.forEach(g => {
                    if (g.some) {
                        let userSprite = this.manager.findName(g.some[0])
                        this.showInDiamond(g.x, g.y, userSprite.image)
                    }
                    if (g.none) {
                        let notSprite = this.commands.find(s => s.data == "Not");
                        this.showInDiamond(g.x, g.y, notSprite.image)
                    }
                    if (g.has) {
                        let userSprite = this.manager.findName(g.has[0])
                        this.showInDiamond(g.x, g.y, userSprite.image)
                    }
                    if (g.exactly) {
                        let userSprite = this.manager.findName(g.exactly[0])
                        this.showInDiamond(g.x, g.y, userSprite.image)
                    }
                })
            }
            //this.cursorAnim = animation.createAnimation(0, 333)
            //this.cursorAnim.frames.push(editSprite.image)
            // this.cursorAnim.frames.push(tile)
            // animation.attachAnimation(this.cursor, this.cursorAnim)
            // animation.setAction(this.cursor, 0)

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) > 0)
                    this.cursor.x -= 16
                this.update()
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) < this.tileMap.width - 1)
                    this.cursor.x += 16
                this.update()
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) > 0)
                    this.cursor.y -= 16
                this.update()
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) < this.tileMap.height - 1)
                    this.cursor.y += 16
                this.update()
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                /*
                if (!this.currentTileSprite)
                    return;
                let row = this.cursor.y >> 4
                let col = this.cursor.x >> 4
                if (this.inDiamond()) {
                    this.tileMap.setPixel(col, row, this.currentTileSprite.kind())
                }
                */
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                this.showMenu()
            })
        }

        private showInDiamond(c: number, r:number, img: Image) {
            let spr = sprites.create(img)
            spr.x = this.centerX + c*16
            spr.y = this.centerY + r*16
        }

        private update() {
            /*
            if (this.inDiamond()) {
                this.cursorAnim.frames = [editSprite.image]
            } else {
                this.cursorAnim.frames = [genericSprite]
            }*/
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
                    if (this.cursorAnim.frames.length > 1)
                        this.cursorAnim.frames.pop();
                    this.cursorAnim.frames.push(s.image)
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

        private makeContext(row: number, col: number, center: Sprite = null) {
            for (let i = -2; i <= 2; i++) {
                this.tileMap.setPixel(col + i, row, 1);
                this.tileMap.setPixel(col, row + i, 1);
                if (i > -2 && i < 2) {
                    this.tileMap.setPixel(col + i, row + i, 1);
                    this.tileMap.setPixel(col + i, row - i, 1);
                }
            }
            if (center) {
                this.tileMap.setPixel(row,col,center.kind())
            }
        }
    } 
}

