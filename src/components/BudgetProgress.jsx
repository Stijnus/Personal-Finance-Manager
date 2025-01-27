import React from 'react'
import { useFinance } from '../context/FinanceContext'

const BudgetProgress = ({ budget }) => {
  const { state } = useFinance()
  
  const spent = state.transactions
    .filter(t => t.category === budget.category)
    .reduce((sum, t) => sum + t.amount, 0)

  const percentage = Math.min((spent / budget.limit) * 100, 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{budget.category}</span>
        <span>${spent.toFixed(2)} / ${budget.limit.toFixed(2)}</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${percentage >= 90 ? 'bg-danger' : 'bg-primary'} transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default BudgetProgress
