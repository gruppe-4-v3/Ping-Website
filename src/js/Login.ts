import axios,{ AxiosResponse, AxiosError } from "../../node_modules/axios/index"
import { IScore } from "./IScore"
import { IUsers } from "./IUsers"


var userID : string = "";
var userName : string = "";

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
  axios.get<IUsers>('https://pingwebapi.azurewebsites.net/api/users/' + id)
.then(function(response){
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
  .then(function (response :  AxiosResponse): void
  {
      console.log("Statuskoden er :" + response.status);
  })
  .catch(
      function (error:AxiosError) : void{                          
          console.log(error);
      }
  )
}