
import React, { useContext } from "react";
import classes from './HomePage.module.css'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../StoreContext/Auth-Context";



export default function HomePage() {

  const authCtx = useContext(AuthContext)
  const history = useNavigate()

  const logoutHandler = () => {
    authCtx.logout();
    console.log('user Log out')
    history("/")
  }


  return (
    <>
      <header className={classes.header}>
        <h3>Welcome to Expense Tracker!!!</h3>
        <div className={classes.com}>
          your profile is incomplete
          <Link className={classes['toggle']} to="/Profile">Complete now</Link>
        </div>
        <div className={classes['box-button']}>
          <Link className={classes['emailVarification']} to="/verifaction">varify Email</Link>
          <button className={classes['btn']} onClick={logoutHandler}>Logout</button>
        </div>
      </header>

    </>
  )
}