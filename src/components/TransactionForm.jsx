import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { FiPlus, FiChevronDown } from 'react-icons/fi'

const TransactionForm = () => {
  const { state, dispatch } = useFinance()
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(state.categories[0] || '')
  const [store, setStore] = useState(state.stores[0] || '')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (amount && category && store) {
      const newTransaction = {
        id: Date.now(),
        amount: parseFloat(amount),
        category,
        store,
        date: new Date().toISOString()
      }
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction })
      setAmount('')
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            className="mt-1 p-2 border rounded-lg"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col relative">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="relative">
            <button
              type="button"
              className="mt-1 p-2 border rounded-lg w-full flex justify-between items-center"
              onClick={toggleDropdown}
            >
              {category}
              <FiChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-md">
                {state.categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className="block w-full text-left p-2 hover:bg-gray-100"
                    onClick={() => {
                      setCategory(cat)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col relative">
          <label className="block text-sm font-medium text-gray-700">Store</label>
          <div className="relative">
            <button
              type="button"
              className="mt-1 p-2 border rounded-lg w-full flex justify-between items-center"
              onClick={toggleDropdown}
            >
              {store}
              <FiChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-md">
                {state.stores.map(st => (
                  <button
                    key={st}
                    type="button"
                    className="block w-full text-left p-2 hover:bg-gray-100"
                    onClick={() => {
                      setStore(st)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionForm
