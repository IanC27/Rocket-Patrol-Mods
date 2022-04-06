console.log("Hello from menu");
class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    create() {
        let txt = this.add.text(320, 250, "menu go here");
        txt.setOrigin(0.5, 0.5);
        this.scene.start("play");
    }
}