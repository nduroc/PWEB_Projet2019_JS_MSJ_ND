export class AuthService {

    isAuth = false;
  
    signIn(username:string, password:string) {
      return new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              this.isAuth = true;
              console.log("username : " + username + " password : " + password)
              resolve(true);
            }, 2000
          );
        }
      );
    }
  
    signOut() {
      this.isAuth = false;
    }
}