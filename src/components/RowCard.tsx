import React, { type JSX } from 'react';
import type { CardProduct } from '../types';
import Button from '../components/Button';
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
    <div className="row-card__row row-card__header">
      <p className="row-card__type">{product.type}</p>
      <p className="row-card__name">{product.name}</p>
    </div>

    <div className="row-card__row row-card__body">
      <p className="row-card__rate">{product.bestRate.toFixed(2)}%</p>
      <p className="row-card__lender">{product.lenderName}</p>
    </div>

    <div className="row-card__row row-card__footer">
      {onSelect && (
        <Button
          variant="primary"
          className="row-card__button"
          onClick={onSelect}
          aria-label={`${buttonLabel} ${product.name}`}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  </div>
);

export default React.memo(RowCard);
