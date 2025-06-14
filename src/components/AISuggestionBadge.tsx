
import React from 'react';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface AISuggestionBadgeProps {
  suggestedCategory: string;
  confidence?: 'high' | 'medium' | 'low';
  reasoning?: string;
  onAccept: () => void;
  onReject: () => void;
  compact?: boolean;
}

const AISuggestionBadge = ({ 
  suggestedCategory, 
  confidence = 'medium',
  reasoning,
  onAccept, 
  onReject,
  compact = false 
}: AISuggestionBadgeProps) => {
  const getConfidenceStyle = () => {
    switch (confidence) {
      case 'high':
        return 'from-green-50 via-blue-50 to-purple-50 dark:from-green-950/30 dark:via-blue-950/30 dark:to-purple-950/30 border-green-200/50 dark:border-green-800/30';
      case 'medium':
        return 'from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border-blue-200/50 dark:border-blue-800/30';
      case 'low':
        return 'from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/30 dark:via-orange-950/30 dark:to-red-950/30 border-yellow-200/50 dark:border-yellow-800/30';
    }
  };

  const getConfidenceIndicator = () => {
    switch (confidence) {
      case 'high':
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />;
      case 'medium':
        return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />;
      case 'low':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />;
    }
  };

  if (compact) {
    return (
      <TooltipProvider>
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 hover:shadow-sm",
          `bg-gradient-to-r ${getConfidenceStyle()}`
        )}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            {getConfidenceIndicator()}
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
              AI: {suggestedCategory}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onAccept}
                  className="h-5 w-5 p-0 hover:bg-green-100 dark:hover:bg-green-900/20"
                >
                  <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Accept suggestion</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onReject}
                  className="h-5 w-5 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reject suggestion</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className={cn(
        "p-3 rounded-lg border transition-all duration-200 hover:shadow-sm",
        `bg-gradient-to-r ${getConfidenceStyle()}`
      )}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              AI Suggestion
            </span>
            {getConfidenceIndicator()}
            <Badge variant="outline" className="text-xs">
              {confidence} confidence
            </Badge>
          </div>
          {reasoning && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <HelpCircle className="w-3 h-3 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">{reasoning}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {suggestedCategory}
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={onAccept}
              className="h-7 px-3 bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-3 h-3 mr-1" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onReject}
              className="h-7 px-3 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <X className="w-3 h-3 mr-1" />
              Reject
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AISuggestionBadge;
