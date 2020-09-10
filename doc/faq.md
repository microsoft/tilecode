## Frequently Asked Questions (FAQ)

### My device shows an error code (with a frowny face) 

There are a number of different reasons you may get an error code. For more information about the error code showing on your device, see the [list of error codes](https://arcade.makecode.com/device/error-codes).

### My device does not display "file copy" screen

If your Arcade device is not displaying the "file copy" screen, put your device into "file copy" mode by pressing the reset button on the device. The **reset** button is located in different locations on the [MakeCode Arcade devices](https://arcade.makecode.com/hardware/):

- Kittenbot [Meowbit](https://www.kittenbot.cc/collections/frontpage/products/meowbit-codable-console-for-microsoft-makecode-arcade): **reset** is on the upper-right side of the device
- GHI [Brainpad Arcade](https://www.brainpad.com/): **reset** is on the upper-right of the front of the device
- Adafruit [PyBadge](https://www.adafruit.com/product/4200), [PyGamer](https://www.adafruit.com/product/4242) and [EdgeBadge](https://www.adafruit.com/product/4400): **reset** is on the upper-left of the back of the device
- Kitronix [ARCADE](https://kitronik.co.uk/products/5311-arcade-for-makecode-arcade): **reset** is above the screen on the front of the device
- TinkerGen [GameGo](https://shop.tinkergen.com/gamego.html): **reset** is at the bottom of the front of the device, to the right of the Menu button

### Device displays "file copy" screen but does not show as a drive on computer

It might be that your micro-USB cable is faulty (or is a power-only cable). Try a different cable.

### I copied a friend's UF2 file to my device, but their games didn't show up

If you have Kittenbot's Meowbit device, you need to update its bootloader in order for your friend's TileCode games (embedded in the UF2) to be copied correctly onto your meowbit. Here's is the [new meowbit bootloader](meowbit-bootloader-with-settings-write.uf2). Then do the following steps in order:
1. copy the above UF2 file to your meowbit, following [these directions](download)
2. copy your friend's UF2 file to your meowbit

You should now see your friend's games on your meowbit.