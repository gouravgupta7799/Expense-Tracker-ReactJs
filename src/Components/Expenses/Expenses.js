import React, { useState } from 'react'
import classes from './Expenses.module.css'

export default function Expenses(props) {


  const [isTheme, setIsTheme] = useState(false)

  const totalAmount = props.items.reduce((accumulator, expense) => {
    return accumulator + Number(expense.amount);
  }, 0);

  return (
    <React.Fragment><div className={`${classes.main} ${classes.dark}`}>
      <h2 className={classes.header}> Expnse list</h2>
      {props.items.length === 0 ? <p>no expnse add yet</p> :
        (
          <ul className={classes.ul}>
            {props.items.map((expense) => (
              <li key={expense.id} className={`${classes.li}  ${classes.dark}`}>
                <div className={classes.box}>{expense.description}</div>
                <div className={classes.boxs}><p>{expense.amount}₹</p>
                  <p>{expense.category} </p></div>
                <div className={classes.buttons}>
                  <button onClick={() => { props.updateData(expense) }} className={classes.edit}>Edit</button>
                  <button onClick={() => { props.deleteData(expense.id) }} className={classes.delete}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      {props.items.length > 0 &&
        <div className={classes.downloadBtn}>
          <button className={classes.btn} onClick={() => { }} >Download csv</button>
        </div>
      }

    </div>

      <span className={`${classes.sidebar}  ${classes.dark}`}>
        <h3 className={classes.sideHeading}>Total Amount</h3>
        <h1 className={classes.totalAmount}> {totalAmount}₹</h1>
        {totalAmount > 10 && <button className={classes.newBtn} onClick={() => { }}>Active Premium</button>}
      </span>
    </React.Fragment>
  )
}
