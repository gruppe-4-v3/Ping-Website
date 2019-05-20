import { TextButtons } from "../GameObjects/TextButtons"

export class GameOverScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'GameOverScene'
        })
    }

    preload() : void{}

    create() : void
    {
        var finalScoreText;
        var gameOverText;
        finalScoreText = this.add.text(350, 340,'',{ fontSize: '32px', fill: '#000' });
        gameOverText = this.add.text(10, 200, '', { fontSize: '32px', fill: '#000' });
        finalScoreText.setText("Final Score: " + (<any>this.sys.settings.data).finalScore);
        switch ((<any>this.sys.settings.data).finalScore) {
            case ((<any>this.sys.settings.data).finalScore < 500):
                gameOverText.setText("You're not very good at this, are you?");
                break;
            case ((<any>this.sys.settings.data).finalScore < 1000):
                gameOverText.setText("You're getting there!");    
                break;
            case ((<any>this.sys.settings.data).finalScore > 1000):
                gameOverText.setText("You could also take a walk y'know?");
                break;
            default:
                gameOverText.setText("How'd you manage that?!");
                break;
        }

        var playAgainButton = new TextButtons(this,350,375,'Play again?',{fill:'#f2f2f2'});
        this.add.existing(playAgainButton);
        playAgainButton.on('pointerup', () => {
            this.scene.launch((<any>this.sys.settings.data).oldSceneKey);
            this.scene.stop();
        })

        var mainMenuButton = new TextButtons(this,350,400,'Back to the Main Menu',{fill:'#f2f2f2'});
        this.add.existing(mainMenuButton);
        mainMenuButton.on('pointerup', () => {
            this.scene.launch('MMenuScene');
            this.scene.stop();
        })
    }

    update() : void
    {
    }
}