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
        let buf = control.createBuffer(2 + (img.width() * img.height()));
        let index = 0;
        buf.setNumber(NumberFormat.Int8LE, index++, img.width());
        buf.setNumber(NumberFormat.Int8LE, index++, img.height());
        let pixel = -1;
        let length = 0;
        for(let x = 0; x<img.width(); x++) {
            for (let y = 0; y < img.height(); y++) {
                let newPixel = img.getPixel(x, y);
                if (newPixel != pixel) {
                    if (pixel != -1) {
                        // output run
                        buf.setUint8(index++, ((length & 0xf) << 4) | (pixel & 0xf));
                    }
                    // start new run
                    pixel = newPixel;
                    length = 1;
                } else {
                    if (length == 14) {
                        // output run
                        buf.setUint8(index++, (0xf << 4) | (pixel & 0xf));
                        // reset
                        pixel = -1;
                        length = 0;
                    } else {
                        length++;
                    }
                }
            }
        }
        // last bit (if needed)
        if (length > 0) {
            buf.setUint8(index++, ((length & 0xf) << 4) | (pixel & 0xf));
        }
        // return exactly the amount used. 
        return buf.slice(0, index);
    }

    export function bufferToImage(buf: Buffer) {
        let width = buf.getNumber(NumberFormat.Int8LE, 0);
        let height = buf.getNumber(NumberFormat.Int8LE, 1);
        let index = 2;
        let img = image.create(width, height);
        let x = 0;
        let y = 0;
        while (index < buf.length) {
            let pair = buf.getUint8(index++);
            let pixel = pair & 0xf;
            let len = (pair & 0x0f) >> 4;
            // paint the pixels and wrap as needed
        }
        // assert we have complete paint!
    }
}