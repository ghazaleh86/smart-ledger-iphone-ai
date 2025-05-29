
import type { Meta, StoryObj } from '@storybook/react';
import QuickActions from './QuickActions';

const meta: Meta<typeof QuickActions> = {
  title: 'Components/QuickActions',
  component: QuickActions,
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
    onAddTransaction: { action: 'add-transaction' },
    onOpenAI: { action: 'open-ai' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
