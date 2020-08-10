namespace tileworld {

    export class Gallery extends RuleVisualsBase {
        private current: Image;
        private newImage: Image;
        constructor(p: Project, private kind: number, 
                    private wrapper: SwitchExport,
                    private gallery: Image[]) {
            super(p);
            this.current = this.wrapper.getImage(kind).clone();
            this.newImage = this.current.clone();
            this.setCol(2); this.setRow(1);
            this.setTileSaved();
            this.setCol(0); this.setRow(0);

            controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                const isCurrent = this.col() == 2 && this.row() == 1 ;
                const index = this.dirMap.getPixel(this.col(), this.row());
                if (isCurrent || index != 0xf) {
                    this.setTileSaved();
                    const img = this.gallery[index];
                    this.newImage.copyFrom(isCurrent ? this.current : img);
                }
            });

            controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
                this.wrapper.getImage(this.kind).copyFrom(this.newImage);
                this.wrapper.saveImage(this.kind);
                game.popScene();
            });
        }

        protected update(): void{
            this.dirMap.fill(0xf);
            screen.fill(0);
            screen.print("Gallery", 0, yoff);
            this.drawImage(0, 1, this.newImage);
            this.drawImage(2, 1, this.current);
            let col = 4;
            let row = 1;
            this.gallery.forEach((img,i) => {
                this.drawImage(col, row, img);
                this.dirMap.setPixel(col, row, i);
                col += 2;
                if (col == 10) { col = 2; row +=2; }
            });
        }
    }

}