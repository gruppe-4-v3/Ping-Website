import { TextButtons } from "../GameObjects/TextButtons";

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
                //Button for fullscreen toggling
                var fullScreenButton = new TextButtons(this,700,50,'FULLSCREEN',{fill:'#f2f2f2'});
                this.add.existing(fullScreenButton);
                fullScreenButton.on('pointerup', () => {
                    this.scale.toggleFullscreen();
                });

        this.pauseButton = this.input.keyboard.addKey('p');
    }

    update() : void
    {
        if(Phaser.Input.Keyboard.JustDown(this.pauseButton)){
            this.scene.resume('StandardMode');
            this.scene.stop();
        }
    }
}