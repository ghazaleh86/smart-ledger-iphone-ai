
import { useState, useEffect } from 'react';
import { Transaction } from '@/types/financial';
import { allTransactions } from '@/data/transactions';
import { useToast } from '@/hooks/use-toast';

export const useTransactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Initialize transactions with AI suggestions on the first 5
  useEffect(() => {
    const transactionsWithAI = allTransactions.map((transaction, index) => ({
      ...transaction,
      isAISuggested: index < 5
    }));
    setTransactions(transactionsWithAI);
  }, []);

  const handleCategorize = (id: string, category: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === id 
          ? { ...t, category, isAISuggested: false }
          : t
      )
    );
    
    toast({
      title: "Transaction categorized",
      description: `Categorized as ${category}`,
    });
  };

  const getFilteredTransactions = (selectedAccount: string) => {
    return selectedAccount === 'all' 
      ? transactions 
      : transactions.filter(t => t.accountId === selectedAccount);
  };

  return {
    transactions,
    handleCategorize,
    getFilteredTransactions,
  };
};
