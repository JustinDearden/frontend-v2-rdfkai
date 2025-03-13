import React, { JSX } from 'react';
import { CardProduct } from '../types';

export interface CardProps {
  product: CardProduct;
  onSelect: () => void;
}

const Card = ({ product, onSelect }: CardProps): JSX.Element => (
  <div className="card">
    <p>
      <strong>Type:</strong> {product.type}
    </p>
    <p>
      <strong>Product Name:</strong> {product.name}
    </p>
    <p>
      <strong>Best Rate:</strong> {product.bestRate.toFixed(2)}%
    </p>
    <p>
      <strong>Best Lender:</strong> {product.lenderName}
    </p>
    <button onClick={onSelect}>Select</button>
  </div>
);

export default React.memo(Card);
