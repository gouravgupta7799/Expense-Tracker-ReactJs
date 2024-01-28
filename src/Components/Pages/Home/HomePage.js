
import React, { useContext } from "react";
import classes from './HomePage.module.css'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../StoreContext/Auth-Context";



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
        <h3 style={{ color: 'white' }}>Welcome to Expense Tracker!!!</h3>

        {authCtx.isLoggedIn && (
          <Link to="/expense">
            <div className={classes.logo}>+ Add Expense</div>
          </Link>
        )}
        <nav>
          <ul>
            {!authCtx.isLoggedIn && (
              <li>
                <Link to="/">Login</Link>
              </li>
            )}

            {authCtx.isLoggedIn && (

              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {authCtx.isLoggedIn && (
              <li>
                <Link className={classes['toggle']} to="/forgetPassword">forgetPassword</Link>
              </li>
            )}

            {authCtx.isLoggedIn && (
              <li>
                <Link className={classes['emailVarification']} to="/verifaction">varify Email</Link>
              </li>
            )}

            {authCtx.isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </header>

    </>
  )
}