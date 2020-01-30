// give user access to all the images we have at our disposal

namespace tileworld {
    // sprites from makecode

    const cat = img`
        e e e . . . . e e e . . . .
        c d d c . . c d d c . . . .
        c b d d f f d d b c . . . .
        c 3 b d d b d b 3 c . . . .
        f b 3 d d d d 3 b f . . . .
        e d d d d d d d d e . . . .
        e d f d d d d f d e . b f b
        f d d f d d f d d f . f d f
        f b d d b b d d 2 f . f d f
        . f 2 2 2 2 2 2 b b f f d f
        . f b d d d d d d b b d b f
        . f d d d d d b d d f f f .
        . f d f f f d f f d f . . .
        . f f . . f f . . f f . . .
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
        . . 4 4 4 . . . . 4 4 4 . . . .
        . 4 5 5 5 e . . e 5 5 5 4 . . .
        4 5 5 5 5 5 e e 5 5 5 5 5 4 . .
        4 5 5 4 4 5 5 5 5 4 4 5 5 4 . .
        e 5 4 4 5 5 5 5 5 5 4 4 5 e . .
        . e e 5 5 5 5 5 5 5 5 e e . . .
        . . e 5 f 5 5 5 5 f 5 e . . . .
        . . f 5 5 5 4 4 5 5 5 f . . f f
        . . f 4 5 5 f f 5 5 6 f . f 5 f
        . . . f 6 6 6 6 6 6 4 4 f 5 5 f
        . . . f 4 5 5 5 5 5 5 4 4 5 f .
        . . . f 5 5 5 5 5 4 5 5 f f . .
        . . . f 5 f f f 5 f f 5 f . . .
        . . . f f . . f f . . f f . . .
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
    const dirt = img`
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

    // up to 15 max
    const gallery = [cat, fish, dog, chimp, brick, grass, water, dirt, trophyUp, debug, eat, garbageCan, stopSign ];

    export class Gallery extends RuleVisualsBase {
        constructor(p: Project) {
            super(p);

            this.setCol(2); this.setRow(0);
            this.setTileSaved();
            this.setCol(0); this.setRow(0);

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.dirMap.getPixel(this.col(), this.row()) != 0xf) {
                    this.setTileSaved();
                }
            });
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                game.popScene();
            });

        }

        protected update() {
            screen.fill(12);
            screen.fillRect(0, 0, 32, 120, 0)
            screen.fillRect(0, yoff, 16, 16, 11);
            screen.drawTransparentImage(paint, 0, yoff);
            let row = 0;
            let col = 2;
            gallery.forEach((img,i) => {
                this.drawImage(col, row, img);
                this.dirMap.setPixel(col, row, i);
                col += 2;
                if (col == 10) { col = 2; row +=2; }
            });
        }
    }

}