// Add your code here
namespace tileworld {

    // ------------------------------------------------------------------------------------
    // a simple (but not complete) way to change the transforms on a rule

    const transformMap = [ RuleTransforms.None, RuleTransforms.HorzMirror, RuleTransforms.VertMirror, RuleTransforms.Rotate3Way];
    const transformCol = [ 1, 3, 5, 7];

    export class RuleViewDisplay extends RuleDisplay {
        private ruleViews: RuleView[];
        constructor(p: Project, private baseRule: RuleView) {
            super(p, baseRule);
            this.setCol(0); this.setRow(0);
            this.ruleViews = this.baseRule.getDerivedRules();
            
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() == 0 && this.col() >=1 && this.col() <= 7) {
                    let index = (this.col()-1) >> 1;
                    this.baseRule.setTransforms(transformMap[index]);
                    this.ruleViews = this.baseRule.getDerivedRules();
                }
            });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                this.p.saveRule(this.baseRule);
                game.popScene();
                return;
            });
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean) {
            super.cursorMove(dir, pressed);
            this.cursorToView()
            this.update();
        }

        private cursorToView() {
            let t = this.baseRule.getTransforms();
            this.rule = this.baseRule;
            if (this.row() == 1 && t != RuleTransforms.None && this.ruleViews.length > 0) {
                let index = transformMap.indexOf(t);
                let col = transformCol[index];
                if (this.col() == col) {
                    this.rule = this.ruleViews[0];
                } else if (this.col() >= 7) {
                    this.rule = this.ruleViews[this.col()-7];
                }
            }
            this.update();
        }

        protected update() {
            super.update();
            // menu options
            this.drawImage(1, 0, yellowSprite);
            this.drawImage(3, 0, flipHoriz);
            this.drawImage(5, 0, flipVert);
            this.drawImage(7, 0, rotate3way);
            // which one selected
            let index = transformMap.indexOf(this.baseRule.getTransforms());
            this.drawImage(1 + (index << 1), 0, cursorOut);
            // resulting rules
            let col = transformCol[index];        
            this.ruleViews.forEach((rv, index) => {
                this.drawImage(col+index, 1, yellowSprite);
            });
        }
    }
}