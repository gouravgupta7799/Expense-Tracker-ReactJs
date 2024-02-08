import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  items: [],

}

const ExpenseSlice = createSlice({
  name: 'expenses',
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.items = [...state.items, action.payload.it]
    },

    deleteExpense(state, action) {
      const id = action.payload.id
      state.items = (state.items.filter((expense) => expense.id !== id))
    },

    updateExpense(state, action) {
      const id = action.payload.id
      const data = action.payload.data
      const it = state.items.filter((expense) => expense.id !== id)
      state.items = [data, ...it]
    },

    getExpense(state, action) {
      state.items = [...action.payload.expItems]
    }
  }
})



export const ExpenseAction = ExpenseSlice.actions;

export default ExpenseSlice.reducer;