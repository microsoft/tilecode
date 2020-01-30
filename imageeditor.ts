namespace tileworld {
    const yoff = 4;
    const colorSize = 8;
    const paintSize = 6;
    const colorsY = 30;
    const colorsX = 5;
    const editorY = paintSize * 4; 
    
    enum CursorType { Color, Paint, Menu };

    // TODO: sprite selection
    export class ImageEditor extends BackgroundBase {
        private cursorType: CursorType;         // are we selecting a color or painting?
        private colorCursor: Sprite;
        private paintCursor: Sprite;
        private menuCursor: Sprite;
        private selectedColor: number;
        private image: Image;    // 16x16
        private Adown: boolean;
        private kind: number;
        private dirty: boolean;
        constructor(private p: Project) {
            super();
            this.kind = 0;
            this.Adown = false;
            this.dirty = false;
            this.cursorType= CursorType.Color;

            this.colorCursor = sprites.create(colorCursor)
            this.colorCursor.x = colorsX  + (colorSize>>1);
            this.colorCursor.y = colorsY + colorSize*8;
            this.selectedColor = 0;

            this.paintCursor = sprites.create(paintCursor)
            this.paintCursor.x = paintSize * 5 + 2 
            this.paintCursor.y = editorY + 2
            this.paintCursor.setFlag(SpriteFlag.Invisible, true);

            this.menuCursor = sprites.create(cursorIn);
            this.menuCursor.x = 32 + 8;
            this.menuCursor.y = yoff + 8
            this.menuCursor.setFlag(SpriteFlag.Invisible, true);

            this.image = p.getImage(this.kind);
            this.update();

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => this.moveLeft());
            controller.left.onEvent(ControllerButtonEvent.Repeated, () => this.moveLeft());
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => this.moveRight());
            controller.right.onEvent(ControllerButtonEvent.Repeated, () => this.moveRight());
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => this.moveUp());
            controller.up.onEvent(ControllerButtonEvent.Repeated, () => this.moveUp());
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => this.moveDown());
            controller.down.onEvent(ControllerButtonEvent.Repeated, () => this.moveDown());

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => { this.Adown = true; this.paintPixel() });
            controller.A.onEvent(ControllerButtonEvent.Released, () => { this.Adown = false; });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.cursorType== CursorType.Paint) {
                    this.setCursor(CursorType.Color);
                } else if (this.cursorType == CursorType.Color) {
                    this.setCursor(CursorType.Paint);
                } else {
                    this.saveAndPop();
                }
            });
        }

        private paintPixel() {
            if (!this.Adown)
                return;
            if (this.cursorType == CursorType.Color) {
                let col = ((this.colorCursor.x - colorsX) / colorSize) | 0x0;
                let row = ((this.colorCursor.y - (colorSize << 1) - colorsY) / colorSize) | 0x0;
                this.selectedColor = row * 2 + col;
            } else if (this.cursorType == CursorType.Paint) {
                this.dirty = true;
                let col = ((this.paintCursor.x - (paintSize * 5 + 2)) / paintSize) | 0x0;
                let row = ((this.paintCursor.y - (editorY + 2)) / paintSize) | 0x0;
                this.image.setPixel(col, row, this.selectedColor);
            } else {
                let col = this.menuCursor.x >> 4;
                if (2 <= col && col < 2 + this.p.all().length) {
                    if (this.dirty)
                        this.p.saveImage(this.kind);
                    this.kind = col - 2;
                    this.image = this.p.getImage(this.kind);
                    this.dirty = false;
                }
                /*
                if (this.menuCursor.y > yoff + 8) {
                    this.p.saveImage(this.kind);
                    this.Adown = false;
                    game.pushScene();
                    new Gallery(this.p, this.kind);
                }*/
            }
            this.update()
        }

        private moveLeft() {
            if (this.cursorType == CursorType.Color) {
                if (this.colorCursor.x > colorsX + colorSize)
                    this.colorCursor.x -= colorSize
            } else if (this.cursorType == CursorType.Menu) {
                if (this.menuCursor.x > 8)
                    this.menuCursor.x -= 16;
            } else {
                if (this.paintCursor.x > paintSize * 6 - 1)
                    this.paintCursor.x -= paintSize
                else {
                    // transition cursor to color editor
                    this.setCursor(CursorType.Color);
                }
            }
            this.paintPixel();
        }

        private moveRight() {
            if (this.cursorType == CursorType.Color) {
                if (this.colorCursor.x < colorsX + colorSize)
                    this.colorCursor.x += colorSize
                else {
                    // transition cursor to paint editor
                    this.setCursor(CursorType.Paint);
                }
            } else if (this.cursorType == CursorType.Menu) {
                if (this.menuCursor.x < 9 << 4)
                    this.menuCursor.x += 16;
            } else {
                if (this.paintCursor.x < (paintSize * 5 + 2) + paintSize * 15)
                    this.paintCursor.x += paintSize
            }
            this.paintPixel();
        }

        private moveUp() {
            if (this.cursorType == CursorType.Color) {
                if (this.colorCursor.y > colorsY + (colorSize << 1) + (colorSize - 1))
                    this.colorCursor.y -= colorSize;
            } else {
                if (this.paintCursor.y > (editorY + paintSize + 1))
                    this.paintCursor.y -= paintSize
                else {
                    this.setCursor(CursorType.Menu);
                }
            }
            this.paintPixel();
        }

        private moveDown() {
            if (this.cursorType == CursorType.Color) {
                if (this.colorCursor.y < colorsY + (colorSize << 1) + colorSize * (colorSize - 1))
                    this.colorCursor.y += colorSize
            } else if (this.cursorType == CursorType.Menu) {
                this.setCursor(CursorType.Paint);
            } else {
                if (this.paintCursor.y < editorY + 2 + paintSize * 15)
                    this.paintCursor.y += paintSize
            }
            this.paintPixel();
        }

        private saveAndPop() {
            this.p.saveImage(this.kind);
            game.popScene();
        }
        
        private setCursor(ct: CursorType) {
            this.colorCursor.setFlag(SpriteFlag.Invisible, ct != CursorType.Color);
            this.paintCursor.setFlag(SpriteFlag.Invisible, ct != CursorType.Paint);
            this.menuCursor.setFlag(SpriteFlag.Invisible, ct != CursorType.Menu);
            this.cursorType= ct;
        }

        protected update() {
            screen.fill(0);
            screen.fillRect(0, yoff, 16, 16, 11);
            screen.drawTransparentImage(paint, 0, yoff)
            this.p.all().forEach((img, index) => {
                screen.drawImage(img, (2 + index)*16, yoff);
                if (index == this.kind) {
                    screen.drawTransparentImage(cursorOut, (2+index)*16, yoff);
                }
            });
            //screen.fill(0)
            // draw the 16 colors
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 2; col++) {
                    let color = row * 2 + col
                    let yOffset = colorsY + colorSize + (colorSize >> 1)
                    screen.fillRect(colorsX + col * colorSize + 1, yOffset + row * colorSize + 1, colorSize-2, colorSize-2, color)
                    if (this.selectedColor == color) {
                        screen.drawRect(colorsX + col * colorSize, yOffset + row * colorSize, colorSize, colorSize, 1)
                    }
                }
            }
            // take care of transparent
            screen.fillRect(colorsX + 1, colorsY+13, 3, 3, 13)
            screen.fillRect(colorsX + 4, colorsY+16, 3, 3, 13)
            // frame the sprite editor
            // draw the sprite editor
            for (let row = 0; row < this.image.height; row++) {
                let y = editorY + row * paintSize
                for (let col = 0; col < this.image.width; col++) {
                    let x = paintSize * 5 + col * paintSize
                    let color = this.image.getPixel(col, row)
                    screen.fillRect(x, y, paintSize-1, paintSize-1, color)
                    if (color == 0) {
                        screen.fillRect(x, y, (paintSize >> 1) -1, (paintSize >> 1) -1, 13)
                        screen.fillRect(x + (paintSize >> 1), y + (paintSize >> 1), (paintSize >> 1)-1, (paintSize >> 1)-1, 13)
                    }
                }
            }
            screen.drawRect(28, 10 + paintSize*2, paintSize * 16 + (paintSize - 2), paintSize * 16 + (paintSize - 2), 1)
            // draw the sprite
            screen.drawImage(this.image, 134, 12 + paintSize* 2)
            screen.drawRect(133, 11 + paintSize* 2, 18, 18, 1)
        }
    }
}