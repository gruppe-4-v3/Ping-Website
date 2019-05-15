import { RESTCalls } from "./RESTCalls"

export class Login {
  static userID: string = "";
  static userName: string = "";

  static signinfunc() {
    let signinbut: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");
    console.log(signinbut.getAttribute("data-id"));
    console.log(signinbut.getAttribute("data-name"));
    this.userID = signinbut.getAttribute("data-id");
    this.userName = signinbut.getAttribute("data-name");
    console.log(this.userName + " fra google login")
    RESTCalls.getUser(this.userID, this.userName);
  }
}