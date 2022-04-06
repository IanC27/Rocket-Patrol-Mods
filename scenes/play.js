class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload(){
        this.load.image('stars', 'assets/bg1.png')
    }

    create(){
        
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'stars');
        let rectUI = this.add.rectangle(0, 0, game.config.width, borderUISize, 0xfacade);
        rectUI.setOrigin(0, 0);
        //this.add.text(20, 20, "Welcome to the game")
    }

    update() {
        this.bg.tilePosition -= 10;
    }
}