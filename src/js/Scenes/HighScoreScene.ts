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
            let y = 20;
            let rang = 1;

            this.add.text(0,0, "Rang");
            this.add.text(50,0, "Navn");
            this.add.text(300,0, "Score");
            this.add.text(400,0, "Dato");
            this.add.text(650,0, "Gamemode");

            response.forEach(element => {
                // Takes the date element and makes it to a string. Splits it up in 2 - separated at T.
                let dateString = element.time.toString();
                let dateStringSplit = dateString.split("T", 2)
                let dateFormat = dateStringSplit[0] + " - " + dateStringSplit[1];

                this.add.text(0, y, "#" + rang);
                this.add.text(50, y, element.userId);
                this.add.text(300, y, "" + element.score);
                this.add.text(400, y, ""+ dateFormat)
                this.add.text(650, y, element.type);

                y = y + 20;
                rang++;
            })     
        });
    }
}