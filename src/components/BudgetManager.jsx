import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import BudgetProgress from './BudgetProgress'
import { FiTrendingUp, FiPlus } from 'react-icons/fi'

const BudgetManager = () => {
  const { state, dispatch } = useFinance()
  const [newBudget, setNewBudget] = useState({ category: '', limit: '' })

  const handleAddBudget = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_BUDGET',
      payload: { ...newBudget, limit: parseFloat(newBudget.limit), id: Date.now() }
    })
    setNewBudget({ category: '', limit: '' })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiTrendingUp className="w-6 h-6"/>Budget Management</h2>
      
      <form onSubmit={handleAddBudget} className="flex gap-4 mb-6">
        <select
          className="p-2 border rounded-lg flex-1"
          value={newBudget.category}
          onChange={e => setNewBudget({...newBudget, category: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          {state.categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Limit"
          className="p-2 border rounded-lg w-32"
          value={newBudget.limit}
          onChange={e => setNewBudget({...newBudget, limit: e.target.value})}
          required
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Set Budget
        </button>
      </form>

      <div className="space-y-4">
        {state.budgets.map(budget => (
          <BudgetProgress key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  )
}

export default BudgetManager
