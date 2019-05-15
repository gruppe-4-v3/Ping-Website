import { TextButtons } from "../GameObjects/TextButtons"

export class HighScoreScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'HighScoreScene'
        })
    }

    preload() : void{}

    create() : void
    {
        var highScoreButton = new TextButtons(this,350,450,'Back to the Main Menu',{fill:'#f2f2f2'});
        this.add.existing(highScoreButton);
        highScoreButton.on('pointerup', () => {
            this.scene.launch('MMenuScene.ts');
            this.scene.stop();
        })
    }

    update() : void
    {
    }
}