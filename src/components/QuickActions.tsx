
import React from 'react';
import { Plus, Search } from 'lucide-react';

interface QuickActionsProps {
  onAddTransaction: () => void;
  onOpenAI: () => void;
}

const QuickActions = ({ onAddTransaction, onOpenAI }: QuickActionsProps) => {
  return (
    <div className="flex space-x-4 mb-10">
      <button
        onClick={onAddTransaction}
        className="flex-1 bg-white border border-gray-200 text-gray-700 py-4 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-3 shadow-sm"
      >
        <Plus className="w-5 h-5" />
        <span>Add Transaction</span>
      </button>
      
      <button
        onClick={onOpenAI}
        className="bg-white border border-gray-200 text-gray-700 py-4 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuickActions;
