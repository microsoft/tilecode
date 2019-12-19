namespace tileworld {

    const yoff = 4;

    // the root of the editing experience is creating a (shared) tile map
    export class MapEditor extends BackgroundBase {
        private world: Image;
        private offsetX: number; // where are we in the world?
        private offsetY: number; 
        private cursor: Sprite;
        private selected: Sprite;
        private userSpriteIndex: number;
        constructor(private p: Project) {
            super();
            // this is the world
            this.world = p.getWorld();
            // cursors
            this.selected = sprites.create(cursorOut);
            this.selected.x = 24;
            this.selected.y = 8 + yoff;
            this.userSpriteIndex = 0;
            this.cursor = sprites.create(cursorIn);
            this.cursor.x = 40
            this.cursor.y = 56 + yoff;

            this.offsetX = this.offsetY = 0;
            this.update();

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.col() > 0)
                    this.cursor.x -= 16
                else {
                    this.offsetX -= 1;
                    this.update();
                }
            });
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.col() < 9)
                    this.cursor.x += 16
                else {
                    this.offsetX += 1;
                    this.update();
                }
            });
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() > 0)
                    this.cursor.y -= 16
                else {
                    this.offsetY -= 1;
                    this.update();
                }
            });
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() < 6)
                    this.cursor.y += 16
                else {
                    this.offsetY += 1;
                    this.update();
                }
            });
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                this.cursorAction();
            });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                this.p.saveWorld();
                game.popScene();
            });
        }

        private updateSelection() {
            this.selected.x = this.cursor.x;
            this.selected.y = this.cursor.y;
        }

        private cursorAction() {
            if (this.col() == 1) {
                // change user sprite
                this.userSpriteIndex = this.row();
                this.updateSelection();
            } else if (this.col() == 0) {
                if (this.row() == 0) {
                    // map icon brings us to home in world
                    this.offsetX = 0;
                    this.offsetY = 0;
                } else if (this.row() == 1) {
                    // paint
                    this.p.saveWorld();
                    game.pushScene();
                    new ImageEditor(this.p, this.userSpriteIndex);
                    return;
                } else if (this.row() == 2 && this.userSpriteIndex >= this.p.fixed().length) {
                    this.p.saveWorld();
                    game.pushScene();
                    new RuleRoom(this.p, this.userSpriteIndex);
                    return;
                } else if (this.row() == 3) {
                    let rules = this.p.getRuleIds();
                    if (rules.length > 0) {
                        this.p.saveWorld();
                        game.pushScene();
                        let g = new RunGame(this.p, rules);
                        g.setWorld(this.world);
                        g.start();
                        return;
                    }         
                }
            } else {
                if (this.userSpriteIndex >= 0) {
                    let x = this.offsetX + this.col() - 2;
                    let y = this.offsetY + this.row();
                    this.world.setPixel(x,y,this.userSpriteIndex);
                }
            }
            this.update();
        }

        private col(current: boolean = true) {
            return this.cursor.x >> 4;
        }
        
        private row(current: boolean = true) {
            return (this.cursor.y - yoff) >> 4;
        }

        private drawImage(img: Image, col: number, row: number) {
            background.drawTransparentImage(img, col << 4, (row << 4)+yoff);
        }

        public update() {
            background.fill(0);
            background.fillRect(0, yoff, 16, 16, 11);
            this.p.all().forEach((img, row) => {
                this.drawImage(img, 1, row);
            });
            commandImages.forEach((img, row) => {
                this.drawImage(row == 2 ? (this.userSpriteIndex >= this.p.fixed().length ? img : greyImage(img) ) : img, 0, row);
            })
            for(let x = this.offsetX; x<this.offsetX+8; x++) {
                for (let y = this.offsetY; y < this.offsetY + 7; y++) {
                    let index = 0 <= x && x < this.world.width && 0 <= y && y < this.world.height ? this.world.getPixel(x,y) : -1;
                    let col = 2 + (x - this.offsetX);
                    let row = (y - this.offsetY);
                    this.drawImage(index >= 0 ? this.p.getImage(index) : emptyTile, col, row);
                }    
            }
            background.drawLine(32, yoff, 32, 119, 11)
        }
    } 
 }