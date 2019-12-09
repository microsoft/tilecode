// Add your code here

namespace tileworld {
    // cache these???
    export function greyImage(img: Image): Image {
        let ret: Image = img.clone();
        for(let x=0; x<ret.width(); x++) {
            for (let y = 0; y < ret.height(); y++) {
                let pix = ret.getPixel(x,y);
                ret.setPixel(x,y,pix == 0 ? 0 : 12)
            }
        }
        return ret;
    }
}