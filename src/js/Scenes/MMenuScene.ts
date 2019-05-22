import { TextButtons } from '../GameObjects/TextButtons'
import { ImageButtons } from '../GameObjects/ImageButtons'
import { GameScene } from './GameScene';
//import img from '../../assets/PlayGameButRest.png'

export class MMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MMenuScene'
        })
    }

    theme: Phaser.Sound.BaseSound;

    preload(): void {
        this.load.audio('Theme', '../../assets/audio/theme.wav');
    }

    create(): void {
        this.theme = this.sound.add('Theme', { loop: true });
        this.theme.play();

        //Button for fullscreen toggling
        var fullScreenButton = new TextButtons(this, 700, 50, 'FULLSCREEN', { fill: '#f2f2f2' });
        this.add.existing(fullScreenButton);
        fullScreenButton.on('pointerup', () => {
            this.scale.toggleFullscreen();
        });

        var playButton = new TextButtons(this, 350, 300, 'Start Game!', { fill: '#f2f2f2', boundsAlignH: "center" });
        this.add.existing(playButton);
        playButton.on('pointerup', () => {
            this.scene.launch('StandardMode', { theme: this.theme });
            this.scene.stop();
        })

        var challengeButton = new TextButtons(this, 310, 325, 'Start Challenge Mode!', { fill: '#f2f2f2' });
        this.add.existing(challengeButton);
        challengeButton.on('pointerup', () => {
            this.scene.launch('ChallengeMode', { theme: this.theme });
            this.scene.stop();
        })

        var highScoreButton = new TextButtons(this, 350, 350, 'High Scores', { fill: '#f2f2f2' });
        this.add.existing(highScoreButton);
        highScoreButton.on('pointerup', () => {
            this.scene.launch('HighScoreScene');
            this.theme.stop();
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

    update(): void {
    }
}