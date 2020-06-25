open System

type Direction = Up | Down | Left | Right
type DirectionPredicate = OnePred of Direction | Resting | Moving
type Button = OneButton of Direction | AButton
type RuleKind = Change | ButtonPress of Button | Collision | Never
type SpriteKind = string
type TileKind = string
type GameArg = Win | Lose | Score10
type Command =
   | Move of Direction
   | Stop
   | UTurn
   | Create of SpriteKind
   | Paint of TileKind
   | Portal of TileKind
   | Destroy
   | Game of GameArg
   | Block of SpriteKind
type Guard =
   | TilePredicate of (string list) * (string list) * (string list)                                                 
type GuardedCommand =
   | WhenDo of int * int * Guard * DirectionPredicate * Command list
type OneRule =
   | Rule of RuleKind * GuardedCommand list
type OneProgram = 
   | Program of (int * OneRule) list

// ------------------------------------------------------------------------
// TW state
                                                                                                                                                                                                                                                                       
// tile map
// sprite

// ------------------------------------------------------------------------
// virtual machine 
// - change semantics (guard changes from iteration i to i+1)

// - match guard against map
// - sprite witnesses identification
// - direction predicate match

// - phases
// - 0. global check
// - 1. button -shadows- change
// - 2. collision

// ------------------------------------------------------------------------
// unparser

let directionToString a =
   match a with
   | Up -> "up"
   | Down -> "down"
   | Left -> "left"
   | Right -> "right"

let buttonToString a =
   match a with
   | AButton -> "A"
   | OneButton(d)-> directionToString d

let listToString (sl: string list) =
   String.Join(":",List.toArray sl)

let commandToString c =
   match c with
   | Stop -> "move:stop"
   | UTurn -> "move:u-turn"
   | Move(d) -> "move:"+(directionToString d)
   | Destroy -> "destroy:none"
   | Create(k) -> "create:"+k
   | Paint(k) -> "paint:"+k
   | Portal(k) -> "portal:"+k
   | Block(k) -> "block:"+k
   | Game(g) ->
      match g with
      | Win -> "game:win"
      | Lose -> "game:lose"
      | Score10 -> "game:score10"

let printGuardedCommand gc =
   match gc with
   | WhenDo(col,row,TilePredicate(i,i2,e),dp,cmds) ->
      printfn "tile:%d:%d" col row;
      printfn "include:%s" (listToString i);
      printfn "include2:%s" (listToString i2);
      printfn "exclude:%s" (listToString e);
      cmds |> 
         List.map commandToString |> 
         List.iter (printfn "cmd:%s")

let printRule r =
   match r with
   | Rule(rk,gcl) ->
      match rk with
      | Change -> printfn "rule:change:none"
      | ButtonPress(a) -> 
         printfn "rule:press:%s" (buttonToString a)
      | Collision -> printfn "rule:collide:none"
      | Never -> printfn "rule:negate:none";
      gcl |> List.iter printGuardedCommand

let printProgram p =
   match p with
   | Program(l) -> List.iter (fun (i,r) -> printfn "id:%d" i; printRule r) l


// ------------------------------------------------------------------------
// parser

exception ParseException of string

let toDirection s =
   match s with
   | "up" -> Up
   | "down" -> Down
   | "left" -> Left
   | "right" -> Right
   | _ -> raise (ParseException("unexpected direction"))

let toButton s =
   match s with
   | "A" -> AButton
   | _ -> OneButton(toDirection s)

let toRuleKind one two =
   match one with
   | "change" -> Change
   | "collide" -> Collision
   | "negate" -> Never
   | "press" -> ButtonPress(toButton two)
   | _ -> raise (ParseException("unexpected rule kind"))

let toMove arg =
   match arg with
   | "stop" -> Stop
   | "u-turn" -> UTurn
   | _ -> Move(toDirection arg)

let toCommand (toks: string array) =
   assert(toks.Length = 2);
   match toks.[0] with
   | "move" -> toMove toks.[1]
   | "paint" -> Paint(toks.[1])
   | "spawn" -> Create(toks.[1])
   | "destroy" -> Destroy
   | "game" -> 
      match toks.[1] with
      | "win" -> Game(Win)
      | "lose" -> Game(Lose)
      | "score10" -> Game(Score10)
      | _ -> raise (ParseException("unexpected game arg"))
   | "portal" -> Portal(toks.[1])
   | "block" -> Block(toks.[1])
   | _ -> raise (ParseException("unexpected command"))

let rec toCommands (lines: string list) cmds =
   match lines with
   | [] -> (lines,List.rev cmds)
   | hd::tl ->
      let toks = hd.Split ':' in
      assert(toks.Length > 0)
      match toks.[0] with
      | "cmd" -> toCommands tl ((toCommand toks.[1..])::cmds)
      | _ -> (lines,List.rev cmds)

let rec toTilePredicate (lines: string list) (i,i2,e) =
   let optToList o = match o with None -> [] | Some(l) -> l in
   let makeRet l = (l,TilePredicate(optToList i,optToList i2, optToList e))
   let restToList (a: string array) = if a.Length > 1 then Some(Array.toList a.[1..]) else Some([])
   match lines with
   | [] -> makeRet lines
   | hd::tl ->
      let toks = hd.Split ':' in
      assert(toks.Length > 0)
      match toks.[0] with
      | "include" -> toTilePredicate tl (restToList toks,i2,e)
      | "include2" -> toTilePredicate tl (i,restToList toks,e)
      | "exclude" -> toTilePredicate tl (i,i2,restToList toks)
      | _ -> makeRet lines

let rec toGuardedCommands (lines: string list) gcs =
   match lines with
   | [] -> (List.rev gcs,[])
   | hd::tl -> 
      let toks = hd.Split ':' in
      assert(toks.Length > 0)
      match toks.[0] with
      | "tile" -> 
         assert(toks.Length = 3);
         let col, row = (toks.[1] |> int), (toks.[2] |> int) in
         let rest1, tp = toTilePredicate tl (None,None,None) in
         let rest2, cmds = toCommands rest1 [] in
         toGuardedCommands rest2 (WhenDo(col,row,tp,Resting,cmds)::gcs)
      | "id" -> (List.rev gcs,lines) 
      | _ -> raise (ParseException("unexpected guard"))

let toRule (lines: string list) =
   match lines with
   | [] -> raise (ParseException("expected a rule"))
   | hd::tl -> 
      let toks = hd.Split ':' in
      assert(toks.Length = 3);
      assert(toks.[0]="rule");
      let ruleKind = toRuleKind toks.[1] toks.[2] in
      let gcs, rest = toGuardedCommands tl []
      (rest, Rule(ruleKind,gcs)) 

let hasId (s:string) =
   let toks = s.Split ':'
   if toks.[0] = "id" then Some(toks.[1]) else None

let rec toProgram lines rules = 
   // read white space until id:number
   match lines with
   | [] -> Program(List.rev rules)
   | hd::tl -> 
      match hasId hd with 
      | None -> toProgram tl rules 
      | Some(id) -> 
         let rest,rule = toRule tl in
         toProgram rest ((id |> int,rule)::rules)

[<EntryPoint>]
let main argv =
   let lines = Array.toList (System.IO.File.ReadAllLines("rules.txt"))
   let rules = toProgram lines []
   printProgram rules
   0 // return an integer exit code

