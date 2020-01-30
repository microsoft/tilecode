namespace tileworld {

    const yoff = 4;

    const helpString = "00paint,10code,01play,11debug,02music,12help,03tile#1,13tile#2,04tile#3,14tile#4,05sprite#1,15sprite#2,06sprite#3,16sprite#4,";
    const zeroCode = "0".charCodeAt(0);

    function getHelp(col:number, row: number) {
        let index = 0;
        while(index >=0 && index < helpString.length) {
            let curr = index;
            let nextCol =  helpString.substr(curr,1).charCodeAt(0) - zeroCode;
            let nextRow = helpString.substr(curr + 1, 1).charCodeAt(0) - zeroCode;
            let comma = helpString.indexOf(",", index);
            if (nextCol == col && nextRow == row)
                return helpString.substr(curr+2, comma-curr-2);
            index = comma + 1;            
        }
        return null;
    }

    // the root of the editing experience is creating a (shared) tile map
    export class MapEditor extends BackgroundBase {
        private world: Image;
        private offsetX: number; // where are we in the world?
        private offsetY: number; 
        private cursor: Sprite;
        private selected: Sprite;
        private userSpriteIndex: number;
        private menu: Image;
        private aDown: boolean;
        private helpOn: boolean;
        private helpCursor: Sprite;
        constructor(private p: Project) {
            super();
            this.aDown = false;
            this.helpOn = false;
            this.world = p.getWorld();
            this.menu = image.create(2, 7);
            // cursors
            this.selected = sprites.create(cursorOut);
            this.selected.x = 8;
            this.selected.y = 48 + 8 + yoff;
            this.userSpriteIndex = 0;
            this.cursor = sprites.create(cursorIn);
            this.cursor.x = 40
            this.cursor.y = 56 + yoff;
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
                if (this.col() < 2) {
                    let message = getHelp(this.col(), this.row());
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
            if (this.col() > 1) {
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
            let menuItem = this.menu.getPixel(this.col(), this.row());
            if (this.row() > 2 && 0 <= menuItem && menuItem < this.p.all().length ) {
                // change user sprite
                this.userSpriteIndex = menuItem;
                this.updateSelection();
            } else {
               let command = commandImages[menuItem];
               if (command == paint) {
                    this.pushIt();
                    new ImageEditor(this.p, this.userSpriteIndex);
                    return;
                } else if (command == pencil) {
                    this.pushIt();
                    new RuleRoom(this.p, this.userSpriteIndex);
                    return;
                } else if (command == play) {
                    let rules = this.p.getRuleIds();
                    if (rules.length > 0) {
                        this.pushIt();
                        let g = new RunGame(this.p, rules);
                        g.setWorld(this.world);
                        g.start();
                        return;
                    }         
                } else if (command == help) {
                    this.helpOn = !this.helpOn;
                    this.cursor.say("?")
                }
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
            this.menu.fill(0xf);
            let x = 0;
            let y = 0;
            commandImages.forEach((img, index) => {
                this.drawImage(img, x, y);
                this.menu.setPixel(x, y, index);
                x++;
                if (x == 2) { x = 0; y++; }
            })
            x = 0; y = 3;
            this.p.fixed().forEach((img, index) => { 
                this.drawImage(img, x, y); 
                this.menu.setPixel(x, y, index);
                x++;
                if (x == 2) { x = 0; y++; }
            });
            x = 0; y = 5;
            this.p.movable().forEach((img, index) => {
                this.drawImage(img, x, y);
                this.menu.setPixel(x, y, this.p.fixed().length + index);
                x++;
                if (x == 2) { x = 0; y++; }
            });

            for(let x = this.offsetX; x<this.offsetX+8; x++) {
                for (let y = this.offsetY; y < this.offsetY + 7; y++) {
                    let index = 0 <= x && x < this.world.width && 0 <= y && y < this.world.height ? this.world.getPixel(x,y) : -1;
                    let col = 2 + (x - this.offsetX);
                    let row = (y - this.offsetY);
                    this.drawImage(index >= 0 ? this.p.getImage(index) : emptyTile, col, row);
                }    
            }
            screen.drawLine(32, yoff, 32, 119, 11)
        }
    } 
 }