import * as Phaser from "phaser";
/* Scene imports */
import { GameScene } from "./Scenes/GameScene"
import { PauseScene } from "./Scenes/PauseScene";
import { MMenuScene } from "./Scenes/MMenuScene";
import { HighScoreScene } from "./Scenes/HighScoreScene";
import { GameOverScene } from "./Scenes/GameOverScene";
/* End of scene imports */
import { Login } from "./Login"
import { RESTCalls } from "./RESTCalls";


/** GameConfig that contains all settings for the Phaser.Game object
 * 
 * See: https://photonstorm.github.io/phaser3-docs/global.html#GameConfig
 * for a list of possible settings
 */
let config: GameConfig = {
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  title: "Ping (Name Subject to Change)",
  width: 800,
  height: 600,
  parent: document.getElementById('game'),
  backgroundColor: "#ff8d00",
  physics: {
    default: "arcade"
  },
  scene: [MMenuScene, GameScene, PauseScene, HighScoreScene, GameOverScene],
  url: "http://projectping.azurewebsites.net/"
}

var signinbut: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");
signinbut.addEventListener('sign', Login.signinfunc);

let createUserBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createUser");
createUserBtn.addEventListener("click", createUser)

let createScoreBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("createScore");
createScoreBtn.addEventListener("click", createScore)

function createUser() {
  RESTCalls.getUser("111111", "Emil Hammer");
  Login.userID = "111111";
  Login.userName = "Emil Hammer";
}

function createScore() {
  RESTCalls.postHighscore("111111", 500);
}

// starts game
let game: Phaser.Game = new Phaser.Game(config);