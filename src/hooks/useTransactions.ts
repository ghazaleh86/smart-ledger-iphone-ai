
import { useState, useEffect } from 'react';
import { Transaction } from '@/types/financial';
import { allTransactions } from '@/data/transactions';
import { useToast } from '@/hooks/use-toast';

export const useTransactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Initialize transactions with AI suggestions and confidence levels
  useEffect(() => {
    const transactionsWithAI = allTransactions.map((transaction, index) => {
      if (index < 5) {
        // Assign different confidence levels for variety
        const confidenceLevel = index === 0 || index === 1 ? 'high' : 
                               index === 2 || index === 3 ? 'medium' : 'low';
        
        return {
          ...transaction,
          isAISuggested: true,
          aiSuggestedCategory: transaction.category || getSmartCategory(transaction.merchant),
          aiConfidence: confidenceLevel as 'high' | 'medium' | 'low',
          aiReasoning: getAIReasoning(transaction.merchant, confidenceLevel as 'high' | 'medium' | 'low')
        };
      }
      return transaction;
    });
    setTransactions(transactionsWithAI);
  }, []);

  const getSmartCategory = (merchant: string): string => {
    const merchantLower = merchant.toLowerCase();
    if (merchantLower.includes('grocery') || merchantLower.includes('metro')) return 'Shopping';
    if (merchantLower.includes('gas') || merchantLower.includes('petro')) return 'Transportation';  
    if (merchantLower.includes('drug') || merchantLower.includes('pharmacy')) return 'Healthcare';
    if (merchantLower.includes('restaurant') || merchantLower.includes('coffee')) return 'Meals & Entertainment';
    return 'Shopping';
  };

  const getAIReasoning = (merchant: string, confidence: 'high' | 'medium' | 'low'): string => {
    switch (confidence) {
      case 'high':
        return `Strong pattern match: "${merchant}" clearly indicates this category based on 10,000+ similar transactions`;
      case 'medium':
        return `Merchant "${merchant}" suggests this category, but manual verification recommended`;
      case 'low':
        return `Uncertain match for "${merchant}" - similar merchants show mixed categories`;
      default:
        return 'AI analysis completed';
    }
  };

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

  const handleAcceptAISuggestion = (id: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === id && t.aiSuggestedCategory
          ? { ...t, category: t.aiSuggestedCategory, isAISuggested: false }
          : t
      )
    );
    
    const transaction = transactions.find(t => t.id === id);
    toast({
      title: "AI suggestion accepted",
      description: `Categorized as ${transaction?.aiSuggestedCategory}`,
    });
  };

  const handleRejectAISuggestion = (id: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === id 
          ? { ...t, isAISuggested: false, aiSuggestedCategory: undefined }
          : t
      )
    );
    
    toast({
      title: "AI suggestion rejected",
      description: "You can manually categorize this transaction",
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
    handleAcceptAISuggestion,
    handleRejectAISuggestion,
    getFilteredTransactions,
  };
};
