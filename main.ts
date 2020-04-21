// see games.ts for built-in games

// let TileWorld = new tileworld.LoadScreen();

// basic test 

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    settings.clear();
    game.splash("cleared")
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    let buf = settings.readBuffer("TW1-WBackM");
    if (buf) {
        game.splash("buf found")
    } else {
        game.splash("buf not found")
    }
})

