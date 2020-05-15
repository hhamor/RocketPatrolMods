class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    // Note: Preload comes before create!
    preload(){
        // Old Code
        /*// load images/tile sprites
        this.load.image('rocket', './Assets/rocket.png');
        this.load.image('spaceship', './Assets/spaceship.png');
        this.load.image('starfield', './Assets/starfield.png');

        // load explosion spritesheet
        this.load.spritesheet('explosion', './Assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});*/

        // Modded Code
        // Bow/Arrow/Target Atlas
        this.load.atlas('archery', './Assets/AnimationAtlas/AnimationAtlas.png', './Assets/AnimationAtlas/AnimationAtlas.json');
        this.atlasTexture = this.textures.get('archery');
        var frames = this.atlasTexture.getFrameNames();
        this.add.image('bow', frames[15]);

        // Background Grass Tilemap

        // Top Level Frame
        this.load.image('woodFrame', './Assets/WoodFrame.png');
    }

    // Note: Do not hard code dimensions in future games, calculate resolution instead!
    create() {
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // bow/arrow/target objects

        // rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, 420, 'bow').setOrigin(0, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'target', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'target', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'target', 0, 10).setOrigin(0,0); 


        // wood frame
        this.woodFrame = this.add.image(game.config.width/2, game.config.height/2, 'woodFrame');

        // grass brackground
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(70, 54, this.p1Score, scoreConfig);

        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.clockText = this.add.text(470, 54, game.settings.gameTimer, scoreConfig);
    }

    // Updates every frame
    update(){
        if(!this.gameOver){
            this.clockText.text = Math.round(this.clock.getElapsed() / 1000);
        }

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }

        // check if it is gameover and the player wants to go to the menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.global.highScore = this.p1Score;
            console.log(game.global.highScore);
            this.scene.start("menuScene");
        }

        // starfield tilesprite
        //this.starfield.tilePositionX -= 4;

        // check for game over condition
        if(!this.gameOver){
            // Calls on p1Rocket's update method from Rocket.js (p1Rocket is an object of Rocket)
            this.p1Rocket.update();

            // update spaceships (x3)
            this.ship01.update(); 
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();            
            this.shipExplode(this.ship02);

        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();            
            this.shipExplode(this.ship01);
        }
    }

    // Checks for collisions
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite

        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;   

        this.sound.play('sfx_explosion');   // play explosion audio
        });       
    }
}

