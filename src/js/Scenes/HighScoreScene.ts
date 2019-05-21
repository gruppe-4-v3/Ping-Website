import { TextButtons } from "../GameObjects/TextButtons"
import { RESTCalls } from "../RESTCalls";

export class HighScoreScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'HighScoreScene'
        })
    }

    preload(): void { }

    create(): void {
        var highScoreButton = new TextButtons(this, 350, 450, 'Back to the Main Menu', { fill: '#f2f2f2' });
        this.add.existing(highScoreButton);
        this.createGlobalHighscore();
        highScoreButton.on('pointerup', () => {

            this.scene.launch('MMenuScene');
            this.scene.stop();
        })
    }

    update(): void {}

    createGlobalHighscore() {
        RESTCalls.getStandardGlobalHighscore().then(response => {
            console.log("Nede i then i createGlobalHighscore");
            let x = 0;
            let y = 0;
            let rang = 1;

            response.forEach(element => {
                this.add.text(x,y,"#" + rang + " - " + element.userId + ": " + element.score + " : " + element.time.getDate);
                y = y + 20;
                rang++;
            })     
        });
    }
}