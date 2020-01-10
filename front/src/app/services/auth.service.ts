
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  isAuth = false;
  constructor(private httpClient: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService) {
    console.log(this.storage.get("userName"));
    if (this.storage.get("userName")) {
      this.isAuth = true
    }

  }


  signIn(username: string, password: string) {

    let promise = new Promise((resolve, reject) => {
      this.httpClient.get<any[]>('http://localhost:8080/user/login?usernameOrEmail=' + username + '&password=' + password + '')
        .toPromise()
        .then(

          (result) => {

            if (result.toString() != "0") {
              this.isAuth = true;
              this.storage.set("userName", username);
              this.storage.set("userId", result);
              resolve(result);
            }
            else {
              //console.log(result)
              reject(result)
            }
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        )


    });
    return promise;
  }


  signOut() {
    this.isAuth = false;
    this.storage.remove("userName")
    this.storage.remove("userId")
  }

  register(userName: string, passWord: string, eMail: string) {

    let promise = new Promise((resolve, reject) => {

      this.httpClient.post('http://localhost:8080/user', { username: "" + userName, password: "" + passWord, email: "" + eMail })
        .toPromise()
        .then(

          (result) => {
            console.log(result)
            if (result.toString() == "-1") {
              reject(result);
            }
            else {
              resolve(result);
            }
          },
          (error) => {
            console.log(error)
            reject(error)
          }
        )


    });
    return promise;


  }
  getUserId() : number
  {
    let id:number=<number>this.storage.get("userId")
    return id
  }
}