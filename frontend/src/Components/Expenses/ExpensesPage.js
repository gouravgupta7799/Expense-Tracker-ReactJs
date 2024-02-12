
import React, { useEffect, useState } from 'react'
import Expenses from './Expenses'
import ExpenseForm from './ExpenseForm'
import { useSelector, useDispatch } from 'react-redux'
import { ExpenseAction } from '../StoreContext/ExpenseSlice'
const url = 'http://localhost:4000/expensetracker'

export default function ExpensesPage() {

  const dispatch = useDispatch()
  const items = useSelector(state => state.expenseRdx.items)
  const idToken = useSelector(state => state.authRdx.idToken);

  const [updateData, setUpdateData] = useState()

  async function postDataToBanckend(items) {
    const res = await fetch(`${url}/expenseData`, {
      method: 'POST',
      body: JSON.stringify({ ...items }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken
      }
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data)
      dispatch(ExpenseAction.addExpense({ ...data }))

    }
  }
  async function deleteDatafromBanckend(id) {
    const res = await fetch(`${url}/deleteexpenseData`,
      {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      })

    const data = await res.json()
    if (res.ok) {
      dispatch(ExpenseAction.deleteExpense({ id: id }))
      alert(data.msg);
    } else {
      console.error(data.msg);
    }
  }

  async function updateDataHandler(e) {
    setUpdateData(e)
  }

  async function updateDataFromBanckend(item) {
    const res = await fetch(`${url}/updateexpenseData`, {
      method: "PUT",
      body: JSON.stringify({
        "id": item.id,
        "amount": item.amount,
        "category": item.category,
        "description": item.description,

      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken
      }
    })
    const data = await res.json()

    if (res.ok) {
      dispatch(ExpenseAction.updateExpense({ id: item.id, data: item }))
      alert('Item update successfully');
    } else {
      console.error(data.error);
    }
  }


  useEffect(() => {
    async function getDataFromBanckend() {
      const res = await fetch(`${url}/getexpenseData`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      })
      const data = await res.json()
      const expItems = []
      for (const key in data) {
        expItems.push(data[key])
      }
      expItems.pop()
      localStorage.setItem('isPrime', data.isPrime)
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
