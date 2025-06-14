
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
  aiConfidence?: 'high' | 'medium' | 'low';
  aiReasoning?: string;
  accountId: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
}
