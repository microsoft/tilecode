namespace tileWorldEditor {

    import MenuOption = scene.systemMenu.MenuOption
    import PauseMenu = scene.systemMenu.PauseMenu
    import MenuTheme = scene.systemMenu.MenuTheme

    // smaller cards for pop-up menu
    const CARD_NORMAL_20 = img`
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        1 1 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 1 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1
        1 1 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 1 1
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
    `;
    const CARD_SELECTED_20 = img`
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 .
        2 2 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 2 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 2
        2 2 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 2 2
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 .
    `
    const CARD_ACTIVE_20 = img`
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 .
        4 4 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 4 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 4
        4 4 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 4 4
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 .
    `
    // command set
    // commands
    const map = img`
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
    `
    const play = img`
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
    `
    const pencil = img`
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
    `
    const paint = img`
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
    `
    // the commands - move out to toolbox
    export let mapSprite = new Sprite(map)
    mapSprite.data = "Map"
    mapSprite.setFlag(SpriteFlag.Invisible, true)

    export let paintSprite = new Sprite(paint)
    paintSprite.data = "Paint"
    paintSprite.setFlag(SpriteFlag.Invisible, true)
    
    export let playSprite = new Sprite(play)
    playSprite.data = "Play"
    playSprite.setFlag(SpriteFlag.Invisible, true)
    
    export let editSprite = new Sprite(pencil)
    editSprite.data = "Program"
    editSprite.setFlag(SpriteFlag.Invisible, true)

    function buildOptionList(s: Sprite[], h: (s:string) => void): MenuOption[] {
        let options: MenuOption[] = [];
        s.forEach((s: Sprite, index: number) => {
            options.push(new MenuOption(s.image, () => s.data, () => { h(s.data) }));
        })
        options.push(new MenuOption(scene.systemMenu.CLOSE_MENU_ICON, () => "CLOSE", () => { h(null) }));
        return options;
    }

    function toolboxTheme() {
        let myTheme = scene.systemMenu.buildMenuTheme(16, 8)
        myTheme.selectedCard = CARD_SELECTED_20;
        myTheme.activeCard = CARD_ACTIVE_20;
        myTheme.basicCard = CARD_NORMAL_20;
        myTheme.headerText = "Toolbox";
        return myTheme;
    }

    export class ToolboxMenu extends PauseMenu {
        private myTheme: MenuTheme;
        constructor(s: Sprite[], h: (s: string) => void) {
            super(() => buildOptionList(s,h), toolboxTheme())
        }
        // get rid of floating animation
        onUpdate() { }
    }
}