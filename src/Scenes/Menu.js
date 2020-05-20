class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_arrowHit', './Assets/161098__braqoon__arrow-damage.wav');
        this.load.audio('sfx_arrowFire', './Assets/178872__hanbaal__bow.wav');
        this.load.audio('med_fanfare', './Assets/99961__cgeffex__medieval-fanfare-neonaeon-tweaked-by-cgeffex.wav')
        this.load.image('sky', './Assets/Sky.png');
    }
    
    create() {
      // sky
      this.skyBG = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0,0);
      // menu config
        let menuConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '20px',
            backgroundColor: '#8B4513',
            color: '#FFFFFF',
            align: 'right', 
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text 
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer,  'ARCHERY PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY,  'Use <- -> arrows to move and (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#800000';
        this.add.text(centerX, centerY + textSpacer,  'Press <- for Easy and -> for Hard', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 104, 'High Score: ' + game.global.highScore, menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.sound.add('med_fanfare');
    }

    update() {
      //menu movement
      this.skyBG.tilePositionX -= 4;

      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('med_fanfare');
          this.scene.start("playScene");    
        } else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('med_fanfare');
          this.scene.start("playScene");    
        }
    }
}