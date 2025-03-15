import React, { JSX } from 'react';
import { CardProduct } from '../types';
import './Card.scss';

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
    <div className="card__header">
      <p className="card__type">{product.type}</p>
      <p className="card__name">{product.name}</p>
    </div>
    <div className="card__body">
      <p className="card__rate">{product.bestRate.toFixed(2)}%</p>
      <p className="card__lender">{product.lenderName}</p>
    </div>
    {onSelect && (
      <button className="card__button" onClick={onSelect}>
        {buttonLabel}
      </button>
    )}
  </div>
);

export default React.memo(Card);
