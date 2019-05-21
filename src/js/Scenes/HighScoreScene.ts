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
            let y = 20;
            let rang = 1;

            this.add.text(0,0, "Rang");
            this.add.text(0, 50, "Navn");
            this.add.text(0, 100, "Score");
            this.add.text(0, 150, "Dato");

            response.forEach(element => {
                //let dateFormat = element.time.getDay + "/" + element.time.getMonth + "-" + element.time.getFullYear + " - " + element.time.getHours + ":" + element.time.getMinutes;
                this.add.text(0, y, "#" + rang);
                this.add.text(100, y, element.userId + ":");
                this.add.text(200, y, "" + element.score + " :");
                this.add.text(300, y, ""+element.time.getDate)

                y = y + 20;
                rang++;
            })     
        });
    }
}