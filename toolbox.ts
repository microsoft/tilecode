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


    function buildOptionList(userSprites: Sprite[],  commandSprites: Sprite[], h: (s:string) => void): MenuOption[] {
        let options: MenuOption[] = [];
        userSprites.forEach((s: Sprite, index: number) => {
            options.push(new MenuOption(s.image, () => s.data, () => { h(s.data) }));
        })
        commandSprites.forEach((s: Sprite, index: number) => {
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
        constructor(user: Sprite[], commands: Sprite[], h: (s: string) => void) {
            super(() => buildOptionList(user, commands, h), toolboxTheme())
        }
        // get rid of floating animation
        onUpdate() { }
    }
}