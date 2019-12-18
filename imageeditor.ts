namespace tileworld {
    const yoff = 4;
    const colorSize = 8;
    const paintSize = 6;
    const colorsY = 30;
    const colorsX = 5;
    enum CursorType {Regular, Color, Paint};
    export class ImageEditor {
        private cursorType: CursorType;         // are we selecting a color or painting?
        private cursor: Sprite;
        private colorCursor: Sprite;
        private paintCursor: Sprite;
        private selectedColor: number;
        private original: Image; // 16x16
        private image: Image;    // 16x16
        private screen: Image;  // whole screen
        constructor(private p: Project, private kind: number) {
            this.cursorType= CursorType.Color;
            this.cursor = sprites.create(cursorIn);
            this.cursor.x = colorsX + 8;
            this.cursor.y = yoff + 16 + 8;
            this.cursor.setFlag(SpriteFlag.Invisible, true);

            this.colorCursor = sprites.create(colorCursor)
            this.colorCursor.x = colorsX  + (colorSize>>1);
            this.colorCursor.y = colorsY + colorSize*8;
            this.selectedColor = 0;
            this.paintCursor = sprites.create(paintCursor)
            this.paintCursor.x = paintSize * 5 + 2 
            this.paintCursor.y = paintSize * 2 + 2
            this.paintCursor.setFlag(SpriteFlag.Invisible, true)
            this.original = p.getImage(kind);
            this.image = this.original // i.clone();
            this.screen = image.create(160, 120)
            scene.setBackgroundImage(this.screen)
            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.cursorType== CursorType.Color) {
                    if (this.colorCursor.x > colorsX + colorSize)
                        this.colorCursor.x -= colorSize
                } else if (this.cursorType== CursorType.Paint) {
                    if (this.paintCursor.x > paintSize * 6 - 1)
                        this.paintCursor.x -= paintSize
                    else {
                        // transition cursor to color editor
                        this.setCursor(CursorType.Color);
                    }
                } 
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.cursorType== CursorType.Color) {
                    if (this.colorCursor.x < colorsX + colorSize)
                        this.colorCursor.x += colorSize
                    else {
                        // transition cursor to paint editor
                        this.setCursor(CursorType.Paint);
                    }
                } else if (this.cursorType== CursorType.Paint) {
                    if (this.paintCursor.x < (paintSize*5 +2) + paintSize * 15)
                        this.paintCursor.x += paintSize
                } else {
                    this.setCursor(CursorType.Paint);
                }
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.cursorType== CursorType.Color) {
                    if (this.colorCursor.y > colorsY + (colorSize << 1) + (colorSize-1))
                        this.colorCursor.y -= colorSize
                    else {
                        this.setCursor(CursorType.Regular);
                    }
                } else if (this.cursorType== CursorType.Paint) { 
                    if (this.paintCursor.y > (paintSize * 3 + 1))
                        this.paintCursor.y -= paintSize
                } else {
                    if (this.cursor.y > yoff + 16)
                        this.cursor.y -= 16;
                }
            });
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.cursorType== CursorType.Color) {
                    if (this.colorCursor.y < colorsY + (colorSize << 1) + colorSize * (colorSize-1))
                        this.colorCursor.y += colorSize
                } else if (this.cursorType== CursorType.Paint) {
                    if (this.paintCursor.y < (paintSize*2) + 2 + paintSize * 15)
                        this.paintCursor.y += paintSize
                } else {
                    if (this.cursor.y < yoff + 17)
                        this.cursor.y += 16;
                    else 
                        this.setCursor(CursorType.Color);
                }
            });
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.cursorType== CursorType.Color) {
                    let col = ((this.colorCursor.x - colorsX) / colorSize ) | 0x0
                    let row = ((this.colorCursor.y - (colorSize << 1) - colorsY) / colorSize) | 0x0
                    this.selectedColor = row * 2 + col
                    this.update()
                } else if (this.cursorType== CursorType.Paint) {
                    let col = ((this.paintCursor.x - (paintSize*5 + 2)) / paintSize) | 0x0
                    let row = ((this.paintCursor.y - (paintSize*2 + 2)) / paintSize) | 0x0
                    this.image.setPixel(col, row, this.selectedColor)
                    this.update()
                } else {
                    let row = (this.cursor.y - yoff) >> 4;
                    if (row == 0) {
                        game.popScene();
                    } else
                        this.setCursor(CursorType.Paint)
                }
            });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.cursorType== CursorType.Paint) 
                    this.setCursor(CursorType.Color);
                else if (this.cursorType== CursorType.Color)
                    game.popScene();
            });
            this.update()
        }

        private setCursor(ct: CursorType) {
            this.cursor.setFlag(SpriteFlag.Invisible, ct != CursorType.Regular);
            this.colorCursor.setFlag(SpriteFlag.Invisible, ct != CursorType.Color);
            this.paintCursor.setFlag(SpriteFlag.Invisible, ct != CursorType.Paint);
            this.cursorType= ct;
        }

        private update() {
            this.screen.fill(0);
            this.screen.fillRect(colorsX, yoff+16, 16, 16, 11);
            this.screen.drawTransparentImage(map, colorsX, yoff);
            this.screen.drawTransparentImage(paint, colorsX, yoff+16)
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
            this.screen.fillRect(colorsX + 1, colorsY+13, 3, 3, 13)
            this.screen.fillRect(colorsX + 4, colorsY+16, 3, 3, 13)
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
            this.screen.drawRect(133, 11, 18, 18, 1)
        }
    }
}