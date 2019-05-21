import axios, { AxiosResponse, AxiosError, AxiosPromise } from "../../node_modules/axios/index"
import { IScore } from "./Model/IScore"
import { IUsers } from "./Model/IUsers"

export class RESTCalls {

  static getUser(id: string, name: string): AxiosPromise<IUsers> {
    return axios.get<IUsers>('https://pingwebapi.azurewebsites.net/api/users/' + id)
      .then((response: AxiosResponse<IUsers>) => {
        return response;
      })
      .catch((error: AxiosError) => {
        console.log("Bruger ikke fundet.")
        return RESTCalls.postUser(id, name); // Creates a new user since it couldn't find one with the corresponding id.
      })
  }
  static postUser(userID: string, userName: string) {
    return axios.post<IUsers>('https://pingwebapi.azurewebsites.net/api/users', { Id: userID, Username: userName })
      .then((response: AxiosResponse) => {
        console.log("Ny bruger oprettet");
        return response.data;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
  }

  static postHighscore(userID: string, score: number, type: string) {
    console.log(userID + " : " + score);
    let date = new Date();
    axios.post<IScore>('https://pingwebapi.azurewebsites.net/api/highscore', { UserId: userID, Score: score, Time: date, Type: type })
      .then((response: AxiosResponse) => {
        console.log("Highscore postet til database: " + userID + " : " + score + " : " + type)
      })
      .catch((error: AxiosResponse) => {
        console.log(error);
      })
  }

  static getGlobalHighscore(gamemode : string) {
    return axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore/' + gamemode + '/top/15')
      .then((response: AxiosResponse<IScore[]>) => {
          return response.data.sort((n1: IScore, n2: IScore) => n2.score - n1.score)
      })
  }

  static getLocalHighscore(userID: string) {
    axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore/' + userID)
      .then((response: AxiosResponse<IScore[]>) => { });
  }

  static getUsernameFromId(id: string) {
    return RESTCalls.getUser(id, "unused").then(response => {
      return response.data.username;
    })
  }
}