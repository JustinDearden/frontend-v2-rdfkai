// src/components/Card.tsx
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCreateApplication } from '../hooks/useCreateApplication';
import { useApplication } from '../context/ApplicationContext';

export interface MortgageProduct {
  id: string;
  type: 'Fixed' | 'Variable';
  productName: string;
  bestRate: number;
  bestLender: string;
}

interface CardProps {
  product: MortgageProduct;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { setApplication } = useApplication();
  const createAppMutation = useCreateApplication(Number(product.id));

  const handleSelect = () => {
    createAppMutation.mutate(
      { productId: Number(product.id) },
      {
        onSuccess: (data) => {
          // Save the created application in context.
          setApplication(data);
          // Navigate to ScreenTwo (e.g., '/edit') passing just the product id if needed.
          navigate({ to: '/edit' });
        },
        onError: (error) => {
          console.error('Failed to create application:', error);
        },
      },
    );
  };

  return (
    <div className="card">
      <p>
        <strong>Type:</strong> {product.type}
      </p>
      <p>
        <strong>Product Name:</strong> {product.productName}
      </p>
      <p>
        <strong>Best Rate:</strong> {product.bestRate.toFixed(2)}%
      </p>
      <p>
        <strong>Best Lender:</strong> {product.bestLender}
      </p>
      <button onClick={handleSelect}>Select</button>
    </div>
  );
};

export default Card;
