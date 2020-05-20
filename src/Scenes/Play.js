class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    // Note: Preload comes before create!
    preload(){
        // Modded Code
        // Bow/Arrow/Target Sprites
        this.load.image('bow', './Assets/Bow.png');
        this.load.image('arrow', './Assets/Arrow.png');
        this.load.image('target', './Assets/TargetTile.png');

        // Bow/Arrow/Target Atlas
        this.load.atlas('archery', './Assets/AnimationAtlas.png', './Assets/AnimationAtlas.json');

        // Background Grass Tilemap
        this.load.image('tiles', './Assets/TilesetTemplate.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.tilemapTiledJSON('map', './Assets/GrassMap.json');

        // Top Level Frame
        this.load.image('woodFrame', './Assets/WoodFrame.png');
    }

    // Note: Do not hard code dimensions in future games, calculate resolution instead!
    create() {
        // animation config
        this.anims.create({
            key: 'targetHit',
            frameRate: 30,
            frames: this.anims.generateFrameNames('archery', {
                prefix: 'target0',
                suffix: '.png',
                start: 0,
                end: 5,
                zeroPad: 1,
            }),
        });

        // grass background
        this.map = this.make.tilemap({ 
            key: 'map',
        });

        this.tiles = this.map.addTilesetImage('TilesetTemplate', 'tiles');
        
        this.grassLayer = this.map.createStaticLayer('Tile Layer 1', this.tiles, 0, 0);

        // bow
        this.p1Rocket = new Rocket(this, game.config.width/2, 420, 'bow', 0, false).setOrigin(0,0);

        // arrow
        this.arrow = new Arrow(this, 0, 0, 'arrow', 0).setOrigin(0,0);
        this.physics.world.enable(this.arrow);

        // add targets (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'target', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'target', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'target', 0, 10).setOrigin(0,0); 
        this.physics.world.enable(this.ship01);
        this.physics.world.enable(this.ship02);
        this.physics.world.enable(this.ship03);
        
        // check collisions
        this.physics.add.collider(this.arrow, this.ship03, this.checkCollision, null, this);
        this.physics.add.collider(this.arrow, this.ship02, this.checkCollision, null, this);
        this.physics.add.collider(this.arrow, this.ship01, this.checkCollision, null, this);

        // wood frame
        this.woodFrame = this.add.image(game.config.width/2, game.config.height/2, 'woodFrame');
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(55, 50, 'Score:', scoreConfig);
        this.scoreRight = this.add.text(125, 50, this.p1Score, scoreConfig);

        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.clockTitle = this.add.text(410, 50, 'Timer: ', scoreConfig);
        this.clockText = this.add.text(530, 50, game.settings.gameTimer, scoreConfig);
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

        // check if rocket is firing to launch arrow
        if(this.p1Rocket.hasFired && !this.arrow.isFiring){
            this.arrow.fire(this.p1Rocket.x, this.p1Rocket.y);
            console.log(this.arrow.isFiring);
        } else if(!this.p1Rocket.hasFired){
            this.arrow.isFiring = false;
        }

        // check for game over condition
        if(!this.gameOver){
            // Calls on p1Rocket's update method from Rocket.js (p1Rocket is an object of Rocket)
            this.p1Rocket.update();

            // update arrow
            this.arrow.update();

            // update spaceships (x3)
            this.ship01.update(); 
            this.ship02.update();
            this.ship03.update();
        }
    }

    // Checks for collisions
    checkCollision(rocket, ship) {
        console.log("Collision");
        if(ship.body.touching.down){
            console.log("Target hit!");
            this.shipExplode(ship);
        } else {
            console.log("Nothing happened...");
        }
    }

    shipExplode(ship) {
        console.log("Destroying target!");
        ship.alpha = 0;                         // temporarily hide ship
        this.arrow.reset();

        let targetOnHit = this.add.sprite(ship.x, ship.y, 'AnimationAtlas').setOrigin(0, 0);
        targetOnHit.play('targetHit');

        targetOnHit.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                              // reset ship position
            ship.alpha = 1;                            // make ship visible again
            targetOnHit.destroy();                            // remove explosion sprite

            // score increment and repaint
            this.p1Score += ship.points;
            this.scoreRight.text = this.p1Score;   
            console.log(this.p1Score);

            this.sound.play('sfx_arrowHit');   // play explosion audio
        });
    }
}

