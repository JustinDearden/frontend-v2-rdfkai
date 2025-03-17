import type React from 'react';
import './SkeletonLoader.scss';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={`skeleton-pulse ${className || ''}`}></div>
);

export const CardSkeleton: React.FC = () => (
  <div className="card-skeleton">
    <div className="card-skeleton__header">
      <Skeleton className="card-skeleton__type" />
      <Skeleton className="card-skeleton__name" />
    </div>
    <div className="card-skeleton__body">
      <Skeleton className="card-skeleton__rate" />
      <Skeleton className="card-skeleton__lender" />
    </div>
    <Skeleton className="card-skeleton__button" />
  </div>
);

export const FormSkeleton: React.FC = () => (
  <div className="form-skeleton">
    <Skeleton className="form-skeleton__title" />
    <div className="form-skeleton__group">
      <Skeleton className="form-skeleton__label" />
      <Skeleton className="form-skeleton__input" />
    </div>
    <div className="form-skeleton__group">
      <Skeleton className="form-skeleton__label" />
      <Skeleton className="form-skeleton__input" />
    </div>
    <div className="form-skeleton__group">
      <Skeleton className="form-skeleton__label" />
      <Skeleton className="form-skeleton__input" />
    </div>
    <div className="form-skeleton__group">
      <Skeleton className="form-skeleton__label" />
      <Skeleton className="form-skeleton__input" />
    </div>
    <div className="form-skeleton__button-container">
      <Skeleton className="form-skeleton__button" />
    </div>
  </div>
);

export const EditPageSkeleton: React.FC = () => (
  <div className="edit-page">
    <div className="edit-page__content">
      <div className="edit-page__left">
        <CardSkeleton />
        <Skeleton className="edit-page__select-another-skeleton" />
      </div>
      <div className="edit-page__right">
        <FormSkeleton />
      </div>
    </div>
  </div>
);

export default EditPageSkeleton;
