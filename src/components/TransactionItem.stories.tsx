
import type { Meta, StoryObj } from '@storybook/react';
import TransactionItem from './TransactionItem';

const meta: Meta<typeof TransactionItem> = {
  title: 'Components/TransactionItem',
  component: TransactionItem,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#f9fafb' },
        { name: 'white', value: '#ffffff' },
      ],
    },
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
  merchant: 'Adobe Creative Suite',
  amount: 113.00,
  type: 'expense' as const,
  paymentMethod: 'Ramp Corporate Card',
  accountId: 'credit',
};

export const Default: Story = {
  args: {
    transaction: mockTransaction,
    isFirst: true,
    isLast: true,
  },
};

export const WithCategorySelector: Story = {
  args: {
    transaction: {
      ...mockTransaction,
      category: 'Business',
    },
    isFirst: true,
    isLast: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Transaction item with category selector dropdown for manual categorization.',
      },
    },
  },
};

export const AISuggested: Story = {
  args: {
    transaction: {
      ...mockTransaction,
      merchant: 'Uber',
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
      merchant: 'Client Payment - Invoice #3023',
      amount: 1850.00,
      type: 'income' as const,
      paymentMethod: 'Bank Transfer',
    },
    isFirst: true,
    isLast: true,
  },
};

export const UncategorizedWithSelector: Story = {
  args: {
    transaction: {
      ...mockTransaction,
      merchant: 'Unknown Merchant',
      category: undefined,
    },
    isFirst: true,
    isLast: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Uncategorized transaction showing the category selector for manual assignment.',
      },
    },
  },
};
