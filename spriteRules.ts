// TODO: need a room to show the rules associated with a sprite
// Issues:
// - how to distinguish rules from one another???
// - ruletype + direction, + witness command
// - also 

namespace tileworld {

    const yoff = 6;

    export class RuleRoom extends RuleVisualsBase {
        constructor(m: ImageManager) {
            super(m);
            this.background = image.create(160, 120)
            scene.setBackgroundImage(this.background) 
            this.showRuleMenu(1, 0);
        }

        // menu as in map
        // cursor
        // empty vs populated rules???
        // resting   1
        // moving    4
        // pushing   4
        // colliding 4

        centerImage() {
            return this.manager.getImage(3);

            // return this.manager.getImage(getKinds(this.rule)[0]);
        }

        drawImage(c: number, r: number, img: Image) {
            this.background.drawTransparentImage(img, c << 4, (r << 4) + yoff);
        }

        drawImageAbs(x: number, y: number, img: Image) {
            this.background.drawTransparentImage(img, x, y);
        }

        private makeContext(col: number, row: number) {
            let spaceImg = this.manager.empty();
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    //let dist = Math.abs(j) + Math.abs(i);
                    //if (dist <= 1) {
                        // TODO: limit the context base on the rule type
                        this.drawImage(col+i, row+j, spaceImg);
                    //}
                }
            }
        }

        private showRuleMenu(x: number, y: number) {
            this.makeContext(x + 2, y + 1)
            this.showRuleType(RuleType.Resting, 0, x + 2, y + 1);

            this.makeContext(x + 6, y + 1)
            this.showRuleType(RuleType.Moving, MoveDirection.Right, x + 7, y + 1);
            this.showRuleType(RuleType.Moving, MoveDirection.Left, x + 5, y + 1);
            this.showRuleType(RuleType.Moving, MoveDirection.Up, x + 6, y);
            this.showRuleType(RuleType.Moving, MoveDirection.Down, x+6, y+2);

            this.makeContext(x + 2, y + 5)
            this.showRuleType(RuleType.Colliding, MoveDirection.Right, x + 2, y+5);
            this.showRuleType(RuleType.Colliding, MoveDirection.Left, x + 2, y + 5, false);
            this.showRuleType(RuleType.Colliding, MoveDirection.Up, x + 2, y + 5, false);
            this.showRuleType(RuleType.Colliding, MoveDirection.Down, x + 2, y + 5, false);
            this.showRuleType(RuleType.Resting, 0, x + 2, y + 5);

            this.makeContext(x + 6, y + 5)
            this.showRuleType(RuleType.Pushing, MoveDirection.Right, x + 8, y + 5, false);
            this.showRuleType(RuleType.Pushing, MoveDirection.Left, x + 4, y + 5, false);
            this.showRuleType(RuleType.Pushing, MoveDirection.Down, x + 6, y + 7, false);
            this.showRuleType(RuleType.Pushing, MoveDirection.Up, x + 6, y + 3, false);
        }

    }

}