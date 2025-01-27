import React from 'react'
import { useFinance } from '../context/FinanceContext'
import Chart from 'react-apexcharts'

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
      <h2 className="text-xl font-semibold mb-4">Spending Overview</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={300}
      />
    </div>
  )
}

export default Dashboard
