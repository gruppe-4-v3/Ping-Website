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
    return axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore/top/15')
      .then((response: AxiosResponse<IScore[]>) => {
          return response.data.sort((n1, n2) => n2.score - n1.score)
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

interface ScoreText {
  text: string;
  score: number;
}