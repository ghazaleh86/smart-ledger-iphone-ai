
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AITooltipProps {
  children: React.ReactNode;
  reasoning?: string;
  confidence: 'high' | 'medium' | 'low';
  category?: string;
}

const AITooltip: React.FC<AITooltipProps> = ({ children, reasoning, confidence, category }) => {
  const getDefaultReasoning = () => {
    if (!category) return 'AI analysis in progress';
    
    switch (confidence) {
      case 'high':
        return `Strong match found for "${category}" based on merchant name and transaction patterns`;
      case 'medium':
        return `Likely "${category}" based on merchant analysis, but requires verification`;
      case 'low':
        return `Uncertain categorization as "${category}" - manual review recommended`;
      default:
        return 'AI categorization analysis';
    }
  };

  const tooltipContent = reasoning || getDefaultReasoning();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-xs">{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AITooltip;
