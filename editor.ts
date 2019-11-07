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
    // world editing spriates
     const tile = img`
         b b b b b b b b b b b b b b b c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         b . . . . . . . . . . . . . . c
         c c c c c c c c c c c c c c c c
     `
     const cursorIn = img`
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
     `
     const cursorOut = img`
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
     `
     // commands
     const play = img`
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f 7 7 f f f f f f f f f f f f
         f f 7 7 7 7 f f f f f f f f f f
         f f 7 7 7 7 7 7 f f f f f f f f
         f f 7 7 7 7 7 7 7 7 f f f f f f
         f f 7 7 7 7 7 7 7 7 7 7 f f f f
         f f 7 7 7 7 7 7 7 7 7 7 1 1 f f
         f f 7 7 7 7 7 7 7 7 1 1 f f f f
         f f 7 7 7 7 7 7 1 1 f f f f f f
         f f 7 7 7 7 1 1 f f f f f f f f
         f f 7 7 1 1 f f f f f f f f f f
         f f 1 1 f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
     `
     const pencil = img`
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f 3 f f f f
         f f f f f f f f f f 3 3 3 f f f
         f f f f f f f f f 4 1 3 3 3 f f
         f f f f f f f f 4 4 e 1 3 f f f
         f f f f f f f 4 4 e 4 4 f f f f
         f f f f f f 4 4 e 4 4 f f f f f
         f f f f f 4 4 e 4 4 f f f f f f
         f f f f 4 4 e 4 4 f f f f f f f
         f f f 4 4 e 4 4 f f f f f f f f
         f f 4 4 e 4 4 f f f f f f f f f
         f f 1 e 4 4 f f f f f f f f f f
         f f 1 1 4 f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
         f f f f f f f f f f f f f f f f
     `
     // language sprites
    
     const negate = img`
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . 2 2 2 2 2 2 . . . . .
         . . . . 2 2 . . . . 2 2 . . . .
         . . . 2 2 2 2 . . . . 2 2 . . .
         . . . 2 . 2 2 2 . . . . 2 . . .
         . . . 2 . . 2 2 2 . . . 2 . . .
         . . . 2 . . . 2 2 2 . . 2 . . .
         . . . 2 . . . . 2 2 2 . 2 . . .
         . . . 2 2 . . . . 2 2 2 2 . . .
         . . . . 2 2 . . . . 2 2 . . . .
         . . . . . 2 2 2 2 2 2 . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
     `
     const genericSprite = img`
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . 1 1 1 1 1 1 . . . . .
         . . . . 1 5 5 5 5 5 5 5 . . . .
         . . . 1 5 5 5 5 5 5 5 5 5 . . .
         . . . 1 5 5 5 5 5 5 5 5 5 . . .
         . . . 1 5 5 5 5 5 5 5 5 5 . . .
         . . . 1 5 5 5 5 5 5 5 5 5 . . .
         . . . 1 5 5 5 5 5 5 5 5 5 . . .
         . . . 1 5 5 5 5 5 5 5 5 5 . . .
         . . . . 5 5 5 5 5 5 5 5 . . . .
         . . . . . 5 5 5 5 5 5 . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
     `
     const downArrow = img`
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . 9 9 9 9 9 9 9 6 . . . .
         . . . . . 9 9 9 9 9 6 . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . . 9 6 . . . . . . .
     `
     const upArrow = img`
         . . . . . . . 9 6 . . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . 9 9 9 9 9 6 . . . . .
         . . . . 9 9 9 9 9 9 9 6 . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . 9 9 9 6 . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
     `
     const rightArrow = img`
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . 9 . . .
         . . . . . . . . . . . . 9 9 . .
         . . . . . . . 9 9 9 9 9 9 9 9 .
         . . . . . . . 9 9 9 9 9 9 9 9 9
         . . . . . . . 9 9 9 9 9 9 9 9 6
         . . . . . . . 6 6 6 6 6 9 9 6 .
         . . . . . . . . . . . . 9 6 . .
         . . . . . . . . . . . . 6 . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
     `
     const leftArrow = img`
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . 9 . . . . . . . . . . . .
         . . 9 9 . . . . . . . . . . . .
         . 9 9 9 9 9 9 9 9 . . . . . . .
         9 9 9 9 9 9 9 9 9 . . . . . . .
         6 9 9 9 9 9 9 9 9 . . . . . . .
         . 6 9 9 6 6 6 6 6 . . . . . . .
         . . 6 9 . . . . . . . . . . . .
         . . . 6 . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . .
     `
     const editorMap = img`
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . 5 . . . 4 . . 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . 4 . . 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . 4 4 4 4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
         . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
     `

     let spriteIndex = -1;

     function closeMenu(command: string) {
         if (instance) {
             instance.dispose();
             instance = undefined;
             controller._setUserEventsEnabled(true);
             game.popScene();
         }
         if (command) {
             // time for another editor!!!
         }
     }

     function buildOptionList(s: Sprite[], commands: Sprite[]): MenuOption[] {
         let options: MenuOption[] = [];
         s.forEach((s: Sprite, index: number) => {
             options.push(new MenuOption(s.image, () => s.data, () => { spriteIndex = index; closeMenu(null) }));
         })
         commands.forEach((s: Sprite, index: number) => {
             options.push(new MenuOption(s.image, () => s.data, () => { closeMenu(s.data) }));
         })
         options.push(new MenuOption(scene.systemMenu.CLOSE_MENU_ICON, () => "CLOSE", () => { closeMenu(null) }));
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

     class ToolboxMenu extends PauseMenu {
         private myTheme: MenuTheme;
         constructor(s: Sprite[], c: Sprite[]) {
             super(() => buildOptionList(s, c), toolboxTheme())
         }
         // get rid of floating animation
         onUpdate() { }
     }

     let instance: ToolboxMenu;

     function showSpriteMenu(s: Sprite[], c: Sprite[]) {
         if (instance) return;
         game.pushScene();
         instance = new ToolboxMenu(s, c);
         instance.show();
     }

    export class MapEditor {
        private tileMap: Image;
        private cursor: Sprite;
        private commands: Sprite[] = [];
        constructor(private allSprites: Sprite[]) {
            let tileSprite = new Sprite(tile)
            tileSprite.setKind(0)
            tileSprite.data = "Transparent"
            tileSprite.setFlag(SpriteFlag.Invisible, true)
            this.allSprites.insertAt(0, tileSprite)
            let playSprite = new Sprite(play)
            playSprite.setKind(1000)
            playSprite.data = "Play"
            playSprite.setFlag(SpriteFlag.Invisible, true)
            this.commands.push(playSprite);
            let editSprite = new Sprite(pencil)
            editSprite.setKind(1001)
            editSprite.data = "Program"
            editSprite.setFlag(SpriteFlag.Invisible, true)
            this.commands.push(editSprite);

            this.tileMap = image.create(30, 30)
            scene.setTileMap(this.tileMap)
            scene.setTile(0, tile)
            this.allSprites.forEach(function (s: Sprite) {
                scene.setTile(s.kind() + 1, s.image)
            })

            this.cursor = sprites.create(cursorIn, SpriteKind.Player)
            this.cursor.x = 40
            this.cursor.y = 56
            scene.cameraFollowSprite(this.cursor)

            controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) > 0)
                    this.cursor.x -= 16
            })
            controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.x >> 4) < this.tileMap.width - 1)
                    this.cursor.x += 16
            })
            controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) > 0)
                    this.cursor.y -= 16
            })
            controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
                if ((this.cursor.y >> 4) < this.tileMap.height - 1)
                    this.cursor.y += 16
            })
            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (spriteIndex < 0)
                    return;
                let row = this.cursor.y >> 4
                let col = this.cursor.x >> 4
                if (row >= 0 && row < this.tileMap.height && col >= 0 && col < this.tileMap.width) {
                    this.tileMap.setPixel(col, row, spriteIndex + 1)
                }
            })
            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                showSpriteMenu(this.allSprites, this.commands)
            })
        }
    } 

    class Editor {
        private currentMap: Image;
        constructor(private fixed: Sprite[], private movable: Sprite[]) {
                this.currentMap = editorMap.clone();
                scene.setTileMap(this.currentMap)
                scene.setTile(9, tile);
                let tiles = scene.getTilesByType(5)
                for (let value of tiles) {
                    let foo = sprites.create(genericSprite, SpriteKind.Food)
                    value.place(foo)
                }
                this.currentMap.fill(0)
                this.makeContext(3, 3)
            }
        private  makeContext(row: number, col: number) {
            for (let i = -2; i <= 2; i++) {
                this.currentMap.setPixel(col + i, row, 9);
                this.currentMap.setPixel(col, row + i, 9);
                if (i > -2 && i < 2) {
                    this.currentMap.setPixel(col + i, row + i, 9);
                    this.currentMap.setPixel(col + i, row - i, 9);
                }
            }
        }
    }

     //let editor = new Editor(boulder.fixedSprites, boulder.movableSprites)
     
     //sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite: Sprite, otherSprite: Sprite) {
         // add menu of sprites...
     //})

     // todo:
     // cursor navigation
     // steps:
     // 1. select "self" sprite
     // 2. select event type
     // 3. fill out context
                   
     // one room per rule
     // room list?

     // "program" data structure
     // "editor" data structure
     // menu bar
     // interpreter
     // export to MakeCode?

 }