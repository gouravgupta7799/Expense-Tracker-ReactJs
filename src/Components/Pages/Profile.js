import React, { useContext, useEffect, useState } from 'react'
import AuthContext from "../StoreContext/Auth-Context";
import classes from './Profile.module.css'
const id = ''

export default function Profile() {

  const authCtx = useContext(AuthContext);
  const [fullName, setFullName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [photo, setPhoto] = useState("")


  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${id}`,
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.idToken,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (data.users && data.users.length > 0) {
        const user = data.users[0];
        setFullName(user.displayName || '');
        setPhoto(user.photoUrl || '');
        setEmailId(user.email || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const respnse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${id}`, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.idToken,
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

  useEffect(() => {
    fetchData()
  }, [authCtx.idToken])


  return (
    <div>
      <form onSubmit={submitHandler}
        className={classes.main}>
        <h3>contact details</h3>
        <h5>email Id:- {emailId}</h5>

        <div className={classes.int}>
          <label htmlFor="name">Full Name</label>
          <input type="text" value={fullName} className={classes.input}
            onChange={(e) => { setFullName(e.target.value) }} />
        </div>

        <div className={classes.int}>
          <label htmlFor="picture">Profile Photo URL</label>
          <input type="text" value={photo} className={classes.input}
            onChange={(e) => {
              console.log(e.target.value)
              setPhoto(e.target.value)
            }} />
        </div>

        <button className={classes['button']}>update</button>

      </form>
    </div >
  )
}
