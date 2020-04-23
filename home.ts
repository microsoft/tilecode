namespace tileworld {

    const helpString = "00map,10paint,20code,30play,90settings,";  // 40debug,50music
    const commandImages = [map, paint, code, play];

    export class GameHome extends RuleVisualsBase {
        constructor(p: Project) {
            super(p);

            this.setCol(0);
            this.setRow(0);

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                let index = this.dirMap.getPixel(this.col(), this.row())
                if (index != 0xf) {
                    game.pushScene();
                    new Gallery(this.p, index,
                                new SwitchExport(this.p, this.row() == 3), 
                                this.row() == 3 ? galleryTiles : gallerySprites )
                    return;
                }
                if (this.row()>0)
                    return;
                let command = commandImages[this.col()];
                if (command == play) {
                    let rules = this.p.getRules();
                    if (rules.length > 0) {
                        game.pushScene();
                        let g = new RunGame(this.p, rules);
                        g.setWorld(this.p.getWorldBackgrounds(), this.p.getWorldSprites());
                        g.start();
                    }
                } else if (command == map) {
                    game.pushScene();
                    new MapEditor(this.p);
                } else if (command == paint) {
                    game.pushScene();
                    new ImageEditor(new AllExport(this.p));
                } else if (command == code) {
                    game.pushScene();
                    new ruleediting.RuleRoom(this.p);
                } else if (this.col() == 9 && this.row() == 0) {
                    game.pushScene();
                    new ProjectSettings(this.p);
                } /* else if (command == debug) {
                    game.pushScene();
                    new Debugger(this.p);
                } else if (command == music) {
                    game.pushScene();
                    new Music(this.p);
                } */
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            });
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean = true) { 
            if(this.p.help) {
                this.helpCursor.x = this.col() < 7 ? this.cursor.x + 8 : this.cursor.x-16;
                this.helpCursor.y = this.cursor.y + 32;
                let index = this.dirMap.getPixel(this.col(), this.row())
                if (this.row() < 1) {
                    let message = getHelp(helpString, this.col(), this.row());
                    this.helpCursor.say(message);
                } else if (index != 0xf) {
                    this.helpCursor.say("A: gallery");
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
            commandImages.forEach((img,i) => {
                this.drawImage(i, 0, img);
            });
            this.drawImage(9, 0, settingsIcon);

            screen.print("Backgrounds", 16, yoff + 32 + 6);
            this.p.backgroundImages().forEach((img,i) => {
                this.drawImage(1+(i<<1), 3, img);
                this.dirMap.setPixel(1+(i<<1), 3, i)
            });
            screen.print("Sprites", 16, yoff + 64 + 6);
            this.p.spriteImages().forEach((img, i) => {
                this.drawImage(1 + (i << 1), 5, img);
                this.dirMap.setPixel(1 + (i << 1), 5, i)
            });
        }

    }
}