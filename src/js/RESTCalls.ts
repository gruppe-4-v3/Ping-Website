import axios,{ AxiosResponse, AxiosError } from "../../node_modules/axios/index"
import { IScore } from "./IScore"
import { IUsers } from "./IUsers"

function getUser(id : string){
    axios.get<IUsers>('https://pingwebapi.azurewebsites.net/api/users/' + id)
  .then(function(response : AxiosResponse) : void
  {
    console.log(response.data.username); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
    if (response.data.username != userName) {
      postUser()
    }
  })
  .catch(function (error:AxiosError) : void {
  console.log(error)
  postUser();
  });
  }
  function postUser(){
    axios.post<IUsers>('https://pingwebapi.azurewebsites.net/api/users', {Id:userID,Username:userName})
    .then(function (response :  AxiosResponse) : void
    {
        console.log("Statuskoden er :" + response.status);
    })
    .catch(
        function (error:AxiosError) : void{                          
            console.log(error);
        }
    )
  }
  
  function postHighscore(score : number){
    axios.post<IScore>('https://pingwebapi.azurewebsites.net/api/highscore', {UserId:userID,Score:score})
    .then(function (response:AxiosResponse) : void{
        console.log("Highscore postet til database: " + userID + score )
    })
    .catch(
      function(error:AxiosResponse) : void 
      {
        console.log(error);
      }
    )
  }
  
  let BtnGlobalHighscore = document.getElementById("BtnGlobalHighscore");
  BtnGlobalHighscore.addEventListener("click", getGlobalHighscore);
  let BtnLocalHighscore = document.getElementById("BtnLocalHighscore");
  BtnLocalHighscore.addEventListener("click", getLocalHighscore);
  
  function getGlobalHighscore(){
      axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore')
    .then(function(response: AxiosResponse<IScore[]>) : void
    {
      createHighscoreBoard(response);
    });
  }
  
  function getLocalHighscore(){
    let inputLocalHighscore = <HTMLInputElement>document.getElementById("inputLocalHighscore");
    var inputvalue = inputLocalHighscore.value
    axios.get<IScore[]>('https://pingwebapi.azurewebsites.net/api/highscore/' + userID)
  .then(function(response: AxiosResponse<IScore[]>) : void
  {
    createHighscoreBoard(response);
  });  
  }
  