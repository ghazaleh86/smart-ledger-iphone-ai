
import { useState, useEffect } from 'react';
import { Transaction } from '@/types/financial';
import { allTransactions } from '@/data/transactions';
import { useToast } from '@/hooks/use-toast';

export const useTransactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Initialize transactions with enhanced AI suggestions
  useEffect(() => {
    const transactionsWithAI = allTransactions.map((transaction, index) => {
      if (index < 5) {
        // Add enhanced AI suggestion data
        const confidence = index < 2 ? 'high' : index < 4 ? 'medium' : 'low';
        const reasoning = generateReasoning(transaction.merchant, transaction.category);
        
        return {
          ...transaction,
          isAISuggested: true,
          aiSuggestedCategory: transaction.category,
          aiConfidence: confidence,
          aiReasoning: reasoning
        };
      }
      return transaction;
    });
    setTransactions(transactionsWithAI);
  }, []);

  const generateReasoning = (merchant: string, category?: string): string => {
    const reasons = {
      'Meals & Entertainment': `"${merchant}" appears to be a food/restaurant establishment based on the merchant name.`,
      'Transportation': `"${merchant}" is recognized as a transportation service provider.`,
      'Shopping': `"${merchant}" is identified as a retail merchant.`,
      'Business': `"${merchant}" appears to be a business-related expense based on merchant patterns.`,
      'Healthcare': `"${merchant}" is recognized as a healthcare provider.`,
    };
    
    return reasons[category as keyof typeof reasons] || `Categorized based on merchant name analysis and spending patterns.`;
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

  const handleAcceptAllHighConfidence = () => {
    const highConfidenceTransactions = transactions.filter(t => 
      t.isAISuggested && t.aiConfidence === 'high'
    );
    
    setTransactions(prev => 
      prev.map(t => 
        t.isAISuggested && t.aiConfidence === 'high' && t.aiSuggestedCategory
          ? { ...t, category: t.aiSuggestedCategory, isAISuggested: false }
          : t
      )
    );
    
    toast({
      title: `Accepted ${highConfidenceTransactions.length} suggestions`,
      description: "High confidence AI suggestions have been applied",
    });
  };

  const handleRejectAllSuggestions = () => {
    const suggestedCount = transactions.filter(t => t.isAISuggested).length;
    
    setTransactions(prev => 
      prev.map(t => 
        t.isAISuggested
          ? { ...t, isAISuggested: false, aiSuggestedCategory: undefined }
          : t
      )
    );
    
    toast({
      title: `Rejected ${suggestedCount} suggestions`,
      description: "All AI suggestions have been dismissed",
    });
  };

  const getFilteredTransactions = (selectedAccount: string) => {
    return selectedAccount === 'all' 
      ? transactions 
      : transactions.filter(t => t.accountId === selectedAccount);
  };

  const getSuggestionStats = () => {
    const totalSuggestions = transactions.filter(t => t.isAISuggested).length;
    const highConfidenceSuggestions = transactions.filter(t => 
      t.isAISuggested && t.aiConfidence === 'high'
    ).length;
    
    return { totalSuggestions, highConfidenceSuggestions };
  };

  return {
    transactions,
    handleCategorize,
    getFilteredTransactions,
    getSuggestionStats,
    handleAcceptAllHighConfidence,
    handleRejectAllSuggestions,
  };
};
