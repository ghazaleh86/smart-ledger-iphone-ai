
import React from 'react';
import { Plus, Search } from 'lucide-react';

interface QuickActionsProps {
  onAddTransaction: () => void;
  onOpenAI: () => void;
}

const QuickActions = ({ onAddTransaction, onOpenAI }: QuickActionsProps) => {
  return (
    <div className="flex space-x-4 mb-8">
      <button
        onClick={onAddTransaction}
        className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-3 font-[system-ui]"
      >
        <Plus className="w-5 h-5" />
        <span>Add Transaction</span>
      </button>
      
      <button
        onClick={onOpenAI}
        className="bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center font-[system-ui]"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuickActions;
