import * as Phaser from "phaser";
import { GameScene } from "./GameScene"
import axios from "../../node_modules/axios/index"

let config: GameConfig = {
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#18216D",
  physics: {
    default: "arcade"
  },
  scene: [GameScene]
}

let game: Phaser.Game = new Phaser.Game(config);

<<<<<<< HEAD
let SignIn: HTMLDivElement = <HTMLDivElement> document.getElementById("signin");
//SignIn.addEventListener('data-onsuccess', onSignIn)
//gapi.auth2.getAuthInstance().currentUser.get().isSignedIn()
(<any>window).onSignInts = () => {
  var auth2 = gapi.auth2.getAuthInstance().currentUser.get();
  var profile = auth2.getBasicProfile();
  console.log('TS')
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
};
function onSignInts1() {  
  var auth2 = gapi.auth2.getAuthInstance().currentUser.get();
  var profile = auth2.getBasicProfile();
  console.log('TS')
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
window.onload=function(){
  let btn = document.getElementById("globalHighscore");
  btn.addEventListener("click", getGlobalHighscore);
}

function getGlobalHighscore(){
  
  axios.get('https://pingwebapi.azurewebsites.net/api/highscore')
.then(function(response){
  console.log(response.data); // ex.: { user: 'Your User'}
  console.log(response.status); // ex.: 200
});  
}
=======
var auth2 : any; // The Sign-In object.
var googleUser : any; // The current user.


/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
var appStart = function() {
  gapi.load('auth2', initSigninV2);
};


/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function() {
  auth2 = gapi.auth2.init({
      client_id: '376761281684-pvn87r7hftv8l3cqou29tbbqdapnmq3c.apps.googleusercontent.com',
      scope: 'profile'
  });

  // Listen for sign-in state changes.
  auth2.isSignedIn.listen(signinChanged);

  // Listen for changes to current user.
  auth2.currentUser.listen(userChanged);

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn();
  }

  // Start with the current live values.
  refreshValues();
};


/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val : any) {
  console.log('Signin state changed to ', val);
  document.getElementById('signed-in-cell').innerText = val;
};


/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function (user : any) {
  console.log('User now: ', user);
  googleUser = user;
  updateGoogleUser();
  document.getElementById('curr-user-cell').innerText =
    JSON.stringify(user, undefined, 2);
};


/**
 * Updates the properties in the Google User table using the current user.
 */
var updateGoogleUser = function () {
  if (googleUser) {
    document.getElementById('user-id').innerText = googleUser.getId();
    document.getElementById('user-scopes').innerText =
      googleUser.getGrantedScopes();
    document.getElementById('auth-response').innerText =
      JSON.stringify(googleUser.getAuthResponse(), undefined, 2);
  } else {
    document.getElementById('user-id').innerText = '--';
    document.getElementById('user-scopes').innerText = '--';
    document.getElementById('auth-response').innerText = '--';
  }
};


/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
var refreshValues = function() {
  if (auth2){
    console.log('Refreshing values...');

    googleUser = auth2.currentUser.get();

    document.getElementById('curr-user-cell').innerText =
      JSON.stringify(googleUser, undefined, 2);
    document.getElementById('signed-in-cell').innerText =
      auth2.isSignedIn.get();

    updateGoogleUser();
  }
}
>>>>>>> f98f97ff8b3a52bf13c413ee1bd588910b79a7e9
