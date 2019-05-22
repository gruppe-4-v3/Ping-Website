import * as Phaser from "phaser";
import { Login } from "./Login"
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
  title: "Ping",
  width: 800,
  height: 600,
  parent: document.getElementById('game'),
  backgroundColor: "#6f7899",
  physics: {
    default: "arcade"
  },
  /** All scenes in the game has to be added here. The first one is the one the game starts on. */
  scene: [MMenuScene, StandardMode, ChallengeMode, PauseScene, HighScoreScene, GameOverScene],
  url: "http://projectping.azurewebsites.net/"
}

var signinbut: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");
signinbut.addEventListener('sign', Login.signinfunc);

/** Create new instace of controller obejct */
let piController: Controller = new Controller();

/** Starts game */
let game: Phaser.Game = new PingGame(config, piController);