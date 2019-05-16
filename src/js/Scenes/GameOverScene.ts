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
        
        var gameOverText;
        gameOverText = this.add.text(10, 200, '', { fontSize: '32px', fill: '#000' });
        gameOverText.setText("You're not very good at this, are you?");

        var playAgainButton = new TextButtons(this,350,375,'Play again?',{fill:'#f2f2f2'});
        this.add.existing(playAgainButton);
        playAgainButton.on('pointerup', () => {
            this.scene.launch((<any>this.sys.settings.data).oldKey);
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