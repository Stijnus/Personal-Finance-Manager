import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { translations } from '../translations'
import { addDays, addWeeks, addMonths, addYears, parseISO } from 'date-fns'
import toast from 'react-hot-toast'

// Create the context
const FinanceContext = createContext()

// Create the hook
export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}

// Helper function to save state to localStorage
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
    toast.error(`Error saving ${key}`)
  }
}

// Helper function to load state from localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key)
    if (saved === null) return defaultValue
    return JSON.parse(saved)
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error)
    return defaultValue
  }
}

const defaultState = {
  transactions: [],
  categories: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'],
  budgets: {},
  language: 'en',
  defaultCurrency: 'EUR'
}

// Load initial state from localStorage
const loadInitialState = () => ({
  transactions: loadFromLocalStorage('transactions', defaultState.transactions),
  categories: loadFromLocalStorage('categories', defaultState.categories),
  budgets: loadFromLocalStorage('budgets', defaultState.budgets),
  language: loadFromLocalStorage('language', defaultState.language),
  defaultCurrency: loadFromLocalStorage('defaultCurrency', defaultState.defaultCurrency)
})

const reducer = (state, action) => {
  let newState = state

  switch (action.type) {
    case 'UPDATE_BUDGETS': {
      newState = {
        ...state,
        budgets: action.payload
      }
      saveToLocalStorage('budgets', action.payload)
      return newState
    }

    case 'ADD_TRANSACTION': {
      const newTransactions = [...state.transactions, action.payload]
      newState = {
        ...state,
        transactions: newTransactions
      }
      saveToLocalStorage('transactions', newTransactions)
      return newState
    }

    case 'UPDATE_TRANSACTION': {
      const newTransactions = state.transactions.map(tx =>
        tx.id === action.payload.id ? action.payload : tx
      )
      newState = {
        ...state,
        transactions: newTransactions
      }
      saveToLocalStorage('transactions', newTransactions)
      return newState
    }

    case 'DELETE_TRANSACTION': {
      const newTransactions = state.transactions.filter(tx => tx.id !== action.payload)
      newState = {
        ...state,
        transactions: newTransactions
      }
      saveToLocalStorage('transactions', newTransactions)
      return newState
    }

    case 'ADD_CATEGORY': {
      if (!state.categories.includes(action.payload)) {
        const newCategories = [...state.categories, action.payload]
        newState = {
          ...state,
          categories: newCategories
        }
        saveToLocalStorage('categories', newCategories)
      }
      return newState
    }

    case 'DELETE_CATEGORY': {
      const newCategories = state.categories.filter(cat => cat !== action.payload)
      newState = {
        ...state,
        categories: newCategories
      }
      saveToLocalStorage('categories', newCategories)
      return newState
    }

    case 'SET_LANGUAGE': {
      newState = {
        ...state,
        language: action.payload
      }
      saveToLocalStorage('language', action.payload)
      return newState
    }

    default:
      return state
  }
}

// Provider component
export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadInitialState())

  // Translation helper
  const t = (key) => {
    return translations[state.language]?.[key] || key
  }

  // Format amount helper
  const formatAmount = (amount) => {
    return new Intl.NumberFormat(state.language, {
      style: 'currency',
      currency: state.defaultCurrency
    }).format(amount)
  }

  const value = {
    ...state,
    dispatch,
    t,
    formatAmount
  }

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  )
}
