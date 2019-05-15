import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index"
import { IScore } from "./Model/IScore"
import { IUsers } from "./Model/IUsers"

export class RESTCalls {

  static getUser(id: string, name: string) {
    axios.get<IUsers>('https://pingwebapi.azurewebsites.net/api/users/' + id)
      .then(function (response) {
        console.log(response.data.username); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 20
      })
      .catch(function (error: AxiosError): void {
        console.log(error)
        RESTCalls.postUser(id, name);
      });
  }
  static postUser(userID: string, userName: string) {
    axios.post<IUsers>('https://pingwebapi.azurewebsites.net/api/users', { Id: userID, Username: userName })
      .then(function (response: AxiosResponse): void {
        console.log("Statuskoden er :" + response.status);
      })
      .catch(
        function (error: AxiosError): void {
          console.log(error);
        }
      )
  }

  static postHighscore(userID: string, score: number) {
    console.log(userID + " : " + score);
    axios.post<IScore>('https://pingwebapi.azurewebsites.net/api/highscore', { UserId: userID, Score: score })
      .then(function (response: AxiosResponse): void {
        console.log("Highscore postet til database: " + userID + score)
      })
      .catch(
        function (error: AxiosResponse): void {
          console.log(error);
        }
      )
  }

  static getGlobalHighscore() {
    axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore')
      .then(function (response: AxiosResponse<IScore[]>): void {
        RESTCalls.createHighscoreBoard(response);
      });
  }

  static getLocalHighscore(userID: string) {
    let inputLocalHighscore = <HTMLInputElement>document.getElementById("inputLocalHighscore");
    let inputvalue = inputLocalHighscore.value
    axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore/' + userID)
      .then(function (response: AxiosResponse<IScore[]>): void {
        RESTCalls.createHighscoreBoard(response);
      });
  }

  private static createHighscoreBoard(response: AxiosResponse<IScore[]>){
    let ContentGlobalHighscore = document.getElementById("ContentGlobalHighscore");
    ContentGlobalHighscore.innerHTML = '';
  
    let tableElement = document.createElement("table");
    let tableHeaderRow = document.createElement("tr");
    let tableHeaderUserElement = document.createElement("th");
    let tableHeaderScoreElement = document.createElement("th");
  
    tableHeaderUserElement.innerHTML = "User";
    tableHeaderScoreElement.innerHTML = "Score";
  
    tableHeaderRow.appendChild(tableHeaderUserElement);
    tableHeaderRow.appendChild(tableHeaderScoreElement);
    tableElement.appendChild(tableHeaderRow);
  
    response.data.forEach((userscore: IScore) => {
      let newRow = document.createElement("tr");
      let newUser = document.createElement("td");
      let newScore = document.createElement("td");
  
      newUser.innerHTML = "" + userscore.userId;
      newScore.innerHTML = "" + userscore.score;
  
      newRow.appendChild(newUser);
      newRow.appendChild(newScore);
      tableElement.appendChild(newRow)
    });
    ContentGlobalHighscore.appendChild(tableElement);
  }
}