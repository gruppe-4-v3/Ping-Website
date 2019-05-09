import * as Phaser from "phaser";
import { GameScene } from "./GameScene"
import axios from "../../node_modules/axios/index"

let config: GameConfig = {
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#18216D",
  physics: {
    default: "arcade"
  },
  scene: [GameScene]
}

let game: Phaser.Game = new Phaser.Game(config);

let SignIn: HTMLDivElement = <HTMLDivElement> document.getElementById("signin");
//SignIn.addEventListener('data-onsuccess', onSignIn)
//gapi.auth2.getAuthInstance().currentUser.get().isSignedIn()
(<any>window).onSignInts = () => {
  var auth2 = gapi.auth2.getAuthInstance().currentUser.get();
  var profile = auth2.getBasicProfile();
  console.log('TS')
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
};
function onSignInts1() {  
  var auth2 = gapi.auth2.getAuthInstance().currentUser.get();
  var profile = auth2.getBasicProfile();
  console.log('TS')
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
window.onload=function(){
  let btn = document.getElementById("globalHighscore");
  btn.addEventListener("click", getGlobalHighscore);
}

function getGlobalHighscore(){
  
  axios.get('https://pingwebapi.azurewebsites.net/api/highscore')
.then(function(response){
  console.log(response.data); // ex.: { user: 'Your User'}
  console.log(response.status); // ex.: 200
});  
}
