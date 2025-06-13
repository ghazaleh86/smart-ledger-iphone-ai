
import React, { useState } from 'react';
import { Search, X, Bot, Sparkles } from 'lucide-react';

interface AIAssistantProps {
  onQuery: (query: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface AIResponse {
  answer: string;
  insights: string[];
  followUpQuestions: string[];
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

  // Mock AI responses for different queries
  const getAIResponse = (query: string): AIResponse => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('starbucks')) {
      return {
        answer: "I found 1 Starbucks transaction this month: **STARBUCKS QUEEN LOGAN** for $3.45 on Feb 27, 2024. This was paid using Cash and Bank from your checking account.",
        insights: [
          "💡 You spent 85% less on coffee this month compared to last month",
          "☕ This is your most frequent coffee shop location",
          "📊 Your average coffee spend is $4.12 per visit"
        ],
        followUpQuestions: [
          "Show me all coffee purchases this year",
          "Compare my coffee spending to last month",
          "Find all transactions at Queen Logan locations"
        ]
      };
    } else if (lowerQuery.includes('food') || lowerQuery.includes('meals')) {
      return {
        answer: "Last week you spent **$67.77** on food across 4 transactions: Subway ($12.65), Pizzaville ($24.65), Tim Hortons ($8.99), McDonald's ($14.78), and Harvey's ($19.87).",
        insights: [
          "🍕 Fast food represents 78% of your food spending",
          "📈 Food spending increased by 23% compared to previous week",
          "🥪 Lunch purchases are your most common meal expense"
        ],
        followUpQuestions: [
          "Show me grocery vs restaurant spending",
          "What's my monthly food budget trending?",
          "Find healthier food options in my area"
        ]
      };
    } else if (lowerQuery.includes('100') || lowerQuery.includes('over')) {
      return {
        answer: "I found **5 transactions over $100** recently: Home Hardware ($113.00), Metro Grocery ($134.67), Best Buy ($234.56), Costco ($187.65), and CC Visa Payment ($503.40).",
        insights: [
          "🏠 Home & business expenses make up 60% of large transactions",
          "💳 Your largest transaction was a credit card payment",
          "🛒 Bulk shopping at Costco saved you an estimated $23 vs smaller stores"
        ],
        followUpQuestions: [
          "Show me all business-related expenses",
          "What's my average large purchase amount?",
          "Find recurring large payments"
        ]
      };
    } else if (lowerQuery.includes('income') || lowerQuery.includes('march')) {
      return {
        answer: "In March 2024, you had **$1,850** in income from a business payment (PYMT CHQ 3023) deposited to your checking account on Feb 27th.",
        insights: [
          "💼 100% of your income this period was from business sources",
          "📅 This represents your typical monthly business income",
          "💰 Income was received 2 days earlier than usual"
        ],
        followUpQuestions: [
          "Show me income trends over the last 6 months",
          "Compare business vs other income sources",
          "When is my next expected payment?"
        ]
      };
    } else {
      return {
        answer: `I analyzed your request: "${query}". Based on your transaction history, I can help you understand spending patterns, categorize expenses, and track financial goals.`,
        insights: [
          "📊 Your account shows healthy spending diversity",
          "🎯 Most transactions are properly categorized",
          "💡 Consider setting up spending alerts for better tracking"
        ],
        followUpQuestions: [
          "Show me my spending by category",
          "What are my largest expense categories?",
          "Help me set a monthly budget"
        ]
      };
    }
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
      const response = getAIResponse(queryText);
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
                    I can help you categorize transactions, find spending patterns, and answer questions about your finances.
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

                {/* Insights */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Key Insights
                  </h4>
                  {currentResponse.insights.map((insight, index) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border/50">
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
