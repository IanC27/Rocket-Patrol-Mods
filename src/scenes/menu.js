console.log("Hello from menu");
class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload(){
        this.load.audio('sfx_select', 'assets/blip_select12');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav')
    }

    create() {
        let txt = this.add.text(320, 250, "menu go here");
        txt.setOrigin(0.5, 0.5);
        this.scene.start("play");
    }

}