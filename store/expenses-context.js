import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-03-08')
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2024-02-29')
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2024-03-05')
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2024-01-22')
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 18.99,
    date: new Date('2024-03-01')
  }
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => { },
  deleteExpense: (id) => { },
  updateExpense: (id, { description, amount, date }) => { }
});

const expensesReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString
      return [{ id, ...payload }, ...state]
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
  const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)
  const addExpense = (expenseData) => dispatch({ type: 'ADD', payload: expenseData })
  const deleteExpense = (id) => dispatch({ type: 'DELETE', payload: id })
  const updateExpense = (id, expenseData) => dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  const value = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense
  }
  return (<ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>)
}