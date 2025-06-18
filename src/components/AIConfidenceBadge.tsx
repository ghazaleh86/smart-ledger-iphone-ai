
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AIConfidenceBadgeProps {
  confidence: 'high' | 'medium' | 'low';
  className?: string;
}

const AIConfidenceBadge: React.FC<AIConfidenceBadgeProps> = ({ confidence, className }) => {
  const getConfidenceStyles = () => {
    switch (confidence) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-800';
    }
  };

  const getConfidenceText = () => {
    switch (confidence) {
      case 'high':
        return 'High confidence';
      case 'medium':
        return 'Medium confidence';
      case 'low':
        return 'Low confidence';
      default:
        return 'Unknown';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'text-xs font-medium px-2 py-0.5',
        getConfidenceStyles(),
        className
      )}
    >
      {getConfidenceText()}
    </Badge>
  );
};

export default AIConfidenceBadge;
