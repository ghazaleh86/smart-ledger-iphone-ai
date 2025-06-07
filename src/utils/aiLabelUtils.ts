
import { Transaction } from '@/types/financial';

export const shouldShowAILabel = (transaction: Transaction): boolean => {
  if (!transaction.isAISuggested || !transaction.aiConfidence || !transaction.categorizedAt) {
    return false;
  }

  const categorizedDate = new Date(transaction.categorizedAt);
  const now = new Date();
  const hoursSinceCategorized = (now.getTime() - categorizedDate.getTime()) / (1000 * 60 * 60);
  
  // Show AI label for:
  // 1. Recent categorizations (within 48 hours) OR
  // 2. Low confidence suggestions (< 0.9) that might need review
  return hoursSinceCategorized <= 48 || transaction.aiConfidence < 0.9;
};

export const getAILabelText = (transaction: Transaction): string => {
  if (!transaction.aiConfidence) return 'AI suggested category';
  
  if (transaction.aiConfidence < 0.9) {
    return 'AI suggested category (review recommended)';
  }
  
  return 'AI suggested category';
};
