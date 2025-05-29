
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
    if (isFirst && isLast) return 'rounded-2xl';
    if (isFirst) return 'rounded-t-2xl';
    if (isLast) return 'rounded-b-2xl';
    return '';
  };

  return (
    <div className={`bg-white p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-200 ${getBorderRadius()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900 text-base font-[system-ui]">{transaction.merchant}</h3>
            <span className={cn(
              "font-medium text-base font-[system-ui]",
              transaction.type === 'income' ? 'text-green-500' : 'text-gray-900'
            )}>
              {formatAmount(transaction.amount, transaction.type)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 font-normal">{formatDate(transaction.date)}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500 font-normal">{transaction.paymentMethod}</span>
            </div>
            
            <CategorySelector
              currentCategory={transaction.category}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          
          {transaction.isAISuggested && (
            <div className="mt-3 text-xs text-blue-500 flex items-center font-normal">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
              AI suggested category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
