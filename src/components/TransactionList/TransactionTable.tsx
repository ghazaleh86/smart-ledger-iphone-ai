
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
      <div className="bg-card shadow-sm border border-border rounded-lg overflow-hidden">
        {/* Desktop Header */}
        <div className="bg-muted px-8 py-6 border-b border-border">
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground">
            <div className="col-span-1">Date</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-3">Payment Method</div>
            <div className="col-span-3 text-right">Amount</div>
          </div>
        </div>
        
        {/* Desktop Transaction Rows */}
        <div className="divide-y divide-border">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="px-8 py-6 hover:bg-muted/50 transition-colors duration-150">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1 text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="col-span-3">
                  <div className="font-medium text-foreground truncate pr-2">{transaction.merchant}</div>
                  {transaction.isAISuggested && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1 font-medium">
                      <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
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
                <div className="col-span-3">
                  <div className="text-sm text-muted-foreground truncate pr-2">
                    {transaction.paymentMethod}
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <span className={`font-semibold text-base ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
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
