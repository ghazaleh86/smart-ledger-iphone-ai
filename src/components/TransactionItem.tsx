
import React from 'react';
import { cn } from '@/lib/utils';
import CategorySelector from './CategorySelector';
import AIStatusIndicator from './AIStatusIndicator';

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
  aiStatus?: 'suggested' | 'accepted' | 'rejected' | 'manual';
}

interface TransactionItemProps {
  transaction: Transaction;
  onCategorize: (id: string, category: string) => void;
  onAcceptAI?: (id: string) => void;
  onRejectAI?: (id: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const TransactionItem = ({ 
  transaction, 
  onCategorize, 
  onAcceptAI,
  onRejectAI,
  isFirst, 
  isLast 
}: TransactionItemProps) => {
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

  const handleAccept = () => {
    onAcceptAI?.(transaction.id);
  };

  const handleReject = () => {
    onRejectAI?.(transaction.id);
  };

  const getBorderRadius = () => {
    if (isFirst && isLast) return 'rounded-lg';
    if (isFirst) return 'rounded-t-lg';
    if (isLast) return 'rounded-b-lg';
    return '';
  };

  const getAIIndicatorStyles = () => {
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
    <div className={cn(
      'bg-card p-6 border-b border-border last:border-b-0 hover:bg-muted/50 transition-all duration-150',
      getBorderRadius(),
      getAIIndicatorStyles()
    )}>
      <div className="space-y-4">
        {/* Header: Merchant and Amount - consistently aligned */}
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground text-base flex-1 pr-4">{transaction.merchant}</h3>
          <span className={cn(
            "font-semibold text-base shrink-0",
            transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-foreground'
          )}>
            {formatAmount(transaction.amount, transaction.type)}
          </span>
        </div>
        
        {/* Transaction Details - consistently positioned */}
        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
          <span>{formatDate(transaction.date)}</span>
          <span>•</span>
          <span>{transaction.paymentMethod}</span>
        </div>
        
        {/* Category and AI Status Row - consistent alignment */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CategorySelector
              currentCategory={transaction.category}
              aiSuggestedCategory={transaction.aiSuggestedCategory}
              isAISuggested={transaction.isAISuggested}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          
          <div className="shrink-0 flex items-center">
            <AIStatusIndicator
              aiStatus={transaction.aiStatus || 'manual'}
              aiConfidence={transaction.aiConfidence}
              aiReasoning={transaction.aiReasoning}
              aiSuggestedCategory={transaction.aiSuggestedCategory}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
