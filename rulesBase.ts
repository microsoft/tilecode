module tileworld {

    export const yoff = 6;

    export class BackgroundBase {
        constructor() {
            game.onPaint(function () {
                this.update();
            })
        }
        protected update(): void { 0; }
    }

    export class RuleVisualsBase extends BackgroundBase {
        protected cursor: Sprite;
        protected tileSaved: Sprite;      // remember the tile that we are editing
        protected helpCursor: Sprite;

        // rule type state
        protected ruleTypeMap: Image;      // mapping of tile to rule type
        protected dirMap: Image;          // mapping of tile to direction

        constructor(protected p: Project) {
            super();
            
            this.ruleTypeMap = image.create(10, 7);
            this.dirMap = image.create(10, 7);
            this.ruleTypeMap.fill(0xf);
            this.dirMap.fill(0xf);
            
            this.cursor = sprites.create(cursorIn);
            this.cursor.x = 24;
            this.cursor.y = yoff + 40;
            utilities.cursorAnimation(this.cursor, cursorOut);

            this.helpCursor = sprites.create(cursorIn);
            this.helpCursor.setFlag(SpriteFlag.Invisible, true);
            this.tileSaved = sprites.create(cursorOut);
            this.tileSaved.setFlag(SpriteFlag.Invisible, true);

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => this.moveInX(MoveDirection.Left) );
            controller.left.onEvent(ControllerButtonEvent.Repeated, () => this.moveInX(MoveDirection.Left));
            controller.left.onEvent(ControllerButtonEvent.Released, () => {
                if (!this.okToMove()) return;
                this.cursorMove(MoveDirection.Left, false);
            });
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => this.moveInX(MoveDirection.Right));
            controller.right.onEvent(ControllerButtonEvent.Repeated, () => this.moveInX(MoveDirection.Right));
            controller.right.onEvent(ControllerButtonEvent.Released, () => {
                if (!this.okToMove()) return;
                this.cursorMove(MoveDirection.Right, false);
            });
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => this.moveUp());
            controller.up.onEvent(ControllerButtonEvent.Repeated, () => this.moveUp());
            controller.up.onEvent(ControllerButtonEvent.Released, () => {
                if (!this.okToMove()) return;
                this.cursorMove(MoveDirection.Up, false);
            });
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => this.moveDown());
            controller.down.onEvent(ControllerButtonEvent.Repeated, () => this.moveDown());
            controller.down.onEvent(ControllerButtonEvent.Released, () => {
                if (!this.okToMove()) return;
                this.cursorMove(MoveDirection.Down, false);
            });
        }

        private moveInX(dir: MoveDirection) {
            if (!this.okToMove()) return;
            if (dir == MoveDirection.Left && this.col() > 0 ||
                dir == MoveDirection.Right && this.col() < 9)
                this.cursor.x += 16 * moveXdelta(dir);
            this.cursorMove(dir);
        }

        private moveUp() {
            if (!this.okToMove()) return;
            if (this.row() > 0)
                this.cursor.y -= 16;
            this.cursorMove(MoveDirection.Up);
        }

        private moveDown() {
            if (!this.okToMove()) return;
            if (this.row() < 6)
                this.cursor.y += 16;
            this.cursorMove(MoveDirection.Down);
        }

        protected okToMove(): boolean { return true; }

        protected getRulesForTypeDir(rules: RuleView[], rt: RuleType, dir: MoveDirection): RuleView[] {
            return rules.filter(rv => rv.getRuleType() == rt && rv.getDirFromRule() == dir);
        }
      
        protected setCol(col: number): void {
            this.cursor.x = (col << 4) + 8;
        }

        protected setRow(row: number): void {
            this.cursor.y = (row << 4) + 8 + yoff;
        }

        protected col(curr = true): number {
            return curr ? this.cursor.x >> 4 : this.tileSaved.x >> 4;
        }

        protected row(curr = true): number {
            return curr ? (this.cursor.y - yoff) >> 4 : (this.tileSaved.y - yoff) >> 4;
        }

        protected drawImage(c: number, r: number, img: Image): void {
            screen.drawTransparentImage(img, c << 4, yoff + (r << 4));
        }

        protected drawImageAbs(x: number, y: number, img: Image): void {
            screen.drawTransparentImage(img, x, y);
        }

        protected drawOutline(c: number, r: number, col = 12): void {
            screen.drawRect(c << 4, yoff + (r << 4), 17, 17, col);
        }

        protected fillTile(c: number, r: number, col: color): void {
            screen.fillRect((c << 4)+1, yoff + (r << 4) +1, 15, 15, col);
        }

        protected setTileSaved(): void {
            this.tileSaved.x = this.cursor.x;
            this.tileSaved.y = this.cursor.y;
            this.tileSaved.z = 100;
            this.tileSaved.setFlag(SpriteFlag.Invisible, false);
        }

        protected isTileSaved(): boolean {
            return !(this.tileSaved.flags & SpriteFlag.Invisible);
        }

        protected cursorMove(dir: MoveDirection, pressed = true): void { 0; }
    }
}