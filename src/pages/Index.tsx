
import React, { useState } from 'react';
import AIAssistant from '@/components/AIAssistant';
import QuickActions from '@/components/QuickActions';
import AccountSelector from '@/components/AccountSelector';
import TransactionList from '@/components/TransactionList';
import AISuggestionManager from '@/components/AISuggestionManager';
import { useToast } from '@/hooks/use-toast';
import { useTransactions } from '@/hooks/useTransactions';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { accounts } from '@/data/accounts';

const Index = () => {
  const { toast } = useToast();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('all');
  
  const { 
    handleCategorize, 
    getFilteredTransactions, 
    getSuggestionStats,
    handleAcceptAllHighConfidence,
    handleRejectAllSuggestions
  } = useTransactions();
  
  const filteredTransactions = getFilteredTransactions(selectedAccount);
  const { displayedItems, isLoading } = useInfiniteScroll(filteredTransactions.length);
  const { totalSuggestions, highConfidenceSuggestions } = getSuggestionStats();
  
  const visibleTransactions = filteredTransactions.slice(0, displayedItems);

  const handleAIQuery = (query: string) => {
    console.log('AI Query processed:', query);
    // The AI assistant now handles its own responses internally
  };

  const handleAddTransaction = () => {
    toast({
      title: "Add Transaction",
      description: "Transaction form would open here",
    });
  };

  const handleReviewMode = () => {
    toast({
      title: "Review Mode",
      description: "Review mode would allow you to go through each suggestion individually",
    });
  };

  const currentBalance = selectedAccount === 'all' 
    ? accounts.find(acc => acc.id === 'all')?.balance || 0
    : accounts.find(acc => acc.id === selectedAccount)?.balance || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card py-4 px-8 shadow-sm border-b border-border">
        <AccountSelector
          accounts={accounts}
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
        />
      </div>

      {/* Content */}
      <div className="px-8 py-10 space-y-10">
        {/* AI Suggestion Manager */}
        <AISuggestionManager
          totalSuggestions={totalSuggestions}
          highConfidenceSuggestions={highConfidenceSuggestions}
          onAcceptAll={handleAcceptAllHighConfidence}
          onRejectAll={handleRejectAllSuggestions}
          onReviewMode={handleReviewMode}
        />

        {/* Transactions List */}
        <div className="space-y-0">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
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
