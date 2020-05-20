class Spaceship extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);

        this.points = pointValue;
        this.shipSpeed = 0;

        // random movement 
        this.shipNum = Phaser.Math.Between(1,5);
        console.log(this.shipNum);

        switch(this.shipNum){
            case 1:
                this.shipSpeed = game.settings.spaceshipSpeed;
                console.log("Case 1");
                break;
            case 2:
                this.shipSpeed =  game.settings.spaceshipSpeed;
                console.log("Case 2");
                break;
            case 3:
                this.shipSpeed = (game.settings.spaceshipSpeed / 2);
                console.log("Case 3");
                break;
            case 4:
                this.shipSpeed = (game.settings.spaceshipSpeed / 4);
                console.log("Case 4");
                break;
            case 5:
                this.shipSpeed = (game.settings.spaceshipSpeed * 2);
                console.log("Case 5");
                break;
        }
    }

    update(){
        this.setVelocityY(0);
        if(this.shipNum == 2){
            // move from left to right
            this.setVelocityX(this.shipSpeed * 50);
            // wraparound from left edge to right edge
            if(this.x >= game.config.width + this.width){
                this.x = 0;
            }
        } else {
            // move from right to left
            this.setVelocityX(-this.shipSpeed * 50);
            // wraparound from right edge to left edge
            if(this.x <= 0 - this.width){
                this.x = game.config.width;
            }
        }
    }

    reset(){
        this.x = game.config.width;
    }

}