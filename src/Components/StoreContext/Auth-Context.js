
import React from "react";

const AuthContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { }
})

export default AuthContext;