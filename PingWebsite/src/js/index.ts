import * as Phaser from "phaser";
import { GameScene } from "./GameScene"

let config: GameConfig = {
  title: "Ping (Name Subject to Change)",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#18216D",
  physics: {
    default: "arcade"
  },
  scene: [GameScene]
}

document.getElementById('startGameBtn').addEventListener('click', function() {
  let game: Phaser.Game = new Phaser.Game(config);
  document.getElementById('startGameBtn').remove()
})
var but : HTMLDivElement = <HTMLDivElement> document.getElementById("signin2");
but.addEventListener('sign', signinfunc)

function signinfunc() {
  console.log("in ts");
  console.log(but.getAttribute("data-id"));
  console.log(but.getAttribute("data-name"));
}
setInterval(signinfunc, 50);
