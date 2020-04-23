namespace tileworld.ruleediting {

    const transformMap = [ RuleTransforms.None, RuleTransforms.HorzMirror, RuleTransforms.VertMirror, 
                           RuleTransforms.LeftRotate, RuleTransforms.RightRotate, RuleTransforms.Rotate3Way];
    const transformImages = [ transformedRule, flipHoriz, flipVert, leftRotate, rightRotate, rotate3way];

    export class RuleViewDisplay extends RuleDisplay {
        private ruleViews: RuleView[];
        constructor(p: Project, private baseRule: RuleView) {
            super(p, baseRule);
            this.setCol(0); this.setRow(0);
            this.ruleViews = this.baseRule.getDerivedRules();
            
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.row() == 0 && this.col() >=1 && this.col() <= 6) {
                    this.baseRule.setTransforms(transformMap[this.col()-1]);
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
                if (this.col() == index+1) {
                    this.rule = this.ruleViews[0];
                } else if (this.ruleViews.length > 1 && this.col() > 6 && this.col() <= 8) {
                    this.rule = this.ruleViews[this.col()-6];
                }
            }
            this.update();
        }

        protected update() {
            super.update();
            // menu options
            transformImages.forEach((img, i) => {
                this.drawImage(i+1, 0, img);
            });
            // which one selected
            let index = transformMap.indexOf(this.baseRule.getTransforms());
            this.drawImage(1 + index, 0, cursorOut);
            // resulting rules
            let col = index+1;        
            this.ruleViews.forEach((rv, index) => {
                this.drawImage(col+index, 1, transformedRule);
            });
        }
    }
}