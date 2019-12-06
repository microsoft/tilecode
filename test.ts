namespace boulder {

    let player = img`
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
    let diamond = img`
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
    let boulder = img`
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
    let rock = img`
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
    let enemy = img`
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
    let wall = img`
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
    let dirt = img`
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
    let space = img`
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

    // names are just here for convenience - they are not used
    // for 
    let movableNames = ["Player", "Boulder", "Diamond", "Enemy"]
    let movable = [player, boulder, diamond, enemy]
    let fixedNames = ["Space", "Wall", "Dirt"]
    let fixed = [space, wall, dirt]

    export let movableSprites: Sprite[] = []
    movable.forEach((img, i) => {
        let foo = sprites.create(img)
        foo.setFlag(SpriteFlag.Invisible, true)
        foo.data = movableNames[i]
        movableSprites.push(foo)
    })

    export let fixedSprites: Sprite[] = []
    fixed.forEach((img, i) => {
        let foo = sprites.create(img)
        foo.setFlag(SpriteFlag.Invisible, true)
        foo.data = fixedNames[i]
        fixedSprites.push(foo)
    })
}

import tw = tileWorldEditor;
let manager = new tw.SpriteManager(boulder.fixedSprites, boulder.movableSprites)

function fillAttr(f: number, n: number, i: number, g: number) {
    let res: AttrType[] = [];
    for(let j=0;j<n;j++) {
        res.push(j == i ? g : f);
    }
    return res;
}

function TileAt(name: string, col: number, row: number): WhenDo {
    let id = manager.findName(name).kind();
    return { col: col, row: row, attrs: fillAttr(AttrType.Exclude, 7, id, AttrType.Include), witness: -1, commands: [] }
}

function SpriteAt(name:string, col: number, row: number): WhenDo {
    let id = manager.findName(name).kind();
    let attrs = fillAttr(AttrType.Exclude, 7, id, AttrType.Include);
    attrs[0] = attrs[1] = attrs[2] = AttrType.OK;
    return { col: col, row: row, attrs:attrs , witness: id, commands: [] }
}

let wallId = manager.findName("Wall").kind()
let spaceId = manager.findName("Space").kind()
let playerId = manager.findName("Player").kind()
let enemyId = manager.findName("Enemy").kind()
let boulderId = manager.findName("Boulder").kind()
let diamondId = manager.findName("Diamond").kind()

// let mapEditor = new tileWorldEditor.MapEditor(manager)

let tp = TileAt("Space", 2, 3)
tp.attrs[playerId] = AttrType.OK;
tp.attrs[enemyId] = AttrType.OK;
let playerMove = fillAttr(AttrType.OK, 7, boulderId, AttrType.Exclude);
playerMove[wallId] = AttrType.Exclude;

let moveRight = [{ inst: CommandType.Move, arg: MoveDirection.Right }]
let boulderRight = SpriteAt("Boulder", 3, 2)
boulderRight.commands = [{ inst: CommandType.Move, arg: MoveDirection.Right }]

let playerPaint: Rule = {
    kind: [playerId],
    rt: RuleType.Resting,
    dir: MoveDirection.None,
    generalize: [],
    whenDo: [{ col: 2, row: 2, attrs: [], witness: playerId, commands: [{ inst: CommandType.Paint, arg: spaceId }] }]
}

let playerMoveRight: Rule ={
    kind: [playerId],
    rt: RuleType.Pushing,
    dir: MoveDirection.Right,
    generalize: [],
    whenDo: [{ col: 2, row: 2, attrs: [], witness: playerId, commands: [{ inst: CommandType.Move, arg: MoveDirection.Right }] },
                { col: 3, row: 2, attrs: playerMove, witness: -1, commands: [] } ]
}

let playerMoveBoulder: Rule = {
    kind: [playerId],
    rt: RuleType.Pushing,
    dir: MoveDirection.Right,
    generalize: [],
    whenDo: [{ col: 2, row: 2, attrs: [], witness: playerId, commands: moveRight },
             boulderRight, TileAt("Space", 4, 2)]
}

let boulderFallDown: Rule = {
    kind: [boulderId],
    rt: RuleType.Resting,
    dir: MoveDirection.None,
    generalize: [],
    whenDo: [{ col: 2, row: 2, attrs: [], witness: boulderId, commands: [{ inst: CommandType.Move, arg: MoveDirection.Down }] },
             TileAt("Space", 2, 3)]
}

let boulderFallingDown: Rule = {
    kind: [boulderId],
    rt: RuleType.Moving,
    dir: MoveDirection.Down,
    generalize: [],
    whenDo: [{ col: 2, row: 2, attrs: [], witness: boulderId, commands: [{ inst: CommandType.Move, arg: MoveDirection.Down }] },
             tp]
}

let boulderFallLeft: Rule = {
    kind: [boulderId],
    rt: RuleType.Resting,
    dir: MoveDirection.None,
    generalize: [],
    whenDo: [{ col: 2, row: 2, attrs: [], witness: boulderId, commands: [{ inst: CommandType.Move, arg: MoveDirection.Left }] },
             SpriteAt("Boulder", 2, 3), TileAt("Space", 1, 2), TileAt("Space",1,3)]
}

let boulderFallRight: Rule = {
    kind: [boulderId],
    rt: RuleType.Resting,
    dir: MoveDirection.None,
    generalize: [],
    whenDo: [{ col: 2, row: 2, attrs: [], witness: boulderId, commands: [{ inst: CommandType.Move, arg: MoveDirection.Right }] },
             SpriteAt("Boulder", 2, 3), TileAt("Space", 3, 2), TileAt("Space", 3, 3)]
}

// let ruleEditor = new tw.RuleEditor(manager, tw.makeRestingRule(manager, "Boulder"))
let ruleEditor = new tw.RuleEditor(manager, makeRestingRule(manager,"Boulder"))
