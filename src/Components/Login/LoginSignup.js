import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './LoginSignup.module.css'
import AuthContext from '../StoreContext/Auth-Context'

const id = ''

export default function LoginSignup() {

  let navigation = useNavigate()
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogInForm, setIsLogInForm] = useState(false);
  const authCtx = useContext(AuthContext);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    let url;
    let enteredEmail;
    let enteredPassword;
    let confirmPassword;
    let AuthinactionDetails;
    try {

      if (!isLogInForm) {
        enteredEmail = emailRef.current.value
        enteredPassword = passwordRef.current.value
        confirmPassword = confirmPasswordRef.current.value

        if (enteredEmail && enteredPassword && confirmPassword) {
          if (enteredPassword !== confirmPassword) {
            let errorMessage = "Check your password again"
            throw new Error(errorMessage)
          }
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${id}`
          AuthinactionDetails = {
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: confirmPassword,
            returnSecureToken: true
          }
        } else {
          let errorMessage = "entered field Check again"
          throw new Error(errorMessage)
        }

      } else {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${id}`
        enteredEmail = emailRef.current.value
        enteredPassword = passwordRef.current.value

        AuthinactionDetails = {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }
      }

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(AuthinactionDetails),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        const data = await res.json()
        console.log('User has successfully logged in')
        console.log(data)
        authCtx.login(data.idToken)
        navigation("/");

      } else {
        let errorMessage = "authentication failed"
        throw new Error(errorMessage)
      }
    }
    catch (err) {
      alert(err.message)
    }
    emailRef.current.value = null
    passwordRef.current.value = null
  }

  return (
    <div className={classes["formPage"]}>
      <form action="submit" onSubmit={submitFormHandler} className={classes['form']}>
        <h2>{isLogInForm ? 'Login' : 'Sign Up'}</h2>
        <label htmlFor="email">Email</label>
        <input id='useEmail' type='email' ref={emailRef} required />

        <label htmlFor="password" >Password</label>
        <input id='userPassword' type='password' ref={passwordRef} required />

        {!isLogInForm && <label htmlFor="confirmPassword" >confirmPassword</label>}
        {!isLogInForm && <input id='userconfirmPassword' type='password' ref={confirmPasswordRef} required />}

        {isLogInForm ? <button className={classes['button']}>Login</button> : <button className={classes['button']}>SignUp</button>}

        <div className={classes['tog']}>
          <span className={classes['toggle']} onClick={() => { setIsLogInForm(!isLogInForm) }}>{isLogInForm ? "Dont have an acount? signup" : "Have an account? Login"}</span>
          <span className={classes['toggle']} onClick={() => { }}>Forget Passsword</span>
        </div>
      </form>

    </div>
  )
}
