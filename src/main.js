let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
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