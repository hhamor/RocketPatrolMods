class Arrow extends Phaser.GameObjects.Sprite {
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
            this.y -= 2;
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
        this.setActive(false);
        this.setVisible(false);
        this.isFiring = false;
        this.ammo = 1;
    }
}
