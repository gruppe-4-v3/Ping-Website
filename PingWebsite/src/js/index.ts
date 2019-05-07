import {Core} from '../../node_modules/phaser/src/phaser-arcade-physics'

var game = new Core.Game(800, 400, Core.Auto)

function onSignIn(googleUser : any) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }