import axios from "../../node_modules/axios/index"

let btn = document.getElementById("globalHighscore").addEventListener("click", getGlobalHighscore);

function getGlobalHighscore(){
    axios.get('https://pingwebapi.azurewebsites.net/api/highscore')
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
  });  

}