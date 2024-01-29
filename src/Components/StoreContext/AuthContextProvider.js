import AuthContext from "./Auth-Context";
import React, { useState } from 'react'


export default function AuthContextProvider(props) {

  const intitalToken = localStorage.getItem("token")
  const intitalEmail = localStorage.getItem("email")

  const [token, setToken] = useState(intitalToken)
  const [activeEmail, setActiveEmail] = useState(intitalEmail)
  const userLoggedIn = !!token
  let setTime;

  function loginHandler(token, email) {
    setTime = setTimeout(() => {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
    }, 5 * 60 * 1000)
    setToken(token)
    setActiveEmail(email)
    localStorage.setItem("token", token)
    localStorage.setItem("email", email)
  }


  function logoutHandler() {
    clearTimeout(setTime)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("email")
  }

  const authcontext = {
    idToken: token,
    isLoggedIn: userLoggedIn,
    email: activeEmail,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
    <AuthContext.Provider value={authcontext}>
      {props.children}
    </AuthContext.Provider>
  )
}
