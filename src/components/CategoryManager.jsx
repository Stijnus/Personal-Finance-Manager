import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { FiEdit, FiTrash2, FiPlus, FiTag } from 'react-icons/fi'

const CategoryManager = () => {
  const { state, dispatch } = useFinance()
  const [newCategory, setNewCategory] = useState('')
  const [editCategory, setEditCategory] = useState({ oldCategory: '', newCategory: '' })
  const [isEditing, setIsEditing] = useState(false)

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      dispatch({ type: 'ADD_CATEGORY', payload: newCategory })
      setNewCategory('')
    }
  }

  const handleEditCategory = (category) => {
    setEditCategory({ oldCategory: category, newCategory: category })
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    dispatch({ type: 'EDIT_CATEGORY', payload: editCategory })
    setIsEditing(false)
    setEditCategory({ oldCategory: '', newCategory: '' })
  }

  const handleDeleteCategory = (category) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: category })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FiTag className="w-6 h-6"/>Category Management</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="New Category"
          className="p-2 border rounded-lg flex-1"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
        </button>
      </div>

      <ul className="space-y-2">
        {state.categories.map(category => (
          <li key={category} className="flex items-center justify-between p-2 border rounded-lg">
            {isEditing && editCategory.oldCategory === category ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="p-1 border rounded-lg"
                  value={editCategory.newCategory}
                  onChange={e => setEditCategory({ ...editCategory, newCategory: e.target.value })}
                />
                <button onClick={handleSaveEdit} className="text-green-500 hover:text-green-700 flex items-center gap-1">
                  Save
                </button>
              </div>
            ) : (
              <span>{category}</span>
            )}
            <div className="flex gap-2">
              {!isEditing && (
                <button onClick={() => handleEditCategory(category)} className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                  <FiEdit className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => handleDeleteCategory(category)} className="text-red-500 hover:text-red-700 flex items-center gap-1">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryManager
