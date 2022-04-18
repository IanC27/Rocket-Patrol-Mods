class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('rocket2', 'assets/rocketP2.png')
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('starfield_back', 'assets/starfield_3.png');
        this.load.image('starfield_mid', 'assets/starfield_2.png');
        this.load.image('starfield_front', 'assets/starfield_1.png');
        this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
        this.load.image('speedy', 'assets/speedy.png');
    }

    create() {


        // controls setup
        p1Controls.keyFire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        p1Controls.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        p1Controls.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        p2Controls.keyFire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        p2Controls.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        p2Controls.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });

        // draw scene background and UI
        this.starfieldBack = this.add.tileSprite(0, 0, 640, 480, 'starfield_back').setOrigin(0, 0);
        this.starfieldMid = this.add.tileSprite(0, 0, 640, 480, 'starfield_mid').setOrigin(0, 0);
        this.starfieldFront = this.add.tileSprite(0, 0, 640, 480, 'starfield_front').setOrigin(0, 0);

        // ships
        // randomize direction: 1 for left, -1 for right
        this.speedyShip = new Ship(this, game.config.width, borderUISize * 4,
            'speedy', 0, 50, 1.75).setOrigin(0, 0);
        this.ship1 = new Ship(this, game.config.width - borderUISize * 2, borderUISize * 5 + borderPadding,
            'spaceship', 0, 30).setOrigin(0, 0);
        this.ship2 = new Ship(this, game.config.width - borderUISize * 4, borderUISize * 6 + borderPadding * 2,
            'spaceship', 0, 20).setOrigin(0, 0);
        this.ship3 = new Ship(this, game.config.width - borderUISize * 6, borderUISize * 7 + borderPadding * 3,
            'spaceship', 0, 10).setOrigin(0, 0);

        this.shipsList = [this.ship1, this.ship2, this.ship3, this.speedyShip];

        // randomize the directions of each ship
        for (let i = 0; i < this.shipsList.length; i++) {
            if (Math.random() >= 0.5) {
                this.shipsList[i].movementSpeed *= -1
                this.shipsList[i].flipX = true;
            }
        }

        this.gameOver = false;



        // white borders
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize,
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize,
            game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height,
            0xffffff).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0,
            borderUISize, game.config.height, 0xffffff).setOrigin(0, 0);



        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        // TODO: fix high score so that each difficulty has a different one
        // high score text

        this.highScoreText = this.add.text(game.config.width / 2, borderUISize + borderPadding * 2,
            highScores[game.settings.difficulty], scoreConfig).setOrigin(0.5, 0);

        // 1st rocket setup
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding - 4,
            'rocket', p1Controls).setOrigin(0.5, 0);
        scoreConfig.backgroundColor = "#FF0000";
        scoreConfig.color = "#000";
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth,
            borderUISize + borderPadding * 2, this.p1Rocket.points, scoreConfig);
        this.p1Rocket.scoreText = this.scoreRight;

        this.rocketsList = [this.p1Rocket];

        // two-player setup
        if (game.settings.multiplayer) {
            this.p2Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding - 4,
                'rocket2', p2Controls).setOrigin(0.5, 0);

            this.rocketsList.push(this.p2Rocket);

            scoreConfig.backgroundColor = "#0000FF";
            scoreConfig.color = "#00FF00";
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2,
                this.p2Rocket.points, scoreConfig);
            this.p2Rocket.scoreText = this.scoreLeft;
        }
        // scoreconfig back to default
        scoreConfig.backgroundColor = '#F3B141';
        scoreConfig.color = '#843605';




        // music
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.bgMusic = this.sound.add('bg_music', musicConfig);

        // 60-sec play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu',
                scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.bgMusic.play();

    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.bgMusic.stop();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(p1Controls.keyLeft)) {
            this.bgMusic.stop();
            this.scene.start("menu");
        }

        if (!this.gameOver) {
            // parallax bg
            this.starfieldBack.tilePositionX -= 1;
            this.starfieldMid.tilePositionX -= 2;
            this.starfieldFront.tilePositionX -= 4;

            for (let rocket of this.rocketsList) {
                rocket.update();
            }
            for (let ship of this.shipsList) {
                ship.update();
            }
        }

        for (let rocket of this.rocketsList) {
            for (let ship of this.shipsList) {
                if (this.checkCollision(rocket, ship)) {
                    rocket.reset();
                    this.shipExplode(ship, rocket);
                }
            }
        }

    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, rocket) {
        // hide ship temporarily
        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        rocket.points += ship.points;
        rocket.scoreText.text = rocket.points;
        let sounds = ['sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4', 'sfx_explosion5'];
        this.sound.play(sounds[Math.floor(Math.random() * sounds.length)]);

        if (rocket.points > highScores[game.settings.difficulty]) {
            highScores[game.settings.difficulty] = rocket.points;
            this.highScoreText.text = highScores[game.settings.difficulty];
        }
    }

}