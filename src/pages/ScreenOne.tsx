import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import Card from '../components/Card';
import RowCard from '../components/RowCard';
import { useProducts } from '../hooks/useProduct';
import { useCreateApplication } from '../hooks/useCreateApplication';
import { Product } from '../types';
import { organizeProducts, toCardProduct } from '../helper/productHelpers';
import { useSelectedProduct } from '../hooks/useSelectedProduct';
import './ScreenOne.scss';

const ScreenOne: React.FC = () => {
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

  if (isLoading) return <div>{t('loading')}...</div>;
  if (error) return <div>{t('errorLoadingData')}</div>;
  if (!products || products.length === 0)
    return <div>{t('noProductsAvailable')}</div>;

  // Organize the products
  const { bestFixed, remainingFixed, bestVariable, remainingVariable } =
    organizeProducts(products);

  return (
    <div className="screen-one">
      {/* 1. Best Cards Section */}
      <section className="best-cards-section">
        <div className="best-card">
          <h2>
            {t('bestFix')} <span>({t('type')})</span>
          </h2>
          {bestFixed && (
            <Card
              product={toCardProduct(bestFixed)}
              onSelect={() => handleSelectProduct(bestFixed)}
              buttonLabel={t('Select This Product')}
            />
          )}
        </div>
        <div className="best-card">
          <h2>
            {t('bestVariable')} <span>({t('type')})</span>
          </h2>
          {bestVariable && (
            <Card
              product={toCardProduct(bestVariable)}
              onSelect={() => handleSelectProduct(bestVariable)}
              buttonLabel={t('Select This Product')}
            />
          )}
        </div>
      </section>

      {/* 2. Row Cards Section */}
      <section className="row-cards-section">
        <div className="row-cards-column">
          <h3>{t('otherFixedRates')}</h3>
          <ul>
            {remainingFixed.map((product) => (
              <li key={product.id}>
                <RowCard
                  product={toCardProduct(product)}
                  onSelect={() => handleSelectProduct(product)}
                  buttonLabel={t('Select This Product')}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="row-cards-column">
          <h3>{t('otherVariableRates')}</h3>
          <ul>
            {remainingVariable.map((product) => (
              <li key={product.id}>
                <RowCard
                  product={toCardProduct(product)}
                  onSelect={() => handleSelectProduct(product)}
                  buttonLabel={t('Select This Product')}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ScreenOne;
