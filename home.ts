
namespace tileworld {

    // menu bar

    const helpString = "00paint,10code,01play,11debug,02music,12help,"
    
    export class GameHome extends RuleVisualsBase {
        constructor(p: Project) {
            super(p);

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
                }
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            });
        }

        protected update() {
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