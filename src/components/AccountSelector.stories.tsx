
import type { Meta, StoryObj } from '@storybook/react';
import AccountSelector from './AccountSelector';

const meta: Meta<typeof AccountSelector> = {
  title: 'Components/AccountSelector',
  component: AccountSelector,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onAccountChange: { action: 'account-changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockAccounts = [
  { id: 'all', name: 'All Accounts', balance: 5675.86, type: 'Combined' },
  { id: 'checking', name: 'Checking Account', balance: 3210.45, type: 'TD Canada Trust' },
  { id: 'savings', name: 'Savings Account', balance: 2465.41, type: 'TD Canada Trust' },
  { id: 'credit', name: 'RBC VISA', balance: -1250.00, type: 'Credit Card' },
];

export const Default: Story = {
  args: {
    accounts: mockAccounts,
    selectedAccount: 'all',
  },
};

export const CheckingSelected: Story = {
  args: {
    accounts: mockAccounts,
    selectedAccount: 'checking',
  },
};

export const CreditSelected: Story = {
  args: {
    accounts: mockAccounts,
    selectedAccount: 'credit',
  },
};
