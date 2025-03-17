import type { Meta, StoryObj } from '@storybook/react';
import Card from '../components/Card';
import { CardProduct } from '../types';
import '../components/Card.scss';
import '../styles/global.scss';

const dummyProduct: CardProduct = {
  type: 'Variable',
  name: 'Visa Platinum',
  bestRate: 2.99,
  lenderName: 'Bank of Storybook',
  id: 1,
};

const meta: Meta<typeof Card> = {
  title: 'Example/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    product: dummyProduct,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    onSelect: () => alert('Card Selected'),
  },
};

export const WithCustomButtonLabel: Story = {
  args: {
    onSelect: () => alert('Custom Card Selected'),
    buttonLabel: 'Choose Card',
  },
};

export const WithoutButton: Story = {
  args: {
    onSelect: undefined,
  },
};
