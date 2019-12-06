namespace tileWorldEditor {

    // TODO: base class for tile-based editors
    // - drawing
    // - cursor and selected items
    // - wiring from view back to controller
    // - modes: painting, menus

    const yoff = 4;

    // the root of the editing experience is creating a (shared) tile map
    export class MapEditor {
        private world: Image;
        private offsetX: number; // where are we in the world?
        private offsetY: number; 
        private screen: Image;   // the 160x120 display
        private cursor: Sprite;
        private selected: Sprite;
        private userSpriteIndex: number;
        constructor(private manager: SpriteManager, defaultTile: Sprite) {
            this.manager.setScene()
            // this is the world
            this.world = image.create(30, 30);
            this.world.fill(defaultTile.kind());
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
                // commands
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
            this.screen.fill(12);
            this.screen.fillRect(32, yoff, 160-32, 16*7, 11);
            // this.screen.fillRect(0, 0, 0, 0, 12)
            // paint it ourselves 
            this.manager.all().forEach((s, row) => {
                this.drawImage(s.image, 1, row);
            });
            commandImages.forEach((img, row) => {
                this.drawImage(img, 0, row);
            })
            for(let x = this.offsetX; x<this.offsetX+8; x++) {
                for (let y = this.offsetY; y < this.offsetY + 7; y++) {
                    let index = 0 <= x && x < this.world.width && 0 <= y && y < this.world.height ? this.world.getPixel(x,y) : -1;
                    this.drawImage(index >= 0 ? this.manager.all()[index].image : emptyTile, 
                        2+(x-this.offsetX), (y-this.offsetY));
                }    
            }
        }

        private executeCommand(command: string, s: Sprite) {
            game.pushScene();
            if (command == "Paint") {
                let spriteEditor = new ImageEditor(this.manager, s)
            } else {
                // let ruleEditor = new RuleEditor(this.manager, s)
            }
        }
    } 
 }