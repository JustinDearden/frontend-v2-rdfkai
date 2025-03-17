import type React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import Card from '../components/Card';
import RowCard from '../components/RowCard';
import { useProducts } from '../hooks/useProduct';
import { useCreateApplication } from '../hooks/useCreateApplication';
import type { Product } from '../types';
import { organizeProducts, toCardProduct } from '../helper/productHelpers';
import { useSelectedProduct } from '../hooks/useSelectedProduct';
import './ProductPage.scss';

const ProductPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useProducts();
  const createApplicationMutation = useCreateApplication();
  const { setSelectedProduct } = useSelectedProduct();

  const handleSelectProduct = useCallback(
    async (product: Product) => {
      try {
        setSelectedProduct(product);
        const newApplication = await createApplicationMutation.mutateAsync({
          productId: product.id,
        });
        navigate({ to: `/edit/${newApplication.id}` });
      } catch (err) {
        console.error('Error creating application:', err);
      }
    },
    [setSelectedProduct, createApplicationMutation, navigate],
  );

  if (isLoading)
    return (
      <div className="product-page__loading">
        <div>{t('loading')}...</div>
      </div>
    );

  if (error)
    return (
      <div className="product-page__loading">
        <div>{t('errorLoadingData')}</div>
      </div>
    );

  if (!products || products.length === 0)
    return (
      <div className="product-page__loading">
        <div>{t('noProductsAvailable')}</div>
      </div>
    );

  const { bestFixed, remainingFixed, bestVariable, remainingVariable } =
    organizeProducts(products);

  return (
    <div className="product-page">
      <section className="best-cards-section">
        {bestFixed && (
          <div className="best-card">
            <Card
              product={toCardProduct(bestFixed)}
              onSelect={() => handleSelectProduct(bestFixed)}
              buttonLabel={t('Select This Product')}
            />
          </div>
        )}
        {bestVariable && (
          <div className="best-card">
            <Card
              product={toCardProduct(bestVariable)}
              onSelect={() => handleSelectProduct(bestVariable)}
              buttonLabel={t('Select This Product')}
            />
          </div>
        )}
      </section>

      <hr className="product-page__divider" />

      <section className="row-cards-section">
        <div className="row-cards-column">
          {remainingFixed.map((product) => (
            <RowCard
              key={product.id}
              product={toCardProduct(product)}
              onSelect={() => handleSelectProduct(product)}
              buttonLabel={t('Select This Product')}
            />
          ))}
        </div>
        <div className="row-cards-column">
          {remainingVariable.map((product) => (
            <RowCard
              key={product.id}
              product={toCardProduct(product)}
              onSelect={() => handleSelectProduct(product)}
              buttonLabel={t('Select This Product')}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
