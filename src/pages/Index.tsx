
import React, { useState } from 'react';
import AIAssistant from '@/components/AIAssistant';
import SpendingInsights from '@/components/SpendingInsights';
import QuickActions from '@/components/QuickActions';
import AccountSelector from '@/components/AccountSelector';
import TransactionList from '@/components/TransactionList';
import { useToast } from '@/hooks/use-toast';
import { useTransactions } from '@/hooks/useTransactions';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { accounts } from '@/data/mockData';

const Index = () => {
  const { toast } = useToast();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('all');
  
  const { handleCategorize, getFilteredTransactions } = useTransactions();
  const filteredTransactions = getFilteredTransactions(selectedAccount);
  const { displayedItems, isLoading } = useInfiniteScroll(filteredTransactions.length);
  
  const visibleTransactions = filteredTransactions.slice(0, displayedItems);

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

  const currentBalance = selectedAccount === 'all' 
    ? accounts.find(acc => acc.id === 'all')?.balance || 0
    : accounts.find(acc => acc.id === selectedAccount)?.balance || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-4 px-8 shadow-sm border-b border-gray-200">
        <AccountSelector
          accounts={accounts}
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
        />
      </div>

      {/* Content */}
      <div className="px-8 py-10 space-y-10">
        <SpendingInsights />

        {/* Transactions List */}
        <div className="space-y-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <QuickActions 
              onAddTransaction={handleAddTransaction}
              onOpenAI={() => setIsAIOpen(true)}
            />
          </div>
          
          <TransactionList
            transactions={visibleTransactions}
            onCategorize={handleCategorize}
            isLoading={isLoading}
            hasMoreItems={displayedItems < filteredTransactions.length}
          />
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
