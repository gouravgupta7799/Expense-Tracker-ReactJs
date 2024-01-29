import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import classes from './Expenses.module.css'

export default function Expenses() {

  const [items, setItems] = useState([])


  function addExpenseHandler(item) {
    setItems([...items, item])
  }

  return (
    <>
      <ExpenseForm addExpense={addExpenseHandler} />
      <div className={classes.main}>
        <h2 className={classes.header}> Expnse list</h2>
        {items.length === 0 ? <p>no expnse add yet</p> :
          (
            <ul className={classes['table-list']}>
              {items.map((expense) => (
                <li key={expense.id} className={classes.li}>
                  <p><strong>{expense.description}</strong></p> - <p>${expense.amount}</p> <p>({expense.category})</p>
                  <li className={classes['inner-li']}>
                    <button className={classes['editBtn']} onClick={() => { }}>Edit</button>
                    <button className={classes['deleteBtn']} onClick={() => { }}>X</button>
                  </li>
                </li>

              ))}
            </ul>
          )}

      </div>
    </>
  )
}
