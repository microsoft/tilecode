// which direction is the sprite moving
enum TileDir {
    //% block="--"
    None,
    //% block="Left"
    Left,
    //% block="Right"
    Right,
    //% block="Up"
    Up,
    //% block="Down"
    Down
}

//% blockId=tiledir block="$dir"
function _tileDir(dir: TileDir): number {
    return dir;
}

enum ResultSet {
    //% block="no"
    Zero,
    //% block="a"
    One,
    //% block="only"
    Only
}

enum Membership {
    //% block="one of"
    OneOf,
    //% block="not one of"
    NotOneOf
}

enum Spritely {
    //% block="fixed"
    Fixed,
    //% block="movable"
    Movable
}

//% weight=1000 color="#442255" icon="\uf45c"
//% groups='["Tiles", "Events", "Assertions", "Actions"]'
//% blockGap=8
namespace TileWorld {

    enum CallBackKind {
        AtRest = TileDir.Down + 1,
        MoveInto
    }

    const tileBits = 4;

    // a sprite that moves by tiles, but only in one of four directions
    class TileSprite extends Sprite implements Tile {
        // which tile map code does this sprite represent?
        private code: number;
        // which direction is the target 
        private dir: TileDir;
        // previous sprite coord value
        private old: number;
        // the next tile target
        private next: number;
        // have we received a stop request? 
        private stop: boolean;
        // notification
        private tileSpriteEvent: (ts: TileSprite, n: CallBackKind) => void;
        //
        constructor(world: TileWorld, code: number, image: Image, kind: number) {
            super(image);
            const scene = game.currentScene();
            scene.physicsEngine.addSprite(this);
            this.setKind(kind);
            this.code = code;
            this.dir = TileDir.None;
            this.tileSpriteEvent = undefined;
            this.stop = false;
        } 
        //
        moveOne(dir: number) {
            if (this.dir == TileDir.None) {
                this.stop = false;
                if (dir == TileDir.Left || dir == TileDir.Right)
                    this.moveInX(dir);
                else if (dir == TileDir.Up || dir == TileDir.Down)
                    this.moveInY(dir);
            }
        }
        // stop at current tile
        deadStop() { 
            if (this.dir == TileDir.Left || this.dir == TileDir.Right) {
                this.reachedTargetX(this.centerIt(this.x), false)
            } else {
                this.reachedTargetY(this.centerIt(this.y), false)
            }
        }
        // back to previous tile
        knockBack() {
            if ((this.dir == TileDir.Left || this.dir == TileDir.Right) &&
                this.old != this.getColumn()) {
                this.x = this.old << tileBits
            } else if ((this.dir == TileDir.Up || this.dir == TileDir.Down) &&
                this.old != this.getRow()) {
                this.y = this.old << tileBits
            }
            this.deadStop()
        }
        //
        getCode() { return this.code }
        getDirection() { return this.dir }
        getColumn() { return this.x >> tileBits }
        getRow() { return this.y >> tileBits }
        // notify client on entering tile
        onTileSpriteEvent(handler: (ts: TileSprite, d: number) => void) {
            this.tileSpriteEvent = handler
        }
        // call from game update loop
        updateInMotion() {
            if (this.dir == TileDir.None)
                return;
            // have we crossed into a new tile?
            if (this.tileSpriteEvent) {
                if (this.dir == TileDir.Left || this.dir == TileDir.Right) {
                    if (this.old != this.getColumn()) {
                        this.tileSpriteEvent(this, CallBackKind.MoveInto+this.dir)
                    }
                    // this.old = this.getColumn()
                } else if (this.dir == TileDir.Up || this.dir == TileDir.Down) {
                    if (this.old != this.getRow()) {
                        this.tileSpriteEvent(this, CallBackKind.MoveInto+this.dir)
                    }
                    // this.old = this.getRow()
                }
            }
            // have we reached the target?
            let size = 1 << tileBits
            if (this.dir == TileDir.Left && this.x <= this.next) {
                this.reachedTargetX(this.next);
            } else if (this.dir == TileDir.Right && this.x >= this.next) {
                this.reachedTargetX(this.next);
            } else if (this.dir == TileDir.Up && this.y <= this.next) {
                this.reachedTargetY(this.next);
            } else if (this.dir == TileDir.Down && this.y >= this.next) {
                this.reachedTargetY(this.next);
            }
        }
        //
        updateStationary() {
            if (this.tileSpriteEvent && this.dir == TileDir.None) {
                this.tileSpriteEvent(this, CallBackKind.AtRest);
            }
        }
        //
        private moveInX(dir: TileDir) {
            let size = 1 << tileBits;
            let sign = dir == TileDir.Left ? -1 : 1;
            this.next = this.x + sign * size;
            this.old = this.getColumn();
            this.dir = dir;
            this.vx = sign * 100;
        }
        private moveInY(dir: TileDir) {
            let size = 1 << tileBits;
            let sign = dir == TileDir.Up ? -1 : 1
            this.next = this.y + sign * size;
            this.old = this.getRow();
            this.dir = dir;
            this.vy = sign * 100;
        }

