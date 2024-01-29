
import React, { useContext, useEffect, useState } from 'react'
import Expenses from './Expenses'
import ExpenseForm from './ExpenseForm'
import AuthContext from '../StoreContext/Auth-Context'

export default function ExpensesPage() {
  
  const authCtx = useContext(AuthContext)
  const emailId = authCtx.email.split("@")

  const [items, setItems] = useState([])

  function addExpenseHandler(item) {
    setItems([...items, item])
    postDataToBanckend([...items, item])
  }

  async function postDataToBanckend(items) {
    const res = await fetch(`https://expensetracker-ce323-default-rtdb.firebaseio.com/${emailId[0]}.json`, {
      method: 'POST',
      body: JSON.stringify({ itemsArr: items }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log("post succesful", data)
    }
  }

  useEffect(() => {
    async function getDataFromBanckend() {
      const res = await fetch(`https://expensetracker-ce323-default-rtdb.firebaseio.com/${emailId[0]}.json`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      const fetchedExpenses = Object.keys(data).map((e) => {
        return (data[e])
      })

      const expItems = fetchedExpenses[fetchedExpenses.length - 1]
      setItems(expItems.itemsArr)
    }
    getDataFromBanckend()
  }, [])

  return (
    <div>
      <ExpenseForm addExpense={addExpenseHandler} />
      <Expenses items={items} />
    </div>
  )
}
