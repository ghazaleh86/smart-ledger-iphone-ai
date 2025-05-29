
import type { Meta, StoryObj } from '@storybook/react';
import TransactionItem from './TransactionItem';

const meta: Meta<typeof TransactionItem> = {
  title: 'Components/TransactionItem',
  component: TransactionItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onCategorize: { action: 'categorized' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTransaction = {
  id: '1',
  date: '2024-03-03',
  merchant: 'HOME HARDWARE #10334',
  amount: 113.00,
  type: 'expense' as const,
  paymentMethod: 'RBC VISA',
  accountId: 'credit',
};

export const Default: Story = {
  args: {
    transaction: mockTransaction,
    isFirst: true,
    isLast: true,
  },
};

export const WithCategory: Story = {
  args: {
    transaction: {
      ...mockTransaction,
      category: 'Home & Garden',
    },
    isFirst: true,
    isLast: true,
  },
};

export const AISuggested: Story = {
  args: {
    transaction: {
      ...mockTransaction,
      category: 'Transportation',
      isAISuggested: true,
    },
    isFirst: true,
    isLast: true,
  },
};

export const Income: Story = {
  args: {
    transaction: {
      ...mockTransaction,
      merchant: 'PYMT CHQ 3023',
      amount: 1850.00,
      type: 'income' as const,
      paymentMethod: 'Cash and Bank',
    },
    isFirst: true,
    isLast: true,
  },
};
