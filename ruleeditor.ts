/*  TODO: for later...

    class RuleEditor {
        private currentMap: Image;
        constructor(private fixed: Sprite[], private movable: Sprite[]) {
                this.currentMap = editorMap.clone();
                scene.setTileMap(this.currentMap)
                scene.setTile(9, tile);
                let tiles = scene.getTilesByType(5)
                for (let value of tiles) {
                    let foo = sprites.create(genericSprite, SpriteKind.Food)
                    value.place(foo)
                }
                this.currentMap.fill(0)
                this.makeContext(3, 3)
            }
        private  makeContext(row: number, col: number) {
            for (let i = -2; i <= 2; i++) {
                this.currentMap.setPixel(col + i, row, 9);
                this.currentMap.setPixel(col, row + i, 9);
                if (i > -2 && i < 2) {
                    this.currentMap.setPixel(col + i, row + i, 9);
                    this.currentMap.setPixel(col + i, row - i, 9);
                }
            }
        }
    }
*/