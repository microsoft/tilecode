namespace tileworld {

    export const yoff = 6;

    export class BackgroundBase {
        constructor() {
            game.onPaint(function () {
                this.update();
            })
        }
        public update() {

        }
    }

    export class RuleVisualsBase extends BackgroundBase {
        protected cursor: Sprite;
        protected tileSaved: Sprite;      // remember the tile that we are editing

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

            this.tileSaved = sprites.create(cursorOut);
            this.tileSaved.setFlag(SpriteFlag.Invisible, true);

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if (!this.okToMove()) return;
                if (this.col() > 0)
                    this.cursor.x -= 16;
                this.cursorMove(MoveDirection.Left);
            });
            controller.left.onEvent(ControllerButtonEvent.Released, () => {
                if (!this.okToMove()) return;
                this.cursorMove(MoveDirection.Left, false);
            });
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if (!this.okToMove()) return;
                if (this.col() < 9)
                    this.cursor.x += 16;
                this.cursorMove(MoveDirection.Right);
            });
            controller.right.onEvent(ControllerButtonEvent.Released, () => {
                if (!this.okToMove()) return;
                this.cursorMove(MoveDirection.Right, false);
            });
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if (!this.okToMove()) return;
                if (this.row() > 0)
                    this.cursor.y -= 16;
                this.cursorMove(MoveDirection.Up);
            });
            controller.up.onEvent(ControllerButtonEvent.Released, () => {
                if (!this.okToMove()) return;
                this.cursorMove(MoveDirection.Up, false);
            });
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if (!this.okToMove()) return;
                if (this.row() < 6)
                    this.cursor.y += 16;
                this.cursorMove(MoveDirection.Down);
            });
            controller.down.onEvent(ControllerButtonEvent.Released, () => {
                if (!this.okToMove()) return;
                this.cursorMove(MoveDirection.Down, false);
            });
        }

        protected okToMove() { return true; }

        protected getRulesForTypeDir(rules: number[], rt: RuleType, dir: MoveDirection) {
            return rules.filter(rid => this.p.getType(rid) == rt && (rt == RuleType.Resting || this.p.getDir(rid) == dir));
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
                    this.drawImage(x + ax, y + ay, handImages[rd])
                } else {
                    this.showCollision(x - ax, y - ay, rd, moveImages[rd]);
                }
            }
        }

        protected showCollision(col: number, row: number, dir: MoveDirection, arrowImg: Image) {
            this.drawImage(col, row, collisionSprite);
            let x = (dir == MoveDirection.Left) ? 7 : (dir == MoveDirection.Right) ? -7 : 0;
            let y = (dir == MoveDirection.Up) ? 7 : (dir == MoveDirection.Down) ? -7 : 0;
            this.drawImageAbs((col << 4) + x, (row << 4) + yoff + y, arrowImg);
        }

        protected attrIndex(rid: number, whendo: number, a: AttrType, begin: number = 0) {
            for (let i = begin; i < this.p.all().length; i++) {
                if (this.p.getAttr(rid, whendo, i) == a)
                    return i;
            }
            return -1;
        }

        protected showAttributes(rid: number, col: number, row: number) {
            let whendo = this.p.getWhenDo(rid, col, row);
            if (whendo >= 0) {
                // if there is an include or single oneOf, show it.
                let index = this.attrIndex(rid, whendo, AttrType.Include);
                if (index == -1) {
                    index = this.attrIndex(rid, whendo, AttrType.OneOf);
                    if (index != -1) {
                        let index2 = this.attrIndex(rid, whendo, AttrType.OneOf, index + 1);
                        if (index2 != -1)
                            index = -1;
                    }
                }
                // and skip to the other (if it exists)
                let begin = 0;
                let end = this.p.all().length - 1;
                if (index != -1) {
                    this.drawImage(col, row, this.p.getImage(index));
                    if (index < this.p.fixed().length) {
                        begin = this.p.fixed().length;
                    } else {
                        end = this.p.fixed().length - 1;
                    }
                }
                let project = this.projectAttrs(rid, whendo, begin, end);
                let done: AttrType[] = [];
                project.forEach(index => {
                    let val = this.p.getAttr(rid, whendo, index);
                    // eliminate duplicates
                    if (done.indexOf(val) == -1) {
                        done.push(val);
                        // TODO: draw each one, without overlap, four quadrants
                        this.drawImage(col, row, attrImages[attrValues.indexOf(val)]);
                    }
                });
            }
        }

        private projectAttrs(rid: number, whendo: number, begin: number, end: number): number[] {
            let attrCnt = (a: AttrType) => {
                let cnt = 0;
                for (let i = begin; i <= end; i++) {
                    if (this.p.getAttr(rid, whendo, i) == a) cnt++;
                }
                return cnt;
            }
            let res: number[] = [];
            let excludeCnt = attrCnt(AttrType.Exclude);
            let okCnt = attrCnt(AttrType.OK);
            let cnt = end - begin + 1;
            if (okCnt == this.p.all().length || excludeCnt == cnt || (begin == 0 && okCnt == cnt))
                return res;
            let remove = (okCnt != 0 && excludeCnt != 0) ?
                ((excludeCnt < okCnt) ? AttrType.OK : AttrType.Exclude) : -1;
            for (let i = begin; i <= end; i++) {
                if (this.p.getAttr(rid, whendo, i) != remove) res.push(i);
            }
            return res;
        }
    }
}