
import React, { useEffect, useState } from 'react'
import Expenses from './Expenses'
import ExpenseForm from './ExpenseForm'
import { useSelector, useDispatch } from 'react-redux'
import { ExpenseAction } from '../StoreContext/ExpenseSlice'

export default function ExpensesPage() {

  const dispatch = useDispatch()
  const items = useSelector(state => state.expenseRdx.items)
  const email = useSelector(state => state.authRdx.email)
  const emailId = email.split("@")

  const [updateData, setUpdateData] = useState()

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
      dispatch(ExpenseAction.addExpense({ it: items }))

    }
  }
  async function deleteDatafromBanckend(id) {
    const res = await fetch(`https://expensetracker-ce323-default-rtdb.firebaseio.com/${emailId[0]}/${id}.json`,
      {
        method: "DELETE",
      })

    if (res.ok) {
      dispatch(ExpenseAction.deleteExpense({ id: id }))
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
      dispatch(ExpenseAction.updateExpense({ id: item.id, data: data }))
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
      dispatch(ExpenseAction.getExpense({ expItems: expItems }))
    }
    getDataFromBanckend()
  }, [])

  return (
    <div>
      <ExpenseForm addExpense={postDataToBanckend} updateData={updateData} updateDataFromBanckend={updateDataFromBanckend} />
      <Expenses items={items} deleteData={deleteDatafromBanckend} updateData={updateDataHandler} />
    </div>
  )
}
