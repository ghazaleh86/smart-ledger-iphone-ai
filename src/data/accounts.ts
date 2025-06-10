
import { Account } from '@/types/financial';

export const accounts: Account[] = [
  { id: 'all', name: 'All Accounts', balance: 5675.86, type: 'Combined' },
  { id: 'checking', name: 'Checking Account', balance: 3210.45, type: 'TD Canada Trust' },
  { id: 'savings', name: 'Savings Account', balance: 2465.41, type: 'TD Canada Trust' },
  { id: 'credit', name: 'RBC VISA', balance: -1250.00, type: 'Credit Card' },
];
