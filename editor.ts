namespace tileworld {

    const yoff = 4;


    const tileSprite = "03tile#1,13tile#2,04tile#3,14tile#4,05sprite#1,15sprite#2,06sprite#3,16sprite#4,";

    // the root of the editing experience is creating a (shared) tile map
    export class MapEditor extends BackgroundBase {
        private world: Image;
        private offsetX: number; // where are we in the world?
        private offsetY: number; 
        private cursor: Sprite;
        private selected: Sprite;
        private userSpriteIndex: number;
        private aDown: boolean;
        private helpOn: boolean;
        private helpCursor: Sprite;
        constructor(private p: Project) {
            super();
            this.aDown = false;
            this.world = p.getWorld();
            // cursors
            this.selected = sprites.create(cursorOut);
            this.selected.x = 16 + 8;
            this.selected.y = 8 + yoff;
            this.userSpriteIndex = 0;
            this.cursor = sprites.create(cursorIn);
            this.cursor.x = 8
            this.cursor.y = 8 + yoff;
            this.helpCursor = sprites.create(cursorIn);
            this.helpCursor.setFlag(SpriteFlag.Invisible, true);

            this.offsetX = this.offsetY = 0;
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
                this.p.saveWorld();
                game.popScene();
            });
        }

        private moveLeft() {
            if (this.col() > 0)
                this.cursor.x -= 16
            else {
                this.offsetX -= 1;
                this.update();
            }
            this.cursorAction(true);
        }

        private moveRight() {
            if (this.col() < 9)
                this.cursor.x += 16
            else {
                this.offsetX += 1;
                this.update();
            }
            this.cursorAction(true);
        }

        private moveUp() {
            if(this.row() > 0)
                this.cursor.y -= 16
            else {
                this.offsetY -= 1;
                this.update();
            }
            this.cursorAction(true);
        }

        private moveDown() {
            if (this.row() < 6)
                this.cursor.y += 16
            else {
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
            if (this.helpOn) {
                this.helpCursor.x = this.cursor.x + 40;
                this.helpCursor.y = this.cursor.y + 16;
                if (this.row() < 1) {
                    let message = getHelp(tileSprite, this.col(), this.row());
                    this.helpCursor.say(message);
                } else {
                    let x = this.offsetX + this.col() - 2;
                    let y = this.offsetY + this.row();
                    if (x >=0 && y >= 0 && x < this.p.getWorld().width && y < this.p.getWorld().height)
                        this.helpCursor.say("map("+x.toString()+","+y.toString()+")");
                    else
                        this.helpCursor.say(null);
                }
            }
            if (!this.aDown)
                return;
            if (this.row() > 0) {
                if (this.userSpriteIndex >= 0) {
                    let x = this.offsetX + this.col() - 2;
                    let y = this.offsetY + this.row();
                    this.world.setPixel(x, y, this.userSpriteIndex);
                    this.update();
                }
                return;
            }
            if (repeated)
                return;
            if (this.row() == 0 && 1 <= this.col() && this.col() <= this.p.all().length ) {
                // change user sprite
                this.userSpriteIndex = this.col()-1;
                this.updateSelection();
            }
            this.update();
        }

        private pushIt() {
            this.p.saveWorld();
            game.pushScene();
            this.aDown = false;
            this.helpOn = false;
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
            if (!this.helpOn) {
                this.helpCursor.say(null);
                this.cursor.say(null);
            }
            screen.fill(0);
            this.drawImage(map, 0, 0);
            this.p.all().forEach((img, index) => { 
                this.drawImage(img, 1+index, 0); 
            });
            for(let x = this.offsetX; x<this.offsetX+10; x++) {
                for (let y = this.offsetY; y < this.offsetY + 6; y++) {
                    let index = 0 <= x && x < this.world.width && 0 <= y && y < this.world.height ? this.world.getPixel(x,y) : -1;
                    let col = x - this.offsetX;
                    let row = 1 + (y - this.offsetY);
                    this.drawImage(index >= 0 ? this.p.getImage(index) : emptyTile, col, row);
                }    
            }
            screen.drawLine(0, yoff + 16, 159, yoff+16, 11)
        }
    } 
 }