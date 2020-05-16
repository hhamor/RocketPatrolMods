// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, hasFired) {
        super(scene, x, y, texture, frame, hasFired);
    
        // add object to existing scene
        scene.add.existing(this);

        this.cooldown = 0;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        // left/right movement
        if(keyLEFT.isDown && this.x >=47){
            this.x -= 2;
        } else if (keyRIGHT.isDown && this.x <= 578){
            this.x += 2;
        }

        if(this.hasFired){
            this.cooldown += 1;
        }

        if(this.cooldown > 100){
            this.reset();
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.hasFired){
            this.hasFired = true;            
            this.sfxRocket.play();
            console.log("Firing!");
        }

    }

    // Resets
    reset(){
        this.hasFired = false;
        this.cooldown = 0;
    }
}