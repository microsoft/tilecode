// add games in if the slots are empty

// createHelloWorld("TW1-");
createApplesGrow("TW4-");
createMineRocks("TW5-"); 
createPushBoxes("TW6-");
createEatDots("TW7-");
createSwapSprites("TW8-");

// createChangeBug("TW2-");
// createCatsDogsAndSnakes("TW2-");
// createSideScroller("TW8-");
createSkeletonDungeon("TW1-");
// createDescendingAliens("TW8-");
// createSortingDiamonds("TW8-");
// createPaint("TW8-");
// createLeftHandRule("TW4-");

// --------------------------------------    

function createMineRocks(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 108
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a0f17120f17120f171204112f12120f17120f17120f171203122f121205132e1201132f131
20f171203132f11120f17120f171205132e120322132e1205132e120f17120f17120f17120f17120
f17120f17120f17120f17120f17120f17120f17120f17120f171f0a0`);
// buffer length = 73
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffffffffffffbf10ffffffffffff4f21ff9f2112ff2f1221ffffff2f2112ffffffffbf31ff1f
21122f111211ff6f31ffffffffffffffffffffffffffffffffffffffffffffff6f`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 147
settings.writeBuffer(prefix+"BackI0", hex`
1010fd181d363826181618161816181d2618361816181618161816181d1618163826181618161816
181d1816281d28561816181d1816183d1876181d1816281d2876181d1618163886181d2618361866
281d26181618164826381d2618161816181628261816181d2618161816182618261816181d261816
1816182618261816181d261816181618162826381d48163866f828`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI1", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
// buffer length = 55
settings.writeBuffer(prefix+"BackI2", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 35
settings.writeBuffer(prefix+"BackI3", hex`
1010bd21ed217d1bcd21ed21fd6d1bfd5d11fdfd8d2bed2bfdfd8d1b4d1bfded1bfd1d`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 120
settings.writeBuffer(prefix+"SpriteI1", hex`
1010804ca02c1b1c1b2c901c1d2b1c1b2c603c2d1b1c1b2c303c2b1c1b2d4c201c1b2d3b1c2d1b3c
201c5d3b1d1b4c101b5d3b1d1b2c1b1c101b5d3b1d2b1c2b1c1b6d2b1d1b1d1c2b1c101b5d2b1d1b
1d1c2b1c201b4d1b1d2b1d1c2b1c201b3d2b1d1b1d3b1c407b1d1c2b1c701b3d2c1b1c902b2c2b30
`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI2", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
// buffer length = 101
settings.writeBuffer(prefix+"SpriteI3", hex`
10106057a01730373fb0271c111d1f408f1b1c1f302f5d1b1c1f211d1f101f1b513d1f1b1c1f201f
611d1b1c1b1c111d2f812f1d3f101f811d111b3f101f811d213f101f812f1b3f201f611d1b1c1d3f
201f1b513d3f402f5d1b1c1f807f1cc01f1c1b1f40`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
20262200011623030c060002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB3", hex`
4120220014143210ff060003`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB4", hex`
41202200141332103c060003`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB5", hex`
222622000102230010140300`);
// buffer length = 20
settings.writeBuffer(prefix+"RuleB7", hex`
414122001416320014042110ff063110ff060000`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB8", hex`
322022001403320001160401`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB9", hex`
6310220010160400`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB2", hex`
21212200141232103c060003`);
// buffer length = 18
settings.writeBuffer(prefix+"RuleB6", hex`
203122000116230004163305140600020002`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB10", hex`
2016220001160102`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB13", hex`
222122001412230554060004`);
// buffer length = 18
settings.writeBuffer(prefix+"RuleB1", hex`
2031220001162300041633103c0600020003`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB12", hex`
6110220001160102`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB14", hex`
222122000112230004060004`);
settings.writeNumber(prefix+"PlayerN",0);
}


function createApplesGrow(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 109
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a0f17120f17120f17120f17120f17120f17120f17120f17120f17120a122a1209142912081
52912081529120815291209132a120f17120f17120f17120f17120f171204122f111203142f12031
42f1203132f111204122f11120f17120f17120f17120f17120f171f0a0`);
// buffer length = 70
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffffffffffffffffbf12ffffaf11ff8f11ff8f10ffbf12ffffffcf12ff2f12ffffffff3f12ff
ffffffffffaf12ffbf12ffffffffffffffff4f12ffffffff12ffffffff6f`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 55
settings.writeBuffer(prefix+"BackI1", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 123
settings.writeBuffer(prefix+"SpriteI0", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
// buffer length = 107
settings.writeBuffer(prefix+"SpriteI1", hex`
1010a02c2fb01c16372c801c272c16111c701c1627161c1f2c701c37361f1c701c37361f1c701c37
161c1f111c701c372c162c404c16671c302c361c57161c301c27262c16371f1c201c37462c2f161c
201c273c761c201c171c201c661c301c161c302c461c302c505c20`);
// buffer length = 71
settings.writeBuffer(prefix+"SpriteI2", hex`
1010f0502c6e70ae603e523e403e821e402ea21e303e921e303c92142027161c921420172ea21430
121e247214123022251462141e401214151452141260622412701e621ef050`);
// buffer length = 35
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0f0f0f0f0801e8012602e7012602c12601260161c828072901452f0f0f0f0f0a0`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB1", hex`
212622000412230005020002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB2", hex`
212622000412120005010001`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB3", hex`
212622000412320005030003`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB5", hex`
2016220001160002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB7", hex`
222622000112231104060401`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB9", hex`
21262200040221004c36030002010002`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB0", hex`
4110220005140002`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB4", hex`
4116220001120002`);
// buffer length = 20
settings.writeBuffer(prefix+"RuleB10", hex`
2226220001322300102605010202040203000203`);
settings.writeNumber(prefix+"PlayerN",0);
}



function createSwapSprites(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 83
settings.writeBuffer(prefix+"WBackM", hex`
2018b0d1109110d1109110d1109110d1109110d1109110d1109110d1109110d1109110d1109110d1
109110d1109110d1109110d1b0f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1
f1f1a1`);
// buffer length = 138
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffaf13111223121122ff1213211311131112ff1211231112111211ff1113111213111223ff10
12132113121112ff131211121311131211ff13111211221123ff222311231211ff221311232112ff
1113111213112213ff2213111213111213ff1113121112231112ffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffff5f`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 55
settings.writeBuffer(prefix+"BackI1", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI2", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI3", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 71
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0f0707f801f751f601f951f501f353f351f501f251f301f251f501f251f301f251f501f251f
301f251f501f251f301f251f501f353f351f501f951f601f751f807ff0f060`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI1", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
// buffer length = 120
settings.writeBuffer(prefix+"SpriteI2", hex`
1010804ca02c1b1c1b2c901c1d2b1c1b2c603c2d1b1c1b2c303c2b1c1b2d4c201c1b2d3b1c2d1b3c
201c5d3b1d1b4c101b5d3b1d1b2c1b1c101b5d3b1d2b1c2b1c1b6d2b1d1b1d1c2b1c101b5d2b1d1b
1d1c2b1c201b4d1b1d2b1d1c2b1c201b3d2b1d1b1d3b1c407b1d1c2b1c701b3d2c1b1c902b2c2b30
`);
// buffer length = 89
settings.writeBuffer(prefix+"SpriteI3", hex`
1010506c802c7e12501cae12404e523e12204e821e12203ea21e12104e921e121e4c92141e1c2716
1c92141e272ea2141e101e121e247214121e101e22251462141e301e121415145214121e301e7224
121e502e622e806e50`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 32
settings.writeBuffer(prefix+"RuleB0", hex`
6143220040242100401423004024120000260300010103000300010106000402`);
// buffer length = 34
settings.writeBuffer(prefix+"RuleB1", hex`
61432200102421001024230010241200002603000101030001010300010106000402`);
// buffer length = 18
settings.writeBuffer(prefix+"RuleB2", hex`
6130220054163204fc061200001600030600`);
// buffer length = 34
settings.writeBuffer(prefix+"RuleB3", hex`
61432200042423000424210004241200002603000101030001010300010106000402`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB7", hex`
202622080116231000060002`);
// buffer length = 24
settings.writeBuffer(prefix+"RuleB8", hex`
205622000116230400061230000621300006323000060002`);
// buffer length = 18
settings.writeBuffer(prefix+"RuleB4", hex`
412322205424212054240000010300020103`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB6", hex`
4010222001160101`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB9", hex`
4016220801160102`);
// buffer length = 18
settings.writeBuffer(prefix+"RuleB11", hex`
612322805424218054240000010100020101`);
// buffer length = 24
settings.writeBuffer(prefix+"RuleB10", hex`
61502280541621c0000612c0000623c0000632c000060101`);
settings.writeNumber(prefix+"PlayerN",0);
}


function createLeftHandRule(prefix: string) {
if (settings.exists(prefix+"VersionS"))
    return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 246
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a0e11071201160117071201110411011105110712011101120111011501110712011102110
11101110113011107120114011104120111071206110112011201110719011201120111071201110
71101120111071201140114011201110712041101110412011107120112011101120114011107120
11201110211011101120111071201120114011101120111071201120411011104110712011201140
11401110712011201110911071201120111011701110712011201110211041101110712011201110
112011201110111071201170114011107120e11071f020f1f11120f17120f17120f17120f17120f1
7120f171f0a0`);
// buffer length = 67
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffff8f10ffffffffffaf11ffffffffffffcf11ffff8f21ffffffaf11ff8f11ff4f11ffffffff
ffffffdf115f11ffffbf11ffffffffffffffffffffffffffffff8f`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI1", hex`
101015f7f71715471637155715472516e72516b725f725f71725d7251647158715165725d7151715
c725167715571516f7f7f75725`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI1", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
// buffer length = 113
settings.writeBuffer(prefix+"SpriteI2", hex`
1010f0c01c111b605f101f111b1f402f3d1b1c2f211b301f1b313d1b1f111b1f301f411d1b1c112c
111f201f612f111d1b1f301f611d211b1f401f611d311b401f612f111b2f401f411d1b1c111d1c11
1b301f1b313d1b1f111b1f402f3d1b1c2f211b605f101f111b1fc01f1c111bf030`);
// buffer length = 43
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0f0f0f0f0f0b0153015a01514151015141580151410141514101415701430143014f0f0f0f0
f0f0a0`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
412022000114120400060001`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB1", hex`
41362200011121010006120400060001`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB2", hex`
11362200011131010006210400060000`);
// buffer length = 20
settings.writeBuffer(prefix+"RuleB3", hex`
1146220001111201000621010006230400060002`);
// buffer length = 20
settings.writeBuffer(prefix+"RuleB4", hex`
1146220001112101000612010006230100060003`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB5", hex`
3226220001133200041604020300`);
settings.writeNumber(prefix+"PlayerN",0);
}

function createSortingDiamonds(prefix: string) {
if (settings.exists(prefix+"VersionS"))
    return;

    settings.writeString(prefix+"VersionS","4.0.0");
    
    // buffer length = 140
    
    settings.writeBuffer(prefix+"WBackM", hex`
    2018f0a071101110c12071101110c12071101110c120511011101110c120311031101110c1101311
    10311011101110c120311031101110c120511011101110c12071101110c12071101110c120711011
    10c1c0c120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f171
    20f17120f17120f17120f17120f17120f171f0a0`);
    
    // buffer length = 55
    
    settings.writeBuffer(prefix+"WSpriteM", hex`
    2018ffffffffffffffffff9f13ffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff8f`);
    
    settings.writeNumber(prefix+"BackN",4);
    
    // buffer length = 94
    
    settings.writeBuffer(prefix+"BackI0", hex`
    10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
    1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
    1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
    
    // buffer length = 53
    
    settings.writeBuffer(prefix+"BackI1", hex`
    101015f7f71715471637155715472516e72516b725f725f71725d7251647158715165725d7151715
    c725167715571516f7f7f75725`);
    
    // buffer length = 53
    
    settings.writeBuffer(prefix+"BackI2", hex`
    101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
    c627187617561718f6f6f65627`);
    
    // buffer length = 112
    
    settings.writeBuffer(prefix+"BackI3", hex`
    10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
    742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
    542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
    
    settings.writeNumber(prefix+"SpriteN",4);
    
    // buffer length = 130
    
    settings.writeBuffer(prefix+"SpriteI0", hex`
    1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
    4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
    1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
    5f1e1f101e24902ff080`);
    
    // buffer length = 68
    
    settings.writeBuffer(prefix+"SpriteI1", hex`
    1010c02cd03cc04cc01f3cb01e1f3ca01c1e1f1e2c802e1c121c3e702e121c121c122e7012241e12
    1e32803e141e32a02e1f32b01e1f2412c01e2214c02e22d03ee02e20`);
    
    // buffer length = 123
    
    settings.writeBuffer(prefix+"SpriteI2", hex`
    1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
    22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
    112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
    e02c50`);
    
    // buffer length = 64
    
    settings.writeBuffer(prefix+"SpriteI3", hex`
    1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
    301841196140184119517031194180311931a0211921f080`);
    
    settings.writeNumber(prefix+"HelpN",1);
    
    settings.writeNumber(prefix+"HighN",undefined);
    
    // buffer length = 12
    
    settings.writeBuffer(prefix+"RuleB0", hex`
    412022004014320400060003`);
    
    // buffer length = 20
    
    settings.writeBuffer(prefix+"RuleB1", hex`
    4140220040133201000633040006310400060002`);
    
    // buffer length = 20
    settings.writeBuffer(prefix+"RuleB2", hex`
    3140220040133201000633040006310400060000`);
    
    // buffer length = 22
    
    settings.writeBuffer(prefix+"RuleB3", hex`
    31402200402331010006320100063301000605030203`);
    
    settings.writeNumber(prefix+"PlayerN",0);
    
}


function createEatDots(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 247
settings.writeBuffer(prefix+"WBackM", hex`
201880111012b0211061101110111011103110311021101120111011101110111011101110311011
10211011201110113011301130111011102110f13110111021101120115011301110113011102110
11203110711031101110211041103110131011103110311021401130113311301130111021104110
3110131011103110311021101120311071103110111021101120115011301110113011102110f131
10111021101120111011301130113011101110211011201110111011101110111011103110111021
106110111011101110311031102180111012101190c110f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1
f1f1f1f1f1f141`);
// buffer length = 185
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffaf613f113f311f314f112f111f113f113f111f311f114f112f111f113f113f113f111f114f
f1311f114f112f115f113f111f113f114f112f316f211f311f114f411f212f123f311f317f114f12
1f124f103f114f411f212f123f311f314f112f316f211f311f114f112f115f113f111f113f114ff1
311f114f112f111f113f113f113f111f114f112f111f113f113f111f311f114f613f113f311f31ff
ffffffffffffffffffffffffffffffffffffffffffffffffcf`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 93
settings.writeBuffer(prefix+"BackI0", hex`
1010ff4fa85f18af183f183f683f182f182f186f182f182f181f188f181f182f181f188f181f182f
181f188f181f182f181f188f181f182f181f188f181f182f181f188f181f182f182f186f182f182f
183f683f183f18af185fa8ff4f`);
// buffer length = 20
settings.writeBuffer(prefix+"BackI1", hex`
1010ffffffffffffffffffffffffffffffffff1f`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e152f142e3f302f1e152f251d1e151214
4f121e151f1e251d141512143f12131e151f1e142d14351f101f221e151f1e142d14351f102f121e
151f1e251d141512142f102f1e152f251d1e1512142f103f1e152f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 23
settings.writeBuffer(prefix+"SpriteI1", hex`
1010f0f0f0f0f0f0d025d045c045d025f0f0f0f0f0f0d0`);
// buffer length = 123
settings.writeBuffer(prefix+"SpriteI2", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",950);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
202622000116231400060002`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB2", hex`
2226220001022300042603000402`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB3", hex`
20202220013621040006030005020200`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB4", hex`
00202220013623040006030005020200`);
// buffer length = 20
settings.writeBuffer(prefix+"RuleB6", hex`
2146220010121201000623040006320100060002`);
// buffer length = 20
settings.writeBuffer(prefix+"RuleB7", hex`
2146220010122301000612010006320400060003`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB8", hex`
212622001014120400060001`);
// buffer length = 20
settings.writeBuffer(prefix+"RuleB9", hex`
2146220010123201000623010006120400060001`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB10", hex`
21362200101223040006320400060002`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB11", hex`
21362200101223040006320400060003`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB12", hex`
222622001012230001060401`);
settings.writeNumber(prefix+"PlayerN",0);
}


function createDescendingAliens(prefix: string) {
if (settings.exists(prefix+"VersionS"))
    return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 93
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a0f17120f17120f17120f17120f17120f17120f17120f17120f17190f190f120f17120f171
20f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120
f17120f17120f17120f171f0a0`);
// buffer length = 61
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffaf12ffffff2f12ffffff2f124f10ffffcf12ffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffdf`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 55
settings.writeBuffer(prefix+"BackI1", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 68
settings.writeBuffer(prefix+"SpriteI0", hex`
1010c02cd03cc04cc01f3cb01e1f3ca01c1e1f1e2c802e1c121c3e702e121c121c122e7012241e12
1e32803e141e32a02e1f32b01e1f2412c01e2214c02e22d03ee02e20`);
// buffer length = 71
settings.writeBuffer(prefix+"SpriteI1", hex`
1010f0f0707f801f751f601f951f501f353f351f501f251f301f251f501f251f301f251f501f251f
301f251f501f251f301f251f501f353f351f501f951f601f751f807ff0f060`);
// buffer length = 113
settings.writeBuffer(prefix+"SpriteI2", hex`
1010f0c01c111b605f101f111b1f402f3d1b1c2f211b301f1b313d1b1f111b1f301f411d1b1c112c
111f201f612f111d1b1f301f611d211b1f401f611d311b401f612f111b2f401f411d1b1c111d1c11
1b301f1b313d1b1f111b1f402f3d1b1c2f211b605f101f111b1fc01f1c111bf030`);
// buffer length = 43
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0f0f0f0f0f0b0153015a01514151015141580151410141514101415701430143014f0f0f0f0
f0f0a0`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
202122000116230300060002`);
// buffer length = 10
settings.writeBuffer(prefix+"RuleB1", hex`
10102200012602030001`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB2", hex`
1110220040110001`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB3", hex`
122022004011120100060300`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB4", hex`
4110220010140002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB5", hex`
212122001012230100060003`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB6", hex`
212122001013230100060000`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB7", hex`
312022001010210400060000`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB8", hex`
022122001010210001060401`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB9", hex`
122022004001120010160300`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB10", hex`
6110220090160300`);
settings.writeNumber(prefix+"PlayerN",0);
}

function createPushBoxes(prefix: string) {
if (settings.exists(prefix+"VersionS"))
    return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 121
settings.writeBuffer(prefix+"WBackM", hex`
2018118041b011101210123110e13011302110e120311011121110e1204112111210e12021124110
e170121110e1105140e110f18110f18110f18110f18120f17120f17120f17120f17120f17120f171
20f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f171f0
a0`);
// buffer length = 64
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffff11ff4f10ff8f113f13ff5f211f11ff8f11ffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffffffffbf`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 55
settings.writeBuffer(prefix+"BackI1", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 61
settings.writeBuffer(prefix+"BackI2", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f176c4f3c1f375c7f573c8f572c8f2c375f1c4f4c
175f3c3f5c4f4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 65
settings.writeBuffer(prefix+"SpriteI1", hex`
1010f020ee20ee202e844e202e745e202e643e142e202e543e242e202e443e342e202e343e442e20
2e243e542e202e143e642e205e742e205e742e20ee20eef020`);
// buffer length = 123
settings.writeBuffer(prefix+"SpriteI2", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
2026220001162314cc060002`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB1", hex`
2026220001162300441600020002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB2", hex`
322622004413320144060004`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB3", hex`
322622000113320044060004`);
// buffer length = 10
settings.writeBuffer(prefix+"RuleB4", hex`
61102220042603000203`);
// buffer length = 10
settings.writeBuffer(prefix+"RuleB5", hex`
61102208402603000201`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB6", hex`
6310220004160400`);
settings.writeNumber(prefix+"PlayerN",0);
}

function createHelloWorld(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 117
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a0f17120f17120f17120f17150f141202110f1412021102150c1207110e1207110e120f171
20f171204110f121204110f1212041103110d12011403110d12011106110d1201110f15120f17120
f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f171f0a0`);
// buffer length = 63
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffaf10ffdf11ffffffffffff11ff8f123f12ffffffffffffffffffffffffffff4f1112ffffff
ffffffffffffffffffffffffffffffffffffffffffff3f`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI1", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 35
settings.writeBuffer(prefix+"BackI2", hex`
1010bd21ed217d1bcd21ed21fd6d1bfd5d11fdfd8d2bed2bfdfd8d1b4d1bfded1bfd1d`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 89
settings.writeBuffer(prefix+"SpriteI1", hex`
1010506c802c7e12501cae12404e523e12204e821e12203ea21e12104e921e121e4c92141e1c2716
1c92141e272ea2141e101e121e247214121e101e22251462141e301e121415145214121e301e7224
121e502e622e806e50`);
// buffer length = 107
settings.writeBuffer(prefix+"SpriteI2", hex`
1010a02c2fb01c16372c801c272c16111c701c1627161c1f2c701c37361f1c701c37361f1c701c37
161c1f111c701c372c162c404c16671c302c361c57161c301c27262c16371f1c201c37462c2f161c
201c273c761c201c171c201c661c301c161c302c461c302c505c20`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
settings.writeNumber(prefix+"HelpN",1);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
202622000116230400060002`);
// buffer length = 6
settings.writeBuffer(prefix+"RuleB1", hex`
201022000106`);
// buffer length = 6
settings.writeBuffer(prefix+"RuleB2", hex`
201022000106`);
// buffer length = 6
settings.writeBuffer(prefix+"RuleB3", hex`
201022000106`);
// buffer length = 6
settings.writeBuffer(prefix+"RuleB4", hex`
401022000106`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB5", hex`
2226220001022300042603000402`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB6", hex`
222622000102230010160401`);
settings.writeNumber(prefix+"PlayerN",0);
}


function createPaint(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 95
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a0f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120
f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f1
7120f17120f17120f17120f171f0a0`);
// buffer length = 55
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffffffffffffffff4f10ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffdf`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI1", hex`
101015f7f71715471637155715472516e72516b725f725f71725d7251647158715165725d7151715
c725167715571516f7f7f75725`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 68
settings.writeBuffer(prefix+"SpriteI1", hex`
1010c02cd03cc04cc01f3cb01e1f3ca01c1e1f1e2c802e1c121c3e702e121c121c122e7012241e12
1e32803e141e32a02e1f32b01e1f2412c01e2214c02e22d03ee02e20`);
// buffer length = 123
settings.writeBuffer(prefix+"SpriteI2", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
settings.writeNumber(prefix+"HelpN",1);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB0", hex`
2016220001160002`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB1", hex`
4010220001160103`);
settings.writeNumber(prefix+"PlayerN",0);
}

function createSokoban2(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 121
settings.writeBuffer(prefix+"WBackM", hex`
2018118041b011101210123110e13011302110e120311011121110e1204112111210e12021124110
e170121110e1105140e110f18110f18110f18110f18120f17120f17120f17120f17120f17120f171
20f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f171f0
a0`);
// buffer length = 64
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffff11ff4f10ff8f113f11ff5f211f11ff8f11ffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffffffffffffffffffbf`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 55
settings.writeBuffer(prefix+"BackI1", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 61
settings.writeBuffer(prefix+"BackI2", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f176c4f3c1f375c7f573c8f572c8f2c375f1c4f4c
175f3c3f5c4f4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 67
settings.writeBuffer(prefix+"SpriteI1", hex`
1010f020ee20ee202e844e202e745e202e643e142e202e34401e242e202e3440342e202e3440342e
202e241e40342e202e143e642e205e742e205e742e20ee20eef020`);
// buffer length = 123
settings.writeBuffer(prefix+"SpriteI2", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
2026220001162314cc060002`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB1", hex`
2026220001162300441600020002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB2", hex`
322622000413320104060004`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB3", hex`
322622000113320044060004`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB6", hex`
6310220804160400`);
settings.writeNumber(prefix+"PlayerN",0);
}

function createSideScroller(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 156
settings.writeBuffer(prefix+"WBackM", hex`
2018f090511310f11110511310f11110511310f11110511310f11110511310f11110511310f11110
511310f11110511310f11110511310f11110511310f11110511310f11110511310f11110511210f1
11106110f11110f18110f18110f18110f181104113f13110f181104113f131103113f141104113f1
31103113f141104113f131104113f131104113f131104113f13110f18110f1811061f030`);
// buffer length = 77
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffef12ff8f12ff8f12ff8f12ff8f12ff7f1012ff8f12ff8f12ff8f12ff8f12ff8f12ff8f12ff
8f12ffffff1f13ffffffffffffffffff8f13ffffffffffffffffff8f13ffffffffffffffaf`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 55
settings.writeBuffer(prefix+"BackI1", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 112
settings.writeBuffer(prefix+"SpriteI0", hex`
101030241ec014351ea01435142e2f7014252435145f20142514251f251614251f301e7516251f50
1e45141f16251f501e45141f16252f301e7516351f20142514251f251615141f3014252435161425
1f301435142e2f24251f3014351e301f143f40241e301f251fb01f251fb03f60`);
// buffer length = 112
settings.writeBuffer(prefix+"SpriteI1", hex`
1010f0201e3c1f2e2f701e1d1b131b3d1b5f201e2d1b131d1f2d121b2d1f301c5d1f1d122d1f501f
5d1b122d1f501f1b4d1b122d2f301c5d1f1d123d1f201e2d1b131d1f2d121d1b1f301e1d1b131b3d
121b2d1f301e3c1f2e2f2b2d1fb01f1b3f801b3f1d1fa01f3d1b1fa01b4ff050`);
// buffer length = 71
settings.writeBuffer(prefix+"SpriteI2", hex`
1010f0f0707f801f751f601f951f501f353f351f501f251f301f251f501f251f301f251f501f251f
301f251f501f251f301f251f501f353f351f501f951f601f751f807ff0f060`);
// buffer length = 123
settings.writeBuffer(prefix+"SpriteI3", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",280);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB0", hex`
6110220040160000`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB1", hex`
02202200401021010026030005030203`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB2", hex`
402022000116320010060001`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB3", hex`
6120220001163204c0060003`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB4", hex`
022022004010210001060401`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB5", hex`
412622000116320040060402`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB6", hex`
612022001016214000060000`);
// buffer length = 18
settings.writeBuffer(prefix+"RuleB7", hex`
612022001046210100060300050202020000`);
settings.writeNumber(prefix+"PlayerN",0);
}


function createCatsDogsAndSnakes(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 114
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a08310d1208110d1208110d1208110d1208110d1208110d1208110d1208110d1208110d120
11621110d1208210d1208210d1208210d12011621110d1208110d1208310d1b0d120f17120f17120
f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f171f0a0`);
// buffer length = 78
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffffff7f12ff6f124f12ff4f121f12ff9f12ffffff10ffffffffffff4f11ff7f111f111f111f
11ff1f115f11ff6f11ffffffffffffffffffffffffffffffffffffffffffffffffffffffff6f`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI1", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 35
settings.writeBuffer(prefix+"BackI3", hex`
1010bd21ed217d1bcd21ed21fd6d1bfd5d11fdfd8d2bed2bfdfd8d1b4d1bfded1bfd1d`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 112
settings.writeBuffer(prefix+"SpriteI0", hex`
101030241ec014351ea01435142e2f7014252435145f20142514251f251614251f301e7516251f50
1e45141f16251f501e45141f16252f301e7516351f20142514251f251615141f3014252435161425
1f301435142e2f24251f3014351e301f143f40241e301f251fb01f251fb03f60`);
// buffer length = 123
settings.writeBuffer(prefix+"SpriteI1", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
// buffer length = 112
settings.writeBuffer(prefix+"SpriteI2", hex`
1010f0201e3c1f2e2f701e1d1b131b3d1b5f201e2d1b131d1f2d121b2d1f301c5d1f1d122d1f501f
5d1b122d1f501f1b4d1b122d2f301c5d1f1d123d1f201e2d1b131d1f2d121d1b1f301e1d1b131b3d
121b2d1f301e3c1f2e2f2b2d1fb01f1b3f801b3f1d1fa01f3d1b1fa01b4ff050`);
// buffer length = 71
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0f0707f801f751f601f951f501f353f351f501f251f301f251f501f251f301f251f501f251f
301f251f501f251f301f251f501f353f351f501f951f601f751f807ff0f060`);
settings.writeNumber(prefix+"HelpN",0);
settings.writeNumber(prefix+"HighN",80);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
202622000116230300060002`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB1", hex`
2026220001162300101600020002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB2", hex`
222622001012230100060004`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB4", hex`
222622001012230010060004`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB5", hex`
4010220001160203`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB6", hex`
6110220040160002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB8", hex`
412022000414211000060000`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB9", hex`
4120220004102104ff1600020102`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB10", hex`
012022000410211000060000`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB11", hex`
012022000412231000060002`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB7", hex`
2220220040122310001603000101`);
// buffer length = 16
settings.writeBuffer(prefix+"RuleB12", hex`
61302200101623100006210300060000`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB13", hex`
222022001012234000060402`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB3", hex`
222622000112231000060004`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB14", hex`
6316220810160400`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB15", hex`
222622001112230004060401`);
settings.writeNumber(prefix+"PlayerN",0);
}


function createChangeBug(prefix: string) {
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 119
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a03110f131203110f131203110f131203110f131203110f131203110f131203110f1312031
10f131203110f131203110f131203110f131203110f13160f13120f17120f17120f17120f17120f1
7120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f17120f171f0a0`);
// buffer length = 57
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffffffffffffffff3f10ff8f11ffffffffffffffffffffffffffffffffffffffffffffffffff
ffffffffffffffffffffffffffffffff5f`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI1", hex`
101015f7f71715471637155715472516e72516b725f725f71725d7251647158715165725d7151715
c725167715571516f7f7f75725`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI2", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 141
settings.writeBuffer(prefix+"SpriteI1", hex`
1010902fa05f1b1f702f234b3e401f1b333b1f1e142f201f1e231e2f1e3f1c1b1f101f15141e131b
1f1b11141f1b2d112f141514231e2f141e2d1b1d1f142514133e241e3d111b142514133e241e2d1b
1d1b1f141514231e2f141e3d112f15141e131b1f1b11141f1b1d1b1d1f101f1e231e2f1e3f1c1b1f
301f1b333b1f1e142f402f234b3e705f1b1fd02f50`);
// buffer length = 112
settings.writeBuffer(prefix+"SpriteI2", hex`
1010f0201e3c1f2e2f701e1d1b131b3d1b5f201e2d1b131d1f2d121b2d1f301c5d1f1d122d1f501f
5d1b122d1f501f1b4d1b122d2f301c5d1f1d123d1f201e2d1b131d1f2d121d1b1f301e1d1b131b3d
121b2d1f301e3c1f2e2f2b2d1fb01f1b3f801b3f1d1fa01f3d1b1fa01b4ff050`);
// buffer length = 123
settings.writeBuffer(prefix+"SpriteI3", hex`
1010b01c2f502c2f301c21161f301c16371f101c1731161c101c271c16271f27412c1627161f271c
22412c3726271c37312c3726271c2726212c37161f17161c171c1f26112c371c16171c17161f2c16
112c16773c361c101c67161f561c201c1637161f27461f302c3f37261c1f801c27161c2fa01c171c
e02c50`);
settings.writeNumber(prefix+"HelpN",1);
settings.writeNumber(prefix+"HighN",NaN);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB0", hex`
4010220001160001`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB1", hex`
122022000111120100060004`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB2", hex`
612022000116320400060003`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB3", hex`
4110220004140001`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB4", hex`
412022000414320400060003`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB5", hex`
122022000411120100060004`);
settings.writeNumber(prefix+"PlayerN",0);
}

function createSkeletonDungeon(prefix: string) {	
if (settings.exists(prefix+"VersionS")) return;
settings.writeString(prefix+"VersionS","4.0.0");
// buffer length = 200
settings.writeBuffer(prefix+"WBackM", hex`
2018f0a0131032403220624013104220422062406221422062115042204220627022304220429022
30422032903230422032804230422032803240422042703240422052604220524042603230425042
60223042604240324022803240322052406240323042208230324042208230423042208230423042
20428022304230421032402220523082303240422042103220521062204210322052205220421032
2052304220421032205230428012403230522072403220622182303230522082402240425052f0a0
`);
// buffer length = 77
settings.writeBuffer(prefix+"WSpriteM", hex`
2018ffdf21ffffdf10ffffff6f12ff7f12ff7f12ffffffffffff4f12ef12ffffff4f12ffffffffff
ffcf12ffffffffffef12ffff12ffffff1f12ffffff3f13bf125f12ffffdf124f12ffffff4f`);
settings.writeNumber(prefix+"BackN",4);
// buffer length = 94
settings.writeBuffer(prefix+"BackI0", hex`
10101b6d1c1b6d1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d7b
1d7b6c1b1a6c1b1a1b6d1c1b6d1b1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b1c1d6b
1c1d6b1c1d7b1d6b7c1b1a6c1b1a`);
// buffer length = 53
settings.writeBuffer(prefix+"BackI1", hex`
101017f6f61617461836175617462718e62718b627f627f61627d6271846178617185627d6171617
c627187617561718f6f6f65627`);
// buffer length = 55
settings.writeBuffer(prefix+"BackI2", hex`
1010ff3f3ccf5c4f3c4f6c2f5c4f5c1f7c3f5c1f7c4f3c2f7caf5ccf3c8f3c7f1c4f5c5f3c3f5c4f
4c3f6c3f4c3f6c4f3c4f3c7f1cff1f`);
// buffer length = 112
settings.writeBuffer(prefix+"BackI3", hex`
10101f6e3f1e2f2e1f2e342e1f5e1f3e544e341e1f2e642e541e1f2e541e743e541e741e1f2e342e
742e1f3e1f1e1f1e541e1f1e4f3e1f1e341e1f2e2f2e345e1f1e142e1f1e541e1f1e1f1e341e1f1e
542e1f1e441e1f1e641e1f1e443e641e1f2e342e1f1e347e144e1f4e2f1e1f3e`);
settings.writeNumber(prefix+"SpriteN",4);
// buffer length = 130
settings.writeBuffer(prefix+"SpriteI0", hex`
1010f0802fa05f1e1f101e24403f1e1f3e1f141d14303f1e122f142e3f302f1e122f1b111d1e2214
4f121e121f1e2f1d1422143f12131e121f1e142d1422151f101f221e121f1e142d1422151f102f12
1e121f1e2f1d1422142f102f1e122f1b111d1e22142f103f1e122f142e3f402f2e1f3e1f141d1450
5f1e1f101e24902ff080`);
// buffer length = 89
settings.writeBuffer(prefix+"SpriteI1", hex`
1010506c802c7e12501cae12404e523e12204e821e12203ea21e12104e921e121e4c92141e1c2716
1c92141e272ea2141e101e121e247214121e101e22251462141e301e121415145214121e301e7224
121e502e622e806e50`);
// buffer length = 113
settings.writeBuffer(prefix+"SpriteI2", hex`
1010f0c01c111b605f101f111b1f402f3d1b1c2f211b301f1b313d1b1f111b1f301f411d1b1c112c
111f201f612f111d1b1f301f611d211b1f401f611d311b401f612f111b2f401f411d1b1c111d1c11
1b301f1b313d1b1f111b1f402f3d1b1c2f211b605f101f111b1fc01f1c111bf030`);
// buffer length = 64
settings.writeBuffer(prefix+"SpriteI3", hex`
1010f0502839a0384980485960586950587940281928893018391899201839111981201829211971
301841196140184119517031194180311931a0211921f080`);
settings.writeNumber(prefix+"HelpN",1);
settings.writeNumber(prefix+"HighN",0);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB0", hex`
202622000116235000060002`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB3", hex`
2026220001162300441600020002`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB4", hex`
412022001014121000060001`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB5", hex`
412022001014120100060003`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB7", hex`
412022001013321000060003`);
// buffer length = 18
settings.writeBuffer(prefix+"RuleB6", hex`
322222001003320001460300050302000102`);
// buffer length = 8
settings.writeBuffer(prefix+"RuleB1", hex`
6316220001160401`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB2", hex`
222622004012230100060004`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB8", hex`
322022004003320400160102`);
// buffer length = 28
settings.writeBuffer(prefix+"RuleB9", hex`
41602200401423010006210100063101000632010006330100060400`);
// buffer length = 18
settings.writeBuffer(prefix+"RuleB10", hex`
203622000116210044162350000600020002`);
// buffer length = 14
settings.writeBuffer(prefix+"RuleB11", hex`
3222220010133200041603000300`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB12", hex`
322622004413320144060004`);
// buffer length = 12
settings.writeBuffer(prefix+"RuleB13", hex`
322622000113320044060004`);
settings.writeNumber(prefix+"PlayerN",0);
}
