import React, { useState, useEffect, useCallback } from 'react';
import TransactionItem from '@/components/TransactionItem';
import AIAssistant from '@/components/AIAssistant';
import SpendingInsights from '@/components/SpendingInsights';
import QuickActions from '@/components/QuickActions';
import AccountSelector from '@/components/AccountSelector';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category?: string;
  type: 'income' | 'expense';
  paymentMethod: string;
  isAISuggested?: boolean;
  accountId: string;
  aiSuggestedCategory?: string;
}

interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
}

const Index = () => {
  const { toast } = useToast();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [displayedTransactions, setDisplayedTransactions] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const accounts: Account[] = [
    { id: 'all', name: 'All Accounts', balance: 5675.86, type: 'Combined' },
    { id: 'checking', name: 'Checking Account', balance: 3210.45, type: 'TD Canada Trust' },
    { id: 'savings', name: 'Savings Account', balance: 2465.41, type: 'TD Canada Trust' },
    { id: 'credit', name: 'RBC VISA', balance: -1250.00, type: 'Credit Card' },
  ];

  const allTransactions: Transaction[] = [
    {
      id: '1',
      date: '2024-03-03',
      merchant: 'HOME HARDWARE #10334',
      amount: 113.00,
      type: 'expense',
      paymentMethod: 'RBC VISA',
      accountId: 'credit',
      aiSuggestedCategory: 'Home & Garden',
    },
    {
      id: '2',
      date: '2024-03-02',
      merchant: 'CANADIAN TIRE 2487',
      amount: 89.97,
      category: 'Transportation',
      type: 'expense',
      paymentMethod: 'Cash and Bank',
      isAISuggested: true,
      accountId: 'checking',
      aiSuggestedCategory: 'Transportation',
    },
    {
      id: '3',
      date: '2024-03-02',
      merchant: 'SUBWAY #23012',
      amount: 12.65,
      category: 'Meals & Entertainment',
      type: 'expense',
      paymentMethod: 'Savings',
      isAISuggested: true,
      accountId: 'savings',
      aiSuggestedCategory: 'Meals & Entertainment',
    },
    {
      id: '4',
      date: '2024-03-01',
      merchant: 'CC VISA PAYMENT',
      amount: 503.40,
      type: 'expense',
      paymentMethod: 'Savings',
      accountId: 'savings',
    },
    {
      id: '5',
      date: '2024-02-29',
      merchant: 'PIZZAVILLE HIGH PARK',
      amount: 24.65,
      category: 'Meals & Entertainment',
      type: 'expense',
      paymentMethod: 'Cash and Bank',
      accountId: 'checking',
    },
    {
      id: '6',
      date: '2024-02-27',
      merchant: 'PYMT CHQ 3023',
      amount: 1850.00,
      type: 'income',
      paymentMethod: 'Cash and Bank',
      accountId: 'checking',
    },
    {
      id: '7',
      date: '2024-02-27',
      merchant: 'STARBUCKS QUEEN LOGAN',
      amount: 3.45,
      category: 'Meals & Entertainment',
      type: 'expense',
      paymentMethod: 'Cash and Bank',
      isAISuggested: true,
      accountId: 'checking',
    },
    // Additional dummy transactions for infinite scroll testing
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `extra-${i + 8}`,
      date: '2024-02-25',
      merchant: `MERCHANT ${i + 8}`,
      amount: Math.round(Math.random() * 100 + 10),
      type: 'expense' as const,
      paymentMethod: 'Cash and Bank',
      accountId: 'checking',
    })),
  ];

  const [transactions, setTransactions] = useState<Transaction[]>(allTransactions);

  const filteredTransactions = selectedAccount === 'all' 
    ? transactions 
    : transactions.filter(t => t.accountId === selectedAccount);

  const visibleTransactions = filteredTransactions.slice(0, displayedTransactions);

  const handleCategorize = (id: string, category: string) => {
    setTransactions(prev => 
      prev.map(t => {
        if (t.id === id) {
          // If user selects the AI suggested category, keep the AI suggested flag
          // If user selects a different category, remove the AI suggested flag
          const isSelectingAISuggested = category === t.aiSuggestedCategory;
          return { 
            ...t, 
            category, 
            isAISuggested: isSelectingAISuggested 
          };
        }
        return t;
      })
    );
    
    toast({
      title: "Transaction categorized",
      description: `Categorized as ${category}`,
    });
  };

  const handleAIQuery = (query: string) => {
    console.log('AI Query:', query);
    toast({
      title: "AI Assistant",
      description: `Processing: "${query}"`,
    });
    setIsAIOpen(false);
  };

  const handleAddTransaction = () => {
    toast({
      title: "Add Transaction",
      description: "Transaction form would open here",
    });
  };

  const loadMoreTransactions = useCallback(async () => {
    if (isLoading || displayedTransactions >= filteredTransactions.length) return;
    
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedTransactions(prev => Math.min(prev + 10, filteredTransactions.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading, displayedTransactions, filteredTransactions.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMoreTransactions();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreTransactions]);

  const currentBalance = selectedAccount === 'all' 
    ? accounts.find(acc => acc.id === 'all')?.balance || 0
    : accounts.find(acc => acc.id === selectedAccount)?.balance || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-12 pb-6 px-6 shadow-sm">
        <AccountSelector
          accounts={accounts}
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
        />
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <SpendingInsights />
        
        <QuickActions 
          onAddTransaction={handleAddTransaction}
          onOpenAI={() => setIsAIOpen(true)}
        />

        {/* Transactions List */}
        <div className="space-y-0">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="shadow-sm border border-gray-100 rounded-xl overflow-hidden">
            {visibleTransactions.map((transaction, index) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onCategorize={handleCategorize}
                isFirst={index === 0}
                isLast={index === visibleTransactions.length - 1}
              />
            ))}
          </div>
          
          {isLoading && (
            <div className="text-center py-4">
              <div className="text-sm text-gray-500">Loading more transactions...</div>
            </div>
          )}
          
          {displayedTransactions >= filteredTransactions.length && filteredTransactions.length > 0 && (
            <div className="text-center py-4">
              <div className="text-sm text-gray-500">All transactions loaded</div>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onQuery={handleAIQuery}
      />
    </div>
  );
};

export default Index;
