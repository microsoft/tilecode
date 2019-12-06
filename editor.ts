namespace tileWorldEditor {

    const yoff = 4;

    // the root of the editing experience is creating a (shared) tile map
    export class MapEditor {
        private world: Image;
        private screen: Image;
        private cursor: Sprite;
        private currentTileSprite: Sprite;
        private menuSelected: Sprite;
        private offsetX: number; // where are we in the world?
        private offsetY: number; 
        private tileCnt: number;
        constructor(private manager: SpriteManager, defaultTile: Sprite) {
            // this is the world
            this.world = image.create(30, 30);
            this.world.fill(defaultTile.kind());
            // this is the screen (under our control)
            this.screen = image.create(160, 120);
            let empty = this.manager.empty()
            scene.setBackgroundImage(this.screen)
            this.manager.setScene()
            this.update();

            // the color code of selected tile/sprite
            this.currentTileSprite = undefined;
            // cursor
            this.cursor = sprites.create(cursorIn)
            this.cursor.x = 40
            this.cursor.y = 56 + yoff;

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.col() > 0)
                    this.cursor.x -= 16
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.col() < 9)
                    this.cursor.x += 16
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() > 0)
                    this.cursor.y -= 16
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() < 6)
                    this.cursor.y += 16
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (!this.currentTileSprite)
                    return;
                let row = this.row();
                let col = this.col();
                if (row >= 0 && row < this.world.height && col >= 0 && col < this.world.width) {
                    this.world.setPixel(col, row, this.currentTileSprite.kind())
                }
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
               
            })
        }

        private col() {
            return this.cursor.x >> 4;
        }
        private row() {
            return (this.cursor.y - yoff) >> 4;
        }

        private drawImage(img: Image, col: number, row: number) {
            this.screen.drawTransparentImage(img, col << 4, (row << 4)+yoff);
        }

        private update() {
            this.screen.fill(12);
            this.screen.fillRect(48, yoff, 160-48, 16*7, 11);

            // this.screen.fillRect(0, 0, 0, 0, 12)
            // paint it ourselves 
            this.manager.all().forEach((s, row) => {
                this.drawImage(s.image, 1, row);
            });
            // arrows
            arrowImages.forEach((img, row) => {
                this.drawImage(img, 2, row);
            });
            commandImages.forEach((img, row) => {
                this.drawImage(img, 0, row);
            })
        }

        private executeCommand(command: string, s: Sprite) {
            game.pushScene();
            if (command == "Paint") {
                let spriteEditor = new ImageEditor(this.manager, s)
            } else {
                // let ruleEditor = new RuleEditor(this.manager, s)
            }
        }

        private closeMenu(command: string) {
            if (command) {
                // look up name of sprite and get code
                let  s = this.manager.findName(command)
                if (s) {
                    this.currentTileSprite = s;
                } else if (command == "Paint" || command == "Program") {
                    if (this.currentTileSprite && this.currentTileSprite.data != "Empty")
                        this.executeCommand(command, this.currentTileSprite)
                    else {
                        let row = this.cursor.y >> 4
                        let col = this.cursor.x >> 4
                        let s = this.manager.findKind(this.world.getPixel(col, row))
                        if (s.data != "Empty")
                            this.executeCommand(command, s)
                    }
                }
            }
        }
    } 
 }