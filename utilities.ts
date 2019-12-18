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

    export function imageToBuffer(img: Image) {
        // worst case = 1 byte per pixel
        let buf = control.createBuffer((img.height() * img.width()));
        let pixel = -1;
        let length = 0;
        let bufIndex = 0;
        for(let x = 0; x<img.width(); x++) {
            for (let y = 0; y < img.height(); y++) {
                let newPixel = img.getPixel(x, y);
                if (newPixel != pixel) {
                    if (pixel != -1) {
                        // output run
                        buf.setUint8(((length & 0xf) << 4) | (pixel & 0xf), bufIndex);
                        bufIndex++;
                    }
                    // start new run
                    pixel = newPixel;
                    length = 1;
                } else {
                    length++;
                    if (length == 16) {
                        // output run
                        buf.setUint8(((length & 0xf) << 4) | (pixel & 0xf), bufIndex);
                        bufIndex++;
                        length = 1;
                    }
                }
            }
        }
        // return exactly the amount used. 
        return buf.slice(0, bufIndex);
    }

    export function bufferToImage(buf: Buffer) {

    }
}