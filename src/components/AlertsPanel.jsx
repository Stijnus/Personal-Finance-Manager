import React from 'react'
import { useFinance } from '../context/FinanceContext'
import { FiAlertTriangle } from 'react-icons/fi'

const AlertsPanel = () => {
  const { state } = useFinance()

  const alerts = state.budgets.filter(budget => {
    const spent = state.transactions
      .filter(t => t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0)
    return spent > budget.limit * 0.8
  })

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Budget Alerts</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-500">No active alerts</p>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <FiAlertTriangle className="text-danger w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-medium text-danger">{alert.category} Budget</p>
                <p className="text-sm text-danger/80">Exceeding 80% of budget limit</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AlertsPanel
