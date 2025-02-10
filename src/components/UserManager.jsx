import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { FaUser, FaUserShield } from 'react-icons/fa';

const userIcons = {
  user: <FaUser className="w-4 h-4" />,
  admin: <FaUserShield className="w-4 h-4" />
};

const getUserIcon = (role) => {
  return userIcons[role] || userIcons.user;
};

const UserManager = () => {
  const { t, users = [], dispatch } = useFinance();
  const [newUser, setNewUser] = useState({ name: "", role: "user" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.name.trim()) {
      dispatch({
        type: "ADD_USER",
        payload: {
          id: Date.now().toString(),
          name: newUser.name.trim(),
          role: newUser.role
        }
      });
      setNewUser({ name: "", role: "user" });
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t('userName')}
            className="p-2 border rounded-lg flex-1"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border rounded-lg"
          >
            <option value="user">{t('user')}</option>
            <option value="admin">{t('admin')}</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {t('add')}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                {getUserIcon(user.role)}
              </span>
              <div>
                <span className="font-medium">{user.name}</span>
                <span className="ml-2 text-sm text-gray-600">({t(user.role)})</span>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: "DELETE_USER", payload: user.id })}
              className="text-red-600 hover:text-red-700"
            >
              {t('delete')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
