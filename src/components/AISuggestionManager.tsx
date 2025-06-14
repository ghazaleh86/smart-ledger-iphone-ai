
import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AISuggestionManagerProps {
  totalSuggestions: number;
  highConfidenceSuggestions: number;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onReviewMode: () => void;
}

const AISuggestionManager = ({ 
  totalSuggestions, 
  highConfidenceSuggestions,
  onAcceptAll, 
  onRejectAll,
  onReviewMode 
}: AISuggestionManagerProps) => {
  if (totalSuggestions === 0) return null;

  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border border-blue-200/50 dark:border-blue-800/30 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI has {totalSuggestions} category suggestion{totalSuggestions !== 1 ? 's' : ''}
            </span>
          </div>
          {highConfidenceSuggestions > 0 && (
            <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
              {highConfidenceSuggestions} high confidence
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onReviewMode}
            className="h-8 px-3"
          >
            Review All
          </Button>
          {highConfidenceSuggestions > 0 && (
            <Button
              size="sm"
              onClick={onAcceptAll}
              className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-3 h-3 mr-1" />
              Accept High Confidence ({highConfidenceSuggestions})
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={onRejectAll}
            className="h-8 px-3 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="w-3 h-3 mr-1" />
            Reject All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionManager;
