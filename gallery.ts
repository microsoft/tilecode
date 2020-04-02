namespace tileworld {

    const cat = img`
        . . . . . . . . . . . . . . . .
        . e e e . . . . e e e . . . . .
        . c d d c . . c d d c . . . . .
        . c b d d f f d d b c . . . . .
        . c 3 b d d b d b 3 c . . . . .
        . f b 3 d d d d 3 b f . . . . .
        . e d d d d d d d d e . . . . .
        . e d f d d d d f d e . b f b .
        . f d d f d d f d d f . f d f .
        . f b d d b b d d 2 f . f d f .
        . . f 2 2 2 2 2 2 b b f f d f .
        . . f b d d d d d d b b d b f .
        . . f d d d d d b d d f f f . .
        . . f d f f f d f f d f . . . .
        . . f f . . f f . . f f . . . .
        . . . . . . . . . . . . . . . .
    `;
    const fish = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . c c c c . . . .
        . . . . . . c c d d d d c . . .
        . . . . . c c c c c c d c . . .
        . . . . c c 4 4 4 4 d c c . . .
        . . . c 4 d 4 4 4 4 4 1 c . c c
        . . c 4 4 4 1 4 4 4 4 d 1 c 4 c
        . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c
        f 4 4 4 4 4 1 4 4 4 4 4 1 4 4 f
        f 4 4 4 f 4 1 c c 4 4 4 1 f 4 f
        f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f
        . f 4 4 4 4 1 c 4 f 4 d f f f f
        . . f f 4 d 4 4 f f 4 c f c . .
        . . . . f f 4 4 4 4 c d b c . .
        . . . . . . f f f f d d d c . .
        . . . . . . . . . . c c c . . .
    `;
    const dog = img`
        . . . . . . . . . . . . . . . .
        . . 4 4 4 . . . . 4 4 4 . . . .
        . 4 5 5 5 e . . e 5 5 5 4 . . .
        4 5 5 5 5 5 e e 5 5 5 5 5 4 . .
        4 5 5 4 4 5 5 5 5 4 4 5 5 4 . .
        e 5 4 4 5 5 5 5 5 5 4 4 5 e . .
        . e e 5 5 5 5 5 5 5 5 e e . . .
        . . e 5 f 5 5 5 5 f 5 e . . . f
        . . f 5 5 5 4 4 5 5 5 f . . f f
        . . f 4 5 5 f f 5 5 6 f . f 5 f
        . . . f 6 6 6 6 6 6 4 4 f 5 5 .
        . . . f 4 5 5 5 5 5 5 4 4 5 f .
        . . . f 5 5 5 5 5 4 5 5 f f . .
        . . . f 5 f f f 5 f f 5 f . . .
        . . . f f . . f f . . f f . . .
        . . . . . . . . . . . . . . . .
    `;
    const chimp = img`
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f . . . . . .
        . . f d d d d e e e f . . . . .
        . c d f d d f d e e f f . . . .
        . c d f d d f d e e d d f . . .
        c d e e d d d d e e b d c . . .
        c d d d d c d d e e b d c . f f
        c c c c c d d d e e f c . f e f
        . f d d d d d e e f f . . f e f
        . . f f f f f e e e e f . f e f
        . . . . f e e e e e e e f f e f
        . . . f e f f e f e e e e f f .
        . . . f e f f e f e e e e f . .
        . . . f d b f d b f f e f . . .
        . . . f d d c d d b b d f . . .
        . . . . f f f f f f f f f . . .
    `;
    const player = img`
        . . . . . . f f f f . . . . . .
        . . . . f f f 2 2 f f f . . . .
        . . . f f f 2 3 2 2 f f f . . .
        . . f f f e e e e e e f f f . .
        . . f f e 2 2 2 2 2 2 e e f . .
        . . f e 2 f f f f f f 2 e f . .
        . . f f f f e e e e f f f f . .
        . f f e f b f 4 4 f b f e f f .
        . f e e 4 1 f d d f 1 4 e e f .
        . . f e e d d d d d d e e f . .
        . . . f e e 4 4 4 4 e e f . . .
        . . e 4 f 2 2 2 2 2 2 f 4 e . .
        . . 4 d f 2 2 2 2 2 2 f d 4 . .
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
        . . . . . f f f f f f . . . . .
        . . . . . f f . . f f . . . . .
    `;
    const diamond = img`
        . . . . . . . . . . . . . . . .
        . . . . 8 8 8 8 8 8 8 8 . . . .
        . . . 8 8 8 8 9 9 9 1 1 . . . .
        . . 8 8 8 8 9 9 9 9 1 1 1 1 . .
        . 8 8 8 8 8 8 9 9 1 1 1 1 1 1 .
        . 8 8 8 8 8 8 8 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 .
        . 9 9 9 9 9 9 9 1 1 1 1 1 1 1 .
        . 9 9 9 9 9 9 9 1 1 1 1 1 1 1 .
        . . 9 9 9 9 9 9 1 1 1 1 1 1 . .
        . . . 9 9 9 9 9 1 1 1 1 1 . . .
        . . . . 9 9 9 9 1 1 1 1 . . . .
        . . . . . 9 9 9 1 1 1 . . . . .
        . . . . . . 9 9 1 1 . . . . . .
        . . . . . . . 9 1 . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    const boulder = img`
        . . . . . c c b b b . . . . . .
        . . . . c b d d d d b . . . . .
        . . . . c d d d d d d b b . . .
        . . . . c d d d d d d d d b . .
        . . . c b b d d d d d d d b . .
        . . . c b b d d d d d d d b . .
        . c c c c b b b b d d d b b b .
        . c d d b c b b b b b b b b d b
        c b b d d d b b b b b d d b d b
        c c b b d d d d d d d b b b d c
        c b c c c b b b b b b b d d c c
        c c b b c c c c b d d d b c c b
        . c c c c c c c c c c c b b b b
        . . c c c c c b b b b b b b c .
        . . . . . . c c b b b b c c . .
        . . . . . . . . c c c c . . . .
    `;
    const enemy = img`
        . . . . . . . f f f f . . . . .
        . . . . . f f 1 1 1 1 f f . . .
        . . . . f b 1 1 1 1 1 1 b f . .
        . . . . f 1 1 1 1 1 1 1 1 f . .
        . . . f d 1 1 1 1 1 1 1 1 d f .
        . 7 . f d 1 1 1 1 1 1 1 1 d f .
        7 . . f d 1 1 1 1 1 1 1 1 d f .
        7 . . f d 1 1 1 1 1 1 1 1 d f .
        7 . . f d d d 1 1 1 1 d d d f f
        7 7 . f b d b f d d f b d b f c
        7 7 7 f c d c f 1 1 f c d c f b
        . 7 7 f f f b d b 1 b d f f c f
        . f c b 1 b c f f f f f f . . .
        . f 1 c 1 c 1 f f f f f f . . .
        . f d f d f d f f f f f . . . .
        . . f . f . f . . . . . . . . .
    `;
    const brick = img`
        b d d d d d d c b d d d d d d c
        d b b b b b b c d b b b b b b c
        d b b b b b b c d b b b b b b c
        d b b b b b b c d b b b b b b c
        d b b b b b b c d b b b b b b c
        d b b b b b b c d b b b b b b c
        d b b b b b b b d b b b b b b b
        c c c c c c b a c c c c c c b a
        b d d d d d d c b d d d d d d c
        d b b b b b b c d b b b b b b c
        d b b b b b b c d b b b b b b c
        d b b b b b b c d b b b b b b c
        d b b b b b b c d b b b b b b c
        d b b b b b b c d b b b b b b c
        d b b b b b b b d b b b b b b b
        c c c c c c b a b c c c c c c a
    `;
    const grass = img`
        5 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 5 7 7 7 7 7 7 7 7 7 7
        7 7 7 5 7 5 5 7 7 7 7 7 5 7 7 7
        7 7 6 5 5 7 5 7 5 5 7 7 7 7 7 7
        7 7 7 6 5 7 7 5 5 6 7 7 7 7 7 7
        7 7 7 7 6 7 7 5 6 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 5 5 7 7 7
        7 7 7 7 7 7 7 7 7 7 5 5 6 7 7 7
        7 7 7 7 7 7 7 7 5 5 7 6 7 7 7 7
        7 7 7 7 7 7 7 7 7 5 5 7 7 7 7 7
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 5
        7 7 5 7 7 7 7 7 7 7 7 7 7 7 7 5
    `;
    const water = img`
        7 6 7 6 6 6 6 6 6 6 6 6 6 6 6 6
        6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
        6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
        6 6 6 6 6 7 6 6 6 6 6 6 6 6 6 6
        6 6 6 7 6 7 7 6 6 6 6 6 7 6 6 6
        6 6 8 7 7 6 7 6 7 7 6 6 6 6 6 6
        6 6 6 8 7 6 6 7 7 8 6 6 6 6 6 6
        6 6 6 6 8 6 6 7 8 6 6 6 6 6 6 6
        6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
        6 6 7 6 6 6 6 6 6 6 6 6 6 6 6 6
        6 6 6 6 6 6 6 6 6 6 6 7 7 6 6 6
        6 6 6 6 6 6 6 6 6 6 7 7 8 6 6 6
        6 6 6 6 6 6 6 6 7 7 6 8 6 6 6 6
        6 6 6 6 6 6 6 6 6 7 7 6 6 6 6 6
        6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 7
        6 6 7 6 6 6 6 6 6 6 6 6 6 6 6 7
    `;
    const dirt2 = img`
        d d d d d d d d d d d d d d d d
        d d d 1 1 d d d d d d d d b d d
        d d d 1 1 d d d d d d d d d d d
        d d d d d d d d d d d d d d d d
        d d b d d d d d d b b d d d d d
        d d d d d d d d d b b d d d d d
        d d d d d d d d d d d d d d d d
        d d d d d d d d d d d d d d d d
        d d d d d b d d d d d d d d d d
        d d d d d d d d d d d d d d d d
        d d d d d d d d d d d d d d d d
        1 1 d d d d d d d d d d d d d d
        1 1 d d d d d d d d d d b d d d
        d d d d d d 1 d d d d d d d d d
        d d d d d d d d d d d d d d d d
        d d d d d d d d d d d d d d b d
    `;
    const wall = img`
        d d d d d d d d d d d d d d d 8
        d 6 6 6 8 8 8 6 6 6 6 6 6 6 8 8
        d 6 6 8 6 6 6 8 6 6 6 6 6 6 8 8
        d 6 8 6 8 8 8 6 8 8 8 8 8 8 8 8
        d 8 6 8 8 d 8 8 6 6 6 6 6 6 8 8
        d 8 6 8 d d d 8 6 8 8 8 8 8 6 8
        d 8 6 8 8 d 8 8 6 6 6 6 6 6 8 8
        d 6 8 6 8 8 8 6 8 8 8 8 8 8 8 8
        d 6 6 6 6 6 6 6 6 8 6 6 6 6 8 8
        d 8 8 8 6 6 6 6 6 8 8 6 6 8 6 8
        d 6 6 6 6 6 6 6 6 8 8 8 8 8 6 8
        d 8 8 8 6 6 6 6 6 6 6 6 6 6 6 8
        d 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8
        d 8 8 8 8 6 6 6 6 8 8 8 8 8 6 8
        d 6 6 6 6 6 6 6 8 8 6 6 6 8 6 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    `;
    const wall2 = img`
        c c c c c c c c c c c c c c c 8
        c b b b 8 8 8 b b b b b b b 8 8
        c b b 8 b b b 8 b b b b b b 8 8
        c b 8 b 8 8 8 b 8 8 8 8 8 8 8 8
        c 8 b 8 8 6 8 8 b b b b b b 8 8
        c 8 b 8 6 6 6 8 b 8 8 8 8 8 b 8
        c 8 b 8 8 6 8 8 b b b b b b 8 8
        c b 8 b 8 8 8 b 8 8 8 8 8 8 8 8
        c b b b b b b b b 8 b b b b 8 8
        c 8 8 8 b b b b b 8 8 b b 8 b 8
        c b b b b b b b b 8 8 8 8 8 b 8
        c 8 8 8 b b b b b b b b b b b 8
        c b b b b b b b b b b b b b b 8
        c 8 8 8 8 b b b b 8 8 8 8 8 b 8
        c b b b b b b b 8 8 b b b 8 b 8
        8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    `;
    const dirt = img`
        f e e e e e f e e e e 4 4 4 4 e
        e e 4 4 e e e f f f e e e e e e
        e 4 4 4 4 4 e e f f f f f e e e
        e 4 4 4 4 4 4 e f e e e e e f e
        e 4 4 4 4 4 4 e f e 4 4 4 4 e f
        e e 4 4 4 4 4 f e 4 4 4 4 4 4 e
        e e e 4 4 4 e e e 4 4 4 4 4 4 e
        f f e e e e e f e 4 4 4 4 4 4 e
        f e e e 4 4 4 e f e 4 4 4 4 e e
        f e e 4 4 4 4 4 e e e e 4 4 e f
        e e 4 4 4 4 4 4 4 e f e e e e f
        f e 4 4 4 4 4 4 4 e e f f f e e
        f e 4 4 4 4 4 4 4 e f e e e e f
        e f e 4 4 4 4 4 e f e 4 4 e e e
        e e f e 4 4 4 e f e 4 4 4 4 e e
        f e e f e e e f e 4 4 4 4 4 4 e
    `;
    const space = img`
        f f f f f f f f f f f c c c c f
        f f c c f f f f f f f f f f f f
        f c c c c c f f f f f f f f f f
        f c c c c c c f f f f f f f f f
        f c c c c c c f f f c c c c f f
        f f c c c c c f f c c c c c c f
        f f f c c c f f f c c c c c c f
        f f f f f f f f f c c c c c c f
        f f f f c c c f f f c c c c f f
        f f f c c c c c f f f f c c f f
        f f c c c c c c c f f f f f f f
        f f c c c c c c c f f f f f f f
        f f c c c c c c c f f f f f f f
        f f f c c c c c f f f c c f f f
        f f f f c c c f f f c c c c f f
        f f f f f f f f f c c c c c c f
    `;

    // up to 15 max
    export const galleryPlayers = [player, cat, dog, chimp];
    export const gallerySprites = [fish, cat, dog, chimp, player, diamond, boulder, enemy, trophyUp, debug, eat ];
    export const galleryTiles = [brick, grass, water, dirt, dirt2, space, wall];

/*
    export const galleryPlayers: Image[] = [];
    export const gallerySprites: Image[] = [];
    export const galleryTiles: Image[] = [];
*/
    export class Gallery extends RuleVisualsBase {
        private current: Image;
        private newImage: Image;
        constructor(p: Project, private kind: number, 
                    private wrapper: SwitchExport,
                    private gallery: Image[]) {
            super(p);
            this.current = this.wrapper.getImage(kind).clone();
            this.newImage = this.current.clone();
            this.setCol(2); this.setRow(1);
            this.setTileSaved();
            this.setCol(0); this.setRow(0);

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                let isCurrent = this.col() == 2 && this.row() == 1 ;
                let index = this.dirMap.getPixel(this.col(), this.row());
                if (isCurrent || index != 0xf) {
                    this.setTileSaved();
                    let img = this.gallery[index];
                    this.newImage.copyFrom(isCurrent ? this.current : img);
                }
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                this.wrapper.getImage(this.kind).copyFrom(this.newImage);
                this.wrapper.saveImage(this.kind);
                game.popScene();
            });
        }

        protected update() {
            this.dirMap.fill(0xf);
            screen.fill(0);
            screen.print("Gallery", 0, yoff);
            this.drawImage(0, 1, this.newImage);
            this.drawImage(2, 1, this.current);
            let col = 4;
            let row = 1;
            this.gallery.forEach((img,i) => {
                this.drawImage(col, row, img);
                this.dirMap.setPixel(col, row, i);
                col += 2;
                if (col == 10) { col = 2; row +=2; }
            });
        }
    }

}