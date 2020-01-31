// Add your code here

// debugger for a rule
// - use neighborhood to generate a tile map

namespace tileworld {
        // - attaches to VM
        // - shows state of sprites (old arrows; new arrows)
        // - the three phases: moving, resting, colliding
        // - allows user to select a sprite and see enabled rules (or debugger will choose)
        // - allows the user to choose which rule goes next (step)

    export class Debugger extends RuleVisualsBase {
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
            screen.drawTransparentImage(debug, 0, yoff);
            screen.print("debugger not available", 16, 32 + yoff + 6);
        }
    }

    export class UnitTest {

        private map: Image;

        constructor(private p: Project, private rid:number) {
            // for starters, we'll just keep things local
            this.map = image.create(10,7);
        }

        public makeTest() {
            // generate satisfying assignment to tiles
            // run the VM
        }

        private generateSATassignment() {
            // given the rule and constraints, create tile map
        }
    }

    export class InteractionTest {
        // explore interactions between two (or more) rules
    }
}