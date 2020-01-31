namespace tileworld {

    // this file for game settings
    // - help
    // - world size
    // - etc.

    export class ProjectSettings extends RuleVisualsBase {
        constructor(p: Project) {
            super(p);

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.col() == 3 && this.row() == 1)
                    this.p.help = !this.p.help;
                this.update();
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            });
        }

        protected update() {
            screen.fill(0);
            screen.fillRect(0, yoff, 16, 16, 11);
            screen.drawTransparentImage(settingsIcon, 0, yoff);
            screen.print("Help", 16, 16 + yoff + 6);
            this.drawImage(3, 1, emptyTile);
            this.drawImage(3, 1, this.p.help ? collisionRestingSprite : genericSprite);
        }
    }
} 