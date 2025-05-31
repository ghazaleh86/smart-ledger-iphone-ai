
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

const CategorySelector = ({ currentCategory, onCategoryChange }: CategorySelectorProps) => {
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      'Meals & Entertainment': 'bg-orange-50 text-orange-700 border-orange-200',
      'Transportation': 'bg-blue-50 text-blue-700 border-blue-200',
      'Shopping': 'bg-purple-50 text-purple-700 border-purple-200',
      'Bills & Utilities': 'bg-gray-50 text-gray-700 border-gray-200',
      'Healthcare': 'bg-red-50 text-red-700 border-red-200',
      'Education': 'bg-green-50 text-green-700 border-green-200',
      'Travel': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Home & Garden': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Business': 'bg-slate-50 text-slate-700 border-slate-200',
      'Other': 'bg-gray-50 text-gray-600 border-gray-200',
    };
    return colors[category || ''] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <Select value={currentCategory || ''} onValueChange={onCategoryChange}>
      <SelectTrigger className={`px-3 py-1.5 rounded-md text-sm font-medium border ${getCategoryColor(currentCategory)} hover:opacity-80 focus:ring-1 focus:ring-blue-500 w-[120px] min-w-[120px] flex-shrink-0`}>
        <SelectValue placeholder="Categorize" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        {categories.map((category) => (
          <SelectItem key={category} value={category} className="cursor-pointer rounded-md mx-1 my-0.5 hover:bg-gray-50 focus:bg-gray-50">
            <span className={`px-3 py-1.5 rounded-md text-sm font-medium ${getCategoryColor(category)}`}>
              {category}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
