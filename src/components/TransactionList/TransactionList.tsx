
import React from 'react';
import { Transaction } from '@/types/financial';
import TransactionTable from './TransactionTable';
import TransactionCards from './TransactionCards';

interface TransactionListProps {
  transactions: Transaction[];
  onCategorize: (id: string, category: string) => void;
  onAcceptAI?: (id: string) => void;
  onRejectAI?: (id: string) => void;
  isLoading: boolean;
  hasMoreItems: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onCategorize,
  onAcceptAI,
  onRejectAI,
  isLoading, 
  hasMoreItems 
}) => {
  return (
    <div className="space-y-0">
      <TransactionTable 
        transactions={transactions} 
        onCategorize={onCategorize}
        onAcceptAI={onAcceptAI}
        onRejectAI={onRejectAI}
      />
      <TransactionCards 
        transactions={transactions} 
        onCategorize={onCategorize}
        onAcceptAI={onAcceptAI}
        onRejectAI={onRejectAI}
      />
      
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-sm text-muted-foreground">Loading more transactions...</div>
        </div>
      )}
      
      {!hasMoreItems && transactions.length > 0 && (
        <div className="text-center py-8">
          <div className="text-sm text-muted-foreground">All transactions loaded</div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
