
import React, { useState } from "react";
import classes from './HomePage.module.css'
// import input from "../UI/Input";
const id = 'AIzaSyBDX2dCgYMzE3M68vDLr2nOnkfZKq-XUio'


export default function HomePage() {

  <h1> Welcome</h1>
  const [isComplete, setIsComplete] = useState(false)
  const [fullName, setFullName] = useState("")
  const [photo, setPhoto] = useState("")

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const respnse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${id}`, {
        method: "POST",
        body: JSON.stringify({
          displayName: fullName,
          photoUrl: photo,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      const data = await respnse.json()
      console.log(data)

    } catch (error) {
      console.error("submiting error", error)
    }
    setFullName('')
    setPhoto('')
  }
  return (
    <div>
      <header className={classes.header}>
        <h3>{isComplete ? "Winners never quit, Quitters never win" : "Welcome to Expense Tracker!!!"}</h3>
        <div className={classes.com}>
          {isComplete ? "compelte profile" : "your profile is incomplete"}
          <span className={classes['toggle']} onClick={() => { setIsComplete(!isComplete) }}> {!isComplete ? 'complete now' : 'cancel'}</span>
        </div>
      </header>

      {isComplete && <form onSubmit={submitHandler}
        className={classes.main}>
        <h3>contact details</h3>

        <div className={classes.int}>
          <label htmlFor="name">Full Name</label>
          <input type="text" value={fullName} className={classes.input}
            onChange={(e) => { setFullName(e.target.value) }} />
        </div>

        <div className={classes.int}>
          <label htmlFor="picture">Profile Photo URL</label>
          <input type="text" value={photo} className={classes.input}
            onChange={(e) => { setPhoto(e.target.value) }} />
        </div>

        <button className={classes['button']}>update</button>

      </form>}

    </div>
  )
}