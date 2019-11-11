// bytecode representation for TileWorld

// 4 bits
//  0001 stationary
//  0010 push
//  0011 moving
//  0100 when
//  0101 move
//  0110 remove
//  0111 create



// event: sprite-code, direction, push/motion
// when: direction, direction, [a, only, none] sprite-code


// sprite-code: 5 bits
// direction (L,R,U,D,-): 3 bits
// instructions:
// - assert 

// sprite-code: 5*4 = 20 bits

// symmetry: 0, 2, 4