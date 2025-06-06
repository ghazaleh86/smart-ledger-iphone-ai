
import React from 'react';
import { Plus, Search } from 'lucide-react';

interface QuickActionsProps {
  onAddTransaction: () => void;
  onOpenAI: () => void;
}

const QuickActions = ({ onAddTransaction, onOpenAI }: QuickActionsProps) => {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onAddTransaction}
        className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2 shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Add</span>
      </button>
      
      <button
        onClick={onOpenAI}
        className="bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuickActions;
