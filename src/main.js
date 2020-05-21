/* Asset Citations:
- sfx_arrowFire sound: https://freesound.org/people/Hanbaal/sounds/178872/
- sfx_arrowHit sound: https://freesound.org/people/braqoon/sounds/161098/
- med_fanfare sound: https://freesound.org/people/CGEffex/sounds/99961/
*/

/* Points Breakdown:
- Track a high score that persists across scenes and display it in the UI (10)
    High score is implemented in the game, which can be shown when you exit your first round to the menu.
- Randomize each spaceship's movement direction at the start of each play (10)
    Spaceship movement is randomized by speed and direction, although I think the speed differences are more subtle due to the way velocity works compared
    to simple .x/.y movement.
- Display the time remaining (in seconds) on the screen (15):
    Timer is being displayed on screen when the game is being played.
- Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25)
    Art assets of the game are all made by hand.
- Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
    The artwork, UI, and sound have all been changed to evoke a medieval theme/aesthetic. The rocket is replaced by a bow that fires arrows instead
    of itself at the spaceships/targets in the game.
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