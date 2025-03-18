import type React from 'react';
import './SkeletonLoader.scss';
import { CardSkeleton, FormSkeleton, Skeleton } from './BaseSkeletons';

const EditPageSkeleton: React.FC = () => (
  <div className="skeleton-edit-page">
    <div className="skeleton-edit-page__content">
      <div className="skeleton-edit-page__left">
        <CardSkeleton />
        <Skeleton className="skeleton-edit-page__select-another" />
      </div>
      <div className="skeleton-edit-page__right">
        <FormSkeleton />
      </div>
    </div>
  </div>
);

export default EditPageSkeleton;
