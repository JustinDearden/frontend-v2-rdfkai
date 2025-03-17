import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toast, { ToastProps } from '../components/Toast';
import Button from '../components/Button';

const meta: Meta<typeof Toast> = {
  title: 'Example/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// A wrapper component to control Toast visibility
const ToastWrapper = (props: Omit<ToastProps, 'onClose'>) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return <Button onClick={() => setVisible(true)}>Show Toast</Button>;
  }

  return <Toast {...props} onClose={handleClose} />;
};

export const Success: Story = {
  render: () => (
    <ToastWrapper
      message="Operation was successful!"
      variant="success"
      duration={3000}
    />
  ),
};

export const Failure: Story = {
  render: () => (
    <ToastWrapper
      message="Operation failed!"
      variant="failure"
      duration={3000}
    />
  ),
};

export const LongDuration: Story = {
  render: () => (
    <ToastWrapper
      message="This toast lasts longer..."
      variant="success"
      duration={5000}
    />
  ),
};
