
import React from 'react';
import { cn } from '@/lib/utils';
import CategorySelector from './CategorySelector';
import AISuggestionBadge from './AISuggestionBadge';

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
  aiConfidence?: 'high' | 'medium' | 'low';
  aiReasoning?: string;
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

  const handleAcceptSuggestion = () => {
    if (transaction.aiSuggestedCategory) {
      onCategorize(transaction.id, transaction.aiSuggestedCategory);
    }
  };

  const handleRejectSuggestion = () => {
    // For now, just remove the suggestion flag - in a real app, this would update the transaction
    console.log('Rejected AI suggestion for transaction:', transaction.id);
  };

  const getBorderRadius = () => {
    if (isFirst && isLast) return 'rounded-lg';
    if (isFirst) return 'rounded-t-lg';
    if (isLast) return 'rounded-b-lg';
    return '';
  };

  return (
    <div className={`bg-card p-6 border-b border-border last:border-b-0 hover:bg-muted/50 transition-all duration-150 ${getBorderRadius()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground text-base">{transaction.merchant}</h3>
            <span className={cn(
              "font-semibold text-base",
              transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-foreground'
            )}>
              {formatAmount(transaction.amount, transaction.type)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">{formatDate(transaction.date)}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{transaction.paymentMethod}</span>
            </div>
            
            <CategorySelector
              currentCategory={transaction.category}
              aiSuggestedCategory={transaction.aiSuggestedCategory}
              isAISuggested={transaction.isAISuggested}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          
          {transaction.isAISuggested && transaction.aiSuggestedCategory && (
            <div className="mt-4">
              <AISuggestionBadge
                suggestedCategory={transaction.aiSuggestedCategory}
                confidence={transaction.aiConfidence}
                reasoning={transaction.aiReasoning}
                onAccept={handleAcceptSuggestion}
                onReject={handleRejectSuggestion}
                compact
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
