import { TextButtons } from "../GameObjects/TextButtons";

export class PauseScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PauseScene'
        })
    }

    pauseButton: Phaser.Input.Keyboard.Key

    preload(): void { }

    create(): void {
        var pauseText;
        this.sound.pauseAll();

        pauseText = this.add.text(300, 320, '', { fontSize: '32px', fill: '#000' });
        pauseText.setText("GAME PAUSED");

        //Button for fullscreen toggling
        var fullScreenButton = new TextButtons(this, 700, 50, 'FULLSCREEN', { fill: '#f2f2f2' });
        this.add.existing(fullScreenButton);

        fullScreenButton.on('pointerup', () => {
            this.scale.toggleFullscreen();
        });

        //Button for resuming of game
        var ResumeButton = new TextButtons(this, 700, 100, 'RESUME', { fill: '#f2f2f2' });
        this.add.existing(ResumeButton);

        ResumeButton.on('pointerup', () => {
            this.scene.resume((<any>this.sys.settings.data).oldSceneKey);
            this.sound.resumeAll();
            this.scene.stop();
        });

        //Button for returning to the menu
        var QuitButton = new TextButtons(this, 700, 150, 'QUIT GAME', { fill: '#f2f2f2' });
        this.add.existing(QuitButton);

        QuitButton.on('pointerup', () => {
            this.scene.start('MMenuScene');
            this.scene.stop((<any>this.sys.settings.data).oldSceneKey);
        });

        this.pauseButton = this.input.keyboard.addKey('p');
    }

    update(): void {
        if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
            this.scene.resume((<any>this.sys.settings.data).oldSceneKey);
            this.scene.stop();
        }
    }
}