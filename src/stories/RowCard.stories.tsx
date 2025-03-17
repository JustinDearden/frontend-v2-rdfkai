import type { Meta, StoryObj } from '@storybook/react';
import RowCard from '../components/RowCard';
import { CardProduct } from '../types';
import '../components/RowCard.scss';
import '../styles/global.scss';

const dummyProduct: CardProduct = {
  id: 1,
  type: 'Fixed',
  name: 'Personal Loan',
  bestRate: 3.5,
  lenderName: 'Bank of React',
};

const meta: Meta<typeof RowCard> = {
  title: 'Example/RowCard',
  component: RowCard,
  tags: ['autodocs'],
  args: {
    product: dummyProduct,
  },
};

export default meta;
type Story = StoryObj<typeof RowCard>;

export const Default: Story = {
  args: {
    onSelect: () => alert('Selected!'),
  },
};

export const WithCustomButtonLabel: Story = {
  args: {
    onSelect: () => alert('Custom selected!'),
    buttonLabel: 'Choose',
  },
};

export const WithoutButton: Story = {
  args: {
    onSelect: undefined,
  },
};
