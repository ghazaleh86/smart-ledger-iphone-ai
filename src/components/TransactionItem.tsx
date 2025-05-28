
import React from 'react';
import { cn } from '@/lib/utils';

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
}

const TransactionItem = ({ transaction, onCategorize }: TransactionItemProps) => {
  const formatAmount = (amount: number, type: 'income' | 'expense') => {
    const sign = type === 'income' ? '+' : '-';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      'Meals & Entertainment': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Bills & Utilities': 'bg-gray-100 text-gray-800',
      'Income': 'bg-green-100 text-green-800',
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
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
            
            {transaction.category ? (
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                getCategoryColor(transaction.category)
              )}>
                {transaction.category}
              </span>
            ) : (
              <button
                onClick={() => onCategorize(transaction.id, 'Meals & Entertainment')}
                className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                Categorize
              </button>
            )}
          </div>
          
          {transaction.isAISuggested && (
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
