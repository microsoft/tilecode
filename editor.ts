namespace tileWorldEditor {

    // world editing sprites
    export const tile = img`
        b b b b b b b b b b b b b b b c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        b f f f f f f f f f f f f f f c
        c c c c c c c c c c c c c c c c
    `;

     /*
     const cursorIn = img`
         . . . . . . . . . . . . . . . .
         . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
         . 1 1 . . . . . . . . . . 1 1 .
         . 1 . . . . . . . . . . . . 1 .
         . 1 . . . . . . . . . . . . 1 .
         . 1 . . . . . . . . . . . . 1 .
         . 1 . . . . . . . . . . . . 1 .
         . 1 . . . . . 1 1 . . . . . 1 .
         . 1 . . . . . 1 1 . . . . . 1 .
         . 1 . . . . . . . . . . . . 1 .
         . 1 . . . . . . . . . . . . 1 .
         . 1 . . . . . . . . . . . . 1 .
         . 1 . . . . . . . . . . . . 1 .
         . 1 1 . . . . . . . . . . 1 1 .
         . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
         . . . . . . . . . . . . . . . .
     `
     const cursorOut = img`
         . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
         1 1 . . . . . . . . . . . . 1 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 . . . . . . . . . . . . . . 1
         1 1 . . . . . . . . . . . . 1 1
         . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
     ` */

     // TODO: map expansion???
     const editorMap = img`
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . 5 . . . 4 . . 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . 4 . . 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
     `

    class SpriteManager {

    }
    
    // the root of the editing experience is creating a (shared) tile map
    export class MapEditor {
        private commands: Sprite[] = [];
        private toolBox: ToolboxMenu;
        private tileMap: Image;
        private cursor: Sprite;
        private cursorAnim: animation.Animation;
        private currentTileSprite: Sprite;
        constructor(private allSprites: Sprite[]) {
            // the transparent tile
            let tileSprite = new Sprite(tile)
            tileSprite.setKind(0)
            tileSprite.data = "Empty"
            tileSprite.setFlag(SpriteFlag.Invisible, true)
            this.allSprites.insertAt(0, tileSprite)
            this.tileMap = image.create(30, 30)
            scene.setTileMap(this.tileMap)
            // set up user-defined sprites
            this.allSprites.forEach(function (s: Sprite, index: number) {
                s.setKind(index)
                scene.setTile(s.kind(), s.image)
            })

            // commands
            this.commands.push(mapSprite);
            this.commands.push(paintSprite);
            this.commands.push(playSprite);
            this.commands.push(editSprite);

            // the color code of selected tile/sprite
            this.currentTileSprite = undefined;
            // cursor
            this.cursor = sprites.create(mapSprite.image, SpriteKind.Player)
            this.cursor.x = 40
            this.cursor.y = 56
            scene.cameraFollowSprite(this.cursor)
            this.cursorAnim = animation.createAnimation(0, 333)
            this.cursorAnim.frames.push(mapSprite.image)
            this.cursorAnim.frames.push(tile)
            animation.attachAnimation(this.cursor, this.cursorAnim)
            animation.setAction(this.cursor, 0)

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) > 0)
                    this.cursor.x -= 16
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) < this.tileMap.width - 1)
                    this.cursor.x += 16
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) > 0)
                    this.cursor.y -= 16
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) < this.tileMap.height - 1)
                    this.cursor.y += 16
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (!this.currentTileSprite)
                    return;
                let row = this.cursor.y >> 4
                let col = this.cursor.x >> 4
                if (row >= 0 && row < this.tileMap.height && col >= 0 && col < this.tileMap.width) {
                    this.tileMap.setPixel(col, row, this.currentTileSprite.kind())
                }
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                this.showMenu()
            })
        }

        private executeCommand(command: string, s: Sprite) {
            game.pushScene();
            if (command == "Paint") {
                let spriteEditor = new ImageEditor(s.image)
            } else {
                let ruleEditor = new RuleEditor(this.allSprites, s)
            }
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
                let  s = this.allSprites.find((s) => (s.data == command))
                if (s) {
                    this.currentTileSprite = s;
                    if (this.cursorAnim.frames.length > 1)
                        this.cursorAnim.frames.pop();
                    this.cursorAnim.frames.push(s.image)
                } else if (command == "Paint" || command == "Program") {
                    if (this.currentTileSprite && this.currentTileSprite.data != "Empty")
                        this.executeCommand(command, this.currentTileSprite)
                    else {
                        let row = this.cursor.y >> 4
                        let col = this.cursor.x >> 4
                        let pixel = this.tileMap.getPixel(col,row)
                        let s = this.allSprites.find((s) => s.kind() == pixel)
                        if (s.data != "Empty")
                            this.executeCommand(command, s)
                    }
                }
            }
        }

        private showMenu() {
            if (this.toolBox) return;
            game.pushScene();
            this.toolBox = new ToolboxMenu(this.allSprites.concat(this.commands), (s: string) => { this.closeMenu(s) });
            this.toolBox.show();
        }

    } 
 }