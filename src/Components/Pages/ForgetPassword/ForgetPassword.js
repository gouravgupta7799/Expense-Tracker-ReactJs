import React, { useRef } from 'react'
import classes from './ForgetPassword.module.css'
import { useNavigate } from 'react-router-dom'
const id = ''

export default function ForgetPassword() {

  const history = useNavigate()

  const emailInputRef = useRef()

  const submitHandler = async (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${id}`, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        requestType: "PASSWORD_RESET",
      }),
      headers: {
        'content-type': "application/json"
      }
    })

    const data = await res.json()
    console.log(data)
    if (res.ok) {
      alert('Password changing link send to your mail successfully')
      console.log(data)
      setTimeout(() => {
        history('/')
      }, 2000)
    }
    else {
      alert(data.error.message)
    }

  }

  return (
    <div>  <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='email'>Email Id</label>
        <input type='email' id='email' ref={emailInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form></div>
  )
}
