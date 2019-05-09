import * as Phaser from "phaser";
import { GameScene } from "./GameScene"
import axios, { AxiosResponse } from "../../node_modules/axios/index"
import { IScore } from "../js/IScore"
import { IUsers } from "../js/IUsers"


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
        scope: 'profile'
      });
      this.attachSignin(document.getElementById('signin2'));
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

window.onload = function(){
let BtnGlobalHighscore = document.getElementById("BtnGlobalHighscore");
BtnGlobalHighscore.addEventListener("click", getGlobalHighscore);
}
function getGlobalHighscore(){
    axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore')
  .then(function(response: AxiosResponse<IScore[]>) : void
  {
    createHighscoreBoard(response);
  });  
}

/** Creates a highscoreboard
* @param response - An AxiosResponse which is made up of an array of IScore. Should already be filtered by the REST Web API 
*/
function createHighscoreBoard(response: AxiosResponse<IScore[]>){
  let ContentGlobalHighscore = document.getElementById("ContentGlobalHighscore");
  DeleteChildnodes(ContentGlobalHighscore);
  
  var tableElement = document.createElement("table");
  var tableHeaderRow = document.createElement("tr");
  var tableHeaderUserElement = document.createElement("th");
  var tableHeaderScoreElement = document.createElement("th");
  
  tableHeaderUserElement.innerHTML = "User";
  tableHeaderScoreElement.innerHTML = "Score";
  
  tableHeaderRow.appendChild(tableHeaderUserElement);
  tableHeaderRow.appendChild(tableHeaderScoreElement);
  tableElement.appendChild(tableHeaderRow);

  response.data.forEach((userscore: IScore) => {
    var newRow = document.createElement("tr");
    var newUser = document.createElement("td");
    var newScore = document.createElement("td");
    
    newUser.innerHTML = "" + userscore.userId;
    newScore.innerHTML = "" + userscore.score;
    
    newRow.appendChild(newUser);
    newRow.appendChild(newScore);
    tableElement.appendChild(newRow)
  });
  ContentGlobalHighscore.appendChild(tableElement);
}

/** Deletes all childnodes of the given element. Is primarily used to clear the highscore content before remaking a new one. */
function DeleteChildnodes(element : Element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}
