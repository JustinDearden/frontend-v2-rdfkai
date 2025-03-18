import type React from 'react';
import { CardSkeleton, RowCardSkeleton, Skeleton } from './BaseSkeletons';
import './SkeletonLoader.scss';

const ProductPageSkeleton: React.FC = () => (
  <div className="skeleton-product-page">
    <Skeleton className="skeleton-product-page__section-title" />

    <section className="skeleton-product-page__best-cards-section">
      <div className="skeleton-product-page__best-card">
        <CardSkeleton />
      </div>
      <div className="skeleton-product-page__best-card">
        <CardSkeleton />
      </div>
    </section>

    <div className="skeleton-product-page__divider" />

    <section className="skeleton-product-page__row-cards-section">
      <div className="skeleton-product-page__row-cards-column">
        <Skeleton className="skeleton-product-page__column-title" />
        <RowCardSkeleton />
        <RowCardSkeleton />
        <RowCardSkeleton />
      </div>
      <div className="skeleton-product-page__row-cards-column">
        <Skeleton className="skeleton-product-page__column-title" />
        <RowCardSkeleton />
        <RowCardSkeleton />
        <RowCardSkeleton />
      </div>
    </section>
  </div>
);

export default ProductPageSkeleton;
