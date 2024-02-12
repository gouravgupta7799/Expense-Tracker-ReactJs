import React, { useState } from "react";
import classes from './Varification.module.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Verifaction = () => {
  const idToken = useSelector(state => state.authRdx.idToken)
  const isTheme = useSelector((state) => state.authRdx.isDarkMode)
  const [email, setEmail] = useState("")
  const [isLoding, setLoding] = useState(false)
  const history = useNavigate()



  const submitHandler = async (event) => {
    event.preventDefault();
    setLoding(true)
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=`, {
      method: 'POST',
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: idToken,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (response.ok) {
      if (data.email === email) {
        alert('user email VERIFY link send to your mail')
        console.log(data)
        setTimeout(() => {
          history('/')
        }, 2000)
      }
    }
    else {
      alert(data.error.message)
    }

    if (!response.ok) {
      alert(data.error.message)
    }
    setLoding(false)

  }
  return (<>
    <form onSubmit={submitHandler} className={`${classes['form']} ${isTheme ? classes.dark : ''}`} >
      <input type="email" className={classes['form_input']} placeholder="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
      {!isLoding ? <button className={classes['button']}>Verify</button> : <button className={classes['button']} disabled>isLoding...</button>}
    </form>
  </>)
}
export default Verifaction