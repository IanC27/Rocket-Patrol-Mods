class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload(){
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('starfield', 'assets/starfield.png');
    }

    create(){
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2, 0x00FF00).setOrigin(0, 0);
        //this.add.text(20, 20, "Welcome to the game")
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xffffff).setOrigin(0, 0);

        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket');
        //this.add.existing(p1Rocket);
    }

    update() {
        this.starfield.tilePositionX -= 4;
        const movementSpeed = 4;
        if (keyLeft.isDown) {
            this.p1Rocket.x -= movementSpeed;
        }
        if (keyRight.isDown) {
            this.p1Rocket.x += movementSpeed;       
        }
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
        }
    }
}