        private reachedTargetX(x: number, reentrant: boolean = true) {
            this.x = x;
            this.vx = 0;
            let lastDir = this.dir
            this.dir = TileDir.None
            if (this.tileSpriteEvent && reentrant) {
                this.tileSpriteEvent(this, <number>lastDir);
            }
            this.old = this.getColumn();
        }
        private reachedTargetY(y: number,reentrant: boolean = true) {
            this.y = y
            this.vy = 0
            let lastDir = this.dir
            this.dir = TileDir.None
            if (this.tileSpriteEvent && reentrant) {
                this.tileSpriteEvent(this, <number>lastDir)
            }
            this.old = this.getRow()
        }
        private centerIt(n: number) {
            return ((n >> tileBits) << tileBits) + (1 << (tileBits - 1))
        }
    }

    // tileworld actions
    enum TheActions { Move, Remove, Create, Stop, KnockBack, SetTile }
    class ClosedAction {
        constructor(public self: boolean, public action: TheActions, public args: any[]) { }
    }

    // the tile world manages tile sprites
    class TileWorld {
        // what tile code to put behind a sprite?
        private backgroundTile: number;
        private tileKind: number;
        // the current tile map (no sprites)  
        private tileMap: Image;
        // fill in with sprites
        private spriteMap: Image;
        // note tiles with more than one sprite
        private multiples: Image;
        // which codes map to sprites?
        private spriteCodes: number[];
        // map codes to kinds
        private codeToKind: number[];
        // the sprites, divided up by codes
        private sprites: TileSprite[][];
        // event handlers
        private onPushHandlers: { [index:number]: ((ts: TileSprite, d: TileDir) => void)[] };
        private moveIntoHandlers: { [index:number]: ((ts: TileSprite, d: TileDir) => void)[] };
        private atRestHandlers: { [index:number]: ((ts: TileSprite) => void)[] };
        //
        constructor() {
            this.backgroundTile = -1
            this.sprites = []
            this.codeToKind = []
            this.spriteCodes = []
            this.onPushHandlers = {}
            this.moveIntoHandlers = {}
            this.atRestHandlers = {}
            this.tileKind = SpriteKind.create()
        }
        // methods for defining map and sprites
        setMap(tileMap: Image) {
            this.tileMap = tileMap.clone();
            this.spriteMap = tileMap.clone();
            this.multiples = tileMap.clone();
            scene.setTileMap(this.tileMap)
            game.onUpdate(() => { this.update(); })
        }
        //
        setBackgroundTile(backgroundTile: number) {
            this.backgroundTile = backgroundTile
        }
        //
        setCode(curs: Tile, code: number) {
            this.tileMap.setPixel(curs.getColumn(), curs.getRow(), code)
        }
        getCode(curs: Tile) {
            return this.tileMap.getPixel(curs.getColumn(), curs.getRow())
        }
        getKindFromCode(code: number) {
            return this.codeToKind[code]
        }
        addTiles(code: number, art: Image, kind: number) {
            let tiles = scene.getTilesByType(code)
            this.codeToKind[code] = kind;
            scene.setTile(code, art);
        }
        //
        addTileSprites(code: number, art:Image, kind: number) {
            let tiles = scene.getTilesByType(code)
            scene.setTile(code, art);
            this.spriteCodes.push(code);
            this.codeToKind[code] = kind;
            this.initHandlers(kind)
            this.sprites[code] = []
            for (let value of tiles) {
                let tileSprite = new TileSprite(this, code, art, kind)
                this.hookupHandlers(tileSprite)
                this.sprites[code].push(tileSprite)
                value.place(tileSprite)
            }
            // remove from tile map
            if (this.backgroundTile != -1) {
                for (let y = 0; y < this.tileMap.height; y++) {
                    for (let x = 0; x < this.tileMap.width; x++) {
                        let pixel = this.tileMap.getPixel(x, y)
                        if (code == pixel) 
                            this.tileMap.setPixel(x, y, this.backgroundTile)
                    }
                }
            }
        }
        getSpritesCount(code: number) {
            if (this.sprites[code])
               return this.sprites[code].length
            return 0
        }
        createTileSpriteAt(code: number, cursor: Tile) {
            //let tileSprite = new TileSprite(this, code, art, kind)
            //this.hookupHandlers(tileSprite)
            //this.sprites[code].push(tileSprite)
        }
        // register event handlers
        ifAtRest(kind: number, h: (ts: TileSprite) => void) {
            if (!this.atRestHandlers[kind]) this.atRestHandlers[kind] = []
            this.atRestHandlers[kind].push(h);
        }
        onPushRequest(kind: number, h: (ts: TileSprite, d: TileDir) => void) {
            if (!this.onPushHandlers[kind]) this.onPushHandlers[kind] = [];
            this.onPushHandlers[kind].push(h);
        }
        onMoveInto(kind: number, h: (ts: TileSprite, d: TileDir) => void) {
            if (!this.moveIntoHandlers[kind]) this.moveIntoHandlers[kind] = [];
            this.moveIntoHandlers[kind].push(h);
        }

