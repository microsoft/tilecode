namespace tileworld {

    // consistent management of (user-defined) images for fixed and movable sprites
    export class ImageManager {
        private allImages: Image[];
        private emptyImage: Image;
        constructor(private fixedImages: Image[], private movableImages: Image[]) {
            this.allImages = [];
            this.fixedImages.forEach(s => { this.allImages.push(s) })
            this.movableImages.forEach(s => { this.allImages.push(s) })
        }

        getImage(kind: number) {
            return 0<=kind && kind < this.allImages.length ? this.allImages[kind] : null;
        }
        
        getKind(img: Image) {
            return this.allImages.indexOf(img);
        }

        fixed() { return this.fixedImages; }
        movable() { return this.movableImages; }
        all() { return this.allImages; }
        empty() { return emptyTile; }
    }

}