// Ian Cowan
// New Rocket Patrol
// 4/14/22
// 3hrs

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
let highScores = [0, 0];

let game = new Phaser.Game(config);

/*
mods:

-- Implement a simultaneous two-player mode (30)
-- Track a high score that persists across scenes and display it in the UI (5)
-- Implement parallax scrolling (10)
-- Add your own (copyright-free) background music to the Play scene (5)
-- Create a new scrolling tile sprite for the background (5) 
(I made a new one the first time and then multiple new ones for the parallax scrolling background)
-- Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
-- andomize each spaceship's movement direction at the start of each play (5)

*/