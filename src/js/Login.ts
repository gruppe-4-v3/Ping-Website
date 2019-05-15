import { RESTCalls } from "./RESTCalls"

export class Login {
  constructor() {
  }

  static userID: string = "";
  static userName: string = "";



  static signinfunc() {
    console.log("in ts");
    let signinbut: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");
    console.log(signinbut.getAttribute("data-id"));
    console.log(signinbut.getAttribute("data-name"));
    this.userID = signinbut.getAttribute("data-id");
    this.userName = signinbut.getAttribute("data-name");
    RESTCalls.getUser(this.userID, this.userName);
  }
}