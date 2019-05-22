import { TextButtons } from "../GameObjects/TextButtons"

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOverScene'
        })
    }

    theme: Phaser.Sound.BaseSound;

    preload(): void {
        this.load.audio('Avemarie', '../../assets/audio/avemarie.wav');
        this.load.audio('Theme', '../../assets/audio/theme.wav');
    }

    create(): void {
        /** Adding game theme and configuring it for loop. Not playing till you restart game */
        this.theme = this.sound.add('Theme', { loop: true });

        /** Getting variables from GameScene */
        let pointsFinal = (<any>this.sys.settings.data).finalScore;

        let finalScoreText = this.add.text(350, 340, '', { fontSize: '32px', fill: '#000' });
        let gameOverText = this.add.text(10, 200, '', { fontSize: '32px', fill: '#000' });

        finalScoreText.setText("Final Score: " + pointsFinal);

        /** Handling death messages according to your points. */
        if (pointsFinal <= 100) {
            gameOverText.setText("You're not very good at this, are you?");
        }
        else if (pointsFinal <= 500) {
            gameOverText.setText("Only slightly better. Keep at it!")
        }
        else if (pointsFinal <= 1000) {
            gameOverText.setText("You're getting there!");
        }
        else if (pointsFinal > 1000) {
            gameOverText.setText("You could also take a walk y'know?");
        }
        else {
            gameOverText.setText("How'd you manage that?!");
        }

        /** Adding Play again button */
        var playAgainButton = new TextButtons(this, 350, 375, 'Play again?', { fill: '#f2f2f2' });
        this.add.existing(playAgainButton);

        playAgainButton.on('pointerup', () => {
            this.scene.launch((<any>this.sys.settings.data).oldSceneKey, { theme: this.theme })
            aveMarie.stop();
            this.scene.stop();
            this.theme.play();
        })

        /** Adding Main menu button */
        var mainMenuButton = new TextButtons(this, 350, 400, 'Back to the Main Menu', { fill: '#f2f2f2' });
        this.add.existing(mainMenuButton);

        mainMenuButton.on('pointerup', () => {
            this.scene.launch('MMenuScene');
            aveMarie.stop();
            this.scene.stop();
        })

        /** Plays Ave Marie when you enter the Game Over scene */
        let aveMarie = this.sound.add('Avemarie');
        aveMarie.play();
    }

    update(): void { }
}