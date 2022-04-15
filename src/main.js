// Ian Cowan
// New Rocket Patrol
// 4/14/22
// 1hr

const config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
};

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyLeft, keyRight, keyM;
let p1Controls = {};
let p2Controls = {};
let highScore = 0;

let game = new Phaser.Game(config);
