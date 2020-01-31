namespace tileworld {

    const yoff = 4;
    const paintSize = 6;
    const editorY = 20;

    // the root of the editing experience is creating a (shared) tile map

    enum CursorType { Menu, Map };

    export class MapEditor extends BackgroundBase {
        private world: Image;
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
            this.world = p.getWorld();
            // cursors
            this.selected = sprites.create(cursorOut);
            this.selected.x = 32 + 8;
            this.selected.y = 8 + yoff;
            this.userSpriteIndex = 0;
            this.cursor = sprites.create(cursorIn);
            this.cursor.x = 8
            this.cursor.y = 8 + yoff;

            this.paintCursor = sprites.create(paintCursor)
            this.paintCursor.x = paintSize * 5 + 2
            this.paintCursor.y = editorY + 2;

            this.offsetX = this.offsetY = 0;

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
                    this.setCursor(CursorType.Map);
                }
            });
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
                if (this.paintCursor.x < paintSize*20)
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
                if (this.paintCursor.y < editorY + 2 + paintSize * 15)
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

        private cursorAction(repeated: boolean = false) {
            if (!this.aDown)
                return;
            if (this.cursorType == CursorType.Map) {
                let col = ((this.paintCursor.x - 2) / paintSize) | 0x0;
                let row = ((this.paintCursor.y - (editorY + 2)) / paintSize) | 0x0;
                this.world.setPixel(col, row, this.userSpriteIndex);
                this.update();
                return;
            }
            if (repeated)
                return;
            if (this.row() == 0 && 2 <= this.col() && this.col() < 2+this.p.all().length ) {
                // change user sprite
                this.userSpriteIndex = this.col()-2;
                this.updateSelection();
            }
            this.update();
        }

        private pushIt() {
            this.p.saveWorld();
            game.pushScene();
            this.aDown = false;
        }

        private col(current: boolean = true) {
            return this.cursor.x >> 4;
        }
        
        private row(current: boolean = true) {
            return (this.cursor.y - yoff) >> 4;
        }

        private drawImage(img: Image, col: number, row: number) {
            screen.drawTransparentImage(img, col << 4, (row << 4)+yoff);
        }

        public update() {
            screen.fill(0);
            screen.fillRect(0, yoff, 16, 16, 11);
            this.drawImage(map, 0, 0);
            this.p.all().forEach((img, index) => { 
                this.drawImage(img, 2+index, 0); 
            });
            for(let x = this.offsetX; x<this.offsetX+20; x++) {
                for (let y = this.offsetY; y < this.offsetY + 15; y++) {
                    let index = 0 <= x && x < this.world.width && 0 <= y && y < this.world.height ? this.world.getPixel(x,y) : -1;
                    let col = x - this.offsetX;
                    let row = y - this.offsetY;
                    let nx = col * paintSize;
                    let ny = editorY + row * paintSize;
                    screen.fillRect(nx, ny, paintSize - 1, paintSize - 1, index == -1 ? 0 : index+1);
                }    
            }
            screen.drawLine(0, yoff + 16, 159, yoff+16, 11)
        }
    } 
 }