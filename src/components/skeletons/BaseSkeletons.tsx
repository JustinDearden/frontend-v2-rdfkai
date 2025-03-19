import type React from 'react';
import '../../styles/skeleton/_base.scss';
import '../../styles/skeleton/_card.scss';
import '../../styles/skeleton/_row-card.scss';
import '../../styles/skeleton/_form.scss';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={`skeleton-pulse ${className || ''}`}></div>
);

export const CardSkeleton: React.FC = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__header">
      <Skeleton className="skeleton-card__type" />
      <Skeleton className="skeleton-card__name" />
    </div>
    <div className="skeleton-card__body">
      <Skeleton className="skeleton-card__rate" />
      <Skeleton className="skeleton-card__lender" />
    </div>
    <Skeleton className="skeleton-card__button" />
  </div>
);

export const RowCardSkeleton: React.FC = () => (
  <div className="skeleton-row-card">
    <div className="skeleton-row-card__header">
      <Skeleton className="skeleton-row-card__type" />
      <Skeleton className="skeleton-row-card__name" />
    </div>
    <div className="skeleton-row-card__body">
      <Skeleton className="skeleton-row-card__rate" />
      <Skeleton className="skeleton-row-card__lender" />
    </div>
    <div className="skeleton-row-card__footer">
      <Skeleton className="skeleton-row-card__button" />
    </div>
  </div>
);

export const FormSkeleton: React.FC = () => (
  <div className="skeleton-form">
    <Skeleton className="skeleton-form__title" />
    <div className="skeleton-form__group">
      <Skeleton className="skeleton-form__label" />
      <Skeleton className="skeleton-form__input" />
    </div>
    <div className="skeleton-form__group">
      <Skeleton className="skeleton-form__label" />
      <Skeleton className="skeleton-form__input" />
    </div>
    <div className="skeleton-form__group">
      <Skeleton className="skeleton-form__label" />
      <Skeleton className="skeleton-form__input" />
    </div>
    <div className="skeleton-form__group">
      <Skeleton className="skeleton-form__label" />
      <Skeleton className="skeleton-form__input" />
    </div>
    <div className="skeleton-form__button-container">
      <Skeleton className="skeleton-form__button" />
    </div>
  </div>
);
