import AuthContext from "./Auth-Context";
import React, { useState } from 'react'


export default function AuthContextProvider(props) {

  const intitalToken = localStorage.getItem("token")
  const [token, setToken] = useState(intitalToken)
  const userLoggedIn = !!token
  let setTime;

  function loginHandler(token) {
    setTime = setTimeout(() => {
      localStorage.removeItem("token")
    }, 5 * 60 * 1000)
    setToken(token)
    localStorage.setItem("token", token)
  }


  function logoutHandler() {
    clearTimeout(setTime)
    setToken(null)
    localStorage.removeItem("token")
  }

  const authcontext = {
    idToken: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
    <AuthContext.Provider value={authcontext}>
      {props.children}
    </AuthContext.Provider>
  )
}
