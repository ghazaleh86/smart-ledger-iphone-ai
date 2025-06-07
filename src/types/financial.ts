
export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category?: string;
  type: 'income' | 'expense';
  paymentMethod: string;
  isAISuggested?: boolean;
  aiSuggestedCategory?: string;
  accountId: string;
  aiConfidence?: number; // 0-1 scale for AI confidence
  categorizedAt?: string; // when it was categorized
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
}
