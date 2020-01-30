
namespace tileworld {

    // menu bar

    
    export class GameHome extends RuleVisualsBase {
        constructor(p: Project) {
            super(p);

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
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
                }
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            });
        }

        protected update() {
            screen.fill(0);
            commandImages.forEach((img, i) => {
                this.drawImage(i, 0, img);
            });
        }

    }
}