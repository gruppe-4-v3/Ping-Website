import { TextButtons } from '../GameObjects/TextButtons'

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
        /** Adding and playing the theme melody */
        this.theme = this.sound.add('Theme', { loop: true });
        this.theme.play();

        //Button for fullscreen toggling
        var fullScreenButton = new TextButtons(this, 700, 50, 'FULLSCREEN', { fill: '#f2f2f2' });
        this.add.existing(fullScreenButton);
        fullScreenButton.on('pointerup', () => {
            this.scale.toggleFullscreen();
        });

        /** Adding start game buttons and functionality  */
        var playButton = new TextButtons(this, 350, 300, 'Start Game!', { fill: '#f2f2f2', boundsAlignH: "center" });
        this.add.existing(playButton);

        playButton.on('pointerup', () => {
            this.scene.launch('StandardMode', { theme: this.theme });
            this.scene.stop();
        })

        /** Adding start challenge game and functionality */
        var challengeButton = new TextButtons(this, 310, 325, 'Start Challenge Mode!', { fill: '#f2f2f2' });
        this.add.existing(challengeButton);

        challengeButton.on('pointerup', () => {
            this.scene.launch('ChallengeMode', { theme: this.theme });
            this.scene.stop();
        })

        /** Adding highscore button and functionality */
        var highScoreButton = new TextButtons(this, 350, 350, 'High Scores', { fill: '#f2f2f2' });
        this.add.existing(highScoreButton);
        highScoreButton.on('pointerup', () => {
            this.scene.launch('HighScoreScene');
            this.theme.stop();
            this.scene.stop();
        })
    }
    update(): void { }
}