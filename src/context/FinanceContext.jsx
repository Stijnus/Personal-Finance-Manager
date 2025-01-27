import React, { createContext, useContext, useReducer, useEffect } from 'react'

const FinanceContext = createContext()

const initialState = {
  transactions: [],
  budgets: [],
  categories: ['Food', 'Housing', 'Transport', 'Entertainment', 'Utilities'],
  stores: ['Aldi', 'Ikea', 'Carrefour', 'Walmart', 'Amazon', 'Target'],
  searchTerm: ''
}

const financeReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        transactions: action.payload.transactions,
        budgets: action.payload.budgets,
        categories: action.payload.categories || state.categories,
        stores: action.payload.stores || state.stores
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
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] }
    case 'EDIT_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat === action.payload.oldCategory ? action.payload.newCategory : cat
        )
      }
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat !== action.payload),
        transactions: state.transactions.map(transaction =>
          transaction.category === action.payload ? { ...transaction, category: 'Uncategorized' } : transaction
        ),
        budgets: state.budgets.filter(budget => budget.category !== action.payload)
      }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    default:
      return state
  }
}

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState)

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || []
    const savedBudgets = JSON.parse(localStorage.getItem('budgets')) || []
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || []
    const savedStores = JSON.parse(localStorage.getItem('stores')) || []
    dispatch({
      type: 'LOAD_DATA',
      payload: { transactions: savedTransactions, budgets: savedBudgets, categories: savedCategories, stores: savedStores }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions))
    localStorage.setItem('budgets', JSON.stringify(state.budgets))
    localStorage.setItem('categories', JSON.stringify(state.categories))
    localStorage.setItem('stores', JSON.stringify(state.stores))
  }, [state.transactions, state.budgets, state.categories, state.stores])

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  )
}

export const useFinance = () => useContext(FinanceContext)
