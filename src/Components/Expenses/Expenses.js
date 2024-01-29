import React from 'react'
import classes from './Expenses.module.css'

export default function Expenses(props) {
  return (
    <>
      <div className={classes.main}>
        <h2 className={classes.header}> Expnse list</h2>
        {props.items.length === 0 ? <p>no expnse add yet</p> :
          (
            <ul className={classes['table-list']}>
              {props.items.map((expense) => (
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
