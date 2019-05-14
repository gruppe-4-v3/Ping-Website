import { TextButtons } from '../GameObjects/TextButtons'

export class MMenuScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'MMenuScene'
        })
    }

    preload() : void{}

    create() : void
    {
        var playButton = new TextButtons(this,350,200,'Start Game!',{fill:'#f2f2f2'});
        this.add.existing(playButton);
        playButton.on('pointerup', () => {
            this.scene.launch('GameScene');
            this.scene.stop();
        })
    }

    update() : void
    {
    }
}