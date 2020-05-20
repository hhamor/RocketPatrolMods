/* Asset Citations:
- sfx_arrowFire sound: https://freesound.org/people/Hanbaal/sounds/178872/
- sfx_arrowHit sound: https://freesound.org/people/braqoon/sounds/161098/
- med_fanfare sound: https://freesound.org/people/CGEffex/sounds/99961/
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ],
    physics:{
        default:'arcade',
        arcade:{debug:false}
    },
}

let keyF, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config);

// define global variables
game.global = {
    highScore: 0,
}

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}