class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
    
        // add object to existing scene
        scene.add.existing(this);

        this.points = pointValue;
    }

    update(){
        // random movement 
        let shipNum = Math.Between(0,5);

        switch(shipNum){
            case 1:
                this.x -= game.settings.spaceshipSpeed;
                console.log("Case 1");
                break;
            case 2:
                this.x += game.settings.spaceshipSpeed;
                console.log("Case 2");
                break;
            case 3:
                this.x -= (game.settings.spaceshipSpeed / 2);
                console.log("Case 3");
                break;
            case 4:
                this.x += (game.settings.spaceshipSpeed / 2);
                console.log("Case 4");
                break;
            case 5:
                this.x -= (game.settings.spaceshipSpeed * 2);
                console.log("Case 5");
                break;
        }


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