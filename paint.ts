enum RuleType {
    Resting,
    Moving,
    Pushing, 
    Colliding
}

enum CommandType {
    None,
    Move,
    Paint,
}


enum AttrType {
    Exclude,  // => !Only
    Include,  // => Only 
    OneOf,    // => Only   (= Include in case there is only OneOf)
    Only      //
}

type AttrsAt = {
    x: number;
    y: number;
    attrs: AttrType[];
}

// deprecate all below

type Guard = {
    x: number;
    y: number;
    none?: string[];
    some?: string[];
    has?: string[];
    exactly?: string[];
}

type Command = {
    kinds: string[];
    inst: CommandType;
    dir?: TileDir;
    kind?: string;
    highlight?: boolean;
}

type Rule = {
    event: RuleType;
    kinds: string[];
    dir?: TileDir;
    guards: Guard[];
    commands: Command[];
}

let bd = ["Boulder", "Diamond"]

let ruleA: Rule =  {
    event:  RuleType.Resting,
    kinds:  ["Player"],
    dir:    TileDir.None,
    guards: [],
    commands: [ { kinds: ["Player"], inst:CommandType.Paint, 
                    dir:TileDir.None, kind: "Space"} ] 
}

let ruleB: Rule = {
    event: RuleType.Pushing,
    kinds: ["Player"],
    dir: TileDir.Right,
    guards: [ { x:1, y:0, none:["Wall", "Boulder"] } ],
    commands: [{
        kinds: ["Player"], inst: CommandType.Move,
        dir: TileDir.Right
    }]
}

let ruleC: Rule = {
    event: RuleType.Pushing,
    kinds: ["Player"],
    dir: TileDir.Right,
    guards: [{ x: 1, y: 0, has: ["Boulder"] },
             { x: 2, y: 0, exactly: ["Space"] }
            ],
    commands: [
        { kinds:["Player"], inst: CommandType.Move, dir: TileDir.Right},
        { kinds:["Boulder"], inst: CommandType.Move, dir: TileDir.Right}
    ]
}

let ruleC_Left: Rule = {
    event: RuleType.Pushing,
    kinds: ["Player"],
    dir: TileDir.Left,
    guards: [{ x: -1, y: 0, has: ["Boulder"] },
    { x: -2, y: 0, exactly: ["Space"] }
    ],
    commands: [
        { kinds: ["Player"], inst: CommandType.Move, dir: TileDir.Left },
        { kinds: ["Boulder"], inst: CommandType.Move, dir: TileDir.Left }
    ]
}

let ruleG: Rule = {
    event: RuleType.Resting,
    kinds: bd,
    guards: [
        { x: 0, y: 1, exactly: ["Space"] },
    ],
    commands: [
        { kinds: bd, inst: CommandType.Move, dir: TileDir.Down }
    ]
}

let ruleH: Rule = {
    event: RuleType.Resting,
    kinds: bd,
    guards: [
        { x: -1, y: 0, exactly: ["Space"] },
        { x: -1, y: 1, exactly: ["Space"] },
        { x: 0, y: 1, some: bd },
    ],
    commands: [
        { kinds: bd, inst: CommandType.Move, dir: TileDir.Left, highlight: true},
        { kinds: bd, inst: CommandType.None }
    ]
}

let ruleI: Rule = {
    event: RuleType.Moving,
    dir: TileDir.Down,
    kinds: bd,
    guards: [
        { x: 0, y: 1, has: ["Space"], none: bd  }
    ],
    commands: [
        { kinds: bd, inst: CommandType.Move, dir: TileDir.Down }
    ]
}

let ruleAttr: Rule = {
    event: RuleType.Moving,
    dir: TileDir.Down,
    kinds: bd,
    guards: [ ],
    commands: []
}

namespace tileWorldEditor {
    
    export class PaintRule {
        private commands: Sprite[] = [];
        private toolBox: ToolboxMenu;
        private tileMap: Image;
        private background: Image;
        private cursor: Sprite;
        private cursorAnim: animation.Animation;
        private currentTileSprite: Sprite;
        private centerX: number;
        private centerY: number;
        private menuOn: boolean;
        private showSelected: Sprite;
        private selected: Sprite;
        private attrs: Sprite[];
        private menuItems: Sprite[];
        constructor(private manager: SpriteManager, private rule: Rule) {  // private centerSprite: Sprite) {
            this.selected = null;
            this.attrs = [];
            this.menuItems = [];
            this.menuOn = false;
            this.tileMap = image.create(10, 7)
            this.background = image.create(160, 120)
            scene.setBackgroundImage(this.background)
            scene.setTileMap(this.tileMap)
            this.manager.setScene()
            // add the arrows
            arrows.forEach((img, i) => {
                let arrow = new Sprite(img);
                arrow.data = arrowNames[i]
                arrow.setKind(arrowValues[i])
                arrow.setFlag(SpriteFlag.Invisible, true)
                this.commands.push(arrow)
            })
            this.commands.push(mapSprite);

            this.makeContext(2, 2, null)
            this.centerX = 2 * 16 + 8
            this.centerY = 2 * 16 + 8

            this.showSelected = sprites.create(cursorOut)
            this.showSelected.setFlag(SpriteFlag.Invisible, true)

            this.cursor = sprites.create(cursorIn, SpriteKind.Player)
            this.cursor.setFlag(SpriteFlag.Invisible, false)
            this.cursor.x = 40
            this.cursor.y = 56
            this.cursor.z = 50;
            scene.cameraFollowSprite(this.cursor)

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) > 0)
                    this.cursor.x -= 16
                this.update()
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) < this.tileMap.width - 1)
                    this.cursor.x += 16
                this.update()
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) > 0)
                    this.cursor.y -= 16
                this.update()
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) < this.tileMap.height - 1)
                    this.cursor.y += 16
                this.update()
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (!this.menuOn) {
                    let x = -2
                    this.manager.sprites().forEach((s, i) => {
                        if (i > 0) {
                            let spr = this.showInDiamond(x, 4, s.image)
                            this.menuItems.push(spr);
                            x++;
                        }
                    })
                    let checkS = this.showInDiamond(-2, 3, checkCenter);
                    checkS.data = "Check";
                    this.attrs.push(checkS)
                    let negateS = this.showInDiamond(-1, 3, negateCenter);
                    negateS.data = "Not";
                    this.attrs.push(negateS)
                    let oneofS = this.showInDiamond(0, 3, oneofCenter);
                    oneofS.data = "OneOf"
                    this.attrs.push(oneofS)
                    let eraseS = this.showInDiamond(1, 3, eraseCenter);
                    eraseS.data = "erase"
                    this.attrs.push(eraseS)
                }
                this.menuOn = true;
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.menuOn) {
                    this.attrs.forEach(m => {
                        if (this.cursor.overlapsWith(m)) {
                            this.selected = m;
                            this.showSelected.x = m.x
                            this.showSelected.y = m.y
                            this.showSelected.setFlag(SpriteFlag.Invisible, false)
                        }
                    })
                    this.menuItems.forEach(m => {
                        if (this.cursor.overlapsWith(m)) {
                            if (this.selected) {
                                if (this.selected.data != "erase") {
                                    let index = arrowNames.indexOf(this.selected.data)
                                    if (index >= 0) {
                                        let spr = sprites.create(arrows[index])
                                        spr.x = m.x; spr.y = m.y
                                    }
                                } else {

                                }
                            }
                        }
                    })
                }
                // this.showMenu()
            })

            this.doit(this.rule);
        }

        private doit(rule: Rule) {
            this.background.fill(11)
            this.background.fillRect(0, 0, 80, 120, 12)
            this.background.print("When", 0, 0)
            this.background.print("Do", 80, 0)

            let centerImage = manager.findName(rule.kinds[0]).image.clone()
            if (false) {
                let other = manager.findName(rule.kinds[1]).image;
                for (let x = 8; x < 16; x++) {
                    for (let y = 0; y < 15; y++) {
                        centerImage.setPixel(x, y, other.getPixel(x, y))
                    }
                }
            }
            this.showInDiamond(0, 0, centerImage)

            // the color code of selected tile/sprite
            this.currentTileSprite = undefined;

            if (rule.event == RuleType.Moving) {
                let arrowSprite = this.commands.find(s => s.kind() == rule.dir);
                this.showInDiamond(0, 0, arrowSprite.image)
            } else if (rule.event == RuleType.Pushing) {
                let arrowSprite = this.commands.find(s => s.kind() == rule.dir);
                let ax = rule.dir == TileDir.Left ? 1 : (rule.dir == TileDir.Right ? -1 : 0)
                let ay = rule.dir == TileDir.Down ? -1 : (rule.dir == TileDir.Up ? 1 : 0)
                this.showInDiamond(ax, ay, arrowSprite.image)
            }
            let none: string[] = []
            let has: string[] = []
            if (rule.guards) {
                rule.guards.forEach(g => {
                    if (g.some) {
                        let userSprite = this.manager.findName(g.some[0])
                        this.showInDiamond(g.x, g.y, userSprite.image)
                    }
                    if (g.none) {
                        let notSprite = this.commands.find(s => s.data == "Not");
                        this.showInDiamond(g.x, g.y, notSprite.image, 10)
                        if (g.has) {
                            let checkS = this.commands.find(s => s.data == "Check");
                            this.showInDiamond(g.x, g.y, checkS.image, 10)
                        }
                        none = g.none
                        has = g.has
                    }
                    if (g.has && !g.none) {
                        let userSprite = this.manager.findName(g.has[0])
                        this.showInDiamond(g.x, g.y, userSprite.image)
                    }
                    if (g.exactly) {
                        let userSprite = this.manager.findName(g.exactly[0])
                        this.showInDiamond(g.x, g.y, userSprite.image)
                    }
                })
            }
            if (none) {
                let x = -2
                if (has) {
                    has.forEach(s => {
                        let userSprite = this.manager.findName(s)
                        this.showInDiamond(x, 4, userSprite.image)
                        let noSprite = this.commands.find(s => s.data == "Check")
                        this.showInDiamond(x, 4, noSprite.image, 10)
                        x++
                    })
                }
                none.forEach(s => {
                    let userSprite = this.manager.findName(s)
                    this.showInDiamond(x, 4, userSprite.image)
                    let noSprite = this.commands.find(s => s.data == "Not")
                    this.showInDiamond(x, 4, noSprite.image, 10)
                    x++
                })
            }
            if (rule.commands) {
                let y = -1
                rule.commands.forEach(c => {
                    let userSprite = this.manager.findName(c.kinds[0])
                    this.showInDiamond(3, y, userSprite.image)
                    if (c.highlight && y == -1) {
                        this.showInDiamond(0, 0, cursorOut, 10)
                        this.showInDiamond(3, y, cursorOut, 10)
                    }
                    if (c.inst == CommandType.Move) {
                        let arrowSprite = this.commands.find(s => s.kind() == c.dir);
                        this.showInDiamond(4, y, arrowSprite.image)
                    } else if (c.inst == CommandType.Paint) {
                        this.showInDiamond(4, y, paintSprite.image);
                        let userSprite = this.manager.findName(c.kind)
                        this.showInDiamond(5, y, userSprite.image)
                    }
                    y++
                })
            }
        }

        private showInDiamond(c: number, r: number, img: Image, z: number = 0) {
            let spr = sprites.create(img)
            spr.x = this.centerX + c * 16
            spr.y = this.centerY + r * 16
            if (z != 0) {
                spr.z = z
            }
            return spr
        }

        private update() {
            /*
            if (this.inDiamond()) {
                this.cursorAnim.frames = [editSprite.image]
            } else {
                this.cursorAnim.frames = [genericSprite]
            }*/
        }

        private manhattanDistance2(dCol: number, dRow: number) {
            let row = this.cursor.y >> 4
            let col = this.cursor.x >> 4
            return (Math.abs(dCol - col) + Math.abs(dRow - row)) <= 2
        }
        private inDiamond() {
            return this.manhattanDistance2(2, 2) || this.manhattanDistance2(7, 2)
        }

        private closeMenu(command: string) {
            if (this.toolBox) {
                this.toolBox.dispose();
                this.toolBox = undefined;
                controller._setUserEventsEnabled(true);
                game.popScene();
            }
            if (command) {
                // look up name of sprite and get code
                let s = this.manager.findName(command)
                if (s) {
                    this.currentTileSprite = s;
                    if (this.cursorAnim.frames.length > 1)
                        this.cursorAnim.frames.pop();
                    this.cursorAnim.frames.push(s.image)
                } else if (command == "Map") {
                    game.popScene();
                }
            }
        }

        private showMenu() {
            if (this.toolBox) return;
            game.pushScene();
            this.toolBox = new ToolboxMenu(this.manager.sprites(), this.commands, (s: string) => { this.closeMenu(s) });
            this.toolBox.show();
        }

        private makeContext(row: number, col: number, center: Sprite = null) {
            for (let i = -2; i <= 2; i++) {
                this.tileMap.setPixel(col + i, row, 1);
                this.tileMap.setPixel(col, row + i, 1);
                if (i > -2 && i < 2) {
                    this.tileMap.setPixel(col + i, row + i, 1);
                    this.tileMap.setPixel(col + i, row - i, 1);
                }
            }
            if (center) {
                this.tileMap.setPixel(row, col, center.kind())
            }
        }
    } 
}