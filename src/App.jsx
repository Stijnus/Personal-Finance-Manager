import React from 'react'
import { FinanceProvider } from './context/FinanceContext'
import Dashboard from './components/Dashboard'
import TransactionForm from './components/TransactionForm'
import BudgetManager from './components/BudgetManager'
import AlertsPanel from './components/AlertsPanel'
import CategoryManager from './components/CategoryManager'
import TransactionList from './components/TransactionList'
import { FiTrendingUp, FiList, FiBell, FiTag, FiCreditCard } from 'react-icons/fi'

const App = () => {
  return (
    <FinanceProvider>
      <div className="container mx-auto p-4 md:p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Personal Finance Manager
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              <TransactionForm />
              <BudgetManager />
              <CategoryManager />
            </div>
          </div>
          
          <div className="space-y-6">
            <AlertsPanel />
            <Dashboard />
            <TransactionList />
          </div>
        </div>
      </div>
    </FinanceProvider>
  )
}

export default App
