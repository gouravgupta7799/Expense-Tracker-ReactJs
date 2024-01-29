
import React from "react";

const AuthContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  email: '',
  login: (token) => { },
  logout: () => { }
})

export default AuthContext;