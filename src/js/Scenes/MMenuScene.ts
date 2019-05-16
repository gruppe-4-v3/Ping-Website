import { TextButtons } from '../GameObjects/TextButtons'
import { ImageButtons } from '../GameObjects/ImageButtons'
//import img from '../../assets/PlayGameButRest.png'

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
        //Button for fullscreen toggling
        var fullScreenButton = new TextButtons(this,700,50,'FULLSCREEN',{fill:'#f2f2f2'});
        this.add.existing(fullScreenButton);
        fullScreenButton.on('pointerup', () => {
            this.scale.toggleFullscreen();
        });

        var playButton = new TextButtons(this,350,300,'Start Game!',{fill:'#f2f2f2'});
        this.add.existing(playButton);
        playButton.on('pointerup', () => {
            this.scene.launch('StandardMode');
            this.scene.stop();
        })

        var playButton = new TextButtons(this,350,325,'Start Challenge Mode!',{fill:'#f2f2f2'});
        this.add.existing(playButton);
        playButton.on('pointerup', () => {
            this.scene.launch('ChallengeMode');
            this.scene.stop();
        })

        var highScoreButton = new TextButtons(this,350,350,'High Scores',{fill:'#f2f2f2'});
        this.add.existing(highScoreButton);
        highScoreButton.on('pointerup', () => {
            this.scene.launch('HighScoreScene');
            this.scene.stop();
        })

       /*new ImageButtons(
           this,
           350,
           400,
           'playButtonAtlas',
           {img},
           'PlayGameButActive.png',
           'PlayGameButHover.png',
           () => {
            this.scene.launch('GameScene');
            this.scene.stop();  
           }
       );*/
    }

    update() : void
    {
    }
}