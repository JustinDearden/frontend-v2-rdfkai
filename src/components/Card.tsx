import React from 'react';

interface MortgageProduct {
  id: number; // Changed from string → number
  type: 'Fixed' | 'Variable';
  productName: string;
  bestRate: number;
  bestLender: string;
}

interface CardProps {
  product: MortgageProduct;
  onSelect: () => void;
}

const Card: React.FC<CardProps> = ({ product, onSelect }) => {
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
      <button onClick={onSelect}>Select</button>
    </div>
  );
};

export default Card;
