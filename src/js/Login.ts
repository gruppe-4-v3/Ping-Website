import { RESTCalls } from "./RESTCalls"


export class Login {
  static signInBtn: HTMLDivElement = <HTMLDivElement>document.getElementById("signin2");
  static userID: string = Login.signInBtn.getAttribute("data-id");
  static userName: string = Login.signInBtn.getAttribute("data-name");

  static signinfunc() {
    console.log(this.signInBtn.getAttribute("data-id"));
    console.log(this.signInBtn.getAttribute("data-name"));
    RESTCalls.getUser(this.userID, this.userName);
  }
}