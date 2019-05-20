import * as Phaser from "phaser";
import { Login } from "./Login"
import { RESTCalls } from "./RESTCalls";
import { Controller } from "./Controller"
import {
  PingGame,
// Scenes
  PauseScene, 
  MMenuScene, 
  HighScoreScene, 
  GameOverScene,
  StandardMode,
  ChallengeMode
} from './Ping'

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
  scene: [MMenuScene, StandardMode, ChallengeMode, PauseScene, HighScoreScene, GameOverScene],
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

/** Create new instace of controller obejct */
let piController: Controller = new Controller();

/** Add a eventlistener that connects to the contoller when connect button is pressed */
document.getElementById('connectPiBtn').addEventListener('click', () => { 
  piController.ip = (<HTMLInputElement>document.getElementById('piIp')).value;
  piController.Connect()
})

// starts game
let game: Phaser.Game = new PingGame(config, piController);