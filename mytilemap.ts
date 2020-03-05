
namespace scene {

    export function setTileMap(map: Image, scale = TileScale.Sixteen) {
        const scene = game.currentScene();
        if (!scene.tileMap || !(scene.tileMap as tiles.legacy.LegacyTilemap).isLegacy) {
            scene.tileMap = new tiles.legacy.LegacyTilemap();
        }
        (scene.tileMap as tiles.legacy.LegacyTilemap).setMap(map);
        scene.tileMap.scale = scale;
    }

    export function setTile(index: number, img: Image, wall?: boolean) {
        const scene = game.currentScene();
        if (!scene.tileMap || !(scene.tileMap as tiles.legacy.LegacyTilemap).isLegacy) {
            scene.tileMap = new tiles.legacy.LegacyTilemap();
        }
        (scene.tileMap as tiles.legacy.LegacyTilemap).setTile(index, img, !!wall);
    }

    function getTilesByType(index: number): tiles.Tile[] {
        const scene = game.currentScene();
        if (!scene.tileMap || !(scene.tileMap as tiles.legacy.LegacyTilemap).isLegacy) {
            scene.tileMap = new tiles.legacy.LegacyTilemap();
        }
        return (scene.tileMap as tiles.legacy.LegacyTilemap).getTilesByTypeLegacy(index);
    }

    export function placeOnRandomTile(sprite: Sprite, color: number): void {
        if (!sprite || !game.currentScene().tileMap) return;
        const tiles = getTilesByType(color);
        if (tiles.length > 0)
            Math.pickRandom(tiles).place(sprite);
    }
}

namespace tiles.legacy {
    class TileSet {
        obstacle: boolean;
        private map: TileMap;
        private originalImage: Image;
        private cachedImage: Image;

        constructor(image: Image, collisions: boolean, map: tiles.TileMap) {
            this.originalImage = image;
            this.obstacle = collisions;
            this.map = map;
        }

        get image(): Image {
            const size = 1 << this.map.scale;
            if (!this.cachedImage || this.cachedImage.width != size || this.cachedImage.height != size) {
                if (this.originalImage.width == size && this.originalImage.height == size) {
                    this.cachedImage = this.originalImage;
                } else {
                    this.cachedImage = image.create(size, size);
                    this.cachedImage.drawImage(this.originalImage, 0, 0);
                }
            }
            return this.cachedImage;
        }
    }

    export class LegacyTilemap extends tiles.TileMap {
        private _mapImage: Image;
        private _tileSets: TileSet[];

        public isLegacy: boolean;

        constructor(scale: TileScale = TileScale.Sixteen) {
            super(scale);
            this._tileSets = [];
            this.isLegacy = true;
        }

        get data(): TileMapData {
            return null;
        }

        get image(): Image {
            return this._mapImage;
        }

        offsetX(value: number) {
            return Math.clamp(0, Math.max(this.areaWidth() - screen.width, 0), value);
        }

        offsetY(value: number) {
            return Math.clamp(0, Math.max(this.areaHeight() - screen.height, 0), value);
        }

        areaWidth() {
            return this._mapImage ? (this._mapImage.width << this.scale) : 0;
        }

        areaHeight() {
            return this._mapImage ? (this._mapImage.height << this.scale) : 0;
        }

        get layer(): number {
            return this._layer;
        }

        set layer(value: number) {
            if (this._layer != value) {
                this._layer = value;
            }
        }

        get enabled(): boolean {
            return !!this._mapImage;
        }

        setTile(index: number, img: Image, collisions?: boolean) {
            if (this.isInvalidIndex(index)) return;
            this._tileSets[index] = new TileSet(img, collisions, this);
        }

        setMap(map: Image) {
            this._mapImage = map;
        }

        public getTileLegacy(col: number, row: number): Tile {
            return new Tile(col, row, this);
        }

        public getTile(col: number, row: number): Location {
            return new Location(col, row, this);
        }

        public setTileAt(col: number, row: number, index: number): void {
            if (!this.isOutsideMap(col, row) && !this.isInvalidIndex(index))
                this._mapImage.setPixel(col, row, index);
        }

        public getTilesByType(index: number): Location[] {
            if (this.isInvalidIndex(index) || !this.enabled) return [];

            let output: Location[] = [];
            for (let col = 0; col < this._mapImage.width; ++col) {
                for (let row = 0; row < this._mapImage.height; ++row) {
                    let currTile = this._mapImage.getPixel(col, row);
                    if (currTile === index) {
                        output.push(new Location(col, row, this));
                    }
                }
            }
            return output;
        }

        public getTilesByTypeLegacy(index: number): Tile[] {
            if (this.isInvalidIndex(index) || !this.enabled) return [];

            let output: Tile[] = [];
            for (let col = 0; col < this._mapImage.width; ++col) {
                for (let row = 0; row < this._mapImage.height; ++row) {
                    let currTile = this._mapImage.getPixel(col, row);
                    if (currTile === index) {
                        output.push(new Tile(col, row, this));
                    }
                }
            }
            return output;
        }

        private generateTile(index: number): TileSet {
            const size = 1 << this.scale

            const i = image.create(size, size);
            i.fill(index);
            return this._tileSets[index] = new TileSet(i, false, this);
        }

        private isOutsideMap(col: number, row: number): boolean {
            return !this.enabled || col < 0 || col >= this._mapImage.width
                || row < 0 || row >= this._mapImage.height;
        }

        protected isInvalidIndex(index: number): boolean {
            return index < 0 || index > 0xf;
        }

        protected draw(target: Image, camera: scene.Camera) {
            if (!this.enabled) return;

            // render tile map
            const bitmask = (0x1 << this.scale) - 1;
            const offsetX = camera.drawOffsetX & bitmask;
            const offsetY = camera.drawOffsetY & bitmask;

            const x0 = Math.max(0, camera.drawOffsetX >> this.scale);
            const xn = Math.min(this._mapImage.width, ((camera.drawOffsetX + target.width) >> this.scale) + 1);
            const y0 = Math.max(0, camera.drawOffsetY >> this.scale);
            const yn = Math.min(this._mapImage.height, ((camera.drawOffsetY + target.height) >> this.scale) + 1);

            for (let x = x0; x <= xn; ++x) {
                for (let y = y0; y <= yn; ++y) {
                    const index = this._mapImage.getPixel(x, y);
                    const tile = this._tileSets[index] || this.generateTile(index);
                    if (tile) {
                        target.drawTransparentImage(
                            tile.image,
                            ((x - x0) << this.scale) - offsetX,
                            ((y - y0) << this.scale) - offsetY
                        );
                    }
                }
            }

            if (game.debug) {
                // render debug grid overlay
                for (let x = x0; x <= xn; ++x) {
                    const xLine = ((x - x0) << this.scale) - offsetX;
                    if (xLine >= 0 && xLine <= screen.width) {
                        target.drawLine(
                            xLine,
                            0,
                            xLine,
                            target.height,
                            1
                        );
                    }
                }

                for (let y = y0; y <= yn; ++y) {
                    const yLine = ((y - y0) << this.scale) - offsetY;
                    if (yLine >= 0 && yLine <= screen.height) {
                        target.drawLine(
                            0,
                            yLine,
                            target.width,
                            yLine,
                            1
                        );
                    }
                }
            }
        }

        public isObstacle(col: number, row: number) {
            if (!this.enabled) return false;
            if (this.isOutsideMap(col, row)) return true;

            let t = this._tileSets[this._mapImage.getPixel(col, row)];
            return t && t.obstacle;
        }

        public getObstacle(col: number, row: number) {
            const index = this.isOutsideMap(col, row) ? 0 : this._mapImage.getPixel(col, row);
            const tile = this._tileSets[index] || this.generateTile(index);
            return new sprites.StaticObstacle(
                tile.image,
                row << this.scale,
                col << this.scale,
                this.layer,
                index
            );
        }

        public isOnWall(s: Sprite) {
            const hbox = s._hitbox

            const left = Fx.toIntShifted(hbox.left, this.scale);
            const right = Fx.toIntShifted(hbox.right, this.scale);
            const top = Fx.toIntShifted(hbox.top, this.scale);
            const bottom = Fx.toIntShifted(hbox.bottom, this.scale);

            for (let col = left; col <= right; ++col) {
                for (let row = top; row <= bottom; ++row) {
                    if (this.isObstacle(col, row)) {
                        return true;
                    }
                }
            }

            return false;
        }

        public getTileIndex(col: number, row: number) {
            return this._mapImage.getPixel(col, row);
        }

        public getTileImage(index: number) {
            if (!this._tileSets[index]) this.generateTile(index);
            return this._tileSets[index].image;
        }
    }
}