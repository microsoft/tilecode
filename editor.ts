namespace tileworld {

    // TODO: base class for tile-based editors
    // - drawing
    // - cursor and selected items
    // - wiring from view back to controller
    // - modes: painting, menus

    const yoff = 4;

    // TODO: grey out edit option for fixed tiles
    // TODO: some indication of motion of the world when scrolling
    // TODO: painting of tiles and sprites separately
    // TODO: zoom-out (to 8x8 tiles rather than 16x16) and zoom-in
    // the root of the editing experience is creating a (shared) tile map
    export class MapEditor {
        private world: Image;
        private offsetX: number; // where are we in the world?
        private offsetY: number; 
        private screen: Image;   // the 160x120 display
        private cursor: Sprite;
        private selected: Sprite;
        private userSpriteIndex: number;
        constructor(private manager: ImageManager) {
            // this is the world
            this.world = image.create(30, 30);
            this.world.fill(manager.defaultTile);
            // this is the screen (under our control)
            this.screen = image.create(160, 120);
            let empty = this.manager.empty()
            scene.setBackgroundImage(this.screen)
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
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.col() < 9)
                    this.cursor.x += 16
                else {
                    this.offsetX += 1;
                    this.update();
                }
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() > 0)
                    this.cursor.y -= 16
                else {
                    this.offsetY -= 1;
                    this.update();
                }
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() < 6)
                    this.cursor.y += 16
                else {
                    this.offsetY += 1;
                    this.update();
                }
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                this.cursorAction();
                this.update();
            })
            game.addScenePopHandler(() => {
                this.update();
            })
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
                    this.update();
                } else if (this.row() == 1) {
                    // paint
                    game.pushScene();
                    let spriteEditor = new ImageEditor(this.manager, this.userSpriteIndex);
                } else if (this.row() == 2) {
                    // rule editor
                    // collect up all the rules for this.userSpriteIndex;
                    let rules = getRulesForKind(this.userSpriteIndex);
                    if (rules.length > 0) {
                        game.pushScene();
                        let ruleEditor = new RuleEditor(this.manager, rules);
                    }
                } else if (this.row() == 3) {
                    let rules = getRulesForKind(this.userSpriteIndex);
                    if (rules.length > 0) {
                        game.pushScene();
                        let vm = new TileWorldVM(this.manager, rules);
                        vm.setWorld(this.world);
                        vm.start();
                    }         
                }
            } else {
                if (this.userSpriteIndex >= 0) {
                    let x = this.offsetX + this.col() - 2;
                    let y = this.offsetY + this.row();
                    this.world.setPixel(x,y,this.userSpriteIndex);
                }
            }
        }

        private col(current: boolean = true) {
            return this.cursor.x >> 4;
        }
        private row(current: boolean = true) {
            return (this.cursor.y - yoff) >> 4;
        }

        private drawImage(img: Image, col: number, row: number) {
            this.screen.drawTransparentImage(img, col << 4, (row << 4)+yoff);
        }

        private update() {
            this.screen.fill(0);
            this.screen.fillRect(0, yoff, 16, 16, 11);
            this.manager.all().forEach((img, row) => {
                this.drawImage(img, 1, row);
            });
            let rules = getRulesForKind(this.userSpriteIndex);
            commandImages.forEach((img, row) => {
                this.drawImage(row == 2 ? (rules.length > 0 ? img : greyImage(img) ) : img, 0, row);
            })
            for(let x = this.offsetX; x<this.offsetX+8; x++) {
                for (let y = this.offsetY; y < this.offsetY + 7; y++) {
                    let index = 0 <= x && x < this.world.width && 0 <= y && y < this.world.height ? this.world.getPixel(x,y) : -1;
                    let col = 2 + (x - this.offsetX);
                    let row = (y - this.offsetY);
                    if (index >= 0)
                        this.drawImage(this.manager.getImage(this.manager.defaultTile), col, row)
                    this.drawImage(index >= 0 ? this.manager.getImage(index) : emptyTile, 
                        col, row);
                }    
            }
            this.screen.drawLine(32, yoff, 32, 119, 11)
        }
    } 
 }