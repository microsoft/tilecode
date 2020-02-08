// transfer the fish game

function createTW2() {
    settings.writeString("TW2-VS", "1.0.0");
    // buffer length = 105
    settings.writeBuffer("TW2-TM", hex`
2018f0a02152f1202152f1202152f1202152f120f17120f17120f17120f171203132f111203132f1
11203132f11120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120
f17120f17120f17120f17120f17120f17120f17120f171f0a0`);
    // buffer length = 57
    settings.writeBuffer("TW2-TS", hex`
2018ffffffffffffffff5f14ffffffffffff5f15ffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffff6f`);
    settings.writeNumber("TW2-FL", 4);
    // buffer length = 94
    settings.writeBuffer("TW2-FS0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
    // buffer length = 53
    settings.writeBuffer("TW2-FS1", hex`
101015f7f71715471637155715472516e72516b725f725f71725d7251647158715165725d7151715
c725167715571516f7f7f75725`);
    // buffer length = 53
    settings.writeBuffer("TW2-FS2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
    // buffer length = 112
    settings.writeBuffer("TW2-FS3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
    settings.writeNumber("TW2-ML", 4);
    // buffer length = 130
    settings.writeBuffer("TW2-MS0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
    // buffer length = 101
    settings.writeBuffer("TW2-MS1", hex`
1010803fc01c341fa01c541f801c641f701c441f341f502c1d641d1f402c2461241f302c541c141c
241f201c1d1c541c241f141f201c1d1c643f141f201c1d1c1d841c1d1c101c2d1c111d441d1c2d1c
204c411d2f1b1d1c602c143f3c601c541f903c4f40`);
    // buffer length = 112
    settings.writeBuffer("TW2-MS2", hex`
1010f0201e3c1f2e2f701e1d1b131b3d1b5f201e2d1b131d1f2d121b2d1f301c5d1f1d122d1f501f
5d1b122d1f501f1b4d1b122d2f301c5d1f1d123d1f201e2d1b131d1f2d121d1b1f301e1d1b131b3d
121b2d1f301e3c1f2e2f2b2d1fb01f1b3f801b3f1d1fa01f3d1b1fa01b4ff050`);
    // buffer length = 112
    settings.writeBuffer("TW2-MS3", hex`
101030241ec014351ea01435142e2f7014252435145f20142514251f251614251f301e7516251f50
1e45141f16251f501e45141f16252f301e7516351f20142514251f251615141f3014252435161425
1f301435142e2f24251f3014351e301f143f40241e301f251fb01f251fb03f60`);
    settings.writeNumber("TW2-HM", 1);
    // buffer length = 29
    settings.writeBuffer("TW2-RL0", hex`
f4ff02870300400000910000d00000c00000600000a000000000ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL1", hex`
f4ff12d50300400000910000800000c000000010ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW2-RL2", hex`
f4ff229203004000000120ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW2-RL3", hex`
f4ff32c203004000000130ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL4", hex`
f4ff0095000080000040dfffd10000c000000014ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL5", hex`
f5ff009500008000fd400000d10000c000000000ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL6", hex`
f5ff0095000080dfff4000fdd10000c000000000ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL7", hex`
f5ff0095000080faff400003d1dfffc000000010ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL8", hex`
f5ff0195000080f7ff400003d10000c000000010ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL9", hex`
f5ff11950000800000400000d1dfffc000000010ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL10", hex`
f5ff11950000800000400000d1f7ffc000000000ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW2-RL11", hex`
f5ff0095000080dfff40dfffd10000c000000000ffffff`);
    settings.writeNumber("TW2-PL", 4);
} 