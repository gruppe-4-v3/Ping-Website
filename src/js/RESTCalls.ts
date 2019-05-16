import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index"
import { IScore } from "./Model/IScore"
import { IUsers } from "./Model/IUsers"

export class RESTCalls {

  static getUser(id: string, name: string) {
    axios.get<IUsers>('https://pingwebapi.azurewebsites.net/api/users/' + id)
      .then((response) => {
        console.log("Bruger allerede kendt: " + response.data.username + ", ID: " + response.data.id)
      })
      .catch((error: AxiosError) => {
        console.log("Bruger ikke fundet.")
        RESTCalls.postUser(id, name); // Creates a new user since it couldn't find one with the corresponding id.
      })
  }
  static postUser(userID: string, userName: string) {
    axios.post<IUsers>('https://pingwebapi.azurewebsites.net/api/users', { Id: userID, Username: userName })
      .then((response: AxiosResponse) => {
        console.log("Ny bruger oprettet");
      })
      .catch((error: AxiosError) => {
          console.log(error);
        })
  }

  static postHighscore(userID: string, score: number) {
    console.log(userID + " : " + score);
    axios.post<IScore>('https://pingwebapi.azurewebsites.net/api/highscore', { UserId: userID, Score: score })
      .then((response: AxiosResponse) => {
        console.log("Highscore postet til database: " + userID + " : " + score)
      })
      .catch((error: AxiosResponse) => {
        console.log(error);
      })
  }

  static getGlobalHighscore() {
    axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore')
      .then((response: AxiosResponse<IScore[]>) => {});}

  static getLocalHighscore(userID: string) {
    axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore/' + userID)
      .then((response: AxiosResponse<IScore[]>) => {});}
}