namespace tileWorldEditor {

    // world editing spriates
     const tile = img`
         b b b b b b b b b b b b b b b c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         c c c c c c c c c c c c c c c c
     `
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
     `
     // commands
     const map = img`
         f f f f f f f f f f f f f f f f
         f f f f f f 2 2 2 2 f f f f f f
         f f f f 2 2 2 2 2 2 2 2 f f f f
         f f f 2 2 2 2 1 1 2 2 2 2 f f f
         f f f 2 2 2 1 1 1 1 2 2 2 f f f
         f f f 2 2 2 1 1 1 1 2 2 2 f f f
         f f f 2 2 2 2 1 1 2 2 2 2 f f f
         f f f f 2 2 2 2 2 2 2 2 f f f f
         f f f f 2 2 2 2 2 2 2 2 f f f f
         f f f f f 2 2 2 2 2 2 f f f f f
         f f f f f 2 2 2 2 2 2 f f f f f
         f f f f f f 2 2 2 2 f f f f f f
         f f f f f f 2 2 2 2 f f f f f f
         f f f f f f f 2 2 f f f f f f f
         f f f f f f f 2 2 f f f f f f f
         f f f f f f f f f f f f f f f f
     `
     const play = img`
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f 7 7 f f f f f f f f f f f f
         f f 7 7 7 7 f f f f f f f f f f
         f f 7 7 7 7 7 7 f f f f f f f f
         f f 7 7 7 7 7 7 7 7 f f f f f f
         f f 7 7 7 7 7 7 7 7 7 7 f f f f
         f f 7 7 7 7 7 7 7 7 7 7 1 1 f f
         f f 7 7 7 7 7 7 7 7 1 1 f f f f
         f f 7 7 7 7 7 7 1 1 f f f f f f
         f f 7 7 7 7 1 1 f f f f f f f f
         f f 7 7 1 1 f f f f f f f f f f
         f f 1 1 f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
     `
     const pencil = img`
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f 3 f f f f
         f f f f f f f f f f 3 3 3 f f f
         f f f f f f f f f 4 1 3 3 3 f f
         f f f f f f f f 4 4 e 1 3 f f f
         f f f f f f f 4 4 e 4 4 f f f f
         f f f f f f 4 4 e 4 4 f f f f f
         f f f f f 4 4 e 4 4 f f f f f f
         f f f f 4 4 e 4 4 f f f f f f f
         f f f 4 4 e 4 4 f f f f f f f f
         f f 4 4 e 4 4 f f f f f f f f f
         f f 1 e 4 4 f f f f f f f f f f
         f f 1 1 4 f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
     `
     const paint = img`
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f 4 1 4 1 4 1 4 1 f f f f
         f f f f 4 1 4 1 4 1 4 1 f f f f
         f f f f 1 1 1 1 1 1 1 1 f f f f
         f f f f 1 1 1 1 1 1 1 1 f f f f
         f f f f 9 9 9 9 9 9 9 9 f f f f
         f f f f d e e e e e e e f f f f
         f f f f d e e e e e e e f f f f
         f f f f f f d e e e f f f f f f
         f f f f f f d e e e f f f f f f
         f f f f f f d e e e f f f f f f
         f f f f f f d f f e f f f f f f
         f f f f f f d e e e f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
     `

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

    // the root of the editing experience is creating a (shared) tile map
    export class MapEditor {
        private toolBox: ToolboxMenu;
        private tileMap: Image;
        private cursor: Sprite;
        private cursorAnim: animation.Animation;
        private currentTileSprite: Sprite;
        private commands: Sprite[] = [];
        constructor(private allSprites: Sprite[]) {
            // the color code of selected tile/sprite
            this.currentTileSprite = undefined;
            // the transparent tile
            let tileSprite = new Sprite(tile)
            tileSprite.setKind(0)
            tileSprite.data = "Transparent"
            tileSprite.setFlag(SpriteFlag.Invisible, true)
            this.allSprites.insertAt(0, tileSprite)
            // the commands - move out to toolbox
            let mapSprite = new Sprite(map)
            mapSprite.setKind(1000)
            mapSprite.data = "Map"
            mapSprite.setFlag(SpriteFlag.Invisible, true)
            this.commands.push(mapSprite);
            let paintSprite = new Sprite(paint)
            paintSprite.setKind(1000)
            paintSprite.data = "Paint"
            paintSprite.setFlag(SpriteFlag.Invisible, true)
            this.commands.push(paintSprite);
            let playSprite = new Sprite(play)
            playSprite.setKind(1001)
            playSprite.data = "Play"
            playSprite.setFlag(SpriteFlag.Invisible, true)
            this.commands.push(playSprite);
            let editSprite = new Sprite(pencil)
            editSprite.setKind(1002)
            editSprite.data = "Program"
            editSprite.setFlag(SpriteFlag.Invisible, true)
            this.commands.push(editSprite);

            this.tileMap = image.create(30, 30)
            scene.setTileMap(this.tileMap)
            this.allSprites.forEach(function (s: Sprite, index: number) {
                s.setKind(index)
                scene.setTile(s.kind(), s.image)
            })

            this.cursor = sprites.create(cursorIn, SpriteKind.Player)
            this.cursor.x = 40
            this.cursor.y = 56
            scene.cameraFollowSprite(this.cursor)
            this.cursorAnim = animation.createAnimation(0, 500)
            this.cursorAnim.frames.push(cursorIn)
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
                this.showSpriteMenu()
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
                let  s = this.allSprites.find((s) => (s.data == command))
                if (s) {
                    this.currentTileSprite = s;
                    if (this.cursorAnim.frames.length > 1)
                        this.cursorAnim.frames.pop();
                    this.cursorAnim.frames.push(s.image)
                } else if (command == "Paint") {
                    // game.pushScene();
                }
            }
        }

        private showSpriteMenu() {
            if (this.toolBox) return;
            game.pushScene();
            this.toolBox = new ToolboxMenu(this.allSprites.concat(this.commands), (s: string) => { this.closeMenu(s) });
            this.toolBox.show();
        }

    } 
 }