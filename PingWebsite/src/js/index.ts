import * as Phaser from "phaser";
import { GameScene } from "GameScene"

let config: GameConfig = {
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#18216D",
  physics: {
    default: "arcade"
  },
  //scene: [GameScene]
}

let game: Phaser.Game = new Phaser.Game(config);

let SignIn: HTMLDivElement = <HTMLDivElement> document.getElementById("signin");

export function onSignIn(googleUser : any) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
