import { RESTCalls } from "./RESTCalls"

export class Login {
  constructor() {
    this.signinbut.addEventListener('sign', this.signinfunc)
  }

  userID: string = "";
  userName: string = "";

  signinbut: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");

  signinfunc() {
    console.log("in ts");
    console.log(this.signinbut.getAttribute("data-id"));
    console.log(this.signinbut.getAttribute("data-name"));
    this.userID = this.signinbut.getAttribute("data-id");
    this.userName = this.signinbut.getAttribute("data-name");
    RESTCalls.getUser(this.userID);
  }
}