namespace tileworld {

    // TODO
    // - world size
    export class ProjectSettings extends RuleVisualsBase {
        private askDeleteRule: boolean = false;
        constructor(p: Project) {
            super(p);
            this.setCol(0); this.setRow(0);
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.askDeleteRule) {
                    if (this.p) {
                        let keys = settings.list(this.p.prefix);
                        keys.forEach(k => { settings.remove(k)});
                        // need an extra pop scene to return to load screen
                        game.popScene();
                    } else {
                        settings.clear();
                    }
                    game.popScene();
                } else if (this.p) {
                    if (this.col() == 3 && this.row() == 1) {
                        this.p.help = !this.p.help;
                        this.p.saveHelp();
                    } else if (this.col() == 4 && this.row() ==5) {
                        loadProject(this.p.prefix, true);
                    } if (this.col() == 4 && this.row() ==6) {
                        this.askDeleteRule = true;
                    } 
                } else {
                    if (this.col() == 7 && this.row() == 2) {
                        this.askDeleteRule = true;
                        return;
                    }
                }
                this.update();
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.askDeleteRule) {
                    this.askDeleteRule = false;
                } else {
                    game.popScene();
                }
            });
        }

        protected update() {
            screen.fill(0);
            screen.fillRect(0, yoff, 16, 16, 11);
            screen.drawTransparentImage(settingsIcon, 0, yoff);
            if (this.p) {
                screen.print("Help", 16, 16 + yoff + 6);
                this.drawImage(3, 1, emptyTile);
                this.drawImage(3, 1, this.p.help ? collisionSprite : genericSprite);

                let worldY = 32 + yoff + 6;
                screen.print("World", 16, worldY);
                screen.print(this.p.getWorldBackgrounds().width.toString(), 64, worldY);
                screen.print("by", 96, worldY);
                screen.print(this.p.getWorldBackgrounds().height.toString(), 128, worldY);
                screen.print(this.p.version, 120, yoff);
                screen.print("Export", 16, 92);
                this.drawImage(4, 5, diskIcon);
                screen.print("Delete", 16, 108);
                this.drawImage(4, 6, garbageCan);
            } else {
                screen.print("App Version " + TileWorldVersion, 16, 16 + yoff + 6)
                screen.print("Delete ALL games", 16, 32 + yoff + 6);
                this.drawImage(7, 2, garbageCan);
            }
            if (this.askDeleteRule) {
                this.cursor.setFlag(SpriteFlag.Invisible, true)
                game.showDialog(this.p ? "OK to delete game?" : "OK to delete ALL games?", "", "A = OK, B = CANCEL");
            } else {
                this.cursor.setFlag(SpriteFlag.Invisible, false);
            }
        }
    }
} 