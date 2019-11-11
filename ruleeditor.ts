namespace tileWorldEditor {

    // language sprites

    const negate = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 2 2 2 2 2 2 . . . . .
        . . . . 2 2 . . . . 2 2 . . . .
        . . . 2 2 2 2 . . . . 2 2 . . .
        . . . 2 . 2 2 2 . . . . 2 . . .
        . . . 2 . . 2 2 2 . . . 2 . . .
        . . . 2 . . . 2 2 2 . . 2 . . .
        . . . 2 . . . . 2 2 2 . 2 . . .
        . . . 2 2 . . . . 2 2 2 2 . . .
        . . . . 2 2 . . . . 2 2 . . . .
        . . . . . 2 2 2 2 2 2 . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
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

    // TODO:
    // - background image with "before" and "after" words
    // - editing can only take place within context
    // - can't change the center sprite
    // - different sprites on Before After context
    // - arrows on before context - only one arrow, on center or pushing center
    // - dealing with ORs and negation
    // - Before vs After editing

    export class RuleEditor {
        private commands: Sprite[] = [];
        private toolBox: ToolboxMenu;
        private tileMap: Image;
        private cursor: Sprite;
        private cursorAnim: animation.Animation;
        private currentTileSprite: Sprite;
        constructor(private allSprites: Sprite[], private centerSprite: Sprite) {
            // the transparent tile
            let tileSprite = new Sprite(tile)
            tileSprite.data = "Empty"
            tileSprite.setFlag(SpriteFlag.Invisible, true)
            this.allSprites.insertAt(0, tileSprite)
            this.tileMap = image.create(10, 7)
            scene.setTileMap(this.tileMap)
            // set up user-defined sprites
            this.allSprites.forEach(function (s: Sprite, index: number) {
                s.setKind(index+1)
                scene.setTile(s.kind(), s.image)
            })
            this.makeContext(2,2, this.centerSprite)
            this.makeContext(2,7)

            // commands
            this.commands.push(mapSprite);
            //this.commands.push(paintSprite);
            //this.commands.push(playSprite);
            //this.commands.push(editSprite);

            // the color code of selected tile/sprite
            this.currentTileSprite = undefined;
            // cursor
            this.cursor = sprites.create(editSprite.image, SpriteKind.Player)
            this.cursor.x = 40
            this.cursor.y = 56
            scene.cameraFollowSprite(this.cursor)
            this.cursorAnim = animation.createAnimation(0, 333)
            this.cursorAnim.frames.push(editSprite.image)
            // this.cursorAnim.frames.push(tile)
            animation.attachAnimation(this.cursor, this.cursorAnim)
            animation.setAction(this.cursor, 0)

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
                if (!this.currentTileSprite)
                    return;
                let row = this.cursor.y >> 4
                let col = this.cursor.x >> 4
                if (this.inDiamond(false) || this.inDiamond(true)) {
                    this.tileMap.setPixel(col, row, this.currentTileSprite.kind())
                }
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                this.showMenu()
            })
        }

        private update() {
            if (this.inDiamond(true) || this.inDiamond(false)) {
                this.cursorAnim.frames = [editSprite.image]
            } else {
                this.cursorAnim.frames = [genericSprite]
            }
        }

        private inDiamond(before: boolean) {
            let row = this.cursor.y >> 4
            let col = this.cursor.x >> 4
            return ((before && col < 5) || (!before && col >=5)) && 
                this.tileMap.getPixel(col, row) == 1
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
                let s = this.allSprites.find((s) => (s.data == command))
                if (s) {
                    this.currentTileSprite = s;
                    if (this.cursorAnim.frames.length > 1)
                        this.cursorAnim.frames.pop();
                    this.cursorAnim.frames.push(s.image)
                }
            }
        }

        private showMenu() {
            if (this.toolBox) return;
            game.pushScene();
            this.toolBox = new ToolboxMenu(this.allSprites.concat(this.commands), (s: string) => { this.closeMenu(s) });
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

