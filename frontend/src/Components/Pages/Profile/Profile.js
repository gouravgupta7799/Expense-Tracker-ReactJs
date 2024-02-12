import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const url = 'http://localhost:4000'
export default function Profile() {

  const idToken = useSelector(state => state.authRdx.idToken);
  const isTheme = useSelector((state) => state.authRdx.isDarkMode)
  const [fullName, setFullName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [photo, setPhoto] = useState("")
  const history = useNavigate()


  const fetchData = async () => {
    try {
      const response = await fetch(
        `${url}/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
          }
        }
      );
      const data = await response.json();
      if (data.user) {
        const user = data.user;
        setFullName(user.displayName || '');
        setPhoto(user.photoUrl || '');
        setEmailId(user.userEmail || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const respnse = await fetch(`${url}/profile`, {
        method: "POST",
        body: JSON.stringify({
          displayName: fullName,
          photoUrl: photo,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      })

      const data = await respnse.json()
      if (data) {
        alert('updated')
        history('/')
      }

    } catch (error) {
      console.error("submiting error", error)
    }
    setFullName('')
    setPhoto('')
  }

  useEffect(() => {
    fetchData()
  }, [idToken])


  return (
    <div>
      <form onSubmit={submitHandler}
        className={`${classes.main} ${isTheme ? classes.dark : ''}`}>
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
