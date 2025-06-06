
import React from 'react';
import { Transaction } from '@/types/financial';
import CategorySelector from '@/components/CategorySelector';

interface TransactionTableProps {
  transactions: Transaction[];
  onCategorize: (id: string, category: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onCategorize }) => {
  return (
    <div className="hidden md:block">
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        {/* Desktop Header */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-6 text-sm font-semibold text-gray-700">
            <div className="col-span-1">Date</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-3">Payment Method</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
        </div>
        
        {/* Desktop Transaction Rows */}
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="px-8 py-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-1 text-sm text-gray-600">
                  {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="col-span-4">
                  <div className="font-medium text-gray-900">{transaction.merchant}</div>
                  {transaction.isAISuggested && (
                    <div className="text-xs text-blue-600 flex items-center mt-1 font-medium">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      AI suggested category
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <CategorySelector
                    currentCategory={transaction.category}
                    aiSuggestedCategory={transaction.aiSuggestedCategory}
                    isAISuggested={transaction.isAISuggested}
                    onCategoryChange={(category) => onCategorize(transaction.id, category)}
                  />
                </div>
                <div className="col-span-3 text-sm text-gray-600">
                  {transaction.paymentMethod}
                </div>
                <div className="col-span-2 text-right">
                  <span className={`font-semibold text-base ${transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
