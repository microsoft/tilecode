namespace tileWorldEditor {
    const colorCursor = img`
        5 5 5 5 5 5 5 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 5 5 5 5 5 5 5
    `
    const paintCursor = img`
        5 5 5 5 5 5
        5 . . . . 5
        5 . . . . 5
        5 . . . . 5
        5 . . . . 5
        5 5 5 5 5 5
    `
    export class ImageEditor {
        private color: boolean;
        private colorCursor: Sprite;
        private paintCursor: Sprite;
        private selectedColor: number;
        private original: Image; // 16x16
        private image: Image;    // 16x16
        private tileMap: Image;  // whole screen
        constructor(i: Image) {
            this.color = true;
            this.colorCursor = sprites.create(colorCursor)
            this.colorCursor.x = 12
            this.colorCursor.y = 16 + 8 * 7
            this.selectedColor = 0;
            this.paintCursor = sprites.create(paintCursor)
            this.paintCursor.x = 32
            this.paintCursor.y = 14
            this.paintCursor.setFlag(SpriteFlag.Invisible, true)
            this.original = i;
            this.image = i.clone();
            this.tileMap = image.create(160, 120)
            scene.setBackgroundImage(this.tileMap)
            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    if (this.colorCursor.x > 8)
                        this.colorCursor.x -= 8
                } else {
                    if (this.paintCursor.x > 35)
                        this.paintCursor.x -= 6
                    else {
                        // transition cursor to color editor
                        this.colorCursor.setFlag(SpriteFlag.Invisible, false)
                        this.paintCursor.setFlag(SpriteFlag.Invisible, true)
                        this.color = true;
                    }
                }
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    if (this.colorCursor.x < 8)
                        this.colorCursor.x += 8
                    else {
                        // transition cursor to paint editor
                        this.colorCursor.setFlag(SpriteFlag.Invisible, true)
                        this.paintCursor.setFlag(SpriteFlag.Invisible, false)
                        this.color = false;
                    }
                } else {
                    if (this.paintCursor.x < 32 + 6 * 15)
                        this.paintCursor.x += 6
                }
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    if (this.colorCursor.y > 16 + 7)
                        this.colorCursor.y -= 8
                } else {
                    if (this.paintCursor.y > 19)
                        this.paintCursor.y -= 6
                }
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    if (this.colorCursor.y < 16 + 8 * 7)
                        this.colorCursor.y += 8
                } else {
                    if (this.paintCursor.y < 14 + 6 * 15)
                        this.paintCursor.y += 6
                }
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    let col = (this.colorCursor.x) >> 3
                    let row = (this.colorCursor.y - 16) >> 3
                    this.selectedColor = row * 2 + col
                    this.update()
                } else {
                    let col = ((this.paintCursor.x - 32) / 6) | 0x0
                    let row = ((this.paintCursor.y - 14) / 6) | 0x0
                    this.image.setPixel(col, row, this.selectedColor)
                    this.update()
                }
            })
            this.update()
        }
        private update() {
            this.tileMap.fill(0)
            // draw the colors
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 2; col++) {
                    let color = row * 2 + col
                    this.tileMap.fillRect(col * 8 + 1, 12 + row * 8 + 1, 6, 6, color)
                    if (this.selectedColor == color) {
                        this.tileMap.drawRect(col * 8, 12 + row * 8, 8, 8, 1)
                    }
                }
            }
            // take care of transparent
            this.tileMap.fillRect(1, 13, 3, 3, 13)
            this.tileMap.fillRect(4, 16, 3, 3, 13)
            // frame the sprite editor
            this.tileMap.drawRect(28, 10, 6 * 16 + 4, 6 * 16 + 4, 1)
            // draw the sprite editor
            for (let row = 0; row < this.image.height; row++) {
                let y = 12 + row * 6
                for (let col = 0; col < this.image.width; col++) {
                    let x = 30 + col * 6
                    let color = this.image.getPixel(col, row)
                    this.tileMap.fillRect(x, y, 5, 5, color)
                    if (color == 0) {
                        this.tileMap.fillRect(x, y, 2, 2, 13)
                        this.tileMap.fillRect(x + 3, y + 3, 2, 2, 13)
                    }
                }
            }
            // draw the sprite
            this.tileMap.fillRect(134, 12, 16, 16, 0)
            this.tileMap.drawImage(this.image, 134, 12)
        }
    }

}