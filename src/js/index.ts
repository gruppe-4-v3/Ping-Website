import * as Phaser from "phaser";
import { GameScene } from "./Scenes/GameScene"
import { PauseScene } from "./Scenes/PauseScene";
import { Login } from "./Login"
import { MMenuScene } from "./Scenes/MMenuScene";
import { RESTCalls } from "./RESTCalls";



/** GameConfig that contains all settings for the Phaser.Game object
 * 
 * See: https://photonstorm.github.io/phaser3-docs/global.html#GameConfig
 * for a list of possible settings
 */
let config: GameConfig = {
  title: "Ping (Name Subject to Change)",
  width: 800,
  height: 600,
  parent: document.getElementById('game'),
  backgroundColor: "#ff8d00",
  physics: {
    default: "arcade"
  },
  scene: [MMenuScene, GameScene, PauseScene],
  url: "http://projectping.azurewebsites.net/"
}

var login: Login = new Login();
var signinbut: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");
signinbut.addEventListener('sign', login.signinfunc)

document.getElementById("BtnGlobalHighscore").addEventListener("click", RESTCalls.getGlobalHighscore);

// starts game
let game: Phaser.Game = new Phaser.Game(config);