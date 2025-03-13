import React, { JSX } from 'react';
import { CardProduct } from '../types';

export interface CardProps {
  product: CardProduct;
  onSelect?: () => void;
  buttonLabel?: string;
}

const Card = ({
  product,
  onSelect,
  buttonLabel = 'Select',
}: CardProps): JSX.Element => (
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
    {onSelect && <button onClick={onSelect}>{buttonLabel}</button>}
  </div>
);

export default React.memo(Card);
