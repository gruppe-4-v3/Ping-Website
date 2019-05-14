import * as Phaser from "phaser";
import { GameScene } from "./GameScene"
import { PauseScene } from "./PauseScene";
import { Login } from "./Login"


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
  backgroundColor: "#18216D",
  physics: {
    default: "arcade"
  },
  scene: [GameScene, PauseScene],
  url: "http://projectping.azurewebsites.net/"
}

let login:Login = new Login();

// starts game
let game: Phaser.Game = new Phaser.Game(config);