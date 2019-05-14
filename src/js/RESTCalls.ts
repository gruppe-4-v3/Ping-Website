import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index"
import { IScore } from "./IScore"
import { IUsers } from "./IUsers"

export class RESTCalls {

  static getUser(id: string) {
    axios.get<IUsers>('https://pingwebapi.azurewebsites.net/api/users/' + id)
      .then(function (response) {
        console.log(response.data.username); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
        if (response.data.username != this.userName) {
          this.postUser()
        }
      })
      .catch(function (error: AxiosError): void {
        console.log(error)
        this.postUser();
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
        //createHighscoreBoard(response);
      });
  }

  static getLocalHighscore(userID: string) {
    let inputLocalHighscore = <HTMLInputElement>document.getElementById("inputLocalHighscore");
    var inputvalue = inputLocalHighscore.value
    axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore/' + userID)
      .then(function (response: AxiosResponse<IScore[]>): void {
        //createHighscoreBoard(response);
      });
  }
}