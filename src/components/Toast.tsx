import React, { useEffect } from 'react';
import './Toast.scss';

export interface ToastProps {
  message: string;
  duration?: number;
  variant?: 'success' | 'failure';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  variant = 'success',
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast--${variant}`} role="alert">
      {message}
    </div>
  );
};

export default Toast;
