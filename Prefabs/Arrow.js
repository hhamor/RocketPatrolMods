class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        this.isFiring = false;
        this.ammo = 1;

        // add object to existing scene
        scene.add.existing(this);

    }

    update(){
        if(this.y < 0){
            this.reset();
        }
        
        if(this.isFiring){
            this.setVelocityY(-200);
            this.setVelocityX(0);
        }
    }

    fire(newX, newY){
        console.log("Arrow has been launched!");
        this.ammo = 0;
        this.setActive(true);
        this.setVisible(true);
        this.x = newX;
        this.y = newY;
        this.isFiring = true;
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.setActive(false);
        this.setVisible(false);
        this.ammo = 1;
    }
}
