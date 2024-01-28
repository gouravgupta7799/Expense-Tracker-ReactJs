import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'

export default function Expenses() {

  const [items, setItems] = useState([])


  function addExpenseHandler(item) {
    setItems([...items, item])
  }

  return (
    <>
      <div>
        <ExpenseForm addExpense={addExpenseHandler} />
      </div>
      <div>
        {
          items.length > 0 && (
            <div>
              {items.map((expense, index) => (
                <div key={index}>
                  <p> Amount : {expense.amount} = Description :{" "}
                    {expense.description} = Category : {expense.category}
                    <button
                      // onClick={() => handleEdit(expense.id)}
                      style={{ padding: "5px", borderRadius: "10px", margin: "5px", backgroundColor: "red", color: "yellow", backgroundColor: "blue", cursor: "pointer", }}>
                      Edit
                    </button>
                    <button
                      // onClick={() => handleDelete(expense.id)}
                      style={{ padding: "5px", borderRadius: "10px", margin: "5px", color: "yellow", backgroundColor: "blue", cursor: "pointer", }}>
                      Delete
                    </button>
                  </p>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </>
  )
}
