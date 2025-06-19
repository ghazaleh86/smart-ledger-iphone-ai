
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIActionButtonsProps {
  onAccept: () => void;
  onReject: () => void;
  confidence: 'high' | 'medium' | 'low';
  className?: string;
}

const AIActionButtons: React.FC<AIActionButtonsProps> = ({ 
  onAccept, 
  onReject, 
  confidence, 
  className 
}) => {
  // Show action buttons for medium and low confidence suggestions
  if (confidence !== 'medium' && confidence !== 'low') {
    return null;
  }

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <Button
        size="sm"
        variant="ghost"
        onClick={onAccept}
        className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-950"
      >
        <Check className="h-3 w-3" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onReject}
        className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default AIActionButtons;
