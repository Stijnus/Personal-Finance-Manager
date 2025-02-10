import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
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

const CategoryManager = () => {
  const { t, categories = [], dispatch } = useFinance();
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      dispatch({
        type: 'ADD_CATEGORY',
        payload: newCategory.trim()
      });
      setNewCategory('');
    }
  };

  const handleDelete = (category) => {
    if (window.confirm(t('confirmDeleteCategory'))) {
      dispatch({
        type: 'DELETE_CATEGORY',
        payload: category
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">{t('categories')}</h3>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder={t('newCategory')}
          className="p-2 border rounded-lg flex-1"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {t('add')}
        </button>
      </form>

      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">
                {getCategoryIcon(category)}
              </span>
              <span>{category}</span>
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

export default CategoryManager;
