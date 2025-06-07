
import React from 'react';
import { cn } from '@/lib/utils';
import CategorySelector from './CategorySelector';
import { shouldShowAILabel, getAILabelText } from '@/utils/aiLabelUtils';

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
  aiConfidence?: number;
  categorizedAt?: string;
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
    if (isFirst && isLast) return 'rounded-lg';
    if (isFirst) return 'rounded-t-lg';
    if (isLast) return 'rounded-b-lg';
    return '';
  };

  const showAILabel = shouldShowAILabel(transaction);

  return (
    <div className={`bg-white p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-150 ${getBorderRadius()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900 text-base">{transaction.merchant}</h3>
            <span className={cn(
              "font-semibold text-base",
              transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'
            )}>
              {formatAmount(transaction.amount, transaction.type)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">{formatDate(transaction.date)}</span>
              <span className="text-sm text-gray-300">•</span>
              <span className="text-sm text-gray-500">{transaction.paymentMethod}</span>
            </div>
            
            <CategorySelector
              currentCategory={transaction.category}
              aiSuggestedCategory={transaction.aiSuggestedCategory}
              isAISuggested={transaction.isAISuggested}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          
          {showAILabel && (
            <div className="mt-3 text-xs text-blue-600 flex items-center font-medium">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
              {getAILabelText(transaction)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
