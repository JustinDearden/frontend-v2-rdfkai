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
    {/* Header Row */}
    <div className="row-card__row row-card__header">
      <p className="row-card__type">{product.type}</p>
      <p className="row-card__name">{product.name}</p>
    </div>

    {/* Body Row */}
    <div className="row-card__row row-card__body">
      <p className="row-card__rate">{product.bestRate.toFixed(2)}%</p>
      <p className="row-card__lender">{product.lenderName}</p>
    </div>

    {/* Footer Row */}
    <div className="row-card__row row-card__footer">
      {onSelect && (
        <button className="row-card__button" onClick={onSelect}>
          {buttonLabel}
        </button>
      )}
    </div>
  </div>
);

export default React.memo(RowCard);
