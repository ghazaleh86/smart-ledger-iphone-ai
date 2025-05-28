
import React from 'react';
import { Plus, Search } from 'lucide-react';

interface QuickActionsProps {
  onAddTransaction: () => void;
  onOpenAI: () => void;
}

const QuickActions = ({ onAddTransaction, onOpenAI }: QuickActionsProps) => {
  return (
    <div className="flex space-x-3 mb-6">
      <button
        onClick={onAddTransaction}
        className="flex-1 bg-black text-white py-4 px-6 rounded-2xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Transaction</span>
      </button>
      
      <button
        onClick={onOpenAI}
        className="bg-blue-600 text-white py-4 px-6 rounded-2xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuickActions;
