class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);

        this.points = pointValue;
        this.shipSpeed = 0;

        // random movement 
        let shipNum = Phaser.Math.Between(0,5);
        console.log(shipNum);

        switch(shipNum){
            case 1:
                this.shipSpeed = game.settings.spaceshipSpeed;
                console.log("Case 1");
                break;
            case 2:
                this.shipSpeed =  game.settings.spaceshipSpeed * -1;
                console.log("Case 2");
                break;
            case 3:
                this.shipSpeed = (game.settings.spaceshipSpeed / 4);
                console.log("Case 3");
                break;
            case 4:
                this.shipSpeed = (game.settings.spaceshipSpeed / 8);
                console.log("Case 4");
                break;
            case 5:
                this.shipSpeed = (game.settings.spaceshipSpeed * 4);
                console.log("Case 5");
                break;
        }
    }

    update(){
        this.x -= this.shipSpeed;
        console.log(this.shipSpeed);


        // move spaceship left
        //this.x -= game.settings.spaceshipSpeed;

        // wraparound from left to right edge 
        if(this.x <= 0-this.width){
            this.x = game.config.width;
        }
    }

    reset(){
        this.x = game.config.width;
    }

}