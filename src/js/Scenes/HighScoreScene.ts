import { TextButtons } from "../GameObjects/TextButtons"
import { RESTCalls } from "../RESTCalls";
import { Scene } from "phaser";
import { Login } from "../Login";

export class HighScoreScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'HighScoreScene'
        })
    }

    globalHighscore : boolean = true;

    textGroup : Phaser.GameObjects.Group;

    preload(): void { }

    create(): void {

        /** Only shows local highscore if user is logged in. */
        Login.signinfunc();
        if(Login.userID.length >= 1){
            console.log(Login.userID)
            let LocalHSBtn = new TextButtons(this, 400, 20, 'Local Leaderboard', { fill: '#8c1601'});
            this.add.existing(LocalHSBtn);
            LocalHSBtn.on('pointerup', () => {
                this.globalHighscore = false;
                this.textGroup.clear(true, true);
                this.createLocalHighscore("Standard");
            })
        }

        let GlobalHSBtn = new TextButtons(this, 200, 20, 'Global Leaderboard', { fill: '#8c1601'});
        let MainMenuBtn = new TextButtons(this, 350, 450, 'Back to the Main Menu', { fill: '#f2f2f2' });
        let GameModeStandard = new TextButtons(this, 250, 35, 'Standard', { fill: '8c1601' });
        let GameModeChallenge = new TextButtons(this, 450, 35, 'Challenge', { fill: '8c1601' });

        this.add.existing(GlobalHSBtn);
        this.add.existing(MainMenuBtn);
        this.add.existing(GameModeStandard);
        this.add.existing(GameModeChallenge);

        this.textGroup = this.add.group();

        GameModeStandard.on('pointerup', () => {
            if(this.globalHighscore == true){
                this.textGroup.clear(true, true);
                this.createGlobalHighscore("Standard");
            }
            else{
                this.textGroup.clear(true, true);
                this.createLocalHighscore("Standard");
            }
        })

        GameModeChallenge.on('pointerup', () => {
            if(this.globalHighscore == true){
                this.textGroup.clear(true, true);
                this.createGlobalHighscore("Challenge");
            }
            else{
                this.textGroup.clear(true, true);
                this.createLocalHighscore("Challenge");
            }
        })

        GlobalHSBtn.on('pointerup', () => {
            this.globalHighscore = true;
            this.textGroup.clear(true, true);
            this.createGlobalHighscore("Standard");
        })

        MainMenuBtn.on('pointerup', () => {
            this.scene.launch('MMenuScene');
            this.scene.stop();
        })

        this.createGlobalHighscore("Standard")
    }

    update(): void {}

    createLocalHighscore(gamemode: string){
        RESTCalls.getLocalHighscore(Login.userID,gamemode).then(response => {
            let y = 50;
            let rang = 1;      

            this.textGroup.add(this.add.text(0,y, "Rank"));
            this.textGroup.add(this.add.text(50,y, "Name"));
            this.textGroup.add(this.add.text(300,y, "Score"));
            this.textGroup.add(this.add.text(400,y, "Date"));
            this.textGroup.add(this.add.text(650,y, "Gamemode"));

            response.forEach(element => {
                y = y + 20;
                // Takes the date element and makes it to a string. Splits it up in 2 - separated at T.
                let dateString = element.time.toString();
                let dateStringSplit = dateString.split("T", 2)
                let dateFormat = dateStringSplit[0] + " - " + dateStringSplit[1];

                this.textGroup.add(this.add.text(0, y, "#" + rang));
                this.textGroup.add(this.add.text(50, y, element.userId));
                this.textGroup.add(this.add.text(300, y, "" + element.score));
                this.textGroup.add(this.add.text(400, y, ""+ dateFormat))
                this.textGroup.add(this.add.text(650, y, element.type));

                rang++;
            })
        });
    }

    createGlobalHighscore(gamemode: string) {
        RESTCalls.getGlobalHighscore(gamemode).then(response => {
            let y = 50;
            let rang = 1;      

            this.textGroup.add(this.add.text(0,y, "Rank"));
            this.textGroup.add(this.add.text(50,y, "Name"));
            this.textGroup.add(this.add.text(300,y, "Score"));
            this.textGroup.add(this.add.text(400,y, "Date"));
            this.textGroup.add(this.add.text(650,y, "Gamemode"));

            response.forEach(element => {
                y = y + 20;
                // Takes the date element and makes it to a string. Splits it up in 2 - separated at T.
                let dateString = element.time.toString();
                let dateStringSplit = dateString.split("T", 2)
                let dateFormat = dateStringSplit[0] + " - " + dateStringSplit[1];

                this.textGroup.add(this.add.text(0, y, "#" + rang));
                this.textGroup.add(this.add.text(50, y, element.userId));
                this.textGroup.add(this.add.text(300, y, "" + element.score));
                this.textGroup.add(this.add.text(400, y, ""+ dateFormat))
                this.textGroup.add(this.add.text(650, y, element.type));

                rang++;
            })
        });
    }
}