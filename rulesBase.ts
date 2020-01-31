namespace tileworld {

    export const yoff = 6;

    export class BackgroundBase {
        constructor() {
            game.onPaint(function () {
                this.update();
            })
        }
        protected update() {

        }
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
            this.cursor.setFlag(SpriteFlag.Invisible, false);
            this.cursor.x = 24;
            this.cursor.y = yoff + 40;
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

        protected okToMove() { return true; }

        protected getRulesForTypeDir(rules: number[], rt: RuleType, dir: MoveDirection) {
            return rules.filter(rid => this.p.getType(rid) == rt && (rt == RuleType.Resting || this.p.getDir(rid) == dir));
        }
        
        protected setCol(col: number) {
            this.cursor.x = (col << 4) + 8;
        }

        protected setRow(row: number) {
            this.cursor.y = (row << 4) + 8 + yoff;
        }

        protected col(curr: boolean = true) {
            return curr ? this.cursor.x >> 4 : this.tileSaved.x >> 4;
        }

        protected row(curr: boolean = true) {
            return curr ? (this.cursor.y - yoff) >> 4 : (this.tileSaved.y - yoff) >> 4;
        }

        protected drawImage(c: number, r: number, img: Image) {
            screen.drawTransparentImage(img, c << 4, yoff + (r << 4));
        }

        protected drawImageAbs(x: number, y: number, img: Image) {
            screen.drawTransparentImage(img, x, y);
        }

        protected drawOutline(c: number, r: number, col: number = 12) {
            screen.drawRect(c << 4, yoff + (r << 4), 17, 17, col);
        }

        protected fillTile(c: number, r: number, col: color) {
            screen.fillRect(c << 4, yoff + (r << 4), 16, 16, col);
        }

        protected setTileSaved() {
            this.tileSaved.x = this.cursor.x;
            this.tileSaved.y = this.cursor.y;
            this.tileSaved.z = 100;
            this.tileSaved.setFlag(SpriteFlag.Invisible, false);
        }

        protected cursorMove(dir: MoveDirection, pressed: boolean = true) { }
        protected centerImage(): Image { return null; }

        protected showRuleType(rt: RuleType, rd: MoveDirection, x: number, y: number, center: boolean = true) {
            let selCol = 11;
            if (center) this.drawImage(x, y, this.centerImage());
            if (rt == RuleType.Moving) {
                this.drawImage(x, y, moveImages[rd])
            } else if (rt == RuleType.Pushing || rt >= RuleType.CollidingResting) {
                let ax = rd == MoveDirection.Left ? 1 : (rd == MoveDirection.Right ? -1 : 0)
                let ay = rd == MoveDirection.Down ? -1 : (rd == MoveDirection.Up ? 1 : 0)
                if (rt == RuleType.Pushing) {
                    this.drawImage(x + ax, y + ay, buttonImages[rd])
                } else {
                    this.showCollision(x - ax, y - ay, rd, moveImages[rd], rt);
                }
            }
        }

        protected showCollision(col: number, row: number, dir: MoveDirection, arrowImg: Image, rt: RuleType) {
            this.drawImage(col, row, rt == RuleType.CollidingMoving ? collisionMovingSprite : collisionRestingSprite);
            let x = (dir == MoveDirection.Left) ? 7 : (dir == MoveDirection.Right) ? -7 : 0;
            let y = (dir == MoveDirection.Up) ? 7 : (dir == MoveDirection.Down) ? -7 : 0;
            this.drawImageAbs((col << 4) + x, (row << 4) + yoff + y, arrowImg);
        }
    }
}