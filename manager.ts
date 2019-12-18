namespace tileworld {

    // consistent management of (user-defined) images for fixed and movable sprites
    export class ImageManager {
        private allImages: Image[];
        private emptyImage: Image;
        private player: number;
        constructor(private fixedImages: Image[], private movableImages: Image[], public defaultTile: number) {
            this.allImages = [];
            this.player = -1;
            this.fixedImages.forEach(s => { this.allImages.push(s) });
            this.movableImages.forEach(s => { this.allImages.push(s) });
        }

        setPlayer(kind: number) {
            this.player = kind;
        }

        getPlayer() { return this.player }

        getImage(kind: number) {
            return 0<=kind && kind < this.allImages.length ? this.allImages[kind] : null;
        }
        
        getKind(img: Image) {
            return this.allImages.indexOf(img);
        }
        saveImages(prefix: string) {
            this.allImages.forEach(img => {
            
            });
        }

        fixed() { return this.fixedImages; }
        movable() { return this.movableImages; }
        all() { return this.allImages; }
        empty() { return emptyTile; }
    }

}