import React from 'react'
import classes from './Expenses.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction } from '../StoreContext/AuthSlice'

export default function Expenses(props) {

  const isTheme = useSelector((state) => state.authRdx.isDarkMode)
  const isPrime = useSelector((state) => state.authRdx.isPrime)

  const dispatch = useDispatch()

  const totalAmount = props.items.reduce((accumulator, expense) => {
    return accumulator + Number(expense.amount);
  }, 0);

  function makeDarkModeHandler() {
    dispatch(AuthAction.makeItDarkMode())
    console.log(isTheme)
  }

  function makeIsPrimeHandler() {
    dispatch(AuthAction.makeIsPrime())
  }

  function downloadExpensesHandler() {
    const csvContent = "data:text/csv;charset=utf-8," + props.items.map((expense) => Object.values(expense).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    let a = document.createElement('a');
    a.href = encodedUri
    a.download = 'myexpence.csv'
    a.click()
  }

  return (
    <React.Fragment><div className={`${classes.main} ${isTheme ? classes.dark : ''}`}>
      <h2 className={classes.header}> Expnse list</h2>
      {props.items.length === 0 ? <p>no expnse add yet</p> :
        (
          <ul className={classes.ul}>
            {props.items.map((expense) => (
              <li key={expense.id} className={`${classes.li} ${isTheme ? classes.dark : ''}`}>
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
      {props.items.length > 0 && isPrime &&
        <div className={classes.downloadBtn}>
          <button className={classes['download-prime']} onClick={() => { downloadExpensesHandler() }} >Download csv</button>
          <button className={classes['dark-mode']} onClick={() => { makeDarkModeHandler() }} >make Dark Mode</button>
        </div>
      }

    </div>

      <span className={`${classes.sidebar}  ${isTheme ? classes.dark : ''}`}>
        <h3 className={classes.sideHeading}>Total Amount</h3>
        <h1 className={classes.totalAmount}> {totalAmount}₹</h1>
        {totalAmount > 10000 && !isPrime && <button className={classes.newBtn} onClick={() => { makeIsPrimeHandler() }}>Active Premium</button>}
      </span>
    </React.Fragment>
  )
}
