
import React from 'react';
import { Transaction } from '@/types/financial';
import TransactionItem from '@/components/TransactionItem';

interface TransactionCardsProps {
  transactions: Transaction[];
  onCategorize: (id: string, category: string) => void;
}

const TransactionCards: React.FC<TransactionCardsProps> = ({ transactions, onCategorize }) => {
  return (
    <div className="md:hidden shadow-sm border border-gray-200 rounded-lg overflow-hidden bg-white">
      {transactions.map((transaction, index) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onCategorize={onCategorize}
          isFirst={index === 0}
          isLast={index === transactions.length - 1}
        />
      ))}
    </div>
  );
};

export default TransactionCards;
