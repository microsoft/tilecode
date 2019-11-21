enum RuleType {
    Resting,
    Moving,
    Push
}

enum CommandType {
    Move,
    Paint,
}

type Guard = {
    x: number;
    y: number;
    none?: string[];
    some?: string[];
    has?: string[];
    exactly?: string[];
}

type Command = {
    x: number;
    y: number;
    inst: CommandType;
    dir?: TileDir;
    kind?: string;
}

type Rule = {
    event: RuleType;
    kinds: string[];
    dir?: TileDir;
    guards: Guard[];
    commands: Command[];
}

let ruleA: Rule =  {
    event:  RuleType.Resting,
    kinds:  ["Player"],
    dir:    TileDir.None,
    guards: [],
    commands: [ { x:0, y:0, inst:CommandType.Paint, 
                    dir:TileDir.None, kind: "Space"} ] 
}

let ruleB: Rule = {
    event: RuleType.Push,
    kinds: ["Player"],
    dir: TileDir.Right,
    guards: [ { x:1, y:0, none:["Wall", "Boulder"] } ],
    commands: [{
        x: 0, y: 0, inst: CommandType.Paint,
        dir: TileDir.None, kind: "Space"
    }]
}

let ruleC: Rule = {
    event: RuleType.Push,
    kinds: ["Player"],
    dir: TileDir.Right,
    guards: [{ x: 1, y: 0, has: ["Boulder"] },
                { x: 2, y: 0, exactly: ["Space"] }
            ],
    commands: [
        { x: 0, y: 0, inst: CommandType.Move, dir: TileDir.Right},
        { x: 1, y: 0, inst: CommandType.Move, dir: TileDir.Right}
    ]
}

let ruleG: Rule = {
    event: RuleType.Resting,
    kinds: ["Boulder", "Diamond"],
    guards: [
        { x: 0, y: -1, exactly: ["Space"] },
    ],
    commands: [
        { x: 0, y: 0, inst: CommandType.Move, dir: TileDir.Down }
    ]
}

let ruleH: Rule = {
    event: RuleType.Resting,
    kinds: ["Boulder", "Diamond"],
    guards: [
        { x: -1, y: 0, exactly: ["Space"] },
        { x: -1, y: -1, exactly: ["Space"] },
        { x: 0, y: -1, some: ["Boulder", "Diamond"] },
    ],
    commands: [
        { x: 0, y: 0, inst: CommandType.Move, dir: TileDir.Left }
    ]
}

let ruleI: Rule = {
    event: RuleType.Moving,
    kinds: ["Boulder", "Diamond"],
    guards: [
        { x: 0, y: -1, has: ["Space"], none: ["Boulder", "Diamond"]  }
    ],
    commands: [
        { x: 0, y: 0, inst: CommandType.Move, dir: TileDir.Down }
    ]
}
