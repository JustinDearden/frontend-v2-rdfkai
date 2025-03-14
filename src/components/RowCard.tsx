import React, { JSX } from 'react';
import { CardProduct } from '../types';
import './RowCard.scss';

export interface RowCardProps {
  product: CardProduct;
  onSelect?: () => void;
  buttonLabel?: string;
}

const RowCard = ({
  product,
  onSelect,
  buttonLabel = 'Select',
}: RowCardProps): JSX.Element => (
  <div className="row-card">
    <div className="row-card__left">
      <p className="row-card__type">{product.type}</p>
      <p className="row-card__name">{product.name}</p>
    </div>
    <div className="row-card__center">
      <p className="row-card__rate">{product.bestRate.toFixed(2)}%</p>
      <p className="row-card__lender">{product.lenderName}</p>
    </div>
    {onSelect && (
      <button className="row-card__button" onClick={onSelect}>
        {buttonLabel}
      </button>
    )}
  </div>
);

export default React.memo(RowCard);
