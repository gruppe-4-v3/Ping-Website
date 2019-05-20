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
        var pointsFinal = (<any>this.sys.settings.data).finalScore;
        var finalScoreText;
        var gameOverText;
        finalScoreText = this.add.text(350, 340,'',{ fontSize: '32px', fill: '#000' });
        gameOverText = this.add.text(10, 200, '', { fontSize: '32px', fill: '#000' });
        finalScoreText.setText("Final Score: " + pointsFinal);
        if (pointsFinal <= 500) {
            gameOverText.setText("You're not very good at this, are you?");
        } 
        else if (pointsFinal <= 1000){
            gameOverText.setText("You're getting there!");
        }
        else if (pointsFinal > 1000) {
            gameOverText.setText("You could also take a walk y'know?");            
        }
        else {
            gameOverText.setText("How'd you manage that?!");
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