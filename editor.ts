module tileworld {
    
    const yoff = 4;
    const paintSize = 8;
    const editorY = 16+yoff;

    enum CursorType { Menu, Map }
    const paintOut = img`
        5 5 5 5 5 5 5 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 . . . . . . 5
        5 5 5 5 5 5 5 5
    `;
    const paintIn = img`
        . . . . . . . .
        . 5 5 5 5 5 5 .
        . 5 . . . . 5 .
        . 5 . . . . 5 .
        . 5 . . . . 5 .
        . 5 . . . . 5 .
        . 5 5 5 5 5 5 .
        . . . . . . . .
    `;

    export class MapEditor extends BackgroundBase {
        private offsetX: number; // where are we in the world?
        private offsetY: number; 
        private cursor: Sprite;
        private selected: Sprite;
        private paintCursor: Sprite;
        private cursorType: CursorType;
        private userSpriteIndex: number;
        private aDown: boolean;
        constructor(private p: Project) {
            super();
            this.aDown = false;
            // cursors
            this.selected = sprites.create(cursorOut);
            this.selected.x = 16 + 8;
            this.selected.y = 8 + yoff;
            this.userSpriteIndex = 0;
            
            this.cursor = sprites.create(cursorIn);
            this.cursor.x = 8
            this.cursor.y = 8 + yoff;
            utilities.cursorAnimation(this.cursor, cursorOut);

            this.paintCursor = sprites.create(paintOut)
            utilities.cursorAnimation(this.paintCursor, paintIn)
            this.paintHome();

            this.setCursor(CursorType.Menu);
            this.update();

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => this.moveLeft());
            controller.left.onEvent(ControllerButtonEvent.Repeated, () => this.moveLeft());
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => this.moveRight());
            controller.right.onEvent(ControllerButtonEvent.Repeated, () => this.moveRight());
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => this.moveUp());
            controller.up.onEvent(ControllerButtonEvent.Repeated, () => this.moveUp());
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => this.moveDown());
            controller.down.onEvent(ControllerButtonEvent.Repeated, () => this.moveDown());
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => { this.aDown = true; this.cursorAction(); });
            controller.A.onEvent(ControllerButtonEvent.Released, () => { this.aDown = false; });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.cursorType == CursorType.Menu) {
                    this.p.saveWorld();
                    game.popScene();
                } else {
                    this.setCursor(CursorType.Menu);
                }
            });
        }

        private paintHome() {
            this.paintCursor.x = 4
            this.paintCursor.y = editorY + 4;
            this.offsetX = this.offsetY = -3;
        }

        private setCursor(ct: CursorType) {
            this.cursor.setFlag(SpriteFlag.Invisible, ct != CursorType.Menu);
            this.paintCursor.setFlag(SpriteFlag.Invisible, ct != CursorType.Map);
            this.cursorType = ct;
        }

        private moveLeft() {
            if (this.cursorType == CursorType.Menu) {
                if (this.col() > 0)
                    this.cursor.x -= 16
            } else {
                if (this.paintCursor.x > paintSize)
                    this.paintCursor.x -= paintSize;
                else
                    this.offsetX -= 1;
                this.update();
            }
            this.cursorAction(true);
        }

        private moveRight() {
            if (this.cursorType == CursorType.Menu) {
                if (this.col() < 9)
                    this.cursor.x += 16
            } else {
                if (this.paintCursor.x < paintSize*19)
                    this.paintCursor.x += paintSize;
                else 
                    this.offsetX += 1;
                this.update();
            }
            this.cursorAction(true);
        }

        private moveUp() {
            if (this.cursorType == CursorType.Map) {
                if (this.paintCursor.y > (editorY + paintSize + 1))
                    this.paintCursor.y -= paintSize
                else
                    this.offsetY -= 1;
                this.update();
            }
            this.cursorAction(true);
        }

        private moveDown() {
            if (this.cursorType == CursorType.Menu) {
                this.setCursor(CursorType.Map);
            } else {
                if (this.paintCursor.y < editorY + 2 + paintSize * 12)
                    this.paintCursor.y += paintSize
                else
                    this.offsetY += 1;
                this.update();
            }
            this.cursorAction(true);
        }

        private updateSelection() {
            this.selected.x = this.cursor.x;
            this.selected.y = this.cursor.y;
        }

        private cursorAction(repeated = false) {
            if (!this.aDown)
                return;
            if (this.cursorType == CursorType.Map) {
                const col = (this.paintCursor.x >> 3) + this.offsetX;
                const row = ((this.paintCursor.y - (editorY +4)) >> 3) + this.offsetY;
                const backs = this.p.getWorldBackgrounds();
                if (this.userSpriteIndex == 0xf) {
                    backs.setPixel(col, row, 0xf);
                } else if (this.userSpriteIndex < this.p.backCnt())
                    backs.setPixel(col, row, this.userSpriteIndex);
                else {
                    const sprs = this.p.getWorldSprites();
                    const spriteIndex = this.userSpriteIndex - this.p.backCnt();
                    if (sprs.getPixel(col, row) == spriteIndex)
                        sprs.setPixel(col, row, 0xf);
                    else
                        sprs.setPixel(col, row, spriteIndex);
                }
                this.update();
                return;
            }
            if (repeated)
                return;
            if (this.row() == 0) {
                if (1 <= this.col() && this.col() < 1 + this.p.allCnt()) {
                    // change user sprite
                    this.userSpriteIndex = this.col()-1;
                    this.updateSelection();
                }
            }
            this.update();
        }

        private col(): number {
            return this.cursor.x >> 4;
        }
        
        private row(): number {
            return (this.cursor.y - yoff) >> 4;
        }

        private drawImage(img: Image, col: number, row: number): void {
            screen.drawTransparentImage(img, col << 4, (row << 4)+yoff);
        }

        public update(): void {
            screen.fill(0);
            screen.fillRect(0, yoff, 16, 16, 11);
            this.drawImage(map, 0, 0);
            let index = 1;
            this.p.backgroundImages().forEach(img => { 
                this.drawImage(img, index, 0); 
                index++;
            });
            this.p.spriteImages().forEach(img => {
                this.drawImage(img, index, 0);
                index++;
            });
            // this.drawImage(emptyDiagTile, 9, 0);
            const backs = this.p.getWorldBackgrounds();
            for(let x = this.offsetX; x<this.offsetX+20; x++) {
                for (let y = this.offsetY; y < this.offsetY + 15; y++) {
                    const inRange = 0 <= x && x < backs.width && 0 <= y && y < backs.height;
                    const col = x - this.offsetX;
                    const row = y - this.offsetY;
                    const nx = col * paintSize;
                    const ny = editorY + row * paintSize;
                    // tile
                    const index = inRange ? backs.getPixel(x, y) : -1;
                    const img = index == -1 ? emptyTile : index == 0xf ? emptyDiagTile : this.p.getBackgroundImage(index);
                    utilities.drawHalfSize(img, nx, ny);
                    // sprite
                    if (inRange) {
                        const index = this.p.getWorldSprites().getPixel(x, y);
                        if (index != 0xf) {
                            utilities.drawHalfSize(this.p.getSpriteImage(index), nx, ny, true);
                        }
                    }
                }    
            }
            screen.drawLine(0, yoff + 16, 159, yoff+16, 11)
        }
    } 
 }