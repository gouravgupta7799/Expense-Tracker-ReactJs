import React, { useCallback } from 'react'
import classes from './Expenses.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction } from '../StoreContext/AuthSlice'
import useRazorpay from "react-razorpay";
const url = 'http://localhost:4000'

export default function Expenses(props) {

  const isTheme = useSelector((state) => state.authRdx.isDarkMode)
  const isPrime = useSelector((state) => state.authRdx.isPrime)
  const idToken = useSelector(state => state.authRdx.idToken);
  const [Razorpay] = useRazorpay();

  const dispatch = useDispatch()

  const totalAmount = props.items.reduce((accumulator, expense) => {
    return accumulator + Number(expense.amount);
  }, 0);

  function makeDarkModeHandler() {
    dispatch(AuthAction.makeItDarkMode())
  }

  const makeIsPrimeHandler = useCallback(async () => {
    const resp = await fetch(`http://localhost:4000/prime/purches`, {
      method: 'POST',
      body: JSON.stringify({}),
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken,
      }
    })
    const response = await resp.json()

    let option = {
      "key": response.key_id,
      "order_id": response.ord.orderId,
      "handler": async (response) => {
        console.log(option)
        const res = await fetch(`http://localhost:4000/prime/updatetransaction`, {
          method: 'POST',
          body: JSON.stringify({
            order_id: option.order_id,
            payment_id: response.razorpay_payment_id,
            status: 'SUCCESSFUL'
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
          }
        })
        const asd = await res.json()
        if (res.ok) {
          dispatch(AuthAction.makeIsPrime({ isPrime: true }))
        }
      }
    }

    const rezl = new Razorpay(option);

    rezl.open();

    rezl.on('payment.failed', async function (response) {
      fetch(url + '/primemember/updatetransaction', {
        method: 'POST',
        body: JSON.stringify({
          order_id: option.order_id,
          payment_id: response.razorpay_payment_id,
          status: 'FAILED'
        }),
        headers: { 'Authorization': idToken, }
      }
      )
        .then(alert('paymant fail'))
    })
  }, [Razorpay]);


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
              <li key={expense._id} className={`${classes.li} ${isTheme ? classes.dark : ''}`}>
                <div className={classes.box}>{expense.description}</div>
                <div className={classes.boxs}><p>{expense.amount}₹</p>
                  <p>{expense.category} </p></div>
                <div className={classes.buttons}>
                  <button onClick={() => { props.updateData(expense) }} className={classes.edit}>Edit</button>
                  <button onClick={() => { props.deleteData(expense._id) }} className={classes.delete}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      {props.items.length > 0 && isPrime &&
        <div className={classes.downloadBtn}>
          <button className={classes['download-prime']} onClick={() => { downloadExpensesHandler() }} >Download csv</button>
          <button className={!isTheme ? classes['dark-mode'] : classes['light-mode']} onClick={() => { makeDarkModeHandler() }} >{!isTheme ? 'make Dark Mode' : 'make light Mode'}</button>
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
