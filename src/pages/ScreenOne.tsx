import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import Card from '../components/Card';
import { useProducts } from '../hooks/useProduct';
import { useCreateApplication } from '../hooks/useCreateApplication';
import { Product } from '../types';
import { organizeProducts, toCardProduct } from '../helper/productHelpers';
import { useSelectedProduct } from '../hooks/useSelectedProduct';

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

  // Organize the products using helper functions
  const { bestFixed, remainingFixed, bestVariable, remainingVariable } =
    organizeProducts(products);

  // Local helper for rendering a product list section
  const renderProductList = (
    heading: string,
    best: Product | null,
    remaining: Product[],
  ) => (
    <div className="product-section">
      <h2>{heading}</h2>
      {best && (
        <Card
          product={toCardProduct(best)}
          onSelect={() => handleSelectProduct(best)}
        />
      )}
      {remaining.length > 0 && (
        <ul>
          {remaining.map((product) => (
            <li key={product.id}>
              <Card
                product={toCardProduct(product)}
                onSelect={() => handleSelectProduct(product)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div>
      <h1>{t('selectProduct')}</h1>
      {renderProductList(t('fixedRate'), bestFixed, remainingFixed)}
      {renderProductList(t('variableRate'), bestVariable, remainingVariable)}
    </div>
  );
};

export default ScreenOne;
