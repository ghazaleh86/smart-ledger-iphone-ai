
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
  onCategoryChange: (category: string) => void;
  aiSuggestedCategory?: string;
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
  'Other'
];

const CategorySelector = ({ currentCategory, onCategoryChange, aiSuggestedCategory }: CategorySelectorProps) => {
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      'Meals & Entertainment': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Bills & Utilities': 'bg-gray-100 text-gray-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Education': 'bg-green-100 text-green-800',
      'Travel': 'bg-indigo-100 text-indigo-800',
      'Home & Garden': 'bg-emerald-100 text-emerald-800',
      'Business': 'bg-slate-100 text-slate-800',
      'Other': 'bg-gray-100 text-gray-600',
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-600';
  };

  const allCategoriesToShow = React.useMemo(() => {
    const categoriesSet = new Set(categories);
    
    // Add AI suggested category if it exists and isn't already in the list
    if (aiSuggestedCategory && !categoriesSet.has(aiSuggestedCategory)) {
      return [aiSuggestedCategory, ...categories];
    }
    
    return categories;
  }, [aiSuggestedCategory]);

  return (
    <Select value={currentCategory || ''} onValueChange={onCategoryChange}>
      <SelectTrigger className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getCategoryColor(currentCategory)} hover:opacity-80 focus:ring-1 focus:ring-blue-500 w-auto`}>
        <SelectValue placeholder="Categorize" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        {allCategoriesToShow.map((category) => (
          <SelectItem key={category} value={category} className="cursor-pointer">
            <div className="flex items-center justify-between w-full">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                {category}
              </span>
              {category === aiSuggestedCategory && (
                <span className="ml-2 text-xs text-blue-600 flex items-center">
                  <div className="w-1 h-1 bg-blue-600 rounded-full mr-1"></div>
                  AI suggested
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
