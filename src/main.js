// Ian Cowan
// New Rocket Patrol
// 4/14/22
// 2hrs

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

/*
mods:
-- Implement a simultaneous two-player mode (30)
-- Track a high score that persists across scenes and display it in the UI (5)
-- Implement parallax scrolling (10)

*/