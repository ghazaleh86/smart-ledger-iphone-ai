
import React from 'react';
import { Transaction } from '@/types/financial';
import CategorySelector from '@/components/CategorySelector';
import AIStatusIndicator from '@/components/AIStatusIndicator';
import { cn } from '@/lib/utils';

interface TransactionTableProps {
  transactions: Transaction[];
  onCategorize: (id: string, category: string) => void;
  onAcceptAI?: (id: string) => void;
  onRejectAI?: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ 
  transactions, 
  onCategorize,
  onAcceptAI,
  onRejectAI 
}) => {
  const getRowStyles = (transaction: Transaction) => {
    if (transaction.aiStatus === 'suggested' && transaction.aiConfidence) {
      switch (transaction.aiConfidence) {
        case 'high':
          return 'border-l-4 border-l-green-400 bg-green-50/30 dark:bg-green-950/20';
        case 'medium':
          return 'border-l-4 border-l-yellow-400 bg-yellow-50/30 dark:bg-yellow-950/20';
        case 'low':
          return 'border-l-4 border-l-red-400 bg-red-50/30 dark:bg-red-950/20';
        default:
          return '';
      }
    }
    return '';
  };

  return (
    <div className="hidden md:block">
      <div className="bg-card shadow-sm border border-border rounded-lg overflow-hidden">
        {/* Desktop Header */}
        <div className="bg-muted px-8 py-6 border-b border-border">
          <div className="grid grid-cols-12 lg:grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground">
            <div className="col-span-1">Date</div>
            <div className="col-span-3 lg:col-span-3">Description</div>
            <div className="col-span-3 lg:col-span-2">Category</div>
            <div className="col-span-2 lg:col-span-3">Payment Method</div>
            <div className="col-span-2 lg:col-span-2">AI Status</div>
            <div className="col-span-1 text-right">Amount</div>
          </div>
        </div>
        
        {/* Desktop Transaction Rows */}
        <div className="divide-y divide-border">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className={cn(
                'px-8 py-6 hover:bg-muted/50 transition-colors duration-150',
                getRowStyles(transaction)
              )}
            >
              <div className="grid grid-cols-12 lg:grid-cols-12 gap-4 items-center">
                <div className="col-span-1 text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="col-span-3 lg:col-span-3">
                  <div className="font-medium text-foreground truncate pr-2">{transaction.merchant}</div>
                </div>
                <div className="col-span-3 lg:col-span-2">
                  <CategorySelector
                    currentCategory={transaction.category}
                    aiSuggestedCategory={transaction.aiSuggestedCategory}
                    isAISuggested={transaction.isAISuggested}
                    onCategoryChange={(category) => onCategorize(transaction.id, category)}
                  />
                </div>
                <div className="col-span-2 lg:col-span-3">
                  <div className="text-sm text-muted-foreground truncate pr-2">
                    {transaction.paymentMethod}
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-2">
                  <AIStatusIndicator
                    aiStatus={transaction.aiStatus || 'manual'}
                    aiConfidence={transaction.aiConfidence}
                    aiReasoning={transaction.aiReasoning}
                    aiSuggestedCategory={transaction.aiSuggestedCategory}
                    onAccept={() => onAcceptAI?.(transaction.id)}
                    onReject={() => onRejectAI?.(transaction.id)}
                  />
                </div>
                <div className="col-span-1 text-right">
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
