
import React from "react";
import { useDispatch } from 'react-redux';
import classes from './HomePage.module.css'
import { Link, useNavigate } from "react-router-dom";
import { AuthAction } from '../../StoreContext/AuthSlice';
import { useSelector } from "react-redux";


export default function HomePage() {

  const dispatch = useDispatch()
  const history = useNavigate()

  const isLoggedIn = useSelector((state) => state.authRdx.isLoggedIn)

  const logoutHandler = () => {
    dispatch(AuthAction.logout())
    console.log('user Log out')
    history("/")
  }


  return (
    <>
      <header className={classes.header}>
        <h3 style={{ color: 'white' }}>Welcome to Expense Tracker!!!</h3>

        {isLoggedIn && (
          <Link to="/expense">
            <div className={classes.logo}>+ Add Expense</div>
          </Link>
        )}
        <nav>
          <ul>
            {!isLoggedIn && (
              <li>
                <Link to="/">Login</Link>
              </li>
            )}

            {isLoggedIn && (

              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <Link className={classes['toggle']} to="/forgetPassword">forgetPassword</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <Link className={classes['emailVarification']} to="/verifaction">varify Email</Link>
              </li>
            )}

            {isLoggedIn && (
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