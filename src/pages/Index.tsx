
import React, { useState } from 'react';
import TransactionItem from '@/components/TransactionItem';
import AIAssistant from '@/components/AIAssistant';
import SpendingInsights from '@/components/SpendingInsights';
import QuickActions from '@/components/QuickActions';
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
}

const Index = () => {
  const { toast } = useToast();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-03-03',
      merchant: 'HOME HARDWARE #10334',
      amount: 113.00,
      type: 'expense',
      paymentMethod: 'RBC VISA',
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
    },
    {
      id: '4',
      date: '2024-03-01',
      merchant: 'CC VISA PAYMENT',
      amount: 503.40,
      type: 'expense',
      paymentMethod: 'Savings',
    },
    {
      id: '5',
      date: '2024-02-29',
      merchant: 'PIZZAVILLE HIGH PARK',
      amount: 24.65,
      category: 'Meals & Entertainment',
      type: 'expense',
      paymentMethod: 'Cash and Bank',
    },
    {
      id: '6',
      date: '2024-02-27',
      merchant: 'PYMT CHQ 3023',
      amount: 1850.00,
      type: 'income',
      paymentMethod: 'Cash and Bank',
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
    },
  ]);

  const handleCategorize = (id: string, category: string) => {
    setTransactions(prev => 
      prev.map(t => 
        t.id === id 
          ? { ...t, category, isAISuggested: true }
          : t
      )
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

  const currentBalance = transactions.reduce((sum, t) => {
    return sum + (t.type === 'income' ? t.amount : -t.amount);
  }, 5675.86);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-12 pb-6 px-6 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">All Accounts</h1>
          <div className="text-sm text-gray-500 mb-1">NET BALANCE</div>
          <div className="text-3xl font-bold text-gray-900">
            ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
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
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onCategorize={handleCategorize}
            />
          ))}
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
