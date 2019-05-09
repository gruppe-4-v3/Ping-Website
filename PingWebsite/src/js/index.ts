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

declare const gapi: any;
  var auth2;
  function googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '376761281684-pvn87r7hftv8l3cqou29tbbqdapnmq3c.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  function attachSignin(element : any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser : any) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error : any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

function ngAfterViewInit(){
      this.googleInit();
}
