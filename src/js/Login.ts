import { RESTCalls } from "./RESTCalls"

export class Login {
  static userID: string = "";
  static userName: string = "";

  static signinfunc() {
    let signInBtn: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");
    Login.userID = signInBtn.getAttribute("data-id");
    Login.userName = signInBtn.getAttribute("data-name");
    RESTCalls.getUser(Login.userID, Login.userName);
  }
}