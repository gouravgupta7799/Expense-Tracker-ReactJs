import React, { useEffect, useRef, useState } from 'react'
import classes from './ExpenseForm.module.css'

export default function ExpenseForm(props) {

  const [updateDataState, setupdateDataState] = useState(false)
  const amount = useRef()
  const des = useRef()
  const categories = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    const entered1 = amount.current.value;
    const entered2 = des.current.value;
    const entered3 = categories.current.value;

    props.addExpense({ id: Math.random(), amount: entered1, description: entered2, category: entered3 })

    amount.current.value = ''
    des.current.value = ''
    categories.current.value = 'categories'

  }
  useEffect(() => {

    if (props.updateData) {
      setupdateDataState(true)
      amount.current.value = props.updateData.amount
      des.current.value = props.updateData.description
      categories.current.value = props.updateData.category
    }
  }, [props.updateData])


  function updatehandle(e) {
    e.preventDefault()
    const entered1 = amount.current.value;
    const entered2 = des.current.value;
    const entered3 = categories.current.value;

    props.updateDataFromBanckend({ id: props.updateData.id, amount: entered1, description: entered2, category: entered3 })
    setupdateDataState(false)
    amount.current.value = ''
    des.current.value = ''
    categories.current.value = 'categories'

  }

  return (
    <div>
      <div className={classes['form']} >
        <h1>Expense Form</h1>
        <form onSubmit={!updateDataState ? handleSubmit : updatehandle} style={{ padding: "20px" }}>
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
          {!updateDataState ? <input
            type="submit"
            value="Submit"
            className={classes['button']}
          /> : <input
            type="submit"
            value="update"
            className={classes['button']}
          />}
        </form>
      </div>
    </div >
  )
}
