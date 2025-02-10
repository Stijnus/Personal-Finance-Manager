import React from 'react'
import { useFinance } from '../context/FinanceContext'
import { startOfMonth, endOfMonth } from 'date-fns'
import { formatAmount } from '../utils/formatAmount'

const BudgetProgress = () => {
  const { transactions = [], budgets, categories, t, formatAmount } = useFinance()

  // Get current month's date range
  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)

  // Calculate total spent for each category
  const categorySpending = transactions
    .filter(transaction => {
      const date = new Date(transaction.date)
      return (
        date >= monthStart &&
        date <= monthEnd &&
        transaction.amount > 0 // Expenses are stored as positive amounts
      )
    })
    .reduce((acc, transaction) => {
      const category = transaction.category
      acc[category] = (acc[category] || 0) + transaction.amount
      return acc
    }, {})

  // Get categories with budgets
  const categoriesWithBudgets = categories.filter(cat => budgets[cat] > 0)

  if (categoriesWithBudgets.length === 0) return null

  return (
    <div className="space-y-4">
      {categoriesWithBudgets.map(category => {
        const budget = budgets[category] || 0
        const spent = categorySpending[category] || 0
        const remaining = budget - spent
        const percentage = budget > 0 ? (spent / budget) * 100 : 0
        const isOverBudget = percentage > 100

        return (
          <div key={category} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{t(category.toLowerCase())}</span>
              <span className={remaining < 0 ? 'text-red-600' : 'text-green-600'}>
                {formatAmount(remaining)} {t('remaining')}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    {Math.round(percentage)}%
                  </span>
                </div>
                {isOverBudget && (
                  <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                    {t('overBudget')} (+{Math.round(percentage - 100)}%)
                  </div>
                )}
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                    isOverBudget ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BudgetProgress
