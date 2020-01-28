namespace sample {
    export const player = img`
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
    export const diamond = img`
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
    export const boulder = img`
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
    export const enemy = img`
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
    export const wall = img`
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
    export const wall2 = img`
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
    export const dirt = img`
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
    export const space = img`
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
    export const movable = [player, boulder, diamond, enemy];
    export const fixed = [space, wall, dirt, wall2];
    export const all = [].concat(fixed).concat(movable);

    let wallId = all.indexOf(wall);
    let spaceId = all.indexOf(space);
    let playerId = all.indexOf(player);
    let enemyId = all.indexOf(enemy);
    let boulderId = all.indexOf(boulder);
    let diamondId = all.indexOf(diamond);

    function fillAttr(f: number, n: number, i: number, g: number) {
        let res: AttrType[] = [];
        for(let j=0;j<n;j++) {
            res.push(j == i ? g : f);
        }
        return res;
    }

    function TileAt(id: number, col: number, row: number): WhenDo {
        return new WhenDo(col, row, fillAttr(AttrType.Exclude, 7, id, AttrType.Include), []);
    }

    function SpriteAt(id: number, col: number, row: number): WhenDo {
        let attrs = fillAttr(AttrType.Exclude, 7, id, AttrType.Include);
        attrs[0] = attrs[1] = attrs[2] = AttrType.OK;
        return new WhenDo(col, row, attrs, []);
    }

    let tp = TileAt(spaceId, 2, 3)
    tp.attrs[playerId] = AttrType.OK;
    tp.attrs[enemyId] = AttrType.OK;
    let playerMove = fillAttr(AttrType.OK, 7, boulderId, AttrType.Exclude);
    playerMove[wallId] = AttrType.Exclude;

    let moveRight = [new Command(CommandType.Move, MoveDirection.Right)]
    let moveLeft = [new Command(CommandType.Move, MoveDirection.Left)]

    let boulderRight = SpriteAt(boulderId, 3, 2)
    boulderRight.commands = moveRight;

    let boulderLeft = SpriteAt(boulderId, 1, 2)
    boulderLeft.commands = moveLeft;

    let playerPaint = new Rule([playerId], RuleType.Resting, MoveDirection.Left,
        [new WhenDo(2,2,[],[new Command(CommandType.Paint,spaceId)])]
    );

    function playerMoveRule(dir: MoveDirection) {
        return new Rule([playerId], RuleType.Pushing, dir,
            [new WhenDo(2, 2, [], 
                [new Command(CommandType.Move, dir), 
                new Command(CommandType.Paint, spaceId) ]),
            new WhenDo(2 + tileworld.moveXdelta(dir), 2+tileworld.moveYdelta(dir), playerMove, []) ]
        );
    }

    let playerMoveBoulderRight = new Rule([playerId], RuleType.Pushing, MoveDirection.Right,
        [new WhenDo(2, 2, [], moveRight), boulderRight, TileAt(spaceId, 4, 2)]
    );

    let playerMoveBoulderLeft = new Rule([playerId], RuleType.Pushing, MoveDirection.Left,
        [new WhenDo(2, 2, [], moveLeft), boulderLeft, TileAt(spaceId, 0, 2)]
    );

    let boulderFallDown = new Rule([boulderId], RuleType.Resting, MoveDirection.Left,
        [new WhenDo(2, 2, [], [new Command(CommandType.Move, MoveDirection.Down)]), TileAt(spaceId, 2, 3)]
    );

    let boulderFallingDown = new Rule([boulderId], RuleType.Moving, MoveDirection.Down,
        [new WhenDo(2, 2, [], [new Command(CommandType.Move, MoveDirection.Down)]), tp]
    );

    let boulderFallLeft: Rule = new Rule([boulderId], RuleType.Resting, MoveDirection.Left,
        [new WhenDo(2, 2, [], [new Command(CommandType.Move, MoveDirection.Left)]),
        SpriteAt(boulderId, 2, 3), TileAt(spaceId, 1, 2), TileAt(spaceId,1,3) ]
    );

    export let project = new tileworld.Project(
        "TW1-",
        fixed,
        movable,
        tileworld.makeIds([boulderFallDown, boulderFallLeft, boulderFallingDown, 
        playerPaint, playerMoveRule(0), playerMoveRule(1), playerMoveRule(2), playerMoveRule(3), 
        playerMoveBoulderRight, playerMoveBoulderLeft])
    );
    let world = image.create(30, 30);
    world.fill(2);
    project.setWorld(world);
    project.setPlayer(playerId);
    project.defaultTile = 0;
}
