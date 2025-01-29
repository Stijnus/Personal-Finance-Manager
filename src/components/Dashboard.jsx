import React from 'react'
import { useFinance } from '../context/FinanceContext'
import Chart from 'react-apexcharts'
import { FiPieChart, FiUsers } from 'react-icons/fi'

const Dashboard = () => {
  const { state } = useFinance()

  const chartData = {
    options: {
      labels: state.categories,
      colors: ['#3b82f6', '#6366f1', '#10b981', '#f59e0b', '#ef4444'],
      dataLabels: { enabled: false },
      legend: { position: 'bottom' }
    },
    series: state.categories.map(category =>
      state.transactions
        .filter(t => t.category === category)
        .reduce((sum, t) => sum + t.amount, 0)
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiPieChart className="w-6 h-6" />Spending Overview</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={300}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiUsers className="w-6 h-6" />User Statistics</h2>
        {state.users && state.users.length > 0 ? (
          <ul>
            {state.users.map(user => (
              <li key={user.id} className="mb-2">
                {user.name} - Transactions: {state.transactions.filter(t => t.user === user.id).length}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
