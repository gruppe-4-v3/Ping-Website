import * as Phaser from "phaser";
<<<<<<< HEAD
import { GameScene } from "./GameScene";
import axios,{AxiosResponse, AxiosError} from "../../node_modules/axios/index";
=======
import { GameScene } from "./GameScene"
import axios, { AxiosResponse } from "../../node_modules/axios/index"
import { IScore } from "../js/IScore"
import { IUsers } from "../js/IUsers"

>>>>>>> 646813453be9a2ed2584a672bad3ba36c8eca1c0

var userID : string = "";
var userName : string = "";
interface IUser {
  Id : string;
  Username: string;
}
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

var signinbut : HTMLDivElement = <HTMLDivElement> document.getElementById("signin2");
signinbut.addEventListener('sign', signinfunc)

function signinfunc() {
  console.log("in ts");
  console.log(signinbut.getAttribute("data-id"));
  console.log(signinbut.getAttribute("data-name"));
  userID = signinbut.getAttribute("data-id");
  userName = signinbut.getAttribute("data-name");
  getUser(userID);
}
function getUser(id : string){
  axios.get<IUser>('https://pingwebapi.azurewebsites.net/api/users/' + id)
.then(function(response){
  console.log(response.data.Username); // ex.: { user: 'Your User'}
  console.log(response.status); // ex.: 200
})
.catch(function (error:AxiosError) : void {
console.log(error)
});
}
<<<<<<< HEAD
=======

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
>>>>>>> 646813453be9a2ed2584a672bad3ba36c8eca1c0
