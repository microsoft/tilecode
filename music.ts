namespace tileworld {

    export class Music extends RuleVisualsBase {
        constructor(p: Project) {
            super(p);
            this.setCol(0); this.setRow(0);
            
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
 
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            });
        }

        protected update() {
            screen.fill(0);
            screen.fillRect(0, yoff, 16, 16, 11);
            screen.drawTransparentImage(music, 0, yoff);
            screen.print("music not available", 16, 32 + yoff + 6);
        }
    }
} 