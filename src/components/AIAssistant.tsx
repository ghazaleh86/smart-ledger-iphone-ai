
import React, { useState } from 'react';
import { Search, X, Bot, Sparkles } from 'lucide-react';
import { Transaction } from '@/types/financial';
import { allTransactions } from '@/data/transactions';

interface AIAssistantProps {
  onQuery: (query: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface AIResponse {
  answer: string;
  insights: string[];
  followUpQuestions: string[];
  matchedTransactions?: Transaction[];
}

const AIAssistant = ({ onQuery, isOpen, onClose }: AIAssistantProps) => {
  const [query, setQuery] = useState('');
  const [currentResponse, setCurrentResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    "Show me all Starbucks purchases this month",
    "How much did I spend on food last week?",
    "Find transactions over $100",
    "Show all income from March",
  ];

  // Actual AI agent that analyzes real transaction data
  const analyzeTransactions = (query: string): AIResponse => {
    const lowerQuery = query.toLowerCase();
    const transactions = allTransactions;
    
    // Search for specific merchants
    if (lowerQuery.includes('starbucks')) {
      const starbucksTransactions = transactions.filter(t => 
        t.merchant.toLowerCase().includes('starbucks')
      );
      const totalSpent = starbucksTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        answer: `I found ${starbucksTransactions.length} Starbucks transaction${starbucksTransactions.length !== 1 ? 's' : ''} totaling **$${totalSpent.toFixed(2)}**. ${starbucksTransactions.map(t => `**${t.merchant}** for $${t.amount.toFixed(2)} on ${new Date(t.date).toLocaleDateString()}`).join(', ')}.`,
        insights: [
          `☕ Average spend per visit: $${(totalSpent / starbucksTransactions.length).toFixed(2)}`,
          `📅 Most recent visit: ${new Date(Math.max(...starbucksTransactions.map(t => new Date(t.date).getTime()))).toLocaleDateString()}`,
          `💰 This represents ${((totalSpent / transactions.reduce((sum, t) => t.type === 'expense' ? sum + t.amount : sum, 0)) * 100).toFixed(1)}% of your total expenses`
        ],
        followUpQuestions: [
          "Show me all coffee-related purchases",
          "Compare my coffee spending to food spending",
          "Find my most expensive coffee purchase"
        ],
        matchedTransactions: starbucksTransactions
      };
    }
    
    // Search for food/meal transactions
    if (lowerQuery.includes('food') || lowerQuery.includes('meal') || lowerQuery.includes('restaurant')) {
      const foodTransactions = transactions.filter(t => 
        t.category?.toLowerCase().includes('meal') || 
        t.category?.toLowerCase().includes('food') ||
        ['subway', 'pizzaville', 'tim hortons', 'mcdonalds', 'harvey', 'pizza'].some(keyword => 
          t.merchant.toLowerCase().includes(keyword)
        )
      );
      const totalSpent = foodTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        answer: `I found ${foodTransactions.length} food-related transactions totaling **$${totalSpent.toFixed(2)}**. Recent purchases include: ${foodTransactions.slice(0, 3).map(t => `${t.merchant} ($${t.amount.toFixed(2)})`).join(', ')}.`,
        insights: [
          `🍽️ Average meal cost: $${(totalSpent / foodTransactions.length).toFixed(2)}`,
          `📊 Food represents ${((totalSpent / transactions.reduce((sum, t) => t.type === 'expense' ? sum + t.amount : sum, 0)) * 100).toFixed(1)}% of your expenses`,
          `🥪 Most expensive meal: $${Math.max(...foodTransactions.map(t => t.amount)).toFixed(2)}`
        ],
        followUpQuestions: [
          "Show me my most expensive restaurants",
          "Compare fast food vs sit-down restaurants",
          "What's my weekly food budget trending?"
        ],
        matchedTransactions: foodTransactions
      };
    }
    
    // Search for transactions over a certain amount
    if (lowerQuery.includes('over') || lowerQuery.includes('above') || lowerQuery.includes('>')) {
      const amountMatch = lowerQuery.match(/(\d+)/);
      const threshold = amountMatch ? parseInt(amountMatch[1]) : 100;
      
      const largeTransactions = transactions.filter(t => t.amount > threshold);
      const totalAmount = largeTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        answer: `I found ${largeTransactions.length} transactions over $${threshold} totaling **$${totalAmount.toFixed(2)}**. Largest transactions: ${largeTransactions.slice(0, 3).map(t => `${t.merchant} ($${t.amount.toFixed(2)})`).join(', ')}.`,
        insights: [
          `💰 Largest single transaction: $${Math.max(...largeTransactions.map(t => t.amount)).toFixed(2)}`,
          `📈 Large transactions represent ${((totalAmount / transactions.reduce((sum, t) => sum + t.amount, 0)) * 100).toFixed(1)}% of total spending`,
          `🏪 Most common large expense category: ${largeTransactions.reduce((acc, t) => { acc[t.category || 'Other'] = (acc[t.category || 'Other'] || 0) + 1; return acc; }, {} as Record<string, number>)}`
        ],
        followUpQuestions: [
          "Show me all business expenses",
          "Find recurring large payments",
          "What's my average large purchase amount?"
        ],
        matchedTransactions: largeTransactions
      };
    }
    
    // Search for income transactions
    if (lowerQuery.includes('income') || lowerQuery.includes('payment') || lowerQuery.includes('deposit')) {
      const incomeTransactions = transactions.filter(t => t.type === 'income');
      const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        answer: `I found ${incomeTransactions.length} income transaction${incomeTransactions.length !== 1 ? 's' : ''} totaling **$${totalIncome.toFixed(2)}**. ${incomeTransactions.map(t => `${t.merchant} for $${t.amount.toFixed(2)} on ${new Date(t.date).toLocaleDateString()}`).join(', ')}.`,
        insights: [
          `💼 Total income this period: $${totalIncome.toFixed(2)}`,
          `📅 Most recent income: ${new Date(Math.max(...incomeTransactions.map(t => new Date(t.date).getTime()))).toLocaleDateString()}`,
          `📊 Income vs expenses ratio: ${(totalIncome / transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}:1`
        ],
        followUpQuestions: [
          "Show me income trends over time",
          "Compare business vs other income",
          "When is my next expected payment?"
        ],
        matchedTransactions: incomeTransactions
      };
    }
    
    // Search by category
    const categories = ['transportation', 'shopping', 'healthcare', 'business', 'home', 'garden'];
    const matchedCategory = categories.find(cat => lowerQuery.includes(cat));
    
    if (matchedCategory) {
      const categoryTransactions = transactions.filter(t => 
        t.category?.toLowerCase().includes(matchedCategory)
      );
      const totalSpent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        answer: `I found ${categoryTransactions.length} ${matchedCategory} transactions totaling **$${totalSpent.toFixed(2)}**. Recent purchases: ${categoryTransactions.slice(0, 3).map(t => `${t.merchant} ($${t.amount.toFixed(2)})`).join(', ')}.`,
        insights: [
          `💰 Average ${matchedCategory} expense: $${(totalSpent / categoryTransactions.length).toFixed(2)}`,
          `📊 ${matchedCategory} represents ${((totalSpent / transactions.reduce((sum, t) => t.type === 'expense' ? sum + t.amount : sum, 0)) * 100).toFixed(1)}% of your expenses`,
          `📈 Largest ${matchedCategory} expense: $${Math.max(...categoryTransactions.map(t => t.amount)).toFixed(2)}`
        ],
        followUpQuestions: [
          `Show me ${matchedCategory} spending trends`,
          `Find my most expensive ${matchedCategory} purchases`,
          `Compare ${matchedCategory} to other categories`
        ],
        matchedTransactions: categoryTransactions
      };
    }
    
    // Search by merchant name
    const merchantKeywords = query.split(' ').filter(word => word.length > 2);
    const merchantTransactions = transactions.filter(t => 
      merchantKeywords.some(keyword => 
        t.merchant.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    if (merchantTransactions.length > 0) {
      const totalSpent = merchantTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        answer: `I found ${merchantTransactions.length} transaction${merchantTransactions.length !== 1 ? 's' : ''} matching your search totaling **$${totalSpent.toFixed(2)}**. ${merchantTransactions.slice(0, 3).map(t => `${t.merchant} ($${t.amount.toFixed(2)}) on ${new Date(t.date).toLocaleDateString()}`).join(', ')}.`,
        insights: [
          `💰 Average transaction amount: $${(totalSpent / merchantTransactions.length).toFixed(2)}`,
          `📅 Date range: ${new Date(Math.min(...merchantTransactions.map(t => new Date(t.date).getTime()))).toLocaleDateString()} to ${new Date(Math.max(...merchantTransactions.map(t => new Date(t.date).getTime()))).toLocaleDateString()}`,
          `🏪 Payment methods used: ${[...new Set(merchantTransactions.map(t => t.paymentMethod))].join(', ')}`
        ],
        followUpQuestions: [
          "Show me similar merchants",
          "Find transactions in the same category",
          "Compare spending at this merchant over time"
        ],
        matchedTransactions: merchantTransactions
      };
    }
    
    // Default response with general insights
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const categoryBreakdown = transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        acc[t.category || 'Other'] = (acc[t.category || 'Other'] || 0) + t.amount;
      }
      return acc;
    }, {} as Record<string, number>);
    
    const topCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0];
    
    return {
      answer: `I analyzed your transaction history and found ${transactions.length} total transactions. Your total expenses are **$${totalExpenses.toFixed(2)}** and total income is **$${totalIncome.toFixed(2)}**.`,
      insights: [
        `📊 Net position: ${totalIncome > totalExpenses ? '+' : ''}$${(totalIncome - totalExpenses).toFixed(2)}`,
        `💰 Top spending category: ${topCategory[0]} ($${topCategory[1].toFixed(2)})`,
        `📱 Most used payment method: ${transactions.reduce((acc, t) => { acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + 1; return acc; }, {} as Record<string, number>)}`
      ],
      followUpQuestions: [
        "Show me spending by category",
        "Find my largest expenses this month",
        "What's my average daily spending?"
      ]
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleQuery(query);
    }
  };

  const handleQuery = (queryText: string) => {
    setIsLoading(true);
    setQuery('');
    
    // Simulate AI processing time
    setTimeout(() => {
      const response = analyzeTransactions(queryText);
      setCurrentResponse(response);
      setIsLoading(false);
      onQuery(queryText);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleQuery(suggestion);
  };

  const handleFollowUpClick = (question: string) => {
    handleQuery(question);
  };

  const handleBack = () => {
    setCurrentResponse(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
      <div className="bg-background rounded-t-3xl md:rounded-3xl w-full md:w-[600px] max-h-[85vh] overflow-hidden animate-slide-in-right border border-border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {currentResponse && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground rotate-45" />
                </button>
              )}
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {!currentResponse && !isLoading && (
            <>
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about your transactions..."
                    className="w-full pl-12 pr-4 py-4 bg-muted/50 rounded-2xl border border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </form>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Try asking:</h3>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors border border-border/50"
                  >
                    <span className="text-sm text-foreground">{suggestion}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border border-blue-200/50 dark:border-blue-800/30 rounded-xl">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    I can analyze your actual transaction data, find spending patterns, and answer specific questions about your finances.
                  </p>
                </div>
              </div>
            </>
          )}

          {isLoading && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Analyzing your transactions...</div>
            </div>
          )}

          {currentResponse && !isLoading && (
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {/* AI Response */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 prose prose-sm max-w-none">
                    <p className="text-foreground text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: currentResponse.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                </div>

                {/* Show matched transactions if available */}
                {currentResponse.matchedTransactions && currentResponse.matchedTransactions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Matching Transactions:</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {currentResponse.matchedTransactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="p-2 bg-muted/20 rounded border border-border/30 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{transaction.merchant}</span>
                            <span className="text-foreground">${transaction.amount.toFixed(2)}</span>
                          </div>
                          <div className="text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                          </div>
                        </div>
                      ))}
                      {currentResponse.matchedTransactions.length > 5 && (
                        <div className="text-xs text-muted-foreground text-center py-1">
                          +{currentResponse.matchedTransactions.length - 5} more transactions
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Insights */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Key Insights
                  </h4>
                  {currentResponse.insights.map((insight, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-lg border border-blue-200/30 dark:border-blue-800/20">
                      <p className="text-sm text-foreground">{insight}</p>
                    </div>
                  ))}
                </div>

                {/* Follow-up Questions */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Ask me more:</h4>
                  {currentResponse.followUpQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleFollowUpClick(question)}
                      className="w-full text-left p-3 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors border border-primary/20"
                    >
                      <span className="text-sm text-foreground">{question}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
