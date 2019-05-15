import { TextButtons } from '../GameObjects/TextButtons'
import { ImageButtons } from '../GameObjects/ImageButtons'

export class MMenuScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'MMenuScene'
        })
    }

    preload() : void{
        this.load.atlas('playButtonAtlas','assets/playButtonSheet.png','assets/playButtonSheet.json');
    }

    create() : void
    {
        var playButton = new TextButtons(this,350,300,'Start Game!',{fill:'#f2f2f2'});
        this.add.existing(playButton);
        playButton.on('pointerup', () => {
            this.scene.launch('GameScene');
            this.scene.stop();
        })

        var highScoreButton = new TextButtons(this,350,325,'High Scores',{fill:'#f2f2f2'});
        this.add.existing(highScoreButton);
        highScoreButton.on('pointerup', () => {
            this.scene.launch('HighScoreScene');
            this.scene.stop();
        })

       new ImageButtons(
           this,
           350,
           400,
           'playButtonAtlas',
           'PlayGameButRest.png',
           'PlayGameButActive.png',
           'PlayGameButHover.png',
           () => {
            this.scene.launch('GameScene');
            this.scene.stop();  
           }
       );
    }

    update() : void
    {
    }
}