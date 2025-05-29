
import type { Meta, StoryObj } from '@storybook/react';
import CategorySelector from './CategorySelector';

const meta: Meta<typeof CategorySelector> = {
  title: 'Components/CategorySelector',
  component: CategorySelector,
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
    onCategoryChange: { action: 'category-changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCategory: Story = {
  args: {
    currentCategory: 'Business',
  },
};

export const Transportation: Story = {
  args: {
    currentCategory: 'Transportation',
  },
};

export const Shopping: Story = {
  args: {
    currentCategory: 'Shopping',
  },
};
