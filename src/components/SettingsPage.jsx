import React, { useState } from 'react'
import { useFinance } from '../context/FinanceContext'
import { FiUserPlus, FiSettings, FiSave, FiX, FiTrash2, FiEdit, FiPlusSquare } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid';

const SettingsPage = ({ onClose }) => {
  const { state, dispatch } = useFinance()
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ id: '', name: '' });
  const [editingStore, setEditingStore] = useState(null);
  const [newStore, setNewStore] = useState('');


  const handleAddUser = () => {
    const newUserId = uuidv4();
    dispatch({ type: 'ADD_USER', payload: { id: newUserId, name: newUser.name } });
    setNewUser({ id: '', name: '' });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ id: user.id, name: user.name });
  };

  const handleSaveUser = () => {
    if (editingUser) {
      dispatch({ type: 'EDIT_USER', payload: newUser });
    } else {
      handleAddUser();
    }
    setEditingUser(null);
    setNewUser({ id: '', name: '' });
  };

  const handleDeleteUser = (userId) => {
    dispatch({ type: 'DELETE_USER', payload: userId });
  };

  const handleAddStore = () => {
    if (newStore.trim() !== '') {
      dispatch({ type: 'ADD_STORE', payload: newStore });
      setNewStore('');
    }
  };

  const handleEditStore = (store) => {
    setEditingStore(store);
    setNewStore(store);
  };

  const handleSaveStore = () => {
    if (editingStore) {
      dispatch({ type: 'EDIT_STORE', payload: { oldStore: editingStore, newStore: newStore } });
    } else {
      handleAddStore();
    }
    setEditingStore(null);
    setNewStore('');
  };

  const handleDeleteStore = (store) => {
    dispatch({ type: 'DELETE_STORE', payload: store });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <button onClick={onClose} className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
          <FiX />
        </button>
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
            <FiUserPlus className="w-4 h-4" /> Manage Users
          </h4>
          <div>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="User Name"
              className="border border-gray-300 px-3 py-2 rounded mb-2"
            />
            <button onClick={handleSaveUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              <FiSave /> {editingUser ? 'Save' : 'Add'}
            </button>
          </div>
          {state.users && state.users.length > 0 ? (
            state.users.map((user) => (
              <div key={user.id} className="flex items-center justify-between mb-2">
                <span>{user.name}</span>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditUser(user)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                    <FiEdit />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
            <FiPlusSquare className="w-4 h-4" /> Manage Stores
          </h4>
          <div>
            <input
              type="text"
              value={newStore}
              onChange={(e) => setNewStore(e.target.value)}
              placeholder="Store Name"
              className="border border-gray-300 px-3 py-2 rounded mb-2"
            />
            <button onClick={handleSaveStore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
              <FiSave /> {editingStore ? 'Save' : 'Add'}
            </button>
          </div>
          {state.stores.map((store) => (
            <div key={store} className="flex items-center justify-between mb-2">
              <span>{store}</span>
              <div className="flex space-x-2">
                <button onClick={() => handleEditStore(store)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                  <FiEdit />
                </button>
                <button onClick={() => handleDeleteStore(store)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