        public isFixedCode(codeKind: number) {
            return codeKind < this.tileKind && this.spriteCodes.indexOf(codeKind) == -1
        }
        // how many fixed/movable sprites of codeKind are at a location? 
        // returns -1 if result needs to consult actual sprite list at location
        countCodeKindAt(codeKind: number, cursor: Cursor) {
            let col = cursor.getColumn(), row = cursor.getRow()
            let tileMapCode = this.tileMap.getPixel(col, row)
            let spriteMapCode = this.spriteMap.getPixel(col, row)
            if (this.isFixedCode(codeKind))
                return (codeKind == tileMapCode) ? 1 : 0
            else if (this.multiples.getPixel(col, row)) 
                return -1
            else if (codeKind < this.tileKind)
                return (codeKind == spriteMapCode) ? 1 : 0
            else {
                let tileMapKind = this.codeToKind[tileMapCode]
                let spriteMapKind = this.codeToKind[spriteMapCode]
                return (codeKind == tileMapKind ? 1 : 0) + (tileMapCode == spriteMapCode ? 0 : (codeKind == spriteMapKind ? 1 : 0))
            }
        }

        hasMovableSprite(cursor: Cursor) {
            let tileMapCode = this.tileMap.getPixel(cursor.getColumn(), cursor.getRow())
            let spriteMapCode = this.spriteMap.getPixel(cursor.getColumn(), cursor.getRow())
            return spriteMapCode != tileMapCode
        }

        // is the underlying tile at a location of codeKind?
        tileIs(codeKind: number, cursor: Cursor) {
            let targetCodeKind = this.tileMap.getPixel(cursor.getColumn(), cursor.getRow())
            if (codeKind < this.tileKind) 
                return targetCodeKind == codeKind
            else
                return this.codeToKind[targetCodeKind] == codeKind
        }
        // get all the sprites of codeKind at an (optional) location
        getSprites(codeKind: number, cursor: Cursor = null) {
            if (cursor) {
                return this._getSpritesCursor(codeKind, cursor);
            } else
                return this._getSprites(codeKind)
        }
        //
        removeSprite(s: TileSprite) {
            // TODO: we may want to consider a two phase process where we
            // TODO: disable the TileSprite and leave Sprite intact
            this.sprites[s.getCode()].removeElement(s)
            s.destroy()
        }
        private _getSpritesCursor(codeKind: number, cursor: Cursor) {
            let ss = this._getSprites(codeKind)
            if (ss)
                return ss.filter((t: TileSprite) =>
                    t.getColumn() == cursor.getColumn() && t.getRow() == cursor.getRow())
            else
                return null
        }
        private _getSprites(codeKind: number): any[] {
            if (codeKind < this.tileKind && this.spriteCodes.indexOf(codeKind) != -1) {
                return this.sprites[codeKind]
            } else if (codeKind > this.tileKind) {
                if (game.currentScene().spritesByKind[codeKind])
                    return game.currentScene().spritesByKind[codeKind].sprites()
            }
            return null;
        }
        //
        private actions: ClosedAction[] = [];
        private update() {
            // first recompute the map
            this.spriteMap.copyFrom(this.tileMap)
            this.multiples.fill(0)
            this.sprites.forEach((arr, code) => {
                if (arr) {
                    arr.forEach((sprite) => {
                        let col = sprite.getColumn(), row = sprite.getRow()
                        let here = this.spriteMap.getPixel(col, row)
                        if (this.spriteCodes.indexOf(here) != -1 && !this.multiples.getPixel(col, row)) {
                            // we have more than 1 sprite at (col,row)
                            this.multiples.setPixel(col, row, 1)
                        } else {
                            // no sprite at this tile yet
                            this.spriteMap.setPixel(col, row, code)
                        }
                    })
                }
            })

            // because we queue up actions, there are no state changes here
            // update sprites in motion
            this.sprites.forEach((a) => { if (a) a.forEach((s) => s.updateInMotion()) })
            // update stationary sprites
            this.sprites.forEach((a) => { if (a) { a.forEach((s) => s.updateStationary()) } })
            // now apply the updates
            this.actions.forEach((a) => this.processAction(a))
            this.actions = []
        }

        public addAction(self: boolean, action: TheActions, args: any[]) {
            let a = new ClosedAction(self, action, args)
            // resolve conflicts on motion
            if (a.action == TheActions.Move) {
                if (a.self) {
                    // remove non-self moves on same sprite
                    let filter = this.actions.filter(b => !(b.action == TheActions.Move && b.args[0] == a.args[0] && !b.self))
                    this.actions = filter
                } else {
                    // don't add if a self move on same sprite
                    if (this.actions.find(b => (b.action == TheActions.Move && b.args[0] == a.args[0] && b.self)))
                        return;
                }
            }
            this.actions.push(a)
        }

        private processAction(a: ClosedAction) {
            switch (a.action) {
                case TheActions.Move: {
                    (<TileSprite>a.args[0]).moveOne(a.args[1])
                    break;
                }
                case TheActions.Stop: {
                    (<TileSprite>a.args[0]).deadStop()
                    break;
                }
                case TheActions.KnockBack: {
                    (<TileSprite>a.args[0]).knockBack()
                    break;
                }
                case TheActions.Remove: {
                    this.removeSprite(a.args[0])
                    break;
                }
                case TheActions.Create: {
                    this.createTileSpriteAt(a.args[0], a.args[1])
                    break;
                }
                case TheActions.SetTile: {
                    this.setCode(a.args[0], a.args[1])
                    break;
                }
            }
        }

        // handlers
        private initHandlers(kind: number) {
            if (!this.atRestHandlers[kind]) this.atRestHandlers[kind] = []
            if (!this.onPushHandlers[kind]) this.onPushHandlers[kind] = []
            if (!this.moveIntoHandlers[kind]) this.moveIntoHandlers[kind] = []
        }
        private invokeHandlers(s: TileSprite, dir: number, intercept: boolean) {
            if (dir == CallBackKind.AtRest) {
                this.atRestHandlers[s.kind()].forEach((h) => { h(s) });
            } else if (dir >= CallBackKind.MoveInto) {
                dir = dir - CallBackKind.MoveInto;
                this.moveIntoHandlers[s.kind()].forEach((h) => { h(s, dir) });
            } else {
                // process requests out of band
                if (intercept) {
                    let r = this.interceptRequests.find(r => r.sprite == s && r.dir == dir)
                    if (r) {
                        dir = r.next;
                        // restore default behavior
                        r.next = r.dir
                    }
                }
                this.onPushHandlers[s.kind()].forEach((h) => { h(s, dir) });
            }
        }
        private hookupHandlers(s: TileSprite) {
            s.onTileSpriteEvent((s, d) => this.invokeHandlers(s,d,true))
        }

        // support for key stroke handling
        private interceptRequests: { sprite: TileSprite, dir: TileDir, next: TileDir}[] = [];
        private keyDowns: boolean[] = [ false, false, false, false, false];
        private getRequest(sprite: TileSprite, dir: TileDir) {
            let r = this.interceptRequests.find(r => r.sprite == sprite && r.dir == dir)
            if (!r) {
                r = { sprite: sprite, dir: dir, next: dir };
                this.interceptRequests.push(r)
            }
            return r
        }
        requestPush(sprite: TileSprite, dir: TileDir) {
            this.keyDowns[dir] = true;
            // is the sprite moving?
            if (sprite.getDirection() == TileDir.None) {
                // no - generate push request
                this.invokeHandlers(sprite, dir, false);
                let r = this.getRequest(sprite, dir);
                // set default next direction
                r.next = dir;
            } else {
                // yes - update the next direction for sprite
                let r = this.getRequest(sprite, sprite.getDirection());
                r.next = dir;
            }
        }
        requestStop(sprite: TileSprite, dir: TileDir) {
            this.keyDowns[dir] = false;
            // is something else down?
            let r = this.getRequest(sprite, dir);
            r.next = TileDir.None;
            let r2 = this.getRequest(sprite, sprite.getDirection())
            // if no change to direction, then stop
            let down = this.keyDowns.indexOf(true)
            if (down != -1)
                r2.next = down; 
        }
    }

    class BindController {
        private sprite: TileSprite;
        private world: TileWorld;
        constructor() { }
        private requestMove(dir: TileDir) {
            this.world.requestPush(this.sprite, dir)
        }
        private requestStop(dir: TileDir) {
            this.world.requestStop(this.sprite, dir)
        }
        // basic movement for tile sprite
        bindToController(w: TileWorld, s: TileSprite) {
            this.world = w;
            this.sprite = s;
            scene.cameraFollowSprite(s)
            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(TileDir.Left)
            })
            controller.left.onEvent(ControllerButtonEvent.Released, () => {
                this.requestStop(TileDir.Left)
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(TileDir.Right)
            })
            controller.right.onEvent(ControllerButtonEvent.Released, () => {
                this.requestStop(TileDir.Right)
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(TileDir.Up)
            })
            controller.up.onEvent(ControllerButtonEvent.Released, () => {
                this.requestStop(TileDir.Up)
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                this.requestMove(TileDir.Down)
            })
            controller.down.onEvent(ControllerButtonEvent.Released, () => {
                this.requestStop(TileDir.Down)
            })
        }
    }

    // helpers

    export interface Tile {
        getColumn(): number;
        getRow(): number;
    }

    // a cursor is just a coordinate
    class Cursor implements Tile {
        private col: number;
        private row: number;
        constructor(s: Tile, dir: TileDir, dir2: TileDir = TileDir.None) {
            this.col = s.getColumn();
            this.row = s.getRow();
            this.move(dir); 
            this.move(dir2)
        }
        private move(dir: TileDir) {
            switch (dir) {
                case TileDir.Left: this.col--; break;
                case TileDir.Right: this.col++; break;
                case TileDir.Up: this.row--; break;
                case TileDir.Down: this.row++; break;
            }
        }
        public getColumn() { return this.col }
        public getRow() { return this.row }
    }

    // for assertion checking
    class CheckFailed {  }
    let checkFailed = new CheckFailed();
    function check(expr: boolean) {
        if (!expr) {
            throw checkFailed;
        }
    }

    // state here supports blocks

    let myWorld = new TileWorld();
    let myPlayerController = new BindController()
    // keep track of sprites passed down through active handler
    // so user code doesn't need to refer to it.
    let active: TileSprite[] = [];
    // for current handler, track the sprites targeted by asserytions
    let targets: { [index:number]: TileSprite } = {};

    function getTargetSprite(dir: TileDir) {
        return targets[dir]
    }

    function enterHandler(t: TileSprite) {
        active.push(t);
        targets = {};
    }

    function exitHandler(t: TileSprite) {
        active.pop();
        targets = {}
    }

    /**
     * Set the map for placing tiles in the scene
     * @param map
     */
    //% blockId=TWsettilemap block="set tile map to %map=tilemap_image_picker"
    //% group="Tiles"
    export function setTileMap(map: Image) {
        myWorld.setMap(map)
    }

    /**
     * Set the background tile
     * @param color
     */
    //% group="Tiles"
    //% blockId=TWsetbackgroundtile block="set background tile to %color=colorindexpicker"
    export function setBackgroundTile(code: number) {
        myWorld.setBackgroundTile(code)
    }

    /**
     * Map a color to a 16x16 tile image and sprite kind. 
     * @param code
     * @param image
     * @param moving
     * @param kind
     */
    //% blockId=TWaddsprite block="map $code=colorindexpicker to $moving sprite $image=tile_image_picker as $kind=spritekind"
    //% group="Tiles"
    //% inlineInputMode=inline
    export function addSprite(code: number, image: Image, moving: Spritely, kind: number) {
        if (moving == Spritely.Fixed)
            myWorld.addTiles(code, image, kind)
        else
            myWorld.addTileSprites(code, image, kind)
    }

    /**	
    * Move sprite with buttons	
    * @param color	
    */
    //% group="Tiles"	
    //% blockId=TWmoveButtons block="push $kind=spritekind on dpad"
    export function moveWithButtons(kind: number) {
        let sprites = game.currentScene().spritesByKind[kind].sprites()
        if (sprites && sprites.length > 0) {
            let first = sprites[0]
            if (first instanceof TileSprite) {
                myPlayerController.bindToController(myWorld, first)
            }
        }
    }

    //% blockId=TWgettilecode block="get code at $dir=tiledir"
    //% group="Tiles"
    export function getCode(dir: number) {
        let sprite = getCurrentSprite()
        if (sprite) {
            let cursor = new Cursor(sprite, dir);
            return myWorld.getCode(cursor)
        }
        return 0;
    }

    // notifications

    /**
     * Act on a sprite that is resting on a tile
     * @param body code to execute
     */
    //% group="Events" color="#444488"
    //% blockId=TWontilestationary block="at rest $kind=spritekind"
    //% blockAllowMultiple=1 draggableParameters="reporter"
    export function onChangeAround(kind: number, h: () => void) {
        myWorld.ifAtRest(kind, (t) => {
            try {
                enterHandler(t)
                h() 
            } catch (e) {
            } finally {
                exitHandler(t)
            }
        });
    }

    /**
     * Sprite is at center of tile and received request to move
     * @param body code to execute
     */
    //% group="Events" color="#444488"
    //% blockId=TWontilearrived block="on push $kind=spritekind $dir"
    //% blockAllowMultiple=1 draggableParameters="reporter"
    export function onMoveRequest(kind: number, h: (dir: TileDir) => void) {
        myWorld.onPushRequest(kind, (t, d) => {
            try {
                enterHandler(t)
                h(d)
            } catch (e) {
            } finally {
                exitHandler(t)
            }
        })
    }

    /**
     * Sprite is moving into a tile
     * @param body code to execute
     */
    //% group="Events" color="#444488"
    //% blockId=TWontiletransition block="if $kind=spritekind moves $dir into tile"
    //% blockAllowMultiple=1 draggableParameters="reporter"
    export function onMovedInto(kind: number, h: (dir: TileDir) => void) {
        myWorld.onMoveInto(kind, (t, d) => {
            try {
                enterHandler(t)
                h(d)
            } catch (e) {
            } finally {
                exitHandler(t)
            }
        })
    }

    /**	
    * Get the currently active sprite	
    */
    //% group="Tiles"	
    //% blockId=TWgetsprite block="get current sprite"
    export function getCurrentSprite(): TileSprite {
        if (active.length > 0)
            return active[active.length-1]
        else
            return null
    }


    //% group="Tiles"	
    //% blockId=TWgetspritecount block="get sprite count $code=colorindexpicker"
    export function getSpriteCount(code: number): number {
        return myWorld.getSpritesCount(code)
    }

    // Assertions

    //% blockId=TWhascode block="pass if $size $code=colorindexpicker at $dir=tiledir $dir2=tiledir "
    //% group="Assertions" color="#448844" inlineInputMode=inline
    export function hasCode(code: number, dir: number = TileDir.None, dir2: number = TileDir.None, size: ResultSet = ResultSet.Zero) {
        let sprite = getCurrentSprite()
        if (sprite) {
            let delta = (dir == TileDir.None && dir2 == TileDir.None) ? (code == sprite.getCode() ? -1 : 0) : 0
            supportHas(code, true, dir, dir2, size, sprite, delta)
        }
    }

    //% blockId=TWhaskind block="pass if $size $kind=spritekind at $dir=tiledir $dir2=tiledir"
    //% group="Assertions" color="#448844" inlineInputMode=inline
    export function hasKind(kind: number, dir: number = TileDir.None, dir2: number = TileDir.None, size: ResultSet = ResultSet.Zero) {
        let sprite = getCurrentSprite()
        if (sprite) {
            let delta = (dir == TileDir.None && dir2 == TileDir.None) ? (kind == sprite.kind() ? -1 : 0) : 0
            supportHas(kind, false, dir, dir2, size, sprite, delta)
        }
    }

    // record the sprite, but not two steps away
    function recordSprite(sprites: TileSprite[], dir: TileDir, dir2: TileDir) {
        if (sprites && sprites.length > 0) {
            if (dir == TileDir.None || dir2 == TileDir.None) {
                let theDir = (dir == TileDir.None) ? dir2 : dir
                targets[theDir] = sprites[0]
            }
        }
    }

    function supportHas(codeKind: number, code: boolean, dir: TileDir, dir2: TileDir, 
                        size: ResultSet, sprite: TileSprite, delta: number) {
        let cursor = new Cursor(sprite, dir, dir2)
        let approxCount = myWorld.countCodeKindAt(codeKind, cursor)
        if (size == ResultSet.Zero || size == ResultSet.One) {
            if (approxCount + delta >= 0) {
                check(size == ResultSet.Zero ? approxCount + delta == 0 : approxCount + delta > 0)
                recordSprite(myWorld.getSprites(codeKind, cursor), dir, dir2)
                return;
            }
        } else if (size == ResultSet.Only) {
            // this only applies to fixed sprites, so count is accurate
            check(!myWorld.hasMovableSprite(cursor) && approxCount == 1)
            return;
        }
        // assert(!myWorld.isFixedCode(codeKind))
        let sprites = myWorld.getSprites(codeKind, cursor)
        let kindOfFixed = myWorld.getKindFromCode(myWorld.getCode(cursor))
        let count = (sprites ? sprites.length : 0) + (code ? 0 : (kindOfFixed == codeKind ? 1 : 0))
        if (size == ResultSet.Zero) {
            check(count + delta == 0)
        } else if (size == ResultSet.One) {
            check(count + delta > 0)
            recordSprite(sprites, dir, dir2)
        }
    }

    /**
     * Check if a direction is one of several values.
     */
    //% group="Assertions" color="#448844"
    //% blockId=TWisoneof block="pass if %dir=variables_get(dir) $cmp %c1 %c2"
    //% inlineInputMode=inline
    export function _isOneOf(dir: number, cmp: Membership = Membership.OneOf, c1: TileDir, c2: TileDir) {
        if (cmp == Membership.OneOf)
            check(dir == c1 || dir == c2) 
        else
            check(dir != c1 && dir != c2)
    }             

    // Actions
    
    // request sprite to move in specified direction
    //% blockId=TWmoveself block="move $dir=tiledir self"
    //% group="Actions" color="#88CC44"
    export function moveSelf(dir: number) {
        let sprite = getCurrentSprite()
        if (sprite) {
            myWorld.addAction(true, TheActions.Move, [sprite,dir])
        }
    }

    // request sprite to move in specified direction
    //% blockId=TWmoveother block="move $dir=tiledir other at $otherdir=tiledir"
    //% group="Actions" color="#88CC44"
    export function moveOther(otherdir: number, dir: number) {
        let sprite = getTargetSprite(otherdir)
        if (sprite) {
            myWorld.addAction(false, TheActions.Move, [sprite, dir])
        }
    }

    //% blockId=TWknockbackself block="knockback self"
    //% group="Actions" color="#88CC44"
    export function knockBackSelf() {
        let sprite = getCurrentSprite()
        if (sprite && sprite.getDirection() != TileDir.None) {
            myWorld.addAction(false, TheActions.KnockBack, [sprite])
        }
    }

    //% blockId=TWstopother block="stop other $otherdir=tiledir"
    //% group="Actions" color="#88CC44"
    export function stopOther(otherdir: number) {
        let sprite = getTargetSprite(otherdir)
        if (sprite && sprite.getDirection() != TileDir.None) {
            myWorld.addAction(false, TheActions.Stop, [sprite])
        }
    }
    
    //% blockId=TWremoveSelf block="remove self"
    //% group="Actions" color="#88CC44"
    export function removeSelf() {
        let sprite = getCurrentSprite()
        if (sprite) {
            myWorld.addAction(true, TheActions.Remove, [sprite])
        }
    }

    //% blockId=TWremoveother block="remove other at $otherdir=tiledir"
    //% group="Actions" color="#88CC44"
    export function removeOther(otherdir: number) {
        let sprite = getTargetSprite(otherdir)
        if (sprite) {
            myWorld.addAction(false, TheActions.Remove, [sprite])
        }
    }

    // direction-based 
    // - set tile code
    // - create sprite

    //% blockId=TWsettilecode block="set code $code=colorindexpicker at $dir=tiledir"
    //% group="Actions" color="#88CC44"
    export function setCode(code: number, dir: number) {
        let sprite = getCurrentSprite()
        if (sprite) {
            let cursor = new Cursor(sprite, dir);
            myWorld.addAction(false, TheActions.SetTile, [cursor, code])
        }
    }

    //% blockId=TWcreatesprite block="create sprite $code=colorindexpicker at $dir=tiledir"
    //% group="Actions" color="#88CC44"
    export function createSprite(code: number, dir: number) {
        let sprite = getCurrentSprite()
        if (sprite) {
            myWorld.addAction(false, TheActions.Create, [code, new Cursor(sprite, dir)])
        }
    }
}
