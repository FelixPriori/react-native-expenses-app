import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => { },
  addExpense: ({ description, amount, date }) => { },
  deleteExpense: (id) => { },
  updateExpense: (id, { description, amount, date }) => { }
});

const expensesReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET':
      return payload.reverse()
    case 'ADD':
      return [payload, ...state]
    case 'UPDATE':
      const expenseIndex = state.findIndex((expense) => expense.id === payload.id)
      if (expenseIndex === -1) {
        console.error(`Expense ${payload.id} not found`)
        return state
      }
      const expense = state[expenseIndex]
      const updatedExpense = { ...expense, ...payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[expenseIndex] = updatedExpense
      return updatedExpenses
    case 'DELETE':
      return state.filter(expense => expense.id !== payload)
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, [])
  const setExpenses = (expenses) => dispatch({ type: 'SET', payload: expenses })
  const addExpense = (expenseData) => dispatch({ type: 'ADD', payload: expenseData })
  const deleteExpense = (id) => dispatch({ type: 'DELETE', payload: id })
  const updateExpense = (id, expenseData) => dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  const value = {
    expenses,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense
  }
  return (<ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>)
}