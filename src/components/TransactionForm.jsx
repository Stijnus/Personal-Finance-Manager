import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { FiPlus } from 'react-icons/fi'

const TransactionForm = () => {
  const { dispatch } = useFinance()
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: Date.now()
    }
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction })
    setFormData({ amount: '', category: '', date: '', description: '' })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Amount"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            value={formData.amount}
            onChange={e => setFormData({...formData, amount: e.target.value})}
            required
          />
          <select
            className="p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            {initialState.categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="date"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionForm
