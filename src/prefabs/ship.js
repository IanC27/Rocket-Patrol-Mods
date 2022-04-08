class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.movementSpeed = 1
    }

    update(){
        this.x -= this.movementSpeed;
        if(this.x < 0) {
            this.x = game.config.width;
        }
    }
}