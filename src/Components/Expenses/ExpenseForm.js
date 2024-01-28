import React, { useRef } from 'react'


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

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "yellow",
          color: "blue",
        }}
      >
        <h1>Expense Form</h1>
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <input
            ref={amount}
            name="amount"
            type="number"
            placeholder="Enter Amount"
            style={{ padding: "10px", margin: "5px", borderRadius: "10px" }}
          />
          <input
            ref={des}
            name="description"
            type="text"
            placeholder="Enter Description"
            style={{ padding: "10px", margin: "5px", borderRadius: "10px" }}
          />
          <select
            ref={categories}
            name="categories"
            id=""
            style={{ padding: "10px", borderRadius: "10px", margin: "5px" }}
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
            style={{
              padding: "10px",
              margin: "5px",
              borderRadius: "10px",
              backgroundColor: "red",
              color: "yellow",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          />
        </form>
      </div>
    </div >
  )
}
