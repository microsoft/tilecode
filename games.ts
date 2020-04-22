// add games in if the slots are empty

if (!settings.exists("TW3-VersionS"))
    createBoulderGame();

if (!settings.exists("TW2-VersionS"))
    createSnakeGame();

if (!settings.exists("TW1-VersionS"))
    createBejeweledGame();

if (!settings.exists("TW4-VersionS"))
    createLeftHandWall();

function createBoulderGame() {
settings.writeString("TW3-VersionS","4.0.0");
// buffer length = 108
settings.writeBuffer("TW3-WBackM", hex`
2018f0a0f17120f17120f171204112f12120f17120f17120f171203122f121205132e1201132f131
20f171203132f11120f17120f171205132e120322132e1205132e120f17120f17120f17120f17120
f17120f17120f17120f17120f17120f17120f17120f17120f171f0a0`);
// buffer length = 73
settings.writeBuffer("TW3-WSpriteM", hex`
2018ffffffffffffbf10ffffffffffff4f21ff9f2112ff2f1221ffffff2f2112ffffffffbf31ff1f
21122f111211ff6f31ffffffffffffffffffffffffffffffffffffffffffffff6f`);
settings.writeNumber("TW3-BackN",4);
// buffer length = 147
settings.writeBuffer("TW3-BackI0", hex`
1010fd181d363826181618161816181d2618361816181618161816181d1618163826181618161816
181d1816281d28561816181d1816183d1876181d1816281d2876181d1618163886181d2618361866
281d26181618164826381d2618161816181628261816181d2618161816182618261816181d261816
1816182618261816181d261816181618162826381d48163866f828`);
// buffer length = 112
settings.writeBuffer("TW3-BackI1", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
// buffer length = 55
settings.writeBuffer("TW3-BackI2", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 35
settings.writeBuffer("TW3-BackI3", hex`
1010bd21ed217d1bcd21ed21fd6d1bfd5d11fdfd8d2bed2bfdfd8d1b4d1bfded1bfd1d`);
settings.writeNumber("TW3-SpriteN",4);
// buffer length = 128
settings.writeBuffer("TW3-SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f271d1e22144f
121e121f1e271d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f121e
121f1e271d1422142f102f1e122f271d1e22142f103f1e122f142e3f402f2e1f3e1f141d14505f1e
1f101e24902ff080`);
// buffer length = 120
settings.writeBuffer("TW3-SpriteI1", hex`
1010804ca02c1b1c1b2c901c1d2b1c1b2c603c2d1b1c1b2c303c2b1c1b2d4c201c1b2d3b1c2d1b3c
201c5d3b1d1b4c101b5d3b1d1b2c1b1c101b5d3b1d2b1c2b1c1b6d2b1d1b1d1c2b1c101b5d2b1d1b
1d1c2b1c201b4d1b1d2b1d1c2b1c201b3d2b1d1b1d3b1c407b1d1c2b1c701b3d2c1b1c902b2c2b30
`);
// buffer length = 64
settings.writeBuffer("TW3-SpriteI2", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
// buffer length = 101 
settings.writeBuffer("TW3-SpriteI3", hex`
10106057a01730373fb0271c111d1f408f1b1c1f302f5d1b1c1f211d1f101f1b513d1f1b1c1f201f
611d1b1c1b1c111d2f812f1d3f101f811d111b3f101f811d213f101f812f1b3f201f611d1b1c1d3f
201f1b513d3f402f5d1b1c1f807f1cc01f1c1b1f40`);
settings.writeNumber("TW3-HelpN",0);
// buffer length = 12
settings.writeBuffer("TW3-RuleB0", hex`
20262200011623030c060002`);
// buffer length = 12
settings.writeBuffer("TW3-RuleB3", hex`
4120220014143210ff060003`);
// buffer length = 12
settings.writeBuffer("TW3-RuleB4", hex`
41202200141332103c060003`);
// buffer length = 12
settings.writeBuffer("TW3-RuleB5", hex`
222622000102230010160300`);
// buffer length = 20
settings.writeBuffer("TW3-RuleB7", hex`
414122001416320014042110ff063110ff060000`);
// buffer length = 12
settings.writeBuffer("TW3-RuleB8", hex`
322022001403320001160401`);
// buffer length = 8
settings.writeBuffer("TW3-RuleB9", hex`
6310220010160400`);
// buffer length = 12
settings.writeBuffer("TW3-RuleB2", hex`
21212200141232103c060003`);
// buffer length = 22
settings.writeBuffer("TW3-RuleB6", hex`
2041220001162300041624103c063305140600020002`);
// buffer length = 8
settings.writeBuffer("TW3-RuleB10", hex`
2016220001160102`);
// buffer length = 6
settings.writeBuffer("TW3-RuleB11", hex`
111022001001`);
// buffer length = 8
settings.writeBuffer("TW3-RuleB13", hex`
2211220014120004`);
// buffer length = 18
settings.writeBuffer("TW3-RuleB1", hex`
2031220001162300041633103c0600020003`);
// buffer length = 8
settings.writeBuffer("TW3-RuleB12", hex`
6110220001160102`);
settings.writeNumber("TW3-PlayerN",0);
}

function createSnakeGame() {
settings.writeString("TW2-VersionS","4.0.0");
// buffer length = 109
settings.writeBuffer("TW2-WBackM", hex`
2018f0a0f17120f17120f17120f17120f17120f17120f17120f17120f17120a122a1209142912081
52912081529120815291209132a120f17120f17120f17120f17120f171204122f111203142f12031
42f1203132f111204122f11120f17120f17120f17120f17120f171f0a0`);
// buffer length = 75
settings.writeBuffer("TW2-WSpriteM", hex`
2018ffffffffff1f11ff8f11ff8f116f12ff1f11ff8f11ff8f11ff8f10ffffffffff9f12ff2f12ff
ffffff3f12ffffffffffffffff7f12ffffffffffffffff4f12ffffffff12ffffffff6f`);
settings.writeNumber("TW2-BackN",4);
// buffer length = 94
settings.writeBuffer("TW2-BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 55
settings.writeBuffer("TW2-BackI1", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 53
settings.writeBuffer("TW2-BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer("TW2-BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber("TW2-SpriteN",4);
// buffer length = 123
settings.writeBuffer("TW2-SpriteI0", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
// buffer length = 107
settings.writeBuffer("TW2-SpriteI1", hex`
1010a02c2fb01c16372c801c272c16111c701c1627161c1f2c701c37361f1c701c37361f1c701c37
161c1f111c701c372c162c404c16671c302c361c57161c301c27262c16371f1c201c37462c2f161c
201c273c761c201c171c201c661c301c161c302c461c302c505c20`);
// buffer length = 71
settings.writeBuffer("TW2-SpriteI2", hex`
1010f0502c6e70ae603e523e403e821e402ea21e303e921e303c92142027161c921420172ea21430
121e247214123022251462141e401214151452141260622412701e621ef050`);
// buffer length = 35
settings.writeBuffer("TW2-SpriteI3", hex`
1010f0f0f0f0f0801e8012602e7012602c12601260161c828072901452f0f0f0f0f0a0`);
settings.writeNumber("TW2-HelpN",0);
// buffer length = 12
settings.writeBuffer("TW2-RuleB1", hex`
212622000412230005020002`);
// buffer length = 12
settings.writeBuffer("TW2-RuleB2", hex`
212622000412120005010001`);
// buffer length = 12
settings.writeBuffer("TW2-RuleB3", hex`
212622000412320005030003`);
// buffer length = 8
settings.writeBuffer("TW2-RuleB5", hex`
2016220001160002`);
// buffer length = 12
settings.writeBuffer("TW2-RuleB7", hex`
222622000112230004060401`);
// buffer length = 8
settings.writeBuffer("TW2-RuleB8", hex`
211622cc01120401`);
// buffer length = 16
settings.writeBuffer("TW2-RuleB9", hex`
21262200040221004c36030002010002`);
// buffer length = 8
settings.writeBuffer("TW2-RuleB0", hex`
4110220005140002`);
// buffer length = 8
settings.writeBuffer("TW2-RuleB4", hex`
4116220001120002`);
// buffer length = 20
settings.writeBuffer("TW2-RuleB10", hex`
2226220001322300102605010202040203000203`);
settings.writeNumber("TW2-PlayerN",0);
}

function createBejeweledGame() {
settings.writeString("TW1-VersionS","4.0.0");
// buffer length = 83
settings.writeBuffer("TW1-WBackM", hex`
201880f111106110f111106110f111106110f111106110f111106110f111106110f111106110f111
106110f11180f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1
f1f141`);
// buffer length = 95
settings.writeBuffer("TW1-WSpriteM", hex`
2018ffaf1011122012ff3f12102120ff3f1211201112ff3f111011121011ff3f1112132110ff3f10
12112011ff3f1011121122ff3f22201110ffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffef`);
settings.writeNumber("TW1-BackN",4);
// buffer length = 94
settings.writeBuffer("TW1-BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 55
settings.writeBuffer("TW1-BackI1", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 112
settings.writeBuffer("TW1-BackI2", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
// buffer length = 53
settings.writeBuffer("TW1-BackI3", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
settings.writeNumber("TW1-SpriteN",4);
// buffer length = 89
settings.writeBuffer("TW1-SpriteI0", hex`
1010506c802c7e12501cae12404e523e12204e821e12203ea21e12104e921e121e4c92141e1c2716
1c92141e272ea2141e101e121e247214121e101e22251462141e301e121415145214121e301e7224
121e502e622e806e50`);
// buffer length = 64
settings.writeBuffer("TW1-SpriteI1", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
// buffer length = 120
settings.writeBuffer("TW1-SpriteI2", hex`
1010804ca02c1b1c1b2c901c1d2b1c1b2c603c2d1b1c1b2c303c2b1c1b2d4c201c1b2d3b1c2d1b3c
201c5d3b1d1b4c101b5d3b1d1b2c1b1c101b5d3b1d2b1c2b1c1b6d2b1d1b1d1c2b1c101b5d2b1d1b
1d1c2b1c201b4d1b1d2b1d1c2b1c201b3d2b1d1b1d3b1c407b1d1c2b1c701b3d2c1b1c902b2c2b30
`);
// buffer length = 71
settings.writeBuffer("TW1-SpriteI3", hex`
1010f0f0707f801f751f601f951f501f353f351f501f251f301f251f501f251f301f251f501f251f
301f251f501f251f301f251f501f353f351f501f951f601f751f807ff0f060`);
settings.writeNumber("TW1-HelpN",0);
// buffer length = 34
settings.writeBuffer("TW1-RuleB0", hex`
61432200012421000124230001241200002603000101030001010300010106030402`);
// buffer length = 34
settings.writeBuffer("TW1-RuleB1", hex`
61432200102421001024230010241200002603000101030001010300010106030402`);
// buffer length = 18
settings.writeBuffer("TW1-RuleB2", hex`
61302200151632043f061200001600030603`);
// buffer length = 34
settings.writeBuffer("TW1-RuleB3", hex`
61432200042423000424210004241200002603000101030001010300010106030402`);
// buffer length = 8
settings.writeBuffer("TW1-RuleB5", hex`
401022f340160102`);
// buffer length = 12
settings.writeBuffer("TW1-RuleB7", hex`
202622f34016231000060002`);
// buffer length = 24
settings.writeBuffer("TW1-RuleB8", hex`
205622004016230400061230000621300006323000060002`);
// buffer length = 18
settings.writeBuffer("TW1-RuleB4", hex`
412322cf152421cf15240000010300020103`);
// buffer length = 8
settings.writeBuffer("TW1-RuleB6", hex`
401022cf40160101`);
// buffer length = 12
settings.writeBuffer("TW1-RuleB9", hex`
402622f34016211000060102`);
// buffer length = 18
settings.writeBuffer("TW1-RuleB11", hex`
6123223f1524213f15240000010100020101`);
// buffer length = 24
settings.writeBuffer("TW1-RuleB10", hex`
6156223f151621c0000612c0000623c0000632c000060101`);
settings.writeNumber("TW1-PlayerN",0);
}


function createLeftHandWall() {
settings.writeString("TW4-VersionS","4.0.0");
// buffer length = 246
settings.writeBuffer("TW4-WBackM", hex`
2018f0a0e11071201160117071201110411011105110712011101120111011501110712011102110
11101110113011107120114011104120111071206110112011201110719011201120111071201110
71101120111071201140114011201110712041101110412011107120112011101120114011107120
11201110211011101120111071201120114011101120111071201120411011104110712011201140
11401110712011201110911071201120111011701110712011201110211041101110712011201110
112011201110111071201170114011107120e11071f020f1f11120f17120f17120f17120f17120f1
7120f171f0a0`);
// buffer length = 67
settings.writeBuffer("TW4-WSpriteM", hex`
2018ffff8f10ffffffffffaf11ffffffffffffcf11ffff8f21ffffffaf11ff8f11ff4f11ffffffff
ffffffdf115f11ffffbf11ffffffffffffffffffffffffffffff8f`);
settings.writeNumber("TW4-BackN",4);
// buffer length = 94
settings.writeBuffer("TW4-BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 53
settings.writeBuffer("TW4-BackI1", hex`
101015f7f71715471637155715472516e72516b725f725f71725d7251647158715165725d7151715
c725167715571516f7f7f75725`);
// buffer length = 53
settings.writeBuffer("TW4-BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer("TW4-BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber("TW4-SpriteN",4);
// buffer length = 130
settings.writeBuffer("TW4-SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 64
settings.writeBuffer("TW4-SpriteI1", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
// buffer length = 113
settings.writeBuffer("TW4-SpriteI2", hex`
1010f0c01c111b605f101f111b1f402f3d1b1c2f211b301f1b313d1b1f111b1f301f411d1b1c112c
111f201f612f111d1b1f301f611d211b1f401f611d311b401f612f111b2f401f411d1b1c111d1c11
1b301f1b313d1b1f111b1f402f3d1b1c2f211b605f101f111b1fc01f1c111bf030`);
// buffer length = 43
settings.writeBuffer("TW4-SpriteI3", hex`
1010f0f0f0f0f0f0b0153015a01514151015141580151410141514101415701430143014f0f0f0f0
f0f0a0`);
settings.writeNumber("TW4-HelpN",0);
// buffer length = 12
settings.writeBuffer("TW4-RuleB0", hex`
412022000114120400060001`);
// buffer length = 16
settings.writeBuffer("TW4-RuleB1", hex`
41362200011121010006120400060001`);
// buffer length = 16
settings.writeBuffer("TW4-RuleB2", hex`
11362200011131010006210400060000`);
// buffer length = 20
settings.writeBuffer("TW4-RuleB3", hex`
1146220001111201000621010006230400060002`);
// buffer length = 20
settings.writeBuffer("TW4-RuleB4", hex`
1146220001112101000612010006230100060003`);
// buffer length = 14
settings.writeBuffer("TW4-RuleB5", hex`
3226220001133200041604020300`);
settings.writeNumber("TW4-PlayerN",0);
}