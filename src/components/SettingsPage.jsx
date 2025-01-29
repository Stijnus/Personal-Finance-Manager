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
      <div className="relative top-20 mx-auto p-5 border w-1/2 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FiSettings className="w-6 h-6" /> Settings
          </h3>
          <button onClick={onClose} className="text-red-500 hover:text-red-700 p-1 rounded focus:outline-none">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
            <FiUserPlus className="w-4 h-4" /> Manage Users
          </h4>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="User Name"
              className="border border-gray-300 px-3 py-2 rounded flex-grow"
            />
            <button onClick={handleSaveUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-shrink-0">
              <FiSave className="mr-1" /> {editingUser ? 'Save' : 'Add'}
            </button>
          </div>
          <ul>
            {state.users && state.users.length > 0 ? (
              state.users.map((user) => (
                <li key={user.id} className="flex items-center justify-between mb-2 border rounded p-2">
                  <span>{user.name}</span>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditUser(user)} className="text-yellow-500 hover:text-yellow-700 p-1 rounded focus:outline-none">
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-700 p-1 rounded focus:outline-none">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
            <FiPlusSquare className="w-4 h-4" /> Manage Stores
          </h4>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newStore}
              onChange={(e) => setNewStore(e.target.value)}
              placeholder="Store Name"
              className="border border-gray-300 px-3 py-2 rounded flex-grow"
            />
            <button onClick={handleSaveStore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-shrink-0">
              <FiSave className="mr-1" /> {editingStore ? 'Save' : 'Add'}
            </button>
          </div>
          <ul>
            {state.stores.map((store) => (
              <li key={store} className="flex items-center justify-between mb-2 border rounded p-2">
                <span>{store}</span>
                <div className="flex space-x-2">
                  <button onClick={() => handleEditStore(store)} className="text-yellow-500 hover:text-yellow-700 p-1 rounded focus:outline-none">
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteStore(store)} className="text-red-500 hover:text-red-700 p-1 rounded focus:outline-none">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
