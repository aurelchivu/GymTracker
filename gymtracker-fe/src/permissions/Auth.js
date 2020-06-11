const Auth = {
    isAuthenticated: false,
    username: "",
  
    login(username, callback) {
      Auth.isAuthenticated = true;
      console.log(username);
      Auth.username = username;
  
      setTimeout(callback, 100);
    },
  
    signout(callback) {
      Auth.isAuthenticated = false;
      setTimeout(callback, 100);
    }
  };
  
  export default Auth;