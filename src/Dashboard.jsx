import React, { useState, useMemo } from 'react'
import { useFinance } from '../context/FinanceContext'
import TransactionList from './TransactionList'
import TransactionForm from './TransactionForm'
import DateRangeFilter from './DateRangeFilter'
import Analytics from './Analytics'
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'
import { FiPieChart, FiBarChart2, FiGlobe, FiPlus } from 'react-icons/fi'

const Dashboard = () => {
  const { 
    transactions = [], 
    t, 
    language, 
    dispatch,
    budgets = {},
    categories = [],
    formatAmount 
  } = useFinance()
  
  const [startDate, setStartDate] = useState(startOfMonth(new Date()))
  const [endDate, setEndDate] = useState(endOfMonth(new Date()))
  const [showTransactionForm, setShowTransactionForm] = useState(false)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'nl', name: 'Nederlands' }
  ]

  // Calculate monthly spending per category
  const monthlySpending = useMemo(() => {
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)

    return transactions
      .filter(transaction => {
        const date = new Date(transaction.date)
        return date >= monthStart && date <= monthEnd && transaction.amount > 0
      })
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
        return acc
      }, {})
  }, [transactions])

  // Get categories with budgets
  const categoriesWithBudgets = useMemo(() => {
    return Object.keys(budgets).filter(category => budgets[category] > 0)
  }, [budgets])

  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  const handleAddTransaction = (transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        ...transaction,
        id: Date.now().toString()
      }
    })
    setShowTransactionForm(false)
  }

  const handleLanguageChange = (e) => {
    dispatch({
      type: 'SET_LANGUAGE',
      payload: e.target.value
    })
  }

  return (
    <div className="p-6 max-w-[95%] mx-auto">
      {/* Header with Language Selector */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('dashboard')}</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowTransactionForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            {t('addTransaction')}
          </button>
          <div className="flex items-center gap-2">
            <FiGlobe className="w-5 h-5 text-gray-600" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="p-2 border rounded-lg"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">{t('budgetOverview')}</h2>
        
        {categoriesWithBudgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoriesWithBudgets.map(category => {
              const budget = budgets[category] || 0
              const spent = monthlySpending[category] || 0
              const remaining = budget - spent
              const percentage = (spent / budget) * 100

              return (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{t(category.toLowerCase())}</span>
                    <span className={remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {formatAmount(remaining)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{t('spent')}: {formatAmount(spent)}</span>
                      <span>{t('budget')}: {formatAmount(budget)}</span>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                            percentage > 100 ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                        ></div>
                      </div>
                      <div className="flex justify-center">
                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                          percentage > 100 ? 'bg-red-200 text-red-600' : 'bg-blue-200 text-blue-600'
                        }`}>
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            {t('noBudgetsSet')}
          </div>
        )}
      </div>

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowTransactionForm(false)
            }
          }}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full mx-4">
            <TransactionForm
              onSubmit={handleAddTransaction}
              onCancel={() => setShowTransactionForm(false)}
            />
          </div>
        </div>
      )}

      {/* Date Range Filter */}
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onDateChange={handleDateChange}
      />

      {/* Analytics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('analytics')}</h2>
        <Analytics startDate={startDate} endDate={endDate} />
      </div>

      {/* Transaction List */}
      <TransactionList transactions={transactions} />
    </div>
  )
}

export default Dashboard
