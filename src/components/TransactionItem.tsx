
import React from 'react';
import { cn } from '@/lib/utils';
import CategorySelector from './CategorySelector';

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category?: string;
  type: 'income' | 'expense';
  paymentMethod: string;
  isAISuggested?: boolean;
  aiSuggestedCategory?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onCategorize: (id: string, category: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const TransactionItem = ({ transaction, onCategorize, isFirst, isLast }: TransactionItemProps) => {
  const formatAmount = (amount: number, type: 'income' | 'expense') => {
    const sign = type === 'income' ? '+' : '-';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleCategoryChange = (category: string) => {
    onCategorize(transaction.id, category);
  };

  const getBorderRadius = () => {
    if (isFirst && isLast) return 'rounded-xl';
    if (isFirst) return 'rounded-t-xl';
    if (isLast) return 'rounded-b-xl';
    return '';
  };

  // Show AI suggested label only if the current category matches the AI suggested category
  const showAISuggestedLabel = transaction.isAISuggested && 
    transaction.category === transaction.aiSuggestedCategory;

  return (
    <div className={`bg-white p-4 shadow-sm border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-200 ${getBorderRadius()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm">{transaction.merchant}</h3>
            <span className={cn(
              "font-semibold text-sm",
              transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'
            )}>
              {formatAmount(transaction.amount, transaction.type)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{transaction.paymentMethod}</span>
            </div>
            
            <CategorySelector
              currentCategory={transaction.category}
              onCategoryChange={handleCategoryChange}
              aiSuggestedCategory={transaction.aiSuggestedCategory}
            />
          </div>
          
          {showAISuggestedLabel && (
            <div className="mt-2 text-xs text-blue-600 flex items-center">
              <div className="w-1 h-1 bg-blue-600 rounded-full mr-1"></div>
              AI suggested category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
