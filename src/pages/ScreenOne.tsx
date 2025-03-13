import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import Card from '../components/Card';
import { useProducts } from '../hooks/useProduct';
import { useCreateApplication } from '../hooks/useCreateApplication';
import {
  MortgageProduct,
  useSelectedProduct,
} from '../context/SelectedProductContext';

export interface CardProduct {
  id: number;
  type: 'Fixed' | 'Variable';
  productName: string;
  bestRate: number;
  bestLender: string;
}

const toCardProduct = (product: {
  id: number;
  name: string;
  type: 'FIXED' | 'VARIABLE';
  bestRate: number;
  lenderName: string;
}): CardProduct => ({
  id: product.id,
  type: product.type === 'FIXED' ? 'Fixed' : 'Variable',
  productName: product.name,
  bestRate: product.bestRate,
  bestLender: product.lenderName,
});

const ScreenOne = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useProducts();
  const createApplicationMutation = useCreateApplication();
  const { setSelectedProduct } = useSelectedProduct();

  if (isLoading) return <div>{t('loading')}...</div>;
  if (error) return <div>{t('errorLoadingData')}</div>;
  if (!products || products.length === 0)
    return <div>{t('noProductsAvailable')}</div>;

  // Use raw API products for filtering and storing in context
  const fixedProducts = products.filter((p) => p.type === 'FIXED');
  const variableProducts = products.filter((p) => p.type === 'VARIABLE');

  const bestFixed =
    fixedProducts.length > 0
      ? fixedProducts.reduce((prev, curr) =>
          prev.bestRate < curr.bestRate ? prev : curr,
        )
      : null;

  const bestVariable =
    variableProducts.length > 0
      ? variableProducts.reduce((prev, curr) =>
          prev.bestRate < curr.bestRate ? prev : curr,
        )
      : null;

  const remainingFixed = bestFixed
    ? fixedProducts.filter((p) => p.id !== bestFixed.id)
    : [];
  const remainingVariable = bestVariable
    ? variableProducts.filter((p) => p.id !== bestVariable.id)
    : [];

  // When a product is selected, store it in the context and create an application
  const handleSelectProduct = async (product: MortgageProduct | null) => {
    try {
      setSelectedProduct(product);
      const newApplication = await createApplicationMutation.mutateAsync({
        productId: product!.id,
      });
      navigate({ to: `/edit/${newApplication.id}` });
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  return (
    <div>
      <h1>{t('selectProduct')}</h1>

      {/* Fixed Products Section */}
      <div className="product-section">
        <h2>{t('fixedRate')}</h2>
        {bestFixed && (
          <Card
            product={toCardProduct(bestFixed)}
            onSelect={() => handleSelectProduct(bestFixed)}
          />
        )}
        {remainingFixed.length > 0 && (
          <ul>
            {remainingFixed.map((product) => (
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

      {/* Variable Products Section */}
      <div className="product-section">
        <h2>{t('variableRate')}</h2>
        {bestVariable && (
          <Card
            product={toCardProduct(bestVariable)}
            onSelect={() => handleSelectProduct(bestVariable)}
          />
        )}
        {remainingVariable.length > 0 && (
          <ul>
            {remainingVariable.map((product) => (
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
    </div>
  );
};

export default ScreenOne;
