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
        var mainMenuButton = new TextButtons(this,350,450,'Back to the Main Menu',{fill:'#f2f2f2'});
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