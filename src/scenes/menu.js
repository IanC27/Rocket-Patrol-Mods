console.log("Hello from menu");
class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload(){
        this.load.audio('sfx_select', 'assets/blip_select12.wav');
        this.load.audio('sfx_explosion', 'assets/explosion38.wav');
        this.load.audio('sfx_rocket', 'assets/rocket_shot.wav');
        //laserattack.wav by VABsounds at https://freesound.org/people/VABsounds/sounds/443865/
        this.load.audio('bg_music', 'assets/laserattack.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize*2 - borderPadding*2, 
        'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#FF0000";
        menuConfig.color = "#000";
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
        'P1: ← → arrows to move & ↑ to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#0000FF";
        menuConfig.color = "#00FF00"
        this.p2ControlsText = this.add.text(game.config.width/2, game.config.height/2, 
        '', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00"
        menuConfig.color = "#000";
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
        'Press M to toggle multiplayer mode', menuConfig).setOrigin(0.5);

    
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 
        'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        this.playerCountText = this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, 
        '1 Player Mode', menuConfig).setOrigin(0.5);
        this.twoPlayers = false;

        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            // multi-mode toggle
            if (this.twoPlayers) {
                this.twoPlayers = false;
                this.p2ControlsText.text = '';
                this.playerCountText.text = '1 Player Mode';
            } else {
                this.twoPlayers = true;
                this.playerCountText.text = '2 Player Mode';
                this.p2ControlsText.text = 'P2: Use A & D to move & W to fire';
            }
            this.sound.play('sfx_select');
        }
        if (Phaser.Input.Keyboard.JustDown(keyLeft)) {
            // ez mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                multiplayer: this.twoPlayers
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                multiplayer: this.twoPlayers
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        }
    }

}