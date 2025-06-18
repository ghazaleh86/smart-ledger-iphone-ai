
import React from 'react';
import { Transaction } from '@/types/financial';
import TransactionItem from '@/components/TransactionItem';

interface TransactionCardsProps {
  transactions: Transaction[];
  onCategorize: (id: string, category: string) => void;
  onAcceptAI?: (id: string) => void;
  onRejectAI?: (id: string) => void;
}

const TransactionCards: React.FC<TransactionCardsProps> = ({ 
  transactions, 
  onCategorize,
  onAcceptAI,
  onRejectAI 
}) => {
  return (
    <div className="md:hidden shadow-sm border border-border rounded-lg overflow-hidden bg-card">
      {transactions.map((transaction, index) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onCategorize={onCategorize}
          onAcceptAI={onAcceptAI}
          onRejectAI={onRejectAI}
          isFirst={index === 0}
          isLast={index === transactions.length - 1}
        />
      ))}
    </div>
  );
};

export default TransactionCards;
