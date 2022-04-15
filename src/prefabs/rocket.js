class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, controls){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.isFiring = false;
        this.movementSpeed = 2
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.controls = controls;
        this.points = 0;
    }

    update(){
        if (!this.isFiring) {
            if (this.controls.keyLeft.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.movementSpeed;
            } else if (this.controls.keyRight.isDown && this.x <= game.config.width 
                - borderUISize - this.width) {
                    this.x += this.movementSpeed;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.controls.keyFire) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.movementSpeed;
        }

        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset()
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}