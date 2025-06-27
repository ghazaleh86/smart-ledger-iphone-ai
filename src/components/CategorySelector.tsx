import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategorySelectorProps {
  currentCategory?: string;
  aiSuggestedCategory?: string;
  isAISuggested?: boolean;
  onCategoryChange: (category: string) => void;
}

const categories = [
  'Meals & Entertainment',
  'Transportation',
  'Shopping',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Home & Garden',
  'Business',
  'Business Income',
  'Payment to Credit Card',
  'Other'
];

const CategorySelector = ({ currentCategory, aiSuggestedCategory, isAISuggested, onCategoryChange }: CategorySelectorProps) => {
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      'Meals & Entertainment': 'bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-800',
      'Transportation': 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-800',
      'Shopping': 'bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-800',
      'Bills & Utilities': 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700',
      'Healthcare': 'bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800',
      'Education': 'bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800',
      'Travel': 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800',
      'Home & Garden': 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
      'Business': 'bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
      'Business Income': 'bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-200 border-green-300 dark:border-green-800',
      'Payment to Credit Card': 'bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-800',
      'Other': 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700',
    };
    return colors[category || ''] || 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700';
  };

  // Determine what to display - prioritize currentCategory, then aiSuggestedCategory if AI suggested
  const displayCategory = currentCategory || (isAISuggested ? aiSuggestedCategory : undefined);
  const categoryToStyle = displayCategory;
  
  // Add AI suggestion styling if this is an AI suggested category that hasn't been manually set
  const getAISuggestedStyles = () => {
    if (isAISuggested && !currentCategory && aiSuggestedCategory) {
      return 'ring-2 ring-blue-400 dark:ring-blue-500 ring-opacity-50';
    }
    return '';
  };

  return (
    <Select value={currentCategory || ''} onValueChange={onCategoryChange}>
      <SelectTrigger className={`px-3 py-1.5 rounded-md text-sm font-medium border ${getCategoryColor(categoryToStyle)} ${getAISuggestedStyles()} hover:opacity-80 focus:ring-1 focus:ring-ring w-[140px] min-w-[140px] flex-shrink-0 !justify-start [&>span]:text-left [&>span]:w-full [&>span]:justify-start`}>
        <SelectValue placeholder="Categorize">
          {displayCategory ? (
            <span className="flex items-center">
              {displayCategory}
              {isAISuggested && !currentCategory && (
                <span className="ml-1 text-blue-600 dark:text-blue-400 text-xs">✨</span>
              )}
            </span>
          ) : (
            "Categorize"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-popover border border-border rounded-lg shadow-lg z-50">
        {categories.map((category) => (
          <SelectItem key={category} value={category} className="cursor-pointer rounded-md mx-1 my-0.5 hover:bg-accent focus:bg-accent">
            <span className={`px-3 py-1.5 rounded-md text-sm font-medium ${getCategoryColor(category)}`}>
              {category}
              {aiSuggestedCategory === category && (
                <span className="text-blue-600 dark:text-blue-400 font-normal"> (AI suggested)</span>
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
