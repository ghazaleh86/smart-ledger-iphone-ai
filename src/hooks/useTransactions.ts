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
      // Make most transactions AI categorized (20 out of 27 total)
      if (index < 20) {
        // Distribute confidence levels more realistically
        const confidenceLevel = index < 6 ? 'high' : 
                               index < 14 ? 'medium' : 'low';
        
        const aiSuggestedCategory = getSmartCategory(transaction.merchant);
        
        // Auto-apply high confidence suggestions
        if (confidenceLevel === 'high') {
          return {
            ...transaction,
            category: aiSuggestedCategory,
            isAISuggested: false,
            aiSuggestedCategory,
            aiConfidence: confidenceLevel as 'high' | 'medium' | 'low',
            aiReasoning: getAIReasoning(transaction.merchant, confidenceLevel as 'high' | 'medium' | 'low'),
            aiStatus: 'accepted' as const
          };
        }
        
        // For medium and low confidence, show as suggestions
        const processedTransaction = {
          ...transaction,
          category: undefined, // Clear any existing category so AI suggestion shows
          isAISuggested: true,
          aiSuggestedCategory,
          aiConfidence: confidenceLevel as 'high' | 'medium' | 'low',
          aiReasoning: getAIReasoning(transaction.merchant, confidenceLevel as 'high' | 'medium' | 'low'),
          aiStatus: 'suggested' as const
        };
        
        // Debug logging for problematic transactions
        if (transaction.merchant.includes('METRO') || transaction.merchant.includes('TIM HORTONS') || transaction.merchant.includes('PETRO')) {
          console.log(`Processing ${transaction.merchant}:`, {
            aiSuggestedCategory,
            isAISuggested: true,
            confidence: confidenceLevel,
            originalCategory: transaction.category
          });
        }
        
        return processedTransaction;
      }
      
      // For remaining transactions (indices 20-26), also add AI suggestions
      const aiSuggestedCategory = getSmartCategory(transaction.merchant);
      const processedTransaction = {
        ...transaction,
        category: undefined, // Clear any existing category so AI suggestion shows
        isAISuggested: true,
        aiSuggestedCategory,
        aiConfidence: 'low' as 'high' | 'medium' | 'low',
        aiReasoning: getAIReasoning(transaction.merchant, 'low'),
        aiStatus: 'suggested' as const
      };
      
      // Debug logging for problematic transactions
      if (transaction.merchant.includes('METRO') || transaction.merchant.includes('TIM HORTONS') || transaction.merchant.includes('PETRO')) {
        console.log(`Processing ${transaction.merchant}:`, {
          aiSuggestedCategory,
          isAISuggested: true,
          confidence: 'low',
          originalCategory: transaction.category
        });
      }
      
      return processedTransaction;
    });
    
    setTransactions(transactionsWithAI);
    
    // Log all transactions for debugging
    console.log('All processed transactions:', transactionsWithAI.map(t => ({
      merchant: t.merchant,
      category: t.category,
      aiSuggestedCategory: t.aiSuggestedCategory,
      isAISuggested: t.isAISuggested,
      aiConfidence: t.aiConfidence
    })));
  }, []);

  const getSmartCategory = (merchant: string): string => {
    const merchantLower = merchant.toLowerCase();
    if (merchantLower.includes('grocery') || merchantLower.includes('metro') || merchantLower.includes('loblaws')) return 'Shopping';
    if (merchantLower.includes('gas') || merchantLower.includes('petro') || merchantLower.includes('esso') || merchantLower.includes('shell')) return 'Transportation';  
    if (merchantLower.includes('drug') || merchantLower.includes('pharmacy')) return 'Healthcare';
    if (merchantLower.includes('restaurant') || merchantLower.includes('coffee') || merchantLower.includes('starbucks') || merchantLower.includes('subway') || merchantLower.includes('pizza') || merchantLower.includes('mcdonalds') || merchantLower.includes('tim hortons') || merchantLower.includes('harvey')) return 'Meals & Entertainment';
    if (merchantLower.includes('adobe') || merchantLower.includes('software') || merchantLower.includes('best buy')) return 'Business';
    if (merchantLower.includes('home') || merchantLower.includes('depot') || merchantLower.includes('rona')) return 'Home & Garden';
    if (merchantLower.includes('dollarama') || merchantLower.includes('walmart') || merchantLower.includes('costco') || merchantLower.includes('lcbo') || merchantLower.includes('beer store')) return 'Shopping';
    if (merchantLower.includes('cineplex')) return 'Meals & Entertainment';
    if (merchantLower.includes('london drugs')) return 'Healthcare';
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
          ? { ...t, category, isAISuggested: false, aiStatus: 'manual' }
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
          ? { ...t, category: t.aiSuggestedCategory, isAISuggested: false, aiStatus: 'accepted' }
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
          ? { ...t, isAISuggested: false, aiSuggestedCategory: undefined, aiStatus: 'rejected' }
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
