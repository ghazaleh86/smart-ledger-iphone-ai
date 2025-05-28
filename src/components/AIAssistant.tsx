
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface AIAssistantProps {
  onQuery: (query: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant = ({ onQuery, isOpen, onClose }: AIAssistantProps) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const suggestions = [
    "Show me all Starbucks purchases this month",
    "How much did I spend on food last week?",
    "Find transactions over $100",
    "Show all income from March",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onQuery(query);
      setQuery('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onQuery(suggestion);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-hidden animate-slide-in-right">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about your transactions..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </form>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Try asking:</h3>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-700">{suggestion}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700">
              💡 I can help you categorize transactions, find spending patterns, and answer questions about your finances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
