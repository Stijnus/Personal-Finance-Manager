import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { 
  FaUtensils, 
  FaCar, 
  FaFilm, 
  FaShoppingCart, 
  FaFileInvoiceDollar,
  FaHeartbeat,
  FaGift,
  FaPiggyBank,
  FaPlane,
  FaBook,
  FaHome,
  FaQuestionCircle
} from 'react-icons/fa';

const categoryIcons = {
  food: <FaUtensils className="w-4 h-4" />,
  transport: <FaCar className="w-4 h-4" />,
  entertainment: <FaFilm className="w-4 h-4" />,
  shopping: <FaShoppingCart className="w-4 h-4" />,
  bills: <FaFileInvoiceDollar className="w-4 h-4" />,
  health: <FaHeartbeat className="w-4 h-4" />,
  gifts: <FaGift className="w-4 h-4" />,
  savings: <FaPiggyBank className="w-4 h-4" />,
  travel: <FaPlane className="w-4 h-4" />,
  education: <FaBook className="w-4 h-4" />,
  housing: <FaHome className="w-4 h-4" />,
  other: <FaQuestionCircle className="w-4 h-4" />
};

const getCategoryIcon = (category) => {
  const lowerCategory = category.toLowerCase();
  return categoryIcons[lowerCategory] || categoryIcons.other;
};

const BudgetManager = () => {
  const { t, categories = [], budgets = {}, dispatch } = useFinance();
  const [newBudget, setNewBudget] = useState({ category: "", amount: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBudget.category && newBudget.amount) {
      dispatch({
        type: "UPDATE_BUDGETS",
        payload: {
          ...budgets,
          [newBudget.category]: parseFloat(newBudget.amount)
        }
      });
      setNewBudget({ category: "", amount: "" });
    }
  };

  const handleDelete = (category) => {
    const updatedBudgets = { ...budgets };
    delete updatedBudgets[category];
    dispatch({
      type: "UPDATE_BUDGETS",
      payload: updatedBudgets
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">{t('budgets')}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <select
            value={newBudget.category}
            onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
            className="p-2 border rounded-lg flex-1"
            required
          >
            <option value="">{t('selectCategory')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {t(category.toLowerCase())}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder={t('amount')}
            className="p-2 border rounded-lg w-32"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {t('add')}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {Object.entries(budgets).map(([category, amount]) => (
          <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                {getCategoryIcon(category)}
              </span>
              <div>
                <span className="font-medium">{t(category.toLowerCase())}</span>
                <span className="ml-2 text-sm text-gray-600">
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(amount)}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleDelete(category)}
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

export default BudgetManager;
