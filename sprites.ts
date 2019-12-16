namespace tileworld {

// all sprites go here
export const colorCursor = img`
    5 5 5 5 5 5 5 5
    5 . . . . . . 5
    5 . . . . . . 5
    5 . . . . . . 5
    5 . . . . . . 5
    5 . . . . . . 5
    5 . . . . . . 5
    5 5 5 5 5 5 5 5
`;
export const paintCursor = img`
    5 5 5 5 5 5
    5 . . . . 5
    5 . . . . 5
    5 . . . . 5
    5 . . . . 5
    5 5 5 5 5 5
`;
export const map = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 2 2 2 2 . . . . . .
    . . . . 2 2 2 2 2 2 2 2 . . . .
    . . . 2 2 2 2 1 1 2 2 2 2 . . .
    . . . 2 2 2 1 1 1 1 2 2 2 . . .
    . . . 2 2 2 1 1 1 1 2 2 2 . . .
    . . . 2 2 2 2 1 1 2 2 2 2 . . .
    . . . . 2 2 2 2 2 2 2 2 . . . .
    . . . . 2 2 2 2 2 2 2 2 . . . .
    . . . . . 2 2 2 2 2 2 . . . . .
    . . . . . 2 2 2 2 2 2 . . . . .
    . . . . . . 2 2 2 2 . . . . . .
    . . . . . . 2 2 2 2 . . . . . .
    . . . . . . . 2 2 . . . . . . .
    . . . . . . . 2 2 . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const play = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . 7 7 . . . . . . . . . . . .
    . . 7 7 7 7 . . . . . . . . . .
    . . 7 7 7 7 7 7 . . . . . . . .
    . . 7 7 7 7 7 7 7 7 . . . . . .
    . . 7 7 7 7 7 7 7 7 7 7 . . . .
    . . 7 7 7 7 7 7 7 7 7 7 1 1 . .
    . . 7 7 7 7 7 7 7 7 1 1 . . . .
    . . 7 7 7 7 7 7 1 1 . . . . . .
    . . 7 7 7 7 1 1 . . . . . . . .
    . . 7 7 1 1 . . . . . . . . . .
    . . 1 1 . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const pencil = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . 3 . . . .
    . . . . . . . . . . 3 3 3 . . .
    . . . . . . . . . 4 1 3 3 3 . .
    . . . . . . . . 4 4 e 1 3 . . .
    . . . . . . . 4 4 e 4 4 . . . .
    . . . . . . 4 4 e 4 4 . . . . .
    . . . . . 4 4 e 4 4 . . . . . .
    . . . . 4 4 e 4 4 . . . . . . .
    . . . 4 4 e 4 4 . . . . . . . .
    . . 4 4 e 4 4 . . . . . . . . .
    . . 1 e 4 4 . . . . . . . . . .
    . . 1 1 4 . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const paint = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . 4 1 4 1 4 1 4 1 . . . .
    . . . . 4 1 4 1 4 1 4 1 . . . .
    . . . . 1 1 1 1 1 1 1 1 . . . .
    . . . . 1 1 1 1 1 1 1 1 . . . .
    . . . . 9 9 9 9 9 9 9 9 . . . .
    . . . . d e e e e e e e . . . .
    . . . . d e e e e e e e . . . .
    . . . . . . d e e e . . . . . .
    . . . . . . d e e e . . . . . .
    . . . . . . d e e e . . . . . .
    . . . . . . d f f e . . . . . .
    . . . . . . d e e e . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const emptyTile = img`
    b b b b b b b b b b b b b b b c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    b f f f f f f f f f f f f f f c
    c c c c c c c c c c c c c c c c
`;
export const cursorIn = img`
    . . . . . . . . . . . . . . . .
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
    . 1 1 . . . . . . . . . . 1 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . 1 1 . . . . . 1 .
    . 1 . . . . . 1 1 . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 1 . . . . . . . . . . 1 1 .
    . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
    . . . . . . . . . . . . . . . .
`;
export const cursorOut = img`
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
    1 1 . . . . . . . . . . . . 1 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 . . . . . . . . . . . . . . 1
    1 1 . . . . . . . . . . . . 1 1
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
`;
export const smallSprite = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . 2 . . . . . . . 2 . . . .
    . . 2 . . . . 2 . . . . 2 . . .
    . . 2 . . . . 2 . . . . 2 . . .
    . . 2 . . . . 2 . . . . 2 . . .
    . . 2 . . . . 2 . . . . 2 . . .
    . . 2 . . . . 2 . . . . 2 . . .
    . . 2 . . . . . . . . . 2 . . .
    . . 2 . . . . 2 . . . . 2 . . .
    . . . 2 . . . . . . . 2 . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const deleteIcon = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . 2 . . . . . . . . 2 . . .
    . . . 2 2 . . . . . . 2 2 . . .
    . . . . 2 2 . . . . 2 2 . . . .
    . . . . . 2 2 . . 2 2 . . . . .
    . . . . . . 2 2 2 2 . . . . . .
    . . . . . . . 2 2 . . . . . . .
    . . . . . . 2 2 2 2 . . . . . .
    . . . . . 2 2 . . 2 2 . . . . .
    . . . . 2 2 . . . . 2 2 . . . .
    . . . 2 2 . . . . . . 2 2 . . .
    . . . 2 . . . . . . . . 2 . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const genericSprite = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . c c c . . . . . .
    . . . . . . c c c c c . . . . .
    . . . . . . c c c c c . . . . .
    . . . . . . c c c c c . . . . .
    . . . . . . . c c c . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const exclude = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . f 2 2 2 2 f .
    . . . . . . . . f 2 2 f f 2 2 f
    . . . . . . . . 2 2 2 2 f f 2 2
    . . . . . . . . 2 f 2 2 2 f f 2
    . . . . . . . . 2 f f 2 2 2 f 2
    . . . . . . . . 2 2 f f 2 2 2 2
    . . . . . . . . f 2 2 f f 2 2 f
    . . . . . . . . . f 2 2 2 2 f .
`;
export const include = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . f f . . . . . . .
    . . . . . . f f 7 . . . . . . .
    . . . . . f f 7 6 . . . . . . .
    . . . . . f 7 7 6 . . . . . . .
    f f . . f f 7 6 f . . . . . . .
    7 f f . f 7 7 6 f . . . . . . .
    7 7 f f f 7 6 f . . . . . . . .
    f 7 7 f 7 7 6 f . . . . . . . .
    f f 7 7 7 6 f . . . . . . . . .
    . f f 7 6 f . . . . . . . . . .
`;
export const oneof = img`
    . f f f f f f . . . . . . . . .
    f f 5 5 5 5 f f . . . . . . . .
    f 5 5 5 5 5 5 f . . . . . . . .
    f 5 5 5 5 5 5 f . . . . . . . .
    f 5 5 5 5 5 5 f . . . . . . . .
    f 5 5 5 5 5 5 f . . . . . . . .
    f f 5 5 5 5 f f . . . . . . . .
    . f f f f f f . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const ok = img`
    . . . . . . . . . f 7 7 7 7 f .
    . . . . . . . . f 7 7 f f 7 7 f
    . . . . . . . . 7 7 f f f f 7 7
    . . . . . . . . 7 f f f f f f 7
    . . . . . . . . 7 f f f f f f 7
    . . . . . . . . 7 7 f f f f 7 7
    . . . . . . . . f 7 7 f f 7 7 f
    . . . . . . . . . f 7 7 7 7 f 1
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const excludeCenter = img`
    . . . . . . . . . . . . . . . .
    . d d d d d d d d d d d d d d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . 2 2 2 2 . . . . d .
    . d . . . 2 2 . . 2 2 . . . d .
    . d . . 2 2 2 2 . . 2 2 . . d .
    . d . . 2 . 2 2 2 . . 2 . . d .
    . d . . 2 . . 2 2 2 . 2 . . d .
    . d . . 2 2 . . 2 2 2 2 . . d .
    . d . . . 2 2 . . 2 2 . . . d .
    . d . . . . 2 2 2 2 . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d d d d d d d d d d d d d d .
    . . . . . . . . . . . . . . . .
`;
export const includeCenter = img`
    . . . . . . . . . . . . . . . .
    . d d d d d d d d d d d d d d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . 7 . d .
    . d . . . . . . . . . 7 6 . d .
    . d . . . . . . . . 7 7 6 . d .
    . d . . . . . . . . 7 6 . . d .
    . d . . 7 . . . . 7 7 6 . . d .
    . d . . 7 7 . . . 7 6 . . . d .
    . d . . . 7 7 . 7 7 6 . . . d .
    . d . . . . 7 7 7 6 . . . . d .
    . d . . . . . 7 6 . . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d d d d d d d d d d d d d d .
    . . . . . . . . . . . . . . . .
`;
export const oneofCenter = img`
    . . . . . . . . . . . . . . . .
    . d d d d d d d d d d d d d d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . 5 5 5 5 . . . . d .
    . d . . . 5 5 5 5 5 5 . . . d .
    . d . . . 5 5 5 5 5 5 . . . d .
    . d . . . 5 5 5 5 5 5 . . . d .
    . d . . . 5 5 5 5 5 5 . . . d .
    . d . . . . 5 5 5 5 . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d d d d d d d d d d d d d d .
    . . . . . . . . . . . . . . . .
`;
export const okCenter = img`
    . . . . . . . . . . . . . . . .
    . d d d d d d d d d d d d d d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . 7 7 7 7 . . . . d .
    . d . . . 7 7 . . 7 7 . . . d .
    . d . . 7 7 . . . . 7 7 . . d .
    . d . . 7 . . . . . . 7 . . d .
    . d . . 7 . . . . . . 7 . . d .
    . d . . 7 7 . . . . 7 7 . . d .
    . d . . . 7 7 . . 7 7 . . . d .
    . d . . . . 7 7 7 7 . . . . d .
    . d . . . . . . . . . . . . d .
    . d . . . . . . . . . . . . d .
    . d d d d d d d d d d d d d d .
    . . . . . . . . . . . . . . . .
`;
export const downArrow = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . f f f f f . . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . f f f 9 9 9 f f f . . . .
    . . . f 9 9 9 9 9 9 9 f . . . .
    . . . . f 9 9 9 9 9 f . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . . . f 9 f . . . . . . .
    . . . . . . . f . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const downHand = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . e e e e e . . . . . . .
    . . . e 4 4 4 4 4 e . . . . . .
    . . e 4 4 4 4 4 4 4 e . . . . .
    . . 4 4 4 4 4 4 4 4 4 e . . . .
    . . 4 4 4 4 4 4 4 4 4 4 e . . .
    . . 4 e 4 4 4 4 4 4 4 4 4 . . .
    . . 4 e 4 e 4 4 4 4 . 4 4 . . .
    . . . . 4 e 4 e 4 4 . . 4 . . .
    . . . . . . 4 e 4 4 . . . . . .
    . . . . . . . . 4 4 . . . . . .
    . . . . . . . . 4 4 . . . . . .
    . . . . . . . . 4 4 . . . . . .
    . . . . . . . . . 4 . . . . . .
`;
export const upArrow = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . f . . . . . . . .
    . . . . . . f 9 f . . . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . f 9 9 9 9 9 f . . . . .
    . . . f 9 9 9 9 9 9 9 f . . . .
    . . . f f f 9 9 9 f f f . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . . f 9 9 9 f . . . . . .
    . . . . . f f f f f . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const upHand = img`
    . . . . . . . . . 4 . . . . . .
    . . . . . . . . 4 4 . . . . . .
    . . . . . . . . 4 4 . . . . . .
    . . . . . . . . 4 4 . . . . . .
    . . . . . . 4 e 4 4 . . . . . .
    . . . . 4 e 4 e 4 4 . . 4 . . .
    . . 4 e 4 e 4 4 4 4 . 4 4 . . .
    . . 4 e 4 4 4 4 4 4 4 4 4 . . .
    . . 4 4 4 4 4 4 4 4 4 4 e . . .
    . . 4 4 4 4 4 4 4 4 4 e . . . .
    . . e 4 4 4 4 4 4 4 e . . . . .
    . . . e 4 4 4 4 4 e . . . . . .
    . . . . e e e e e . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const rightArrow = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . f f . . . . .
    . . . . . . . . . f 9 f . . . .
    . . . . f f f f f f 9 9 f . . .
    . . . . f 9 9 9 9 9 9 9 9 f . .
    . . . . f 9 9 9 9 9 9 9 9 9 f .
    . . . . f 9 9 9 9 9 9 9 9 6 . .
    . . . . f f f f f f 9 9 f . . .
    . . . . . . . . . f 9 f . . . .
    . . . . . . . . . f f . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const rightHand = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . e 4 4 4 . . . . .
    . . . . . . e 4 4 4 . . . . . .
    . . . . . e 4 4 4 . . . . . . .
    . . . . e 4 4 4 4 4 4 4 4 4 4 4
    . . . e 4 4 4 4 4 4 4 4 4 4 4 .
    . . . e 4 4 4 4 4 4 e e . . . .
    . . . e 4 4 4 4 4 4 4 4 . . . .
    . . . e 4 4 4 4 4 e e . . . . .
    . . . e 4 4 4 4 4 4 4 . . . . .
    . . . . e 4 4 4 e e . . . . . .
    . . . . . e 4 4 4 4 . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const leftArrow = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . f f . . . . . . . . .
    . . . . f 9 f . . . . . . . . .
    . . . f 9 9 f f f f f f . . . .
    . . f 9 9 9 9 9 9 9 9 f . . . .
    . f 9 9 9 9 9 9 9 9 9 f . . . .
    . . f 9 9 9 9 9 9 9 9 f . . . .
    . . . f 9 9 f f f f f f . . . .
    . . . . f 9 f . . . . . . . . .
    . . . . . f f . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const leftHand = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . 4 4 4 e . . . . . . .
    . . . . . . 4 4 4 e . . . . . .
    . . . . . . . 4 4 4 e . . . . .
    4 4 4 4 4 4 4 4 4 4 4 e . . . .
    . 4 4 4 4 4 4 4 4 4 4 4 e . . .
    . . . . e e 4 4 4 4 4 4 e . . .
    . . . . 4 4 4 4 4 4 4 4 e . . .
    . . . . . e e 4 4 4 4 4 e . . .
    . . . . . 4 4 4 4 4 4 4 e . . .
    . . . . . . e e 4 4 4 e . . . .
    . . . . . . 4 4 4 4 e . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const flipHoriz = img`
    . . . . . . . . . . . . . . . .
    . . . . . b b . . 9 9 . . . . .
    . . . . . b b . . 9 9 . . . . .
    . . . . b b b . . 9 9 9 . . . .
    . . . . b b b . . 9 9 9 . . . .
    . . . . b b b . . 9 9 9 . . . .
    . . . b b b b . . 9 9 9 9 . . .
    . . . b b b b . . 9 9 9 9 . . .
    . . . b b b b . . 9 9 9 9 . . .
    . . b b b b b . . 9 8 9 9 9 . .
    . . b b b b b . . 9 8 8 9 9 . .
    . . b b 8 8 8 8 8 8 8 8 8 9 . .
    . b b b b b b . . 9 8 8 9 9 9 .
    . b b b b b b . . 9 8 9 9 9 9 .
    . b b b b b b . . 9 9 9 9 9 9 .
    . . . . . . . . . . . . . . . .
`;
export const flipVert = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . 9 9 9 .
    . . . . . . . . . 9 9 9 9 9 9 .
    . . . . . . 9 9 9 9 9 8 9 9 9 .
    . . . 9 9 9 9 9 9 9 8 8 8 9 9 .
    . 9 9 9 9 9 9 9 9 8 8 8 8 8 9 .
    . 9 9 9 9 9 9 9 9 9 9 8 9 9 9 .
    . . . . . . . . . . . 8 . . . .
    . . . . . . . . . . . 8 . . . .
    . b b b b b b b b b b 8 b b b .
    . b b b b b b b b b b 8 b b b .
    . . . b b b b b b b b 8 b b b .
    . . . . . . b b b b b b b b b .
    . . . . . . . . . b b b b b b .
    . . . . . . . . . . . . b b b .
    . . . . . . . . . . . . . . . .
`;
export const rotateLeft = img`
    . . . . . . . . . . . . . . . .
    . . . . . . 8 . . . . . . . . .
    . . . . . 8 8 . . . . . . . . .
    . . . . 8 8 8 8 8 8 . . . . . .
    . . . . . 8 8 . . 8 8 . . . . .
    . . . . . . 8 . . . 8 8 . . . .
    . . . . . . . . . . . 8 8 . . .
    . 9 9 9 . . . . . . . . 8 . . .
    . 9 9 9 9 9 9 . . . . . 8 . . .
    . 9 9 9 9 9 9 9 9 9 . . . . . .
    . 9 9 9 9 9 9 9 9 9 9 9 9 . . .
    . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 .
    . 9 9 9 9 9 9 9 9 9 9 9 9 9 9 .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const eat = img`
    . . . . . . . . . . . . . . . .
    . . . . 5 5 5 5 5 5 5 . . . . .
    . . . 5 5 5 5 5 5 5 5 5 . . . .
    . . 5 5 5 5 5 5 5 5 5 5 5 . . .
    . 5 5 5 5 5 5 5 5 5 5 5 . . . .
    . 5 5 5 5 5 5 5 5 5 . . . . . .
    . 5 5 5 5 5 5 5 . . . . . . . .
    . 5 5 5 5 5 5 . . . . . . . . .
    . 5 5 5 5 5 5 5 . . . . . . . .
    . 5 5 5 5 5 5 5 5 5 . . . . . .
    . 5 5 5 5 5 5 5 5 5 5 5 . . . .
    . . 5 5 5 5 5 5 5 5 5 5 5 . . .
    . . . 5 5 5 5 5 5 5 5 5 . . . .
    . . . . 5 5 5 5 5 5 5 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const stopSign = img`
    . . . . . . . . . . . . . . . .
    . . . . . 1 1 1 1 1 1 . . . . .
    . . . . 1 2 2 2 2 2 2 1 . . . .
    . . . 1 2 2 2 2 2 2 2 2 1 . . .
    . . 1 2 2 2 1 1 1 1 2 2 2 1 . .
    . 1 2 2 2 1 2 2 2 2 1 2 2 2 1 .
    . 1 2 2 2 1 2 2 2 2 2 2 2 2 1 .
    . 1 2 2 2 2 1 1 1 1 2 2 2 2 1 .
    . 1 2 2 2 2 2 2 2 2 1 2 2 2 1 .
    . 1 2 2 2 2 2 2 2 2 1 2 2 2 1 .
    . 1 2 2 2 1 2 2 2 2 1 2 2 2 1 .
    . . 1 2 2 2 1 1 1 1 2 2 2 1 . .
    . . . 1 2 2 2 2 2 2 2 2 1 . . .
    . . . . 1 2 2 2 2 2 2 1 . . . .
    . . . . . 1 1 1 1 1 1 . . . . .
    . . . . . . . . . . . . . . . .
`;
export const zero = img`
    . . . . . . . . . . . . . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . 2 . . . . . . . 2 . . . .
    . . 2 . . . . . . . . . 2 . . .
    . 2 . . 2 2 2 2 2 2 2 . . 2 . .
    . 2 . . . . . . 2 2 2 . . 2 . .
    . 2 . . . . . 2 2 2 . . . 2 . .
    . 2 . . . . 2 2 2 . . . . 2 . .
    . 2 . . . 2 2 2 . . . . . 2 . .
    . 2 . . 2 2 2 . . . . . . 2 . .
    . 2 . . 2 2 2 2 2 2 2 . . 2 . .
    . . 2 . . . . . . . . . 2 . . .
    . . . 2 . . . . . . . 2 . . . .
    . . . . 2 2 2 2 2 2 2 . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const uTurn = img`
    . . . f 5 5 5 5 5 5 5 5 f . . .
    . . f 5 5 5 5 5 5 5 5 5 5 f . .
    . f 5 5 5 5 f f f f 5 5 5 5 f .
    f 5 5 5 5 f f f f f f 5 5 5 5 f
    5 5 5 5 f f f 5 5 f f f 5 5 5 5
    5 5 5 f f f 5 5 5 5 f f f 5 5 5
    5 5 5 f f 5 5 5 5 5 5 f f 5 5 5
    5 5 5 f f 5 5 5 5 5 5 f f 5 5 5
    5 5 5 f f 5 5 5 5 5 5 f f 5 5 5
    5 f f f f f f 5 5 5 5 f f 5 5 5
    5 5 f f f f 5 5 5 5 5 f f 5 5 5
    5 5 f f f f 5 5 5 5 5 f f 5 5 5
    f 5 5 f f 5 5 5 5 5 5 f f 5 5 f
    . f 5 5 5 5 5 5 5 5 5 5 5 5 f .
    . . f 5 5 5 5 5 5 5 5 5 5 f . .
    . . . f 5 5 5 5 5 5 5 5 f . . .
`;
/*
export const plusOneScore = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . 7 . . .
    . . . . . . . . . . . 7 7 . . .
    . . . . . . . . . . 7 7 7 . . .
    . . . . . . . . . 7 7 7 7 . . .
    . . . . . 7 . . . . . 7 7 . . .
    . . . . . 7 . . . . . 7 7 . . .
    . . . . . 7 . . . . . 7 7 . . .
    . . 7 7 7 7 7 7 7 . . 7 7 . . .
    . . . . . 7 . . . . . 7 7 . . .
    . . . . . 7 . . . . . 7 7 . . .
    . . . . . 7 . . . . . 7 7 . . .
    . . . . . . . . . 7 7 7 7 7 7 .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
export const minusOneLife = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . 2 . . .
    . . . . . . . . . . . 2 2 . . .
    . . . . . . . . . . 2 2 2 . . .
    . . . . . . . . . 2 2 2 2 . . .
    . . . . . . . . . . . 2 2 . . .
    . . . . . . . . . . . 2 2 . . .
    . . . . . . . . . . . 2 2 . . .
    . . 2 2 2 2 2 2 2 . . 2 2 . . .
    . . . . . . . . . . . 2 2 . . .
    . . . . . . . . . . . 2 2 . . .
    . . . . . . . . . . . 2 2 . . .
    . . . . . . . . . 2 2 2 2 2 2 .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`;
*/

export const arrowImages = [leftArrow, rightArrow, upArrow, downArrow];
export const handImages = [leftHand, rightHand, upHand, downHand];
export const arrowValues = [MoveDirection.Left, MoveDirection.Right, MoveDirection.Up, MoveDirection.Down];
export const attrsCentered = [includeCenter, excludeCenter, okCenter, oneofCenter];
export const attrImages = [include, exclude, ok, oneof];
export const attrValues = [AttrType.Include, AttrType.Exclude, AttrType.OK, AttrType.OneOf];
export const commandImages = [map, paint, pencil, play];

}