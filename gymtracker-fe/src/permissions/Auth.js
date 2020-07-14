// const Auth = {
//     isAuthenticated: false,
//     username: "",
  
//     login(username, callback) {
//       Auth.isAuthenticated = true;
//       console.log(username);
//       Auth.username = username;
  
//       setTimeout(callback, 100);
//     },
  
//     signout(callback) {
//       Auth.isAuthenticated = false;
//       setTimeout(callback, 100);
//     }
//   };
  
//   export default Auth;

class Auth {
  constructor() {
    this.authenticated = false
  }

  login(cb) {
    this.authenticated = true;
    setTimeout(cb, 100);
  }

  logout(cb) {
    this.authenticated = false;
    setTimeout(cb, 100);
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();