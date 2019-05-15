import { RESTCalls } from "./RESTCalls"


export class Login {
  static userID: string = "";
  static userName: string = "";

  static signinfunc() {
    let signInBtn: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");
    console.log(signInBtn.getAttribute("data-id"));
    console.log(signInBtn.getAttribute("data-name"));
    this.userID = signInBtn.getAttribute("data-id");
    this.userName = signInBtn.getAttribute("data-name");
    RESTCalls.getUser(this.userID, this.userName);
  }
}