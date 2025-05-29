
import type { Meta, StoryObj } from '@storybook/react';
import SpendingInsights from './SpendingInsights';

const meta: Meta<typeof SpendingInsights> = {
  title: 'Components/SpendingInsights',
  component: SpendingInsights,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
