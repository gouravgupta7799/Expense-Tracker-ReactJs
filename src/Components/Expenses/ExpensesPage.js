
import React, { useContext, useEffect, useState } from 'react'
import Expenses from './Expenses'
import ExpenseForm from './ExpenseForm'
import AuthContext from '../StoreContext/Auth-Context'

export default function ExpensesPage() {

  const authCtx = useContext(AuthContext)
  const emailId = authCtx.email.split("@")

  const [items, setItems] = useState([])
  const [updateData, setUpdateData] = useState()

  function addExpenseHandler(item) {
    setItems([...items, item])
    postDataToBanckend(item)
  }

  async function postDataToBanckend(items) {
    const res = await fetch(`https://expensetracker-ce323-default-rtdb.firebaseio.com/${emailId[0]}.json`, {
      method: 'POST',
      body: JSON.stringify({ ...items }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log("post succesful", data)
    }
  }
  async function deleteDatafromBanckend(id) {
    const res = await fetch(`https://expensetracker-ce323-default-rtdb.firebaseio.com/${emailId[0]}/${id}.json`,
      {
        method: "DELETE",
      })

    if (res.ok) {
      setItems(items.filter((expense) => expense.id !== id))
      alert('Item deleted successfully');
    } else {
      console.error('Failed to delete item');
    }
  }

  async function updateDataHandler(e) {
    setUpdateData(e)
  }

  async function updateDataFromBanckend(item) {
    const res = await fetch(`https://expensetracker-ce323-default-rtdb.firebaseio.com/${emailId[0]}/${item.id}.json`, {
      method: "PUT",
      body: JSON.stringify({
        "amount": item.amount,
        "category": item.category,
        "description": item.description,
        "id": item.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()

    if (res.ok) {
      const it = items.filter((expense) => expense.id !== item.id)
      setItems([...it, data])
      alert('Item update successfully');
    } else {
      console.error('Failed to update item');
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
      const expItems = []
      for (const key in data) {
        data[key].id = key
        expItems.push(data[key])
      }
      setItems([...expItems])
    }
    getDataFromBanckend()
  }, [])

  return (
    <div>
      <ExpenseForm addExpense={addExpenseHandler} updateData={updateData} updateDataFromBanckend={updateDataFromBanckend} />
      <Expenses items={items} deleteData={deleteDatafromBanckend} updateData={updateDataHandler} />
    </div>
  )
}
