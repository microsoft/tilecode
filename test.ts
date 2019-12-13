namespace bd {
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
    `
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
    `
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
    `
    export const rock = img`
        . . . . . . . . . . . . . . . .
        . . . . 8 8 8 8 d d b . . . . .
        . . . 8 8 8 8 9 d d d b b . . .
        . . 8 8 8 8 9 9 d d d d d b . .
        . 8 8 8 8 8 8 9 d d d d d b . .
        8 8 8 8 8 8 8 8 d d d d d b . .
        9 9 9 9 9 9 9 9 b d d d b b b .
        9 9 9 9 9 9 9 9 b b b b b b d .
        . 9 9 9 9 9 9 9 b b b d d b d .
        . . 9 9 9 9 9 9 d d d b b b d .
        . . . 9 9 9 9 9 b b b b d d c .
        . . . . 9 9 9 9 b d d d b c c .
        . . . . . 9 9 9 c c c c b b b .
        . . . . . . 9 9 b b b b b . . .
        . . . . . . . 9 b b b b . . . .
        . . . . . . . . . . . . . . . .
    `
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
    `
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
    `
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
    `
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
    `
    export const movable = [boulder, player, diamond, enemy]
    export const fixed = [space, wall, dirt]
}

import tw = tileworld;

let manager = new tw.ImageManager(bd.fixed, bd.movable, 2);

let wallId = manager.getKind(bd.wall);
let spaceId = manager.getKind(bd.space);
let playerId = manager.getKind(bd.player);
let enemyId = manager.getKind(bd.enemy);
let boulderId = manager.getKind(bd.boulder);
let diamondId = manager.getKind(bd.diamond);

manager.setPlayer(playerId);

function fillAttr(f: number, n: number, i: number, g: number) {
    let res: AttrType[] = [];
    for(let j=0;j<n;j++) {
        res.push(j == i ? g : f);
    }
    return res;
}

function TileAt(id: number, col: number, row: number): WhenDo {
    return { col: col, row: row, attrs: fillAttr(AttrType.Exclude, 7, id, AttrType.Include), commands: [] }
}

function SpriteAt(id: number, col: number, row: number): WhenDo {
    let attrs = fillAttr(AttrType.Exclude, 7, id, AttrType.Include);
    attrs[0] = attrs[1] = attrs[2] = AttrType.OK;
    return { col: col, row: row, attrs:attrs, commands: [] }
}


let tp = TileAt(spaceId, 2, 3)
tp.attrs[playerId] = AttrType.OK;
tp.attrs[enemyId] = AttrType.OK;
let playerMove = fillAttr(AttrType.OK, 7, boulderId, AttrType.Exclude);
playerMove[wallId] = AttrType.Exclude;

let moveRight = [{ inst: CommandType.Move, arg: MoveDirection.Right }]
let moveLeft = [{ inst: CommandType.Move, arg: MoveDirection.Left }]

let boulderRight = SpriteAt(boulderId, 3, 2)
boulderRight.commands = [{ inst: CommandType.Move, arg: MoveDirection.Right }]

let boulderLeft = SpriteAt(boulderId, 1, 2)
boulderLeft.commands = [{ inst: CommandType.Move, arg: MoveDirection.Left }]

let playerPaint: Rule = {
    kind: [playerId],
    rt: RuleType.Resting,
    dir: MoveDirection.None,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: [{ inst: CommandType.Paint, arg: spaceId }] }]
}

let playerMoveRight: Rule ={
    kind: [playerId],
    rt: RuleType.Pushing,
    dir: MoveDirection.Right,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: [{ inst: CommandType.Move, arg: MoveDirection.Right }, { inst: CommandType.Paint, arg: spaceId }] },
        { col: 3, row: 2, attrs: playerMove, commands: [] } ]
}

let playerMoveLeft: Rule = {
    kind: [playerId],
    rt: RuleType.Pushing,
    dir: MoveDirection.Left,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: [{ inst: CommandType.Move, arg: MoveDirection.Left }, { inst: CommandType.Paint, arg: spaceId }] },
        { col: 1, row: 2, attrs: playerMove, commands: [] }]
}

let playerMoveUp: Rule = {
    kind: [playerId],
    rt: RuleType.Pushing,
    dir: MoveDirection.Up,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: [{ inst: CommandType.Move, arg: MoveDirection.Up }, { inst: CommandType.Paint, arg: spaceId }] },
    { col: 2, row: 1, attrs: playerMove, commands: [] }]
}

let playerMoveDown: Rule = {
    kind: [playerId],
    rt: RuleType.Pushing,
    dir: MoveDirection.Down,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: [{ inst: CommandType.Move, arg: MoveDirection.Down }, { inst: CommandType.Paint, arg: spaceId }] },
    { col: 2, row: 3, attrs: playerMove, commands: [] }]
}

let playerMoveBoulderRight: Rule = {
    kind: [playerId],
    rt: RuleType.Pushing,
    dir: MoveDirection.Right,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: moveRight },
        boulderRight, TileAt(spaceId, 4, 2)]
}

let playerMoveBoulderLeft: Rule = {
    kind: [playerId],
    rt: RuleType.Pushing,
    dir: MoveDirection.Left,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: moveLeft },
        boulderLeft, TileAt(spaceId, 0, 2)]
}

let boulderFallDown: Rule = {
    kind: [boulderId, diamondId],
    rt: RuleType.Resting,
    dir: MoveDirection.None,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: [{ inst: CommandType.Move, arg: MoveDirection.Down }] },
             TileAt(spaceId, 2, 3)]
}

let boulderFallingDown: Rule = {
    kind: [boulderId, diamondId],
    rt: RuleType.Moving,
    dir: MoveDirection.Down,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: [{ inst: CommandType.Move, arg: MoveDirection.Down }] },
             tp]
}

let boulderFallLeft: Rule = {
    kind: [boulderId, diamondId],
    rt: RuleType.Resting,
    dir: MoveDirection.None,
    whenDo: [{ col: 2, row: 2, attrs: [], commands: [{ inst: CommandType.Move, arg: MoveDirection.Left }] },
             SpriteAt(boulderId, 2, 3), TileAt(spaceId, 1, 2), TileAt(spaceId,1,3)]
}

let program: Program = {
    fixed: 3,
    movable: 4,
    rules: tw.makeIds([boulderFallDown, boulderFallLeft, boulderFallingDown, 
        playerPaint, playerMoveRight, playerMoveLeft, playerMoveUp, playerMoveDown, playerMoveBoulderRight, playerMoveBoulderLeft])
}

tw.setProgram(program);
let mapEditor = new tw.MapEditor(manager);


