import React, { createContext, useContext, useReducer, useEffect } from 'react'

const FinanceContext = createContext()

const initialState = {
  transactions: [],
  budgets: [],
  categories: ['Food', 'Housing', 'Transport', 'Entertainment', 'Utilities']
}

const financeReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        transactions: action.payload.transactions,
        budgets: action.payload.budgets
      }
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] }
    case 'ADD_BUDGET':
      return { ...state, budgets: [...state.budgets, action.payload] }
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(budget =>
          budget.category === action.payload.category ? action.payload : budget
        )
      }
    default:
      return state
  }
}

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState)

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
    const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || []
    dispatch({
      type: 'LOAD_DATA',
      payload: { transactions: savedTransactions, budgets: savedBudgets }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions))
    localStorage.setItem('budgets', JSON.stringify(state.budgets))
  }, [state.transactions, state.budgets])

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  )
}

export const useFinance = () => useContext(FinanceContext)
