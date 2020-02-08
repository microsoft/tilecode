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

function createTW1() {
    settings.writeString("TW1-VS", "1.0.0");
    // buffer length = 241
    settings.writeBuffer("TW1-TM", hex`
2018f1a16211f2216211f22162111230b22162111220c22162111230b2216211f2216211f2212220
2211821062216211421132205221621142113210622162114211a221621142111220722162113210
11122072215012114211124012103221621142112230321012216211421122303210122152101142
11223032101221521011421122301210322152101142112230522152101122101211223052215210
1142112220622160111210221122305221821022112220622182102211a221121052301211a22162
101210121011323042218210221132101210422182102211321012104221b21132304221b211a2f1
a1`);
    // buffer length = 94
    settings.writeBuffer("TW1-TS", hex`
2018ffffffffff6f35ff1f144f1516ff7f35ffffffff3f1615bf15ff8f1516ff7f15ffffffff6f16
df55ffffffffffffff1f17ffffbf16ffef168f652f165f36ff7f16ff1f15ff1f155f35ff5f151f15
1f15ff6f15ff8f15ffffffffffbf`);
    settings.writeNumber("TW1-FL", 4);
    // buffer length = 55
    settings.writeBuffer("TW1-FS0", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
    // buffer length = 147
    settings.writeBuffer("TW1-FS1", hex`
1010fd181d363826181618161816181d2618361816181618161816181d1618163826181618161816
181d1816281d28561816181d1816183d1876181d1816281d2876181d1618163886181d2618361866
281d26181618164826381d2618161816181628261816181d2618161816182618261816181d261816
1816182618261816181d261816181618162826381d48163866f828`);
    // buffer length = 112
    settings.writeBuffer("TW1-FS2", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
    // buffer length = 147
    settings.writeBuffer("TW1-FS3", hex`
1010fc181c3b382b181b181b181b181c2b183b181b181b181b181b181c1b181b382b181b181b181b
181c181b2816285b181b181c181b1836187b181c181b2816287b181c1b181b388b181c2b183b186b
281c2b181b181b482b381c2b181b181b181b282b181b181c2b181b181b182b182b181b181c2b181b
181b182b182b181b181c2b181b181b181b282b381c481b386bf828`);
    settings.writeNumber("TW1-ML", 4);
    // buffer length = 130
    settings.writeBuffer("TW1-MS0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
    // buffer length = 120
    settings.writeBuffer("TW1-MS1", hex`
1010804ca02c1b1c1b2c901c1d2b1c1b2c603c2d1b1c1b2c303c2b1c1b2d4c201c1b2d3b1c2d1b3c
201c5d3b1d1b4c101b5d3b1d1b2c1b1c101b5d3b1d2b1c2b1c1b6d2b1d1b1d1c2b1c101b5d2b1d1b
1d1c2b1c201b4d1b1d2b1d1c2b1c201b3d2b1d1b1d3b1c407b1d1c2b1c701b3d2c1b1c902b2c2b30
`);
    // buffer length = 64
    settings.writeBuffer("TW1-MS2", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
    // buffer length = 101
    settings.writeBuffer("TW1-MS3", hex`
10106057a01730373fb0271c111d1f408f1b1c1f302f5d1b1c1f211d1f101f1b513d1f1b1c1f201f
611d1b1c1b1c111d2f812f1d3f101f811d111b3f101f811d213f101f812f1b3f201f611d1b1c1d3f
201f1b513d3f402f5d1b1c1f807f1cc01f1c1b1f40`);
    settings.writeNumber("TW1-HM", 1);
    // buffer length = 23
    settings.writeBuffer("TW1-RL0", hex`
65ff00450000c1fdff900000800000d000000030ffffff`);
    // buffer length = 26
    settings.writeBuffer("TW1-RL1", hex`
65ff00460000c100eb80fdff30fdff90003cd000000000ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL2", hex`
65ff31450000c1fd3c900000800000d000000030ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL3", hex`
f4ff00450000910000800000d00000c000000001ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL4", hex`
f4ff0245000081cc0c900000d00000c000000000ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL5", hex`
f4ff12450000d1cc0c900000800000c000000010ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL6", hex`
f4ff2245000092cc0c800000d00000c00000002001ffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL7", hex`
f4ff32450000c2cc0c900000800000d00000003001ffff`);
    // buffer length = 33
    settings.writeBuffer("TW1-RL8", hex`
f4ff12470000d100f751fdff900000800000c0000070a8280010ffffff10ffffff`);
    // buffer length = 33
    settings.writeBuffer("TW1-RL9", hex`
f4ff024700008100f701fdff900000d00000c0000030a8280000ffffff00ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL10", hex`
65ff33420000c000fd0114ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL11", hex`
f4ff33420000c000df03022304ff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL12", hex`
f4ff13420000d000df03022304ff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL13", hex`
f4ff239200df43000000022304ff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL14", hex`
f4ff038200df43000000022304ff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL15", hex`
65ff34420000c000fd0114ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL16", hex`
65ff048200004000000140ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL17", hex`
65ff14420000d100000040ffffff`);
    // buffer length = 26
    settings.writeBuffer("TW1-RL18", hex`
65ff0096003c800000400000d1fdffc000eb70fdff0010ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL19", hex`
65ff34420000c0007f0102ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL20", hex`
f7ff00950000800000400000d1fd3cc000000010ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL21", hex`
f7ff0095fd3c800000400000d10000c000000020ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL22", hex`
f7ff0095000080fd3c400000d10000c000000000ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL23", hex`
f7ff00950000800000400000d10000c0fd3c0030ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL24", hex`
f7ff2195fd3c800000400000d10000c000000020ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL25", hex`
f7ff11950000800000400000d1fd3cc000000010ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL26", hex`
f7ff31950000800000400000d10000c0fd3c0030ffffff`);
    // buffer length = 23
    settings.writeBuffer("TW1-RL27", hex`
f7ff0195000080fd3c400000d10000c000000000ffffff`);
    // buffer length = 29
    settings.writeBuffer("TW1-RL28", hex`
f7ff21970000800000400000d1fdffc000006003ff7003ff0010ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL29", hex`
f7ff038200fd4100000014ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL30", hex`
f7ff33420000c000fd0114ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL31", hex`
f7ff13420000d000fd0114ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL32", hex`
f7ff239200fd4100000014ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL33", hex`
f7ff34420000c000fd0114ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL34", hex`
f7ff14420000d000fd0114ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL35", hex`
f7ff249200fd4100000014ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL36", hex`
f7ff048200fd4100000014ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL37", hex`
65ff038200004000000140ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL38", hex`
65ff13420000d100000040ffffff`);
    // buffer length = 30
    settings.writeBuffer("TW1-RL39", hex`
f4ff12960000800000400000d100f7c1000070fdff0010ffffff30ffffff`);
    // buffer length = 30
    settings.writeBuffer("TW1-RL40", hex`
f4ff029600008000f7410000d10000c0000030fdff0030ffffff00ffffff`);
    // buffer length = 14
    settings.writeBuffer("TW1-RL41", hex`
65ff048200004000000140ffffff`);
    settings.writeNumber("TW1-PL", 4);
}

if (!settings.exists("TW1-VS")) createTW1();