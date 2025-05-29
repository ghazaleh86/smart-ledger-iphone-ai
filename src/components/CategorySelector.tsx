
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
      'Meals & Entertainment': 'bg-orange-100 text-orange-700',
      'Transportation': 'bg-blue-100 text-blue-700',
      'Shopping': 'bg-purple-100 text-purple-700',
      'Bills & Utilities': 'bg-gray-100 text-gray-700',
      'Healthcare': 'bg-red-100 text-red-700',
      'Education': 'bg-green-100 text-green-700',
      'Travel': 'bg-indigo-100 text-indigo-700',
      'Home & Garden': 'bg-emerald-100 text-emerald-700',
      'Business': 'bg-slate-100 text-slate-700',
      'Other': 'bg-gray-100 text-gray-600',
    };
    return colors[category || ''] || 'bg-gray-100 text-gray-600';
  };

  return (
    <Select value={currentCategory || ''} onValueChange={onCategoryChange}>
      <SelectTrigger className={`px-3 py-1.5 rounded-full text-sm font-normal border-0 ${getCategoryColor(currentCategory)} hover:opacity-80 focus:ring-1 focus:ring-gray-300 w-auto font-[system-ui]`}>
        <SelectValue placeholder="Categorize" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 rounded-2xl shadow-xl z-50">
        {categories.map((category) => (
          <SelectItem key={category} value={category} className="cursor-pointer rounded-xl mx-2 my-1 hover:bg-gray-50 focus:bg-gray-50">
            <span className={`px-3 py-1.5 rounded-full text-sm font-normal ${getCategoryColor(category)}`}>
              {category}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
