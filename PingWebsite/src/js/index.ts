import * as Phaser from "phaser";
import { GameScene } from "./GameScene";
import axios,{AxiosResponse, AxiosError} from "../../node_modules/axios/index";

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
