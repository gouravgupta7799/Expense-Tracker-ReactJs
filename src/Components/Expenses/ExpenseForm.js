import React, { useRef } from 'react'
import classes from './ExpenseForm.module.css'

export default function ExpenseForm(props) {

  const amount = useRef()
  const des = useRef()
  const categories = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    const entered1 = amount.current.value;
    const entered2 = des.current.value;
    const entered3 = categories.current.value;

    console.log(entered1, entered2, entered3)
    props.addExpense({ amount: entered1, description: entered2, category: entered3 })

    amount.current.value = ''
    des.current.value = ''
    categories.current.value = ''

  }

  return (
    <div>
      <div className={classes['form']} >
        <h1>Expense Form</h1>
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <input
            ref={amount}
            name="amount"
            type="number"
            placeholder="Enter Amount"
            className={classes['input-fild']}
          />
          <input
            ref={des}
            name="description"
            type="text"
            placeholder="Enter Description"
            className={classes['input-fild']}
          />
          <select
            ref={categories}
            name="categories"
            id=""
            className={classes['input-fild']}
          >
            <option value="Category">Category</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="submit"
            value="Submit"
            className={classes['button']}
          />
        </form>
      </div>
    </div >
  )
}
