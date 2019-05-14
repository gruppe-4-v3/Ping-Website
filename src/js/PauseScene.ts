export class PauseScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'PauseScene'
        })
    }

    pauseButton: Phaser.Input.Keyboard.Key

    preload() : void{}

    create() : void
    {
        this.pauseButton = this.input.keyboard.addKey('p');
    }

    update() : void
    {
        console.log('This is the other scene')
        if(Phaser.Input.Keyboard.JustDown(this.pauseButton)){
            this.scene.resume('GameScene');
            this.scene.stop();
        }
    }
}