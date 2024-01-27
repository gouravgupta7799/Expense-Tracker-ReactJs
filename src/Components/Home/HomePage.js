
import React, { useState } from "react";
import classes from './HomePage.module.css'
import { Link } from "react-router-dom";



export default function HomePage() {



  return (
    <>
      <header className={classes.header}>
        <h3>Welcome to Expense Tracker!!!</h3>
        <div className={classes.com}>
          your profile is incomplete
          <Link className={classes['toggle']} to="/Profile">Complete now</Link>
        </div>
        <Link className={classes['emailVarification']} to="/verifaction">varify Email</Link>
      </header>

    </>
  )
}