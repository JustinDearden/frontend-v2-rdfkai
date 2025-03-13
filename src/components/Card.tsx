import React from 'react';
import { useNavigate } from '@tanstack/react-router';

export interface MortgageProduct {
  id: string;
  type: 'Fixed' | 'Variable';
  productName: string;
  bestRate: number;
  bestLender: string;
}

// Define props interface for the Card component
interface CardProps {
  product: MortgageProduct;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    // Navigate to the /edit route, passing the product id as a query parameter (or use state)
    navigate({ to: '/edit', search: { id: product.id } });
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
      <button onClick={handleSelect}>Select this product</button>
    </div>
  );
};

export default Card;
