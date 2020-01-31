
namespace tileworld {

    // menu bar

    const helpString = "00map,10paint,20code,30play,40debug,50music,60settings,"
    
    export class GameHome extends RuleVisualsBase {
        constructor(p: Project) {
            super(p);

            this.setCol(0);
            this.setRow(0);

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                let index = this.dirMap.getPixel(this.col(), this.row())
                if (index != 0xf) {
                    game.pushScene();
                    new Gallery(this.p, index)
                    return;
                }
                if (this.row()>0)
                    return;
                let command = commandImages[this.col()];
                if (command == map) {
                    game.pushScene();
                    new MapEditor(this.p);
                    return;
                } else if (command == paint) {
                    game.pushScene();
                    new ImageEditor(this.p);
                    return;
                } else if (command == code) {
                    game.pushScene();
                    new RuleRoom(this.p);
                    return;
                } else if (command == play) {
                    let rules = this.p.getRuleIds();
                    if (rules.length > 0) {
                        game.pushScene();
                        let g = new RunGame(this.p, rules);
                        g.setWorld(this.p.getWorld());
                        g.start();
                        return;
                    }
                } else if (command == settingsIcon) {
                    game.pushScene();
                    new ProjectSettings(this.p);
                    return;
                }
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            });
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean = true) { 
            if(this.p.help) {
                this.helpCursor.x = this.cursor.x + 8;
                this.helpCursor.y = this.cursor.y + 32;
                let index = this.dirMap.getPixel(this.col(), this.row())
                if (this.row() < 1) {
                    let message = getHelp(helpString, this.col(), this.row());
                    this.helpCursor.say(message);
                } else if (index != 0xf) {
                    this.helpCursor.say("A for gallery");
                } else {
                    this.helpCursor.say(null);
                }
            } 
        }
        
        protected update() {
            if (!this.p.help) {
                this.helpCursor.say(null);
            }
            screen.fill(0);
            this.dirMap.fill(0xf);
            commandImages.forEach((img, i) => {
                this.drawImage(i, 0, img);
            });
            screen.print("Tiles", 16, yoff + 32 + 6);
            this.p.fixed().forEach((img,i) => {
                this.drawImage(2+(i<<1), 3, img);
                this.dirMap.setPixel(2+(i<<1), 3, i)
            });
            screen.print("Sprites", 16, yoff + 64 + 6);
            this.p.movable().forEach((img, i) => {
                this.drawImage(2 + (i << 1), 5, img);
                this.dirMap.setPixel(2 + (i << 1), 5, this.p.fixed().length + i)
            });
        }

    }
}