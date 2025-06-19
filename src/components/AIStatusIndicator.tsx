
import React from 'react';
import { Check, X, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AIConfidenceBadge from './AIConfidenceBadge';
import AIActionButtons from './AIActionButtons';
import AITooltip from './AITooltip';

interface AIStatusIndicatorProps {
  aiStatus: 'suggested' | 'accepted' | 'rejected' | 'manual';
  aiConfidence?: 'high' | 'medium' | 'low';
  aiReasoning?: string;
  aiSuggestedCategory?: string;
  onAccept?: () => void;
  onReject?: () => void;
  className?: string;
}

const AIStatusIndicator: React.FC<AIStatusIndicatorProps> = ({
  aiStatus,
  aiConfidence,
  aiReasoning,
  aiSuggestedCategory,
  onAccept,
  onReject,
  className
}) => {
  const getStatusDisplay = () => {
    switch (aiStatus) {
      case 'suggested':
        if (aiConfidence === 'medium') {
          return (
            <AITooltip 
              reasoning={aiReasoning}
              confidence={aiConfidence}
              category={aiSuggestedCategory}
            >
              <div className="flex items-center space-x-2">
                <AIConfidenceBadge confidence={aiConfidence} />
                {onAccept && onReject && (
                  <AIActionButtons
                    onAccept={onAccept}
                    onReject={onReject}
                    confidence={aiConfidence}
                  />
                )}
              </div>
            </AITooltip>
          );
        } else if (aiConfidence === 'low') {
          return (
            <AITooltip 
              reasoning={aiReasoning}
              confidence={aiConfidence}
              category={aiSuggestedCategory}
            >
              <div className="flex items-center space-x-1">
                <AlertCircle className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Needs Review</span>
              </div>
            </AITooltip>
          );
        }
        return <span className="text-xs text-muted-foreground">AI Suggested</span>;
      
      case 'accepted':
        return (
          <AITooltip 
            reasoning={aiReasoning}
            confidence={aiConfidence}
            category={aiSuggestedCategory}
          >
            <div className="flex items-center space-x-1">
              <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                {aiConfidence === 'high' ? 'AI Applied' : 'AI Accepted'}
              </span>
            </div>
          </AITooltip>
        );
      
      case 'rejected':
        return (
          <div className="flex items-center space-x-1">
            <X className="h-3 w-3 text-orange-600 dark:text-orange-400" />
            <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">AI Dismissed</span>
          </div>
        );
      
      case 'manual':
      default:
        return (
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Manual</span>
          </div>
        );
    }
  };

  return (
    <div className={cn('flex items-center', className)}>
      {getStatusDisplay()}
    </div>
  );
};

export default AIStatusIndicator;
