namespace tileworld {

    export class TileWidget {
        private parent: TileWidget;
        private children: TileWidget[];
        // has an absolute coordinate in parent space
        // occupies a rectangle
        // has parent that will pass down cursor information and button press information
        // has its own saved cursor position
        // has its own update logic
        // can be active/inactive, visible/invisible
        // callbacks
        // - onTileSelected()
    }

    // widget for when section (3x3 pattern)
    export class WhenPattern extends TileWidget {

    }
} 