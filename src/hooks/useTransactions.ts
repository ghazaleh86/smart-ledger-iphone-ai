
import { useState, useEffect } from 'react';
import { Transaction } from '@/types/financial';
import { allTransactions } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const useTransactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Initialize transactions with AI suggestions for first 5 on component mount
  useEffect(() => {
    const transactionsWithAI = allTransactions.map((transaction, index) => {
      if (index < 5) {
        return {
          ...transaction,
          isAISuggested: true,
          aiSuggestedCategory: transaction.category || 'Business'
        };
      }
      return transaction;
    });
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
    
    if (category === 'AI Suggested') {
      toast({
        title: "Reverted to AI suggestion",
        description: "Category reverted to AI suggested category",
      });
    } else {
      toast({
        title: "Transaction categorized",
        description: `Categorized as ${category}`,
      });
    }
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
