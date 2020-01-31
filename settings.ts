namespace tileworld {

    // this file for game settings
    // - help
    // - world size
    // - etc.

    export class ProjectSettings extends RuleVisualsBase {
        constructor(p: Project) {
            super(p);

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {

            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {

            });
        }

        protected update() {

        }
    }
} 