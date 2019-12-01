namespace tileWorldEditor {

    // consistent management of (user-defined) sprite kinds and names
    export class SpriteManager {
        private allSprites: Sprite[];
        private emptySprite: Sprite;
        constructor(private fixedSprites: Sprite[],
            private movableSprites: Sprite[]) {

            this.fixedSprites.forEach((s, index) => { s.setKind(index) })
            this.movableSprites.forEach((s, index) => {
                s.setKind(index + this.fixedSprites.length)
            })
            this.allSprites = [];
            this.fixedSprites.forEach(s => { this.allSprites.push(s) })
            this.movableSprites.forEach(s => { this.allSprites.push(s) })

            this.emptySprite = sprites.create(emptyTile, this.allSprites.length())
            this.emptySprite.data = "Empty"
            this.emptySprite.setFlag(SpriteFlag.Invisible, true)
        }

        setScene() {
            this.fixedSprites.forEach(s => { scene.setTile(s.kind(), s.image) })
            this.movableSprites.forEach(s => { scene.setTile(s.kind(), s.image) })
        }

        findName(name: string) {
            let s = this.fixedSprites.find(s => s.data == name)
            if (!s) s = this.movableSprites.find(s => s.data == name)
            return s;
        }

        findKind(kind: number) {
            let s = this.fixedSprites.find(s => s.kind() == kind)
            if (!s) s = this.movableSprites.find(s => s.kind() == kind)
            return s;
        }

        fixed() { return this.fixedSprites; }
        movable() { return this.movableSprites; }
        all() { return this.allSprites; }
        empty() { return this.emptySprite; }
    }

}