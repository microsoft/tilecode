namespace tileWorldEditor {
    const colorSize = 8;
    const paintSize = 6;
    const colorsY = 30;
    const colorsX = 5;
    export class ImageEditor {
        private color: boolean;
        private colorCursor: Sprite;
        private paintCursor: Sprite;
        private selectedColor: number;
        private original: Image; // 16x16
        private image: Image;    // 16x16
        private screen: Image;  // whole screen
        constructor(private manager: SpriteManager, s: Sprite) {
            this.color = true;
            this.colorCursor = sprites.create(colorCursor)
            this.colorCursor.x = colorsX + colorSize >> 1
            this.colorCursor.y = colorsY + colorSize << 1
            this.selectedColor = 0;
            this.paintCursor = sprites.create(paintCursor)
            this.paintCursor.x = paintSize * 5 + 2 
            this.paintCursor.y = paintSize * 2 + 2
            this.paintCursor.setFlag(SpriteFlag.Invisible, true)
            this.original = s.image;
            this.image = s.image; // i.clone();
            this.screen = image.create(160, 120)
            scene.setBackgroundImage(this.screen)
            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    if (this.colorCursor.x > colorsX + colorSize)
                        this.colorCursor.x -= colorSize
                } else {
                    if (this.paintCursor.x > paintSize * 6 - 1)
                        this.paintCursor.x -= paintSize
                    else {
                        // transition cursor to color editor
                        this.setColorCursor(true);
                    }
                }
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    if (this.colorCursor.x < colorsX + colorSize)
                        this.colorCursor.x += colorSize
                    else {
                        // transition cursor to paint editor
                        this.setColorCursor(false);
                    }
                } else {
                    if (this.paintCursor.x < (paintSize*5 +2) + paintSize * 15)
                        this.paintCursor.x += paintSize
                }
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    if (this.colorCursor.y > colorsY + (colorSize << 1) + (colorSize-1))
                        this.colorCursor.y -= colorSize
                } else {
                    if (this.paintCursor.y > (paintSize * 3 + 1))
                        this.paintCursor.y -= paintSize
                }
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    if (this.colorCursor.y < colorsY + (colorSize << 1) + colorSize * (colorSize-1))
                        this.colorCursor.y += colorSize
                } else {
                    if (this.paintCursor.y < (paintSize*2) + 2 + paintSize * 15)
                        this.paintCursor.y += paintSize
                }
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.color) {
                    let col = ((this.colorCursor.x) / colorSize ) | 0x0
                    let row = ((this.colorCursor.y - (colorSize << 1)) / colorSize) | 0x0
                    this.selectedColor = row * 2 + col
                    this.update()
                } else {
                    let col = ((this.paintCursor.x - (paintSize*5 + 2)) / paintSize) | 0x0
                    let row = ((this.paintCursor.y - (paintSize*2 + 2)) / paintSize) | 0x0
                    this.image.setPixel(col, row, this.selectedColor)
                    this.update()
                }
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                
            })
            this.update()
        }
        private setColorCursor(color: boolean) {
            this.colorCursor.setFlag(SpriteFlag.Invisible, !color)
            this.paintCursor.setFlag(SpriteFlag.Invisible, color)
            this.color = color;
        }
        private update() {
            this.screen.fill(12);
            this.screen.fillRect(0, 0, 16, 16, 11);
            this.screen.drawTransparentImage(paint, 0, 0)
            //this.screen.fill(0)
            // draw the 16 colors
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 2; col++) {
                    let color = row * 2 + col
                    let yOffset = colorsY + colorSize + (colorSize >> 1)
                    this.screen.fillRect(colorsX + col * colorSize + 1, yOffset + row * colorSize + 1, colorSize-2, colorSize-2, color)
                    if (this.selectedColor == color) {
                        this.screen.drawRect(colorsX + col * colorSize, yOffset + row * colorSize, colorSize, colorSize, 1)
                    }
                }
            }
            // take care of transparent
            this.screen.fillRect(1, 13, 3, 3, 13)
            this.screen.fillRect(4, 16, 3, 3, 13)
            // frame the sprite editor
            this.screen.drawRect(28, 10, paintSize * 16 + (paintSize - 2), paintSize * 16 + (paintSize -2), 1)
            // draw the sprite editor
            for (let row = 0; row < this.image.height; row++) {
                let y = (paintSize << 1) + row * paintSize
                for (let col = 0; col < this.image.width; col++) {
                    let x = paintSize * 5 + col * paintSize
                    let color = this.image.getPixel(col, row)
                    this.screen.fillRect(x, y, paintSize-1, paintSize-1, color)
                    if (color == 0) {
                        this.screen.fillRect(x, y, (paintSize >> 1) -1, (paintSize >> 1) -1, 13)
                        this.screen.fillRect(x + (paintSize >> 1), y + (paintSize >> 1), (paintSize >> 1)-1, (paintSize >> 1)-1, 13)
                    }
                }
            }
            // draw the sprite
            this.screen.drawImage(this.image, 134, 12)
        }
        private closeMenu(command: string) {
            if (command) {
                if (command == "Map")
                    game.popScene();
                else if (command == "Paint") {
                    this.setColorCursor(!this.color);
                    this.update();
                }
            }
        }
    }

}