import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { FiPlusCircle } from 'react-icons/fi'

const TransactionForm = () => {
  const { state, dispatch } = useFinance()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(state.categories[0])
  const [store, setStore] = useState(state.stores[0])
  const [user, setUser] = useState(state.users.length > 0 ? state.users[0].id : null)
  const [date, setDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!amount || !category) {
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      store,
      user,
      date,
    }

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction })

    setDescription('')
    setAmount('')
    setCategory(state.categories[0])
    setStore(state.stores[0])
    setUser(state.users.length > 0 ? state.users[0].id : null)
    setDate('')
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiPlusCircle className="w-6 h-6" />New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description (Optional)"
          className="border border-gray-300 px-3 py-2 rounded mb-4 w-full"
        />
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          className="border border-gray-300 px-3 py-2 rounded mb-4 w-full"
          required
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded mb-4 w-full"
          required
        >
          {state.categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={store}
          onChange={e => setStore(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded mb-4 w-full"
        >
          {state.stores.map(store => (
            <option key={store} value={store}>{store}</option>
          ))}
        </select>
        <select
          value={user}
          onChange={e => setUser(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded mb-4 w-full"
        >
          {state.users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default TransactionForm
