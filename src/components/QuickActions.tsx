
import React from 'react';
import { Plus, Search } from 'lucide-react';

interface QuickActionsProps {
  onAddTransaction: () => void;
  onOpenAI: () => void;
}

const QuickActions = ({ onAddTransaction, onOpenAI }: QuickActionsProps) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <button
        onClick={onAddTransaction}
        className="bg-background border border-input text-foreground py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors flex items-center space-x-1 sm:space-x-2 shadow-sm text-sm sm:text-base"
      >
        <Plus className="w-4 h-4" />
        <span>Add</span>
      </button>
      
      <button
        onClick={onOpenAI}
        className="bg-black dark:bg-white text-white dark:text-black py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center shadow-sm h-10"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuickActions;
