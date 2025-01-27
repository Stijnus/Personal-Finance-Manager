import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { FiSearch, FiList } from 'react-icons/fi'

const TransactionList = () => {
  const { state, dispatch } = useFinance()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
  }

  const filteredTransactions = state.transactions.filter(transaction => {
    const searchRegex = new RegExp(searchTerm, 'i')
    return (
      searchRegex.test(transaction.description) ||
      searchRegex.test(transaction.category) ||
      searchRegex.test(transaction.amount.toString())
    )
  })

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiList className="w-6 h-6"/>Transaction History</h2>
      <div className="flex items-center mb-4 border rounded-lg p-2">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full focus:outline-none"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTransactions.map(transaction => (
            <li key={transaction.id} className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">{transaction.description}</span>
                <span>${transaction.amount.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500">
                {transaction.category} - {new Date(transaction.date).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TransactionList